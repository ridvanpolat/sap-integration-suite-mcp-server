#!/usr/bin/env npx tsx
/**
 * scripts/generate-types-and-metadata.ts
 *
 * Build-time code-generation script for the SAP Integration Suite MCP Server.
 *
 * For every YAML spec file under `/specs/{domain}/`, this script:
 *   1. Generates TypeScript interfaces via `openapi-typescript` → `src/generated/{domain}/types/{specName}.ts`
 *   2. Extracts operational metadata (paths, methods, tags, entity names, enums,
 *      operationIds, parameter details) into a strongly-typed constants file →
 *      `src/generated/{domain}/metadata.ts`
 *
 * The metadata file is what domain tools use at runtime for strict Zod validation
 * — no YAML parsing happens at runtime.
 *
 * Usage:
 *   npx tsx scripts/generate-types-and-metadata.ts
 *   npm run generate
 */

import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import openapiTS, { astToString } from "openapi-typescript";
import swagger2openapi from "swagger2openapi";
import YAML from "yaml";

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const SPECS_DIR = join(PROJECT_ROOT, "specs");
const GENERATED_DIR = join(PROJECT_ROOT, "src", "generated");

// ---------------------------------------------------------------------------
// Domain mapping (directory name → generated folder name)
// ---------------------------------------------------------------------------
const DOMAIN_DIRS = [
  "CloudIntegration",
  "APIManagement",
  "EventMesh",
  "IntegrationAssessment",
  "OpenConnectors",
  "EdgeIntegrationCell",
] as const;

// ---------------------------------------------------------------------------
// Types for extracted metadata
// ---------------------------------------------------------------------------

interface ParameterMeta {
  name: string;
  in: string;
  required: boolean;
  type?: string;
  enum?: string[];
  description?: string;
}

interface OperationMeta {
  /** HTTP method (get, post, put, patch, delete) */
  method: string;
  /** Raw path from the spec */
  path: string;
  /** Summary from the spec (short description) */
  summary?: string;
  /** Tags assigned to this operation */
  tags: string[];
  /** operationId, if present in the spec */
  operationId?: string;
  /** Synthesized operation ID (always present): method + sanitised path */
  syntheticId: string;
  /** Path and query parameters */
  parameters: ParameterMeta[];
  /** Whether the operation has a request body */
  hasRequestBody: boolean;
  /** Content types accepted */
  consumes: string[];
  /** Content types produced */
  produces: string[];
}

interface EnumMeta {
  /** Location where this enum appears (e.g. "definitions.Foo.Status" or "paths./foo.get.param.type") */
  location: string;
  values: string[];
}

interface EntityMeta {
  /** Entity/definition name (e.g. "IntegrationPackage") */
  name: string;
  /** Full ref key (e.g. "com.sap.hci.api.IntegrationPackage") */
  refKey: string;
  /** List of property names */
  properties: string[];
}

