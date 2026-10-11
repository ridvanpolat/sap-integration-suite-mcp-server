import { z } from "zod";
import "dotenv/config";

// ---------------------------------------------------------------------------
// Log-level enum
// ---------------------------------------------------------------------------
const LogLevel = z.enum(["debug", "info", "warn", "error"]).default("info");

// ---------------------------------------------------------------------------
// Reusable OAuth2 credential block
// All fields are optional — a domain is only activated if its _URL is present.
// ---------------------------------------------------------------------------
const oauthBlock = (prefix: string) =>
  z.object({
    url: z.string().url().optional().describe(`${prefix} base API URL`),
    tokenUrl: z
      .string()
      .url()
      .optional()
      .describe(`${prefix} OAuth2 token endpoint`),
    clientId: z.string().optional().describe(`${prefix} OAuth2 client ID`),
    clientSecret: z
      .string()
      .optional()
      .describe(`${prefix} OAuth2 client secret`),
  });

// ---------------------------------------------------------------------------
// Per-domain Zod schemas
// ---------------------------------------------------------------------------
const CpiEnvSchema = oauthBlock("Cloud Integration");
const ApimEnvSchema = oauthBlock("API Management");
const EmEnvSchema = oauthBlock("Event Mesh");
const IaEnvSchema = oauthBlock("Integration Assessment");
const EicEnvSchema = oauthBlock("Edge Integration Cell");

const OcEnvSchema = z.object({
  url: z.string().url().optional().describe("Open Connectors base API URL"),
  userSecret: z
    .string()
    .optional()
    .describe("Open Connectors User secret"),
  orgSecret: z
    .string()
    .optional()
    .describe("Open Connectors Organization secret"),
});

// ---------------------------------------------------------------------------
// Composite schema — validated once at startup
// ---------------------------------------------------------------------------
const EnvSchema = z.object({
  // Cloud Integration
  cpi: CpiEnvSchema,
  // API Management
  apim: ApimEnvSchema,
  // Event Mesh
  em: EmEnvSchema,
  // Integration Assessment
  ia: IaEnvSchema,
  // Open Connectors
  oc: OcEnvSchema,
  // Edge Integration Cell
  eic: EicEnvSchema,
  // Global
  maxResults: z.preprocess(
    (val) => (val !== undefined && val !== "" ? Number(val) : undefined),
    z.number().int().positive().default(50),
  ),
  logLevel: LogLevel,
});

export type EnvConfig = z.infer<typeof EnvSchema>;

// ---------------------------------------------------------------------------
// Map raw process.env → structured input for the schema
// ---------------------------------------------------------------------------
function mapProcessEnv(): z.input<typeof EnvSchema> {
  const e = process.env;
  return {
    cpi: {
      url: e["SAP_CPI_URL"],
      tokenUrl: e["SAP_CPI_TOKEN_URL"],
      clientId: e["SAP_CPI_CLIENT_ID"],
      clientSecret: e["SAP_CPI_CLIENT_SECRET"],
    },
    apim: {
      url: e["SAP_APIM_URL"],
      tokenUrl: e["SAP_APIM_TOKEN_URL"],
      clientId: e["SAP_APIM_CLIENT_ID"],
      clientSecret: e["SAP_APIM_CLIENT_SECRET"],
    },
    em: {
      url: e["SAP_EM_URL"],
      tokenUrl: e["SAP_EM_TOKEN_URL"],
      clientId: e["SAP_EM_CLIENT_ID"],
      clientSecret: e["SAP_EM_CLIENT_SECRET"],
    },
    ia: {
      url: e["SAP_IA_URL"],
      tokenUrl: e["SAP_IA_TOKEN_URL"],
      clientId: e["SAP_IA_CLIENT_ID"],
      clientSecret: e["SAP_IA_CLIENT_SECRET"],
    },
    oc: {
      url: e["SAP_OC_URL"],
      userSecret: e["SAP_OC_USER_SECRET"],
      orgSecret: e["SAP_OC_ORG_SECRET"],
    },
    eic: {
      url: e["SAP_EIC_URL"],
      tokenUrl: e["SAP_EIC_TOKEN_URL"],
      clientId: e["SAP_EIC_CLIENT_ID"],
      clientSecret: e["SAP_EIC_CLIENT_SECRET"],
    },
    maxResults: e["SAP_MAX_RESULTS"] !== undefined ? e["SAP_MAX_RESULTS"] : undefined,
    logLevel: (e["LOG_LEVEL"] as "debug" | "info" | "warn" | "error" | undefined),
  };
}

// ---------------------------------------------------------------------------
// Parse & freeze config — exported singleton
// ---------------------------------------------------------------------------
let _config: EnvConfig | undefined;

/**
 * Lazily parse and validate the environment.
 * Throws a `ZodError` with human-readable messages on startup if any
 * required variables are malformed.
 */
export function loadEnvConfig(): EnvConfig {
  if (_config) return _config;

  const result = EnvSchema.safeParse(mapProcessEnv());

  if (!result.success) {
    const formatted = result.error.issues
      .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Environment validation failed:\n${formatted}\n\nSee .env.example for the required variables.`,
    );
  }

  _config = Object.freeze(result.data);
  return _config;
}

/**
 * Returns the list of domain keys whose base URL is configured (i.e. active).
 */
export function getActiveDomains(config: EnvConfig): string[] {
  const domainKeys: Array<{ key: string; url: string | undefined }> = [
    { key: "cloud-integration", url: config.cpi.url },
    { key: "api-management", url: config.apim.url },
    { key: "event-mesh", url: config.em.url },
    { key: "integration-assessment", url: config.ia.url },
    { key: "open-connectors", url: config.oc.url },
    { key: "edge-integration-cell", url: config.eic.url },
  ];

  return domainKeys.filter((d) => d.url !== undefined).map((d) => d.key);
}
