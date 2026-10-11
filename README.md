# SAP Integration Suite MCP Server

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-green.svg)](https://nodejs.org/)
[![Protocol](https://img.shields.io/badge/MCP-1.12.1-orange.svg)](https://modelcontextprotocol.io/)
[![Vitest](https://img.shields.io/badge/Tests-115%2F115%20Passed-brightgreen.svg)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-Apache--2.0-yellow.svg)](LICENSE)

An enterprise-grade, production-ready **Model Context Protocol (MCP)** server for the **SAP Integration Suite**. Built on the official `@modelcontextprotocol/sdk` using the higher-level `McpServer` abstraction and `StdioServerTransport`, this server enables AI agents (such as Claude Desktop, Cursor IDE, VS Code, and Zed) to securely inspect, monitor, diagnose, and manage mission-critical SAP integration landscapes.

---

## Table of Contents

- [Architectural Overview](#architectural-overview)
- [Supported SAP Domains](#supported-sap-domains)
- [Enterprise Resilience & Security Core](#enterprise-resilience--security-core)
- [Environment Configuration & Strict Namespacing](#environment-configuration--strict-namespacing)
  - [Domain Activation Mechanism](#domain-activation-mechanism)
  - [Environment Variables Reference](#environment-variables-reference)
- [Semantic Tools, Resources & Prompts Matrix](#semantic-tools-resources--prompts-matrix)
  - [1. Cloud Integration (CPI)](#1-cloud-integration-cpi)
  - [2. API Management (APIM)](#2-api-management-apim)
  - [3. Event Mesh](#3-event-mesh)
  - [4. Integration Assessment (IA)](#4-integration-assessment-ia)
  - [5. Open Connectors (OC)](#5-open-connectors-oc)
  - [6. Edge Integration Cell (EIC)](#6-edge-integration-cell-eic)
- [Getting Started & Build Commands](#getting-started--build-commands)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Local Development & Typecheck](#local-development--typecheck)
  - [Running the Test Suite](#running-the-test-suite)
  - [Building for Production](#building-for-production)
  - [Generating Types & Metadata from OpenAPI Specs](#generating-types--metadata-from-openapi-specs)
- [MCP Client Configuration Guide](#mcp-client-configuration-guide)
  - [Claude Desktop](#claude-desktop)
  - [Cursor IDE](#cursor-ide)
  - [VS Code (Cline / Roo Code / Claude Dev)](#vs-code-cline--roo-code--claude-dev)
  - [Zed Editor](#zed-editor)
- [Security & Compliance](#security--compliance)
- [License](#license)

---

## Architectural Overview

Connecting large language models directly to heterogeneous enterprise systems presents significant challenges: complex OData payloads, multiple authentication protocols, stateful CSRF token handshakes, context window limits, and transport pollution.

The **SAP Integration Suite MCP Server** acts as an intelligent intermediary and unified protocol gateway:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   AI Clients (Claude, Cursor, Zed, VS Code)            │
└───────────────────────────────────▲────────────────────────────────────┘
                                    │ Model Context Protocol (STDIO)
┌───────────────────────────────────▼────────────────────────────────────┐
│                  SAP Integration Suite MCP Server                      │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ Dynamic Registry & Selective Domain Loader                     │   │
│   └──────┬────────────┬─────────────┬─────────────┬───────────┬────┘   │
│          │            │             │             │           │        │
│          ▼            ▼             ▼             ▼           ▼        │
│      ┌──────┐     ┌──────┐      ┌───────┐     ┌───────┐   ┌───────┐    │
│      │ CPI  │     │ APIM │      │  EM   │     │  IA   │   │  OC   │... │
│      └──────┘     └──────┘      └───────┘     └───────┘   └───────┘    │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ Enterprise Core (ApiClient Factory)                           │   │
│   │  • OAuth2 Token Cache & Automatic Refresh                      │   │
│   │  • Automatic X-CSRF-Token Handshake & Cookie Persistence       │   │
│   │  • OData v2/v4 JSON Enforcement & Response Unwrapping          │   │
│   │  • Context Window Protection (Result Truncation & hasMore)     │   │
│   │  • Zero-STDIO Pollution (Server Logging Protocol + Stderr)    │   │
│   │  • Sensitive Header Scrubbing (Authorization, CSRF, Cookies)   │   │
│   └────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────▲────────────────────────────────────┘
                                    │ HTTPS / REST / OData
┌───────────────────────────────────▼────────────────────────────────────┐
│                       SAP BTP Integration Suite                         │
│  [Cloud Integration]  [API Management]  [Event Mesh]                   │
│  [Integration Assessment]  [Open Connectors]  [Edge Integration Cell]  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Supported SAP Domains

The server unifies access across six major SAP Integration Suite components:

1. **Cloud Integration (CPI)**: Full lifecycle management for Cloud Integration tenants. Query integration packages, explore designtime artifacts (iFlows, value mappings, script collections), deploy/undeploy runtime artifacts, monitor Message Processing Logs (MPL) and error runs, query runtime data stores and variables, audit keystores and security material, and manage B2B Partner Directory entries.
2. **API Management (APIM)**: Complete API governance across API Portal and Developer Portal. Inspect, configure, and manage API Proxies, routing targets, policies, and virtual hosts; package APIs into published API Products; configure backend API Provider destinations and SSL certificates; manage Key-Value Maps (KVM) for environment configurations; track developer applications and subscriptions; and analyze traffic metrics and error rates.
3. **Event Mesh (SAP Event Mesh / Enterprise Messaging)**: High-performance asynchronous event-driven architecture. Provision, monitor, purge, and manage message queues; bind and subscribe queues to topic filters; publish synchronous messages and CloudEvents; consume queue payloads with auto-acknowledgment; and manage webhook push subscriptions and handshake validations.
4. **Integration Assessment (IA)**: Architectural governance based on the SAP Integration Solution Advisory Methodology (ISA-M). Discover and document landscape business applications, technology instances, and architectural domains; evaluate integration patterns, styles, and recommendation degrees; initiate and track interface requests; and export/import tenant architecture content.
5. **Open Connectors (OC)**: Out-of-the-box connectivity to over 170 third-party SaaS systems (CRM, ERP, Helpdesk, Cloud Storage, Finance). Discover connectors in the catalog; manage authenticated connector instances and validate live connectivity; design Virtual Data Resources (VDR / Common Resources) and map vendor field transformations; manage workflow formulas and triggers; and inspect background polling jobs and audit logs.
6. **Edge Integration Cell (EIC)**: Hybrid on-premise and private cloud runtime deployed within customer-managed Kubernetes environments. Monitor microservice components and pod health statuses, restart counts, events, and metrics; configure diagnostic and maintenance jobs; inspect local Message Processing Logs (MPLs) and persisted message stores; manage the local Solace/JMS message broker, queues, retry, and move operations; manage edge data stores and variables; and govern local Partner Directory entities.

---

## Enterprise Resilience & Security Core

The server addresses common pitfalls encountered when interfacing AI clients with enterprise SAP services:

- **Strict Stdio Cleanliness**: When operating over `StdioServerTransport`, any accidental `console.log` or `console.error` will corrupt JSON-RPC frames and crash the MCP connection. The server enforces zero console output: all diagnostic logs are sent using the MCP server logging protocol (`sendLoggingMessage`), with unhandled startup exceptions safely routed to `stderr`.
- **Transparent OAuth2 Token Lifecycle**: Implements an in-memory OAuth2 bearer token cache per domain. Tokens are validated, cached, and automatically refreshed with an eager 60-second buffer before expiration.
- **Automated CSRF Token & Cookie Handshake**: Mutating HTTP requests (`POST`, `PUT`, `PATCH`, `DELETE`) automatically trigger an `X-CSRF-Token: Fetch` handshake against the domain's service endpoint via `HEAD` or `GET`. The resulting `X-CSRF-Token` and session cookies are persisted in memory and attached to subsequent state-changing operations.
- **OData Quirks & JSON Enforcement**: Automatically forces `Accept: application/json` on all requests to prevent SAP services from returning XML. Automatically unwraps nested OData responses across versions (`d.results` and `d` for OData v2, `value` for OData v4).
- **Context Window Protection**: Massive payloads can overwhelm LLM token limits and degrade model reasoning. The server automatically caps array responses to a configurable threshold (`SAP_MAX_RESULTS`, default `50`), appending a `hasMore: true` flag and total record counts to signal pagination to the LLM.
- **Sanitized Logging**: Request and response log messages automatically redact sensitive headers, including `Authorization`, `Cookie`, `Set-Cookie`, `X-CSRF-Token`, and API secrets.


---

## Environment Configuration & Strict Namespacing

### Domain Activation Mechanism

To keep memory usage minimal and prevent prompt bloat in LLM contexts, the server uses a **Dynamic Registry Pattern**:

- **A domain is only registered if its specific `_URL` environment variable is defined.**
- If you only need Cloud Integration and API Management, you only supply `SAP_CPI_URL` and `SAP_APIM_URL`. The other four domains remain dormant, and their tools will not be exposed to the LLM.
- If no domain URLs are provided, the server starts in idle mode and alerts the client via MCP logging.

### Environment Variables Reference

Copy `.env.example` to `.env` in the root of the project to get started:

```bash
cp .env.example .env
```

| Environment Variable | Description | Example / Format |
|---|---|---|
| **Cloud Integration (CPI)** | | |
| `SAP_CPI_URL` | Cloud Integration base API URL | `https://<tenant>.it-cpi018.cfapps.<region>.hana.ondemand.com/api/v1` |
| `SAP_CPI_TOKEN_URL` | OAuth2 Token Endpoint | `https://<tenant>.authentication.<region>.hana.ondemand.com/oauth/token` |
| `SAP_CPI_CLIENT_ID` | OAuth2 Client ID | `sb-clone-cpi!b1234...` |
| `SAP_CPI_CLIENT_SECRET` | OAuth2 Client Secret | `secret...` |
| **API Management (APIM)** | | |
| `SAP_APIM_URL` | API Management API Portal base URL | `https://<tenant>.apimanagement.<region>.hana.ondemand.com/apiportal/api/1.0` |
| `SAP_APIM_TOKEN_URL` | OAuth2 Token Endpoint | `https://<tenant>.authentication.<region>.hana.ondemand.com/oauth/token` |
| `SAP_APIM_CLIENT_ID` | OAuth2 Client ID | `sb-clone-apim!b1234...` |
| `SAP_APIM_CLIENT_SECRET`| OAuth2 Client Secret | `secret...` |
| **Event Mesh** | | |
| `SAP_EM_URL` | Event Mesh Management / REST URL | `https://enterprise-messaging-pubsub.cfapps.<region>.hana.ondemand.com` |
| `SAP_EM_TOKEN_URL` | OAuth2 Token Endpoint | `https://<tenant>.authentication.<region>.hana.ondemand.com/oauth/token` |
| `SAP_EM_CLIENT_ID` | OAuth2 Client ID | `sb-clone-em!b1234...` |
| `SAP_EM_CLIENT_SECRET` | OAuth2 Client Secret | `secret...` |
| **Integration Assessment (IA)** | | |
| `SAP_IA_URL` | Integration Assessment base API URL | `https://<tenant>.integrationsuite.<region>.hana.ondemand.com/api/v1` |
| `SAP_IA_TOKEN_URL` | OAuth2 Token Endpoint | `https://<tenant>.authentication.<region>.hana.ondemand.com/oauth/token` |
| `SAP_IA_CLIENT_ID` | OAuth2 Client ID | `sb-clone-ia!b1234...` |
| `SAP_IA_CLIENT_SECRET` | OAuth2 Client Secret | `secret...` |
| **Open Connectors (OC)** | | |
| `SAP_OC_URL` | Open Connectors Elements v2 API URL | `https://api.openconnectors.ext.<region>.hana.ondemand.com/elements/api-v2` |
| `SAP_OC_USER_SECRET` | User Secret (Header: `User <secret>`) | `usr_secret_abc...` |
| `SAP_OC_ORG_SECRET` | Organization Secret (Header: `Organization <secret>`) | `org_secret_xyz...` |
| **Edge Integration Cell (EIC)** | | |
| `SAP_EIC_URL` | Edge Integration Cell local / cluster URL | `https://<edge-node-host>/api/v1` |
| `SAP_EIC_TOKEN_URL` | OAuth2 Token Endpoint | `https://<tenant>.authentication.<region>.hana.ondemand.com/oauth/token` |
| `SAP_EIC_CLIENT_ID` | OAuth2 Client ID | `sb-clone-eic!b1234...` |
| `SAP_EIC_CLIENT_SECRET`| OAuth2 Client Secret | `secret...` |
| **Global Settings** | | |
| `SAP_MAX_RESULTS` | Maximum records returned per array query (Default: `50`) | `50` |
| `LOG_LEVEL` | Logging verbosity: `debug`, `info`, `warn`, `error` (Default: `info`) | `info` |


---

## Semantic Tools, Resources & Prompts Matrix

Instead of creating hundreds of brittle 1:1 endpoint mappings, the server provides **consolidated semantic tools** powered by strict Zod validation schemas, along with direct URI resources and guided prompt workflows.

### 1. Cloud Integration (CPI)

#### Tools
- `sap_cpi_query_entities`: Generic OData v2 query engine supporting collections: `IntegrationPackages`, `IntegrationDesigntimeArtifacts`, `IntegrationRuntimeArtifacts`, `MessageProcessingLogs`, `DataStores`, `DataStoreEntries`, `Variables`, `KeystoreEntries`, `UserCredentials`, `CertificateUserMappings`, `Partners`, `AuthorizedUsers`, `AlternativePartners`. Supports `$filter`, `$select`, `$orderby`, `$expand`, `$top`, and `$skip`.
- `sap_cpi_get_entity`: Retrieve a single CPI entity by ID or key predicate.
- `sap_cpi_manage_package`: Inspect, create, update, or delete Integration Packages.
- `sap_cpi_manage_designtime_artifact`: Manage iFlows, value mappings, and script collections (get details, list configurations, deploy artifact).
- `sap_cpi_manage_runtime_artifact`: Query worker node deployment status, inspect runtime errors, or undeploy artifacts.
- `sap_cpi_get_message_processing_logs`: Query MPLs with filtering by status (`COMPLETED`, `FAILED`, `PROCESSING`), time range, or fetch error information, run steps, and attachments.
- `sap_cpi_manage_data_store`: Query data stores, inspect entries, read message payloads, and manage variables.
- `sap_cpi_manage_security_material`: Inspect keystore entries, view certificate expiration dates, and list deployed credentials.
- `sap_cpi_manage_partner_directory`: CRUD operations for B2B Partners, Authorized Users, and Alternative Partners.

#### Resources
- `sap://cpi/packages`: Summary catalog of all Integration Packages.
- `sap://cpi/runtime-artifacts`: Currently deployed integration artifacts and status.
- `sap://cpi/failed-messages`: Recent failed message processing logs.

#### Prompts
- `cpi-troubleshoot-failed-messages`: Root-cause diagnosis workflow for failed executions and stack traces.
- `cpi-audit-security-artifacts`: Audit keystore certificates, credentials, and user mappings.
- `cpi-inspect-package`: Inspect package contents and cross-reference active runtime deployments.

---

### 2. API Management (APIM)

#### Tools
- `sap_apim_query_entities`: Query collections: `APIProxies`, `APIProducts`, `APIProviders`, `Applications`, `Developers`, `KeyMapEntries`, `CertificateStores`, `VirtualHosts`, `Subscriptions`, `RatePlans`.
- `sap_apim_manage_proxy`: Inspect, configure, list policies, or delete API Proxies.
- `sap_apim_manage_product`: Manage API Products, bundle proxies, set rate limits and quotas, publish, or delete.
- `sap_apim_manage_provider`: Manage backend API Provider connectivity destinations, hosts, ports, and SSL settings.
- `sap_apim_manage_key_value_map`: Inspect and manage Key-Value Maps (KVM) for configurations and environment parameters.
- `sap_apim_manage_application`: Inspect developer apps, retrieve API keys/credentials, and list subscriptions.
- `sap_apim_get_analytics`: Retrieve API traffic volumes, response latency, and HTTP error rate metrics.
- `sap_apim_manage_certificate_store`: Inspect Keystores, Truststores, and Certificates.

#### Resources
- `sap://apim/proxies`: List of registered API Proxies.
- `sap://apim/products`: List of API Products and publication statuses.
- `sap://apim/providers`: Backend API Provider destinations.

#### Prompts
- `apim-troubleshoot-proxy`: Troubleshoot proxy latency bottlenecks and policy execution errors.
- `apim-audit-api-products`: Audit publication states, quotas, and assigned proxies.
- `apim-inspect-provider`: Validate backend destination connectivity and SSL security.

---

### 3. Event Mesh

#### Tools
- `sap_em_manage_queue`: List queues, inspect queue capacity/unacknowledged message counts, create, update, purge, or delete queues.
- `sap_em_manage_queue_subscription`: Manage topic subscriptions for queues (subscribe, unsubscribe, list).
- `sap_em_publish_message`: Publish synchronous messages or CloudEvents to topics or queues.
- `sap_em_consume_message`: Consume messages from a queue with automatic acknowledgment.
- `sap_em_manage_webhook_subscription`: Manage webhook push subscriptions, check handshake status, pause, or resume.

#### Resources
- `sap://em/queues`: Overview of queues, capacity, and message backlog.
- `sap://em/subscriptions`: Active webhook push subscriptions and handshake statuses.

#### Prompts
- `em-troubleshoot-queue`: Investigate queue message spikes, backlog, and dead-letter queues.
- `em-audit-webhook-subscriptions`: Audit webhook subscription delivery health and handshake verification.


---

### 4. Integration Assessment (IA)

#### Tools
- `sap_ia_query_entities`: Query ISA-M architecture entities: `Application`, `ApplicationInstance`, `Vendor`, `Technology`, `TechnologyDomain`, `TechnologyInstance`, `TechnologyKeyCharacteristic`, `TechnologyStyle`, `Domain`, `Style`, `IntegrationPattern`, `DeploymentModel`, `DomainDetermination`, `UseCasePattern`, `KeyCharacteristicRecommendationDegree`, `KeyCharacteristicGroup`, `KeyCharacteristic`, `KeyCharacteristicValue`, `MessageFlow`, `IntegrationFlow`, `IntegrationFlowMessageFlow`, `Request`, `RequestLineItem`, `RequestLineItemTechnologyInstanceDecision`.
- `sap_ia_get_entity`: Retrieve specific architecture entity by ID.
- `sap_ia_manage_application`: Manage applications, instances, and vendors.
- `sap_ia_manage_technology`: Manage integration technologies, instances, and architectural links.
- `sap_ia_manage_request`: Manage architecture assessment requests, line items, and create interface requests.
- `sap_ia_manage_characteristic`: Manage evaluation criteria, characteristic groups, and values.
- `sap_ia_manage_content`: Export complete tenant content or import content packages.

#### Resources
- `sap://ia/applications`: Architecture catalog of business applications.
- `sap://ia/technologies`: Catalog of registered integration technologies and instances.
- `sap://ia/requests`: Active integration assessment requests.
- `sap://ia/patterns`: Supported ISA-M integration patterns.

#### Prompts
- `ia-assess-interface-request`: Guided evaluation of interface requirements against ISA-M policies.
- `ia-audit-technologies`: Audit registered technologies and recommendation scoring.
- `ia-review-landscape-message-flows`: Verify landscape message flows against governance principles.

---

### 5. Open Connectors (OC)

#### Tools
- `sap_oc_manage_connector`: Discover connectors in the catalog, inspect configuration parameters, authentication types, supported objects, and OpenAPI docs.
- `sap_oc_manage_instance`: Manage connector instances (create, update, delete, disable, and perform live ping validation).
- `sap_oc_manage_vdr`: Manage Virtual Data Resources (VDR / Common Resources) and vendor transformations.
- `sap_oc_manage_formula`: Manage workflow formulas, triggers, instances, and execution logs.
- `sap_oc_manage_hub`: Explore functional connector hubs (CRM, Finance, Helpdesk, Documents).
- `sap_oc_manage_job`: Inspect scheduled background jobs and detect suspended event polling.
- `sap_oc_get_usage_analytics`: Query usage records, execution latency, error counts, and security audit logs.

#### Resources
- `sap://oc/elements`: Available connectors catalog.
- `sap://oc/instances`: Configured connector instances and health.
- `sap://oc/vdrs`: Canonical Virtual Data Resources.
- `sap://oc/hubs`: Functional category hubs.

#### Prompts
- `oc-inspect-connector`: Guided exploration of connector parameters and supported objects.
- `oc-troubleshoot-instance`: Diagnose instance health and suspended polling jobs.
- `oc-design-vdr`: Step-by-step guidance for designing canonical models and field transformations.

---

### 6. Edge Integration Cell (EIC)

#### Tools
- `sap_eic_query_entities`: Query collections: `Components`, `Jobs`, `MessageProcessingLogs`, `MessagingQueues`, `DataStores`, `DataStoreEntries`, `Variables`, `AlternativePartners`, `AuthorizedUsers`, `BinaryParameters`, `StringParameters`, `Partners`.
- `sap_eic_manage_component`: Inspect microservice components, pods, events, metrics, runtime parameters, and trigger restarts.
- `sap_eic_manage_job`: Inspect, create, update, or delete background and diagnostic jobs and schedules.
- `sap_eic_get_message_processing_logs`: Query local Edge MPLs, error stacks, headers, and attachments.
- `sap_eic_manage_message_store`: Inspect persisted message store entries, payloads (`$value`), and attachments.
- `sap_eic_manage_messaging_queues`: Monitor JMS/Solace broker status, queues, messages, payloads, and execute message move or retry actions.
- `sap_eic_manage_data_stores`: Inspect edge data stores, entries, variables, and download stored payloads.
- `sap_eic_manage_partner_directory`: Manage B2B Partner Directory entities and string/binary parameters.

#### Resources
- `sap://eic/components`: Overview of Edge microservice components and pods.
- `sap://eic/jobs`: Overview of background and maintenance jobs.
- `sap://eic/queues`: Overview of local JMS/Solace messaging queues.
- `sap://eic/failed-messages`: Recent local failed message processing logs.
- `sap://eic/data-stores`: Overview of local edge data stores.

#### Prompts
- `eic-troubleshoot-component`: Diagnose unhealthy pods, restart loops, and container events.
- `eic-troubleshoot-failed-messages`: Root-cause analysis for local edge failures and queue redelivery.
- `eic-audit-edge-node`: Full operational health audit of an edge node.


---

## Getting Started & Build Commands

### Prerequisites

- **Node.js**: Version `20.0.0` or higher
- **npm**: Version `10.0.0` or higher

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ridvanpolat/sap-integration-suite-mcp-server.git
cd sap-integration-suite-mcp-server
npm install
```

### Local Development & Typecheck

Run the server directly with TypeScript execution (`tsx`):

```bash
# Start server in development mode
npm run dev

# Perform static type checking
npm run lint
```

### Running the Test Suite

The test suite contains **115 automated unit and integration tests** built with Vitest and MSW (Mock Service Worker), providing complete coverage of OAuth2 flows, CSRF token handshakes, pagination, payload truncation, and error states without making external network calls:

```bash
# Run test suite once
npm test

# Run tests in watch mode
npm run test:watch
```

Test coverage summary:
- `tests/core/apiClient.test.ts` (26 tests)
- `tests/domains/CloudIntegration.test.ts` (15 tests)
- `tests/domains/APIManagement.test.ts` (13 tests)
- `tests/domains/EventMesh.test.ts` (12 tests)
- `tests/domains/IntegrationAssessment.test.ts` (19 tests)
- `tests/domains/OpenConnectors.test.ts` (14 tests)
- `tests/domains/EdgeIntegrationCell.test.ts` (16 tests)

### Building for Production

Compile TypeScript to JavaScript in the `dist` directory:

```bash
npm run build
```

Verify the production build runs cleanly:

```bash
node dist/index.js
```

### Generating Types & Metadata from OpenAPI Specs

If you update the OpenAPI/Swagger YAML specifications in the `specs/` directory, regenerate the TypeScript types and metadata constants:

```bash
npm run generate
```

This updates `src/generated/{Domain}/metadata.ts` with operations, entities, and enums used for strict runtime validation.


---

## MCP Client Configuration Guide

Below are production configuration snippets for connecting the server to standard MCP clients. Replace `/path/to/sap-integration-suite-mcp-server` with your absolute repository path.

### Claude Desktop

Edit your Claude Desktop configuration file:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "sap-integration-suite": {
      "command": "node",
      "args": [
        "/path/to/sap-integration-suite-mcp-server/dist/index.js"
      ],
      "env": {
        "SAP_CPI_URL": "https://<tenant>.it-cpi018.cfapps.<region>.hana.ondemand.com/api/v1",
        "SAP_CPI_TOKEN_URL": "https://<tenant>.authentication.<region>.hana.ondemand.com/oauth/token",
        "SAP_CPI_CLIENT_ID": "sb-cpi-client",
        "SAP_CPI_CLIENT_SECRET": "cpi-secret",

        "SAP_APIM_URL": "https://<tenant>.apimanagement.<region>.hana.ondemand.com/apiportal/api/1.0",
        "SAP_APIM_TOKEN_URL": "https://<tenant>.authentication.<region>.hana.ondemand.com/oauth/token",
        "SAP_APIM_CLIENT_ID": "sb-apim-client",
        "SAP_APIM_CLIENT_SECRET": "apim-secret",

        "SAP_MAX_RESULTS": "50",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

> **Tip**: If you prefer running without pre-compiling, use `npx tsx` instead of `node`:
> ```json
> "command": "npx",
> "args": ["tsx", "/path/to/sap-integration-suite-mcp-server/src/index.ts"]
> ```

### Cursor IDE

Create or update `.cursor/mcp.json` in your workspace or global Cursor settings:

```json
{
  "mcpServers": {
    "sap-integration-suite": {
      "command": "node",
      "args": [
        "/path/to/sap-integration-suite-mcp-server/dist/index.js"
      ],
      "env": {
        "SAP_CPI_URL": "https://<tenant>.it-cpi018.cfapps.<region>.hana.ondemand.com/api/v1",
        "SAP_CPI_TOKEN_URL": "https://<tenant>.authentication.<region>.hana.ondemand.com/oauth/token",
        "SAP_CPI_CLIENT_ID": "your-client-id",
        "SAP_CPI_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

### VS Code (Cline / Roo Code / Claude Dev)

In VS Code with the Cline extension, add the server configuration to your MCP settings file (`claude_mcp_settings.json`):

```json
{
  "mcpServers": {
    "sap-integration-suite": {
      "command": "node",
      "args": [
        "/path/to/sap-integration-suite-mcp-server/dist/index.js"
      ],
      "env": {
        "SAP_CPI_URL": "https://<tenant>.it-cpi018.cfapps.<region>.hana.ondemand.com/api/v1",
        "SAP_CPI_TOKEN_URL": "https://<tenant>.authentication.<region>.hana.ondemand.com/oauth/token",
        "SAP_CPI_CLIENT_ID": "your-client-id",
        "SAP_CPI_CLIENT_SECRET": "your-client-secret",
        "SAP_EM_URL": "https://enterprise-messaging-pubsub.cfapps.<region>.hana.ondemand.com",
        "SAP_EM_TOKEN_URL": "https://<tenant>.authentication.<region>.hana.ondemand.com/oauth/token",
        "SAP_EM_CLIENT_ID": "your-em-id",
        "SAP_EM_CLIENT_SECRET": "your-em-secret"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Zed Editor

In Zed, add the context server definition to your `settings.json`:

```json
{
  "context_servers": {
    "sap-integration-suite": {
      "command": {
        "path": "node",
        "args": [
          "/path/to/sap-integration-suite-mcp-server/dist/index.js"
        ],
        "env": {
          "SAP_CPI_URL": "https://<tenant>.it-cpi018.cfapps.<region>.hana.ondemand.com/api/v1",
          "SAP_CPI_TOKEN_URL": "https://<tenant>.authentication.<region>.hana.ondemand.com/oauth/token",
          "SAP_CPI_CLIENT_ID": "your-client-id",
          "SAP_CPI_CLIENT_SECRET": "your-client-secret"
        }
      }
    }
  }
}
```

---

## Security & Compliance

- **Zero Credential Storage**: No secrets, tokens, or credentials are stored on disk. All tokens reside in transient memory and expire according to OAuth2 specifications.
- **Strict Network Scrubbing**: Headers containing authentication material (`Authorization`, `Cookie`, `X-CSRF-Token`, `User`, `Organization`) are stripped prior to generating MCP log entries.
- **Principle of Least Privilege**: When creating BTP service bindings or service keys, grant only the specific scopes required for your intended workflows (e.g. read-only monitoring vs. deployment capabilities).
- **Transport Security**: All external API traffic requires TLS/HTTPS connections. Plaintext HTTP connections to SAP endpoints are rejected by configuration validation.

---

## License

This project is licensed under the **Apache License, Version 2.0**. See the [LICENSE](LICENSE) file for details.