interface SpecMetadata {
  /** Spec file basename without extension */
  specName: string;
  /** Spec title from info.title */
  title: string;
  /** Spec version from info.version */
  version: string;
  /** Spec format: "swagger-2.0" | "openapi-3.x" */
  format: string;
  /** x-sap-api-type if present (e.g. "ODATA", "REST") */
  sapApiType?: string;
  /** Base path (Swagger 2.0) or first server URL (OpenAPI 3.x) */
  basePath?: string;
  /** All unique tags used across all operations */
  allTags: string[];
  /** Operations (one per path+method) */
  operations: OperationMeta[];
  /** Entities/definitions/schemas extracted from the spec */
  entities: EntityMeta[];
  /** All enums found in parameters, properties, or schemas */
  enums: EnumMeta[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const HTTP_METHODS = ["get", "post", "put", "patch", "delete", "head", "options"] as const;

/**
 * Sanitise a path + method into a safe TypeScript identifier.
 * e.g. GET /IntegrationPackages('{Id}') → get_IntegrationPackages_by_Id
 */
function synthesizeOperationId(method: string, path: string): string {
  return (
    method.toLowerCase() +
    "_" +
    path
      .replace(/^\//, "")
      .replace(/\{([^}]+)\}/g, "by_$1")
      .replace(/[^a-zA-Z0-9_]/g, "_")
      .replace(/_+/g, "_")
      .replace(/_$/g, "")
  );
}

/**
 * Collect all `enum` values found anywhere in a JSON-like object, tracking
 * the dot-path location.
 */
function collectEnums(obj: unknown, prefix: string, result: EnumMeta[]): void {
  if (obj === null || obj === undefined || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    obj.forEach((item, i) => collectEnums(item, `${prefix}[${i}]`, result));
    return;
  }

  const rec = obj as Record<string, unknown>;

  if (Array.isArray(rec["enum"])) {
    const values = (rec["enum"] as unknown[])
      .map((v) => String(v))
      .filter((v) => v.length > 0);
    if (values.length > 0) {
      result.push({ location: prefix, values });
    }
  }

  for (const [key, value] of Object.entries(rec)) {
    if (key === "enum") continue; // already handled
    collectEnums(value, `${prefix}.${key}`, result);
  }
}

/**
 * Deduplicate enums by their sorted value set (keep shortest location).
 */
function deduplicateEnums(enums: EnumMeta[]): EnumMeta[] {
  const seen = new Map<string, EnumMeta>();
  for (const e of enums) {
    const key = [...e.values].sort().join("|");
    const existing = seen.get(key);
    if (!existing || e.location.length < existing.location.length) {
      seen.set(key, e);
    }
  }
  return [...seen.values()];
}

/**
 * Resolve `$ref` parameters in Swagger 2.0 specs.
 */
function resolveParam(
  param: Record<string, unknown>,
  spec: Record<string, unknown>,
): Record<string, unknown> {
  if (typeof param["$ref"] === "string") {
    // e.g. "#/parameters/top" → spec.parameters.top
    const refPath = (param["$ref"] as string).replace(/^#\//, "").split("/");
    let resolved: unknown = spec;
    for (const seg of refPath) {
      if (resolved && typeof resolved === "object") {
        resolved = (resolved as Record<string, unknown>)[seg];
      }
    }
    return (resolved as Record<string, unknown>) ?? param;
  }
  return param;
}

/**
 * Resolve a $ref in OpenAPI 3.x components/parameters.
 */
function resolveOas3Param(
  param: Record<string, unknown>,
  spec: Record<string, unknown>,
): Record<string, unknown> {
  if (typeof param["$ref"] === "string") {
    const refPath = (param["$ref"] as string).replace(/^#\//, "").split("/");
    let resolved: unknown = spec;
    for (const seg of refPath) {
      if (resolved && typeof resolved === "object") {
        resolved = (resolved as Record<string, unknown>)[seg];
      }
    }
    return (resolved as Record<string, unknown>) ?? param;
  }
  return param;
}

// ---------------------------------------------------------------------------
// Metadata Extraction
// ---------------------------------------------------------------------------

function extractMetadata(specName: string, raw: Record<string, unknown>): SpecMetadata {
  const info = (raw["info"] ?? {}) as Record<string, unknown>;
  const isSwagger2 = typeof raw["swagger"] === "string";
  const format = isSwagger2
    ? "swagger-2.0"
    : `openapi-${String(raw["openapi"] ?? "3.0")}`;

  const sapApiType = raw["x-sap-api-type"] as string | undefined;

  // Base path
  let basePath: string | undefined;
  if (isSwagger2) {
    basePath = raw["basePath"] as string | undefined;
  } else {
    const servers = raw["servers"] as Array<Record<string, unknown>> | undefined;
    if (servers && servers.length > 0) {
      basePath = servers[0]!["url"] as string | undefined;
    }
  }

  // Global consumes/produces (Swagger 2.0)
  const globalConsumes = (isSwagger2 ? (raw["consumes"] as string[]) : undefined) ?? [];
  const globalProduces = (isSwagger2 ? (raw["produces"] as string[]) : undefined) ?? [];

  // Paths
  const paths = (raw["paths"] ?? {}) as Record<string, Record<string, unknown>>;
  const allTagsSet = new Set<string>();
  const operations: OperationMeta[] = [];

  for (const [pathStr, pathItem] of Object.entries(paths)) {
    // Collect parameters defined at the path level
    const pathLevelParams = Array.isArray(pathItem["parameters"])
      ? (pathItem["parameters"] as Array<Record<string, unknown>>)
      : [];

    for (const method of HTTP_METHODS) {
      const op = pathItem[method] as Record<string, unknown> | undefined;
      if (!op) continue;

      const tags = (op["tags"] as string[]) ?? [];
      tags.forEach((t) => allTagsSet.add(t));

      const operationId = op["operationId"] as string | undefined;
      const syntheticId = operationId ?? synthesizeOperationId(method, pathStr);

      // Merge path-level + operation-level params
      const rawParams = [
        ...pathLevelParams,
        ...((op["parameters"] as Array<Record<string, unknown>>) ?? []),
      ];

      const parameters: ParameterMeta[] = rawParams.map((p) => {
        const resolved = isSwagger2
          ? resolveParam(p, raw)
          : resolveOas3Param(p, raw);
        const schema = (resolved["schema"] ?? {}) as Record<string, unknown>;
        const paramEnum =
          (resolved["enum"] as string[]) ?? (schema["enum"] as string[]) ?? undefined;
        const paramType =
          (resolved["type"] as string) ?? (schema["type"] as string) ?? undefined;

        return {
          name: String(resolved["name"] ?? ""),
          in: String(resolved["in"] ?? "query"),
          required: Boolean(resolved["required"]),
          type: paramType,
          enum: paramEnum,
          description: resolved["description"] as string | undefined,
        };
      });

      // Request body detection
      let hasRequestBody = false;
      let consumes = [...globalConsumes];
      let produces = [...globalProduces];

      if (isSwagger2) {
        // In Swagger 2.0 a body param means there's a request body
        hasRequestBody = parameters.some((p) => p.in === "body");
        if (op["consumes"]) consumes = op["consumes"] as string[];
        if (op["produces"]) produces = op["produces"] as string[];
      } else {
        hasRequestBody = !!op["requestBody"];
        if (op["requestBody"]) {
          const rb = op["requestBody"] as Record<string, unknown>;
          const content = rb["content"] as Record<string, unknown> | undefined;
          if (content) {
            consumes = Object.keys(content);
          }
        }
        // OAS3 responses content types
        const responses = op["responses"] as Record<string, Record<string, unknown>> | undefined;
        if (responses) {
          const responseProduces = new Set<string>();
          for (const resp of Object.values(responses)) {
            const content = resp["content"] as Record<string, unknown> | undefined;
            if (content) {
              Object.keys(content).forEach((ct) => responseProduces.add(ct));
            }
          }
          if (responseProduces.size > 0) {
            produces = [...responseProduces];
          }
        }
      }

      operations.push({
        method,
        path: pathStr,
        summary: (op["summary"] as string) ?? (op["description"] as string | undefined),
        tags,
        operationId,
        syntheticId,
        parameters: parameters.filter((p) => p.name.length > 0),
        hasRequestBody,
        consumes,
        produces,
      });
    }
  }

  // Entities (definitions in Swagger 2.0, components.schemas in OAS 3.x)
  const entities: EntityMeta[] = [];
  const definitionsSource = isSwagger2
    ? ((raw["definitions"] ?? {}) as Record<string, Record<string, unknown>>)
    : ((
        ((raw["components"] ?? {}) as Record<string, unknown>)["schemas"] ?? {}
      ) as Record<string, Record<string, unknown>>);

  for (const [refKey, schema] of Object.entries(definitionsSource)) {
    // Skip internal OData error types
    if (refKey.startsWith("odata.error")) continue;

    const shortName = refKey.includes(".")
      ? refKey.split(".").pop() ?? refKey
      : refKey;

    const properties = schema["properties"]
      ? Object.keys(schema["properties"] as Record<string, unknown>)
      : [];

    entities.push({
      name: shortName,
      refKey,
      properties,
    });
  }

  // Enums — collect from definitions/schemas AND from parameters
  const allEnums: EnumMeta[] = [];
  collectEnums(definitionsSource, "schemas", allEnums);
  collectEnums(paths, "paths", allEnums);
  const dedupedEnums = deduplicateEnums(allEnums);

  return {
    specName,
    title: String(info["title"] ?? specName),
    version: String(info["version"] ?? "1.0.0"),
    format,
    sapApiType,
    basePath,
    allTags: [...allTagsSet].sort(),
    operations,
    entities,
    enums: dedupedEnums,
  };
}

// ---------------------------------------------------------------------------
// Code Generation
// ---------------------------------------------------------------------------

function escapeString(s: unknown): string {
  const str = String(s ?? "");
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function generateMetadataCode(domainName: string, specs: SpecMetadata[]): string {
  const lines: string[] = [];

  lines.push("// =============================================================================");
  lines.push(`// AUTO-GENERATED — Do not edit manually.`);
  lines.push(`// Domain: ${domainName}`);
  lines.push(`// Generated at: ${new Date().toISOString()}`);
  lines.push(`// Source specs: ${specs.map((s) => s.specName).join(", ")}`);
  lines.push("// =============================================================================");
  lines.push("");

  // --- Spec index ---
  lines.push("/** Index of all specs in this domain. */");
  lines.push("export const SPECS = [");
  for (const spec of specs) {
    lines.push("  {");
    lines.push(`    specName: "${escapeString(spec.specName)}",`);
    lines.push(`    title: "${escapeString(spec.title)}",`);
    lines.push(`    version: "${escapeString(spec.version)}",`);
    lines.push(`    format: "${spec.format}",`);
    if (spec.sapApiType) {
      lines.push(`    sapApiType: "${escapeString(spec.sapApiType)}",`);
    }
    if (spec.basePath) {
      lines.push(`    basePath: "${escapeString(spec.basePath)}",`);
    }
    lines.push("  },");
  }
  lines.push("] as const;");
  lines.push("");

  // --- Tags ---
  const allTags = [...new Set(specs.flatMap((s) => s.allTags))].sort();
  lines.push("/** All unique tags across every spec in this domain. */");
  lines.push("export const TAGS = [");
  for (const tag of allTags) {
    lines.push(`  "${escapeString(tag)}",`);
  }
  lines.push("] as const;");
  lines.push("");
  lines.push("export type Tag = (typeof TAGS)[number];");
  lines.push("");

  // --- Entities ---
  const allEntities = specs.flatMap((s) => s.entities);
  lines.push("/** All entity/schema definitions across every spec in this domain. */");
  lines.push("export const ENTITIES = [");
  for (const entity of allEntities) {
    lines.push("  {");
    lines.push(`    name: "${escapeString(entity.name)}",`);
    lines.push(`    refKey: "${escapeString(entity.refKey)}",`);
    lines.push(`    properties: [${entity.properties.map((p) => `"${escapeString(p)}"`).join(", ")}],`);
    lines.push("  },");
  }
  lines.push("] as const;");
  lines.push("");

  // Entity name union
  const entityNames = [...new Set(allEntities.map((e) => e.name))];
  lines.push("/** Union of all entity names. */");
  lines.push("export const ENTITY_NAMES = [");
  for (const name of entityNames) {
    lines.push(`  "${escapeString(name)}",`);
  }
  lines.push("] as const;");
  lines.push("");
  lines.push("export type EntityName = (typeof ENTITY_NAMES)[number];");
  lines.push("");

  // --- Operations ---
  lines.push("/** All operations across every spec in this domain. */");
  lines.push("export const OPERATIONS = [");
  for (const spec of specs) {
    for (const op of spec.operations) {
      lines.push("  {");
      lines.push(`    specName: "${escapeString(spec.specName)}",`);
      lines.push(`    method: "${op.method}" as const,`);
      lines.push(`    path: "${escapeString(op.path)}",`);
      if (op.summary) {
        lines.push(`    summary: "${escapeString(op.summary)}",`);
      }
      lines.push(`    tags: [${op.tags.map((t) => `"${escapeString(t)}"`).join(", ")}],`);
      if (op.operationId) {
        lines.push(`    operationId: "${escapeString(op.operationId)}",`);
      }
      lines.push(`    syntheticId: "${escapeString(op.syntheticId)}",`);
      lines.push(`    hasRequestBody: ${op.hasRequestBody},`);

      // Parameters (only include non-empty)
      const significantParams = op.parameters.filter(
        (p) => p.in !== "header" || p.name === "X-CSRF-Token",
      );
      if (significantParams.length > 0) {
        lines.push("    parameters: [");
        for (const p of significantParams) {
          lines.push("      {");
          lines.push(`        name: "${escapeString(p.name)}",`);
          lines.push(`        in: "${p.in}" as const,`);
          lines.push(`        required: ${p.required},`);
          if (p.type) lines.push(`        type: "${escapeString(p.type)}",`);
          if (p.enum) {
            lines.push(
              `        enum: [${p.enum.map((v) => `"${escapeString(v)}"`).join(", ")}],`,
            );
          }
          lines.push("      },");
        }
        lines.push("    ],");
      } else {
        lines.push("    parameters: [],");
      }

      lines.push("  },");
    }
  }
  lines.push("] as const;");
  lines.push("");

  // Operation IDs
  const opIds = [
    ...new Set(
      specs
        .flatMap((s) => s.operations)
        .map((o) => o.operationId)
        .filter(Boolean),
    ),
  ] as string[];
  if (opIds.length > 0) {
    lines.push("/** All explicit operationId values from the specs. */");
    lines.push("export const OPERATION_IDS = [");
    for (const id of opIds) {
      lines.push(`  "${escapeString(id)}",`);
    }
    lines.push("] as const;");
    lines.push("");
    lines.push("export type OperationId = (typeof OPERATION_IDS)[number];");
    lines.push("");
  }

  // Synthetic IDs (always present)
  const synthIds = [
    ...new Set(specs.flatMap((s) => s.operations.map((o) => o.syntheticId))),
  ];
  lines.push("/** All synthetic operation IDs (method_path). */");
  lines.push("export const SYNTHETIC_OPERATION_IDS = [");
  for (const id of synthIds) {
    lines.push(`  "${escapeString(id)}",`);
  }
  lines.push("] as const;");
  lines.push("");
  lines.push("export type SyntheticOperationId = (typeof SYNTHETIC_OPERATION_IDS)[number];");
  lines.push("");

  // --- Enums ---
  const allEnums = specs.flatMap((s) =>
    s.enums.map((e) => ({ ...e, specName: s.specName })),
  );
  if (allEnums.length > 0) {
    lines.push("/** All enum value sets found in this domain's specs. */");
    lines.push("export const ENUMS = [");
    for (const e of allEnums) {
      lines.push("  {");
      lines.push(`    location: "${escapeString(e.location)}",`);
      lines.push(`    specName: "${escapeString(e.specName)}",`);
      lines.push(
        `    values: [${e.values.map((v) => `"${escapeString(v)}"`).join(", ")}],`,
      );
      lines.push("  },");
    }
    lines.push("] as const;");
    lines.push("");
  }

  // --- Type re-exports ---
  lines.push("// ---------------------------------------------------------------------------");
  lines.push("// Type re-exports — import generated OpenAPI types from the ./types/ directory");
  lines.push("// ---------------------------------------------------------------------------");
  for (const spec of specs) {
    lines.push(`// import type * as ${sanitizeIdentifier(spec.specName)}Types from "./types/${spec.specName}.js";`);
  }
  lines.push("");

  return lines.join("\n") + "\n";
}

function sanitizeIdentifier(s: string): string {
  return s
    .replace(/[^a-zA-Z0-9_$]/g, "_")
    .replace(/^(\d)/, "_$1");
}

function deduplicateOperationIds(doc: Record<string, unknown>): Record<string, unknown> {
  const cloned = JSON.parse(JSON.stringify(doc)) as Record<string, unknown>;
  const paths = (cloned["paths"] ?? {}) as Record<string, Record<string, unknown>>;
  const seen = new Map<string, number>();

  for (const pathItem of Object.values(paths)) {
    if (!pathItem || typeof pathItem !== "object") continue;
    for (const method of HTTP_METHODS) {
      const op = pathItem[method] as Record<string, unknown> | undefined;
      if (op && typeof op === "object" && typeof op["operationId"] === "string") {
        const id = op["operationId"] as string;
        const count = seen.get(id) ?? 0;
        if (count > 0) {
          op["operationId"] = `${id}_${count + 1}`;
        }
        seen.set(id, count + 1);
      }
    }
  }
  return cloned;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const startTime = Date.now();
  let totalSpecs = 0;
  let totalOps = 0;
  let totalEntities = 0;

  process.stderr.write("🔧 SAP Integration Suite — Type & Metadata Generator\n");
  process.stderr.write(`   Specs directory: ${SPECS_DIR}\n`);
  process.stderr.write(`   Output directory: ${GENERATED_DIR}\n\n`);

  for (const domainDir of DOMAIN_DIRS) {
    const specDir = join(SPECS_DIR, domainDir);
    const outDir = join(GENERATED_DIR, domainDir);
    const typesDir = join(outDir, "types");

    // Ensure output directories exist
    await mkdir(typesDir, { recursive: true });

    // Read all YAML files in this domain's spec directory
    let files: string[];
    try {
      files = (await readdir(specDir)).filter(
        (f) => extname(f) === ".yaml" || extname(f) === ".yml",
      );
    } catch {
      process.stderr.write(`   ⚠  No specs directory for ${domainDir} — skipping.\n`);
      continue;
    }

    if (files.length === 0) {
      process.stderr.write(`   ⚠  No YAML files in ${domainDir} — skipping.\n`);
      continue;
    }

    process.stderr.write(`📦 ${domainDir} (${files.length} spec(s))\n`);

    const specMetadatas: SpecMetadata[] = [];

    for (const file of files.sort()) {
      const specName = basename(file, extname(file));
      const specPath = join(specDir, file);
      const rawYaml = await readFile(specPath, "utf-8");
      const parsed = YAML.parse(rawYaml) as Record<string, unknown>;

      // 1. Generate TypeScript types via openapi-typescript
      process.stderr.write(`   📝 ${specName} → types...`);
      try {
        let openapiDoc: any;
        const isSwagger2 =
          typeof parsed.swagger === "string" && parsed.swagger.startsWith("2");

        if (isSwagger2) {
          const converted = await swagger2openapi.convertObj(parsed as any, {
            patch: true,
            warnOnly: true,
          });
          openapiDoc = converted.openapi;
        } else {
          openapiDoc = parsed;
        }

        const docForTypes = deduplicateOperationIds(openapiDoc);
        const ast = await openapiTS(docForTypes as any, {
          exportType: true,
          immutable: true,
        });
        const tsOutput = astToString(ast);
        const typesFile = join(typesDir, `${specName}.ts`);
        await writeFile(typesFile, tsOutput, "utf-8");
        process.stderr.write(" ✅");
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        process.stderr.write(` ❌ (${msg})`);
      }

      // 2. Extract metadata
      process.stderr.write(" → metadata...");
      const metadata = extractMetadata(specName, parsed);
      specMetadatas.push(metadata);

      totalOps += metadata.operations.length;
      totalEntities += metadata.entities.length;
      totalSpecs++;

      process.stderr.write(
        ` ✅ (${metadata.operations.length} ops, ${metadata.entities.length} entities)\n`,
      );
    }

    // 3. Write consolidated metadata.ts for this domain
    const metadataCode = generateMetadataCode(domainDir, specMetadatas);
    const metadataPath = join(outDir, "metadata.ts");
    await writeFile(metadataPath, metadataCode, "utf-8");
    process.stderr.write(`   📄 metadata.ts written\n\n`);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  process.stderr.write(`\n✅ Done in ${elapsed}s\n`);
  process.stderr.write(
    `   ${totalSpecs} spec(s), ${totalOps} operation(s), ${totalEntities} entit(ies)\n`,
  );
}

main().catch((err) => {
  process.stderr.write(`\n❌ Fatal error: ${err instanceof Error ? err.stack : String(err)}\n`);
  process.exit(1);
});
