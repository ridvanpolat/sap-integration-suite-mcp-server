export type paths = {
    readonly "/Components": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all components
         * @description You can use the following request to get all Edge Integration Cell components with their status. Several filter operations are supported. Examples:
         *     - ```GET /Components```
         *     - ```GET /Components?$select=OverallStatus```
         *     - ```GET /Components?$count=true&$filter=OverallStatus eq 'OK'```
         *     - ```GET /Components?$expand=Pods,RuntimeParameters```
         *     - ```GET /Components?$filter=contains(Name,'Edge')&$expand=Pods```
         */
        readonly get: operations["listComponents"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/$count": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of components. Supports filter option.
         * @description You can use the following request to retrieve the number of components. The filter option is taken into account if applied. Examples:
         *     - ```GET /Components/$count```
         *     - ```GET /Components/$count?$filter=contains(Name,'Edge')```
         *     - ```GET /Components/$count?$filter=OverallStatus eq 'OK'```
         */
        readonly get: operations["countComponents"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/{componentId}": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get a single component by its identifier.
         * @description You can use the following request to get a specific component. Examples:
         *     - ```GET /Components/EDC```
         *     - ```GET /Components/WORKER?$expand=RuntimeParameters```
         *     - ```GET /Components/WORKER?$select=Name```
         */
        readonly get: operations["getComponent"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/{componentId}/com.sap.eic.api.restart": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Restart a component.
         * @description You can use the following request to restart a component. Example:
         *     - ```POST /Components/EDC/com.sap.eic.api.restart```
         */
        readonly post: operations["restartComponent"];
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/{componentId}/Pods": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * List pods of a component with their status.
         * @description You can use the following request to get all pods of a specific component with their status. Examples:
         *     - ```GET /Components/EDGE_API/Pods```
         *     - ```GET /Components/EDC/Pods?$count=true&$filter=Status eq 'Running'```
         *     - ```GET /Components/WORKER/Pods?$select=Status&$expand=Metrics```
         */
        readonly get: operations["listComponentPods"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/{componentId}/Pods/$count": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of pods. Supports filter option.
         * @description You can use the following request to retrieve the number of pods. The filter option is taken into account if applied. Examples:
         *     - ```GET /Components/EDC/Pods/$count```
         *     - ```GET /Components/WORKER/Pods/$count?$filter=Status eq 'Running'```
         */
        readonly get: operations["countComponentPods"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/{componentId}/Pods/{podName}": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get a single pod by its name.
         * @description You can use the following request to get a specific pod. Examples:
         *     - ```GET /Components/WORKER/Pods/worker-f1234ab-ab1c2```
         *     - ```GET /Components/WORKER/Pods/worker-f1234ab-ab1c2?$expand=Events```
         *     - ```GET /Components/WORKER/Pods/worker-f1234ab-ab1c2?$select=RestartCount```
         */
        readonly get: operations["getComponentPod"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/{componentId}/Pods/{podName}/Events": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all event logs for a pod.
         * @description You can use the following request to get all event logs for a specific pod. Examples:
         *     - ```GET /Components/WORKER/Pods/worker-f1234ab-ab1c2/Events```
         *     - ```GET /Components/WORKER/Pods/worker-f1234ab-ab1c2/Events?$filter=Type eq 'WARNING'```
         *     - ```GET /Components/WORKER/Pods/worker-f1234ab-ab1c2/Events?$filter=contains(Message,'container')```
         */
        readonly get: operations["listPodEvents"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/{componentId}/Pods/{podName}/Events/$count": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of event logs for a pod. Supports filter option.
         * @description You can use the following request to retrieve the number of a pod's event logs. The filter option is taken into account if applied. Examples:
         *     - ```GET /Components/WORKER/Pods/worker-f1234ab-ab1c2/Events/$count```
         *     - ```GET /Components/WORKER/Pods/worker-f1234ab-ab1c2/Events/$count?$filter=Type eq 'WARNING'```
         */
        readonly get: operations["countPodEvents"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/{componentId}/Pods/{podName}/Metrics": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Returns all metrics for a pod.
         * @description You can use the following request to retrieve all metrics for a specific pod. Examples:
         *     - ```GET /Components/POLICYENGINE/Pods/policyengine-f1234ab-ab1c2/Metrics```
         *     - ```GET /Components/POLICYENGINE/Pods/policyengine-f1234ab-ab1c2/Metrics?$select=MetricValue```
         *     - ```GET /Components/EDC/Pods/edc-f1234ab-ab1c2/Metrics?$filter=contains(MetricKey,'STATUS')```
         *     - ```GET /Components/EDC/Pods/edc-f1234ab-ab1c2/Metrics?$filter=IsUnexpected eq true```
         */
        readonly get: operations["listPodMetrics"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/{componentId}/Pods/{podName}/Metrics/$count": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of metrics for a pod. Supports filter option.
         * @description You can use the following request to retrieve the number of a pod's metrics. The filter option is taken into account if applied. Examples:
         *     - ```GET /Components/POLICYENGINE/Pods/policyengine-f1234ab-ab1c2/Metrics/$count```
         *     - ```GET /Components/EDC/Pods/edc-f1234ab-ab1c2/Metrics/$count?$filter=contains(MetricKey,'STATUS')```
         *     - ```GET /Components/EDC/Pods/edc-f1234ab-ab1c2/Metrics/$count?$filter=IsUnexpected eq true```
         */
        readonly get: operations["countPodMetrics"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/{componentId}/Pods/{podName}/Metrics/{metricKey}": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Returns a single metric by its key.
         * @description You can use the following request to retrieve a specific metric. Example:
         *     - ```GET /Components/POLICYENGINE/Pods/policyengine-f1234ab-ab1c2/Metrics/pe_solace_connection_status```
         */
        readonly get: operations["listPodMetrics_2"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/{componentId}/RuntimeParameters": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * List all runtime parameters for a component.
         * @description You can use the following request to get all runtime parameters for a specific component. Several filter operations are supported. Examples:
         *     - ```GET /Components/EDGE_API/RuntimeParameters```
         *     - ```GET /Components/WORKER/RuntimeParameters?$filter=IsDefault eq false```
         *     - ```GET /Components/WORKER/RuntimeParameters?$filter=contains(ID,'ADAPTER')```
         *     - ```GET /Components/EDC/RuntimeParameters/com.sap.eic.api.RuntimeParameterLogLevel?$filter=Value eq com.sap.eic.api.LogLevel'INFO'```
         *     - ```GET /Components/WORKER/RuntimeParameters/EDC/RuntimeParameters/com.sap.eic.api.RuntimeParameterSiValue?$filter=Unit eq 'Mi'```
         *     - ```GET /Components/WORKER/RuntimeParameters/EDC/RuntimeParameters/com.sap.eic.api.RuntimeParameterSiValue?$filter=Value gt 400```
         */
        readonly get: operations["listRuntimeParameters"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/{componentId}/RuntimeParameters/$count": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of runtime parameters. Supports filter option.
         * @description You can use the following request to retrieve the number of runtime parameters for a component. The filter option is taken into account if applied. Examples:
         *     - ```GET /Components/EDGE_API/RuntimeParameters/$count```
         *     - ```GET /Components/WORKER/RuntimeParameters/$count?$filter=IsDefault eq false```
         *     - ```GET /Components/WORKER/RuntimeParameters/$count?$filter=contains(ID,'MEMORY')```
         */
        readonly get: operations["countRuntimeParameters"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Components/{componentId}/RuntimeParameters/{parameterName}": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get a single runtime parameter by its name.
         * @description You can use the following request to retrieve a specific runtime parameter. Examples:
         *     - ```GET /Components/EDGE_API/RuntimeParameters/CPU_LIMIT```
         *     - ```GET /Components/WORKER/RuntimeParameters/MEMORY_LIMIT```
         */
        readonly get: operations["getRuntimeParameter"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get CSRF token.
         * @description You can use the following request to get the CSRF token which is required for write access via POST, PUT and DELETE operations. Copy the received X-CSRF-Token from the response header.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description To retrieve a new CSRF token the value of the header must be set to ```Fetch```. */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description The header provides the CSRF token. */
                readonly 200: {
                    headers: {
                        /** @description CSRF token that can be used for all modifying requests. */
                        readonly "X-CSRF-Token"?: string;
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly default: components["responses"]["error"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        /**
         * ComponentID
         * @enum {string}
         */
        readonly "com.sap.eic.api.ComponentID": "AUDITLOG_AGENT" | "DESTSVC_DATA" | "DESTSVC_REST" | "EDC" | "EDGE_API" | "EDGE_EVENT_CONTROLLER" | "ELA" | "ESAC" | "MDC" | "POLICYENGINE" | "POSTGRES" | "REDIS" | "SOLACE" | "SOLOPS" | "WORKER";
        /**
         * OverallStatus
         * @enum {string}
         */
        readonly "com.sap.eic.api.OverallStatus": "OK" | "WARN" | "ERROR" | "UNKNOWN";
        /**
         * EventType
         * @enum {string}
         */
        readonly "com.sap.eic.api.EventType": "NORMAL" | "WARNING" | "ERROR" | "UNKNOWN";
        /**
         * CarriageReturnHandling
         * @enum {string}
         */
        readonly "com.sap.eic.api.CarriageReturnHandling": "0D" | "8D";
        /**
         * InvalidCharacterHandling
         * @enum {string}
         */
        readonly "com.sap.eic.api.InvalidCharacterHandling": "IGNORE" | "SUBSTITUTE";
        /**
         * LogLevel
         * @enum {string}
         */
        readonly "com.sap.eic.api.LogLevel": "ERROR" | "WARN" | "INFO" | "DEBUG";
        /**
         * SolaceTier
         * @enum {string}
         */
        readonly "com.sap.eic.api.SolaceTier": "100" | "250" | "1K" | "10K" | "100K" | "200K";
        /** Component */
        readonly "com.sap.eic.api.Component": {
            readonly ID: components["schemas"]["com.sap.eic.api.ComponentID"];
            readonly Name?: string;
            readonly OverallStatus?: components["schemas"]["com.sap.eic.api.OverallStatus"];
            /** @description Navigation property (collection of Pod). Usually returned only when expanded. */
            readonly Pods?: readonly components["schemas"]["com.sap.eic.api.Pod"][];
            /** @description Navigation property (collection of RuntimeParameter). Usually returned only when expanded. */
            readonly RuntimeParameters?: readonly components["schemas"]["com.sap.eic.api.RuntimeParameter"][];
        };
        /** PodReadyStatus */
        readonly "com.sap.eic.api.PodReadyStatus": {
            /** Format: int32 */
            readonly actual?: number;
            /** Format: int32 */
            readonly target?: number;
        };
        /**
         * Pod
         * @description com.sap.eic.api.Pod
         */
        readonly "com.sap.eic.api.Pod": {
            readonly Name: string;
            readonly Status?: string;
            /** Format: int32 */
            readonly RestartCount?: number;
            readonly PodReadyStatus?: components["schemas"]["com.sap.eic.api.PodReadyStatus"];
            /** @description Navigation property (collection of PodEvent). Usually returned only when expanded. */
            readonly Events?: readonly components["schemas"]["com.sap.eic.api.PodEvent"][];
            /** @description Navigation property (collection of PodMetric). Usually returned only when expanded. */
            readonly Metrics?: readonly components["schemas"]["com.sap.eic.api.PodMetric"][];
        };
        /** PodEvent */
        readonly "com.sap.eic.api.PodEvent": {
            readonly Message: string;
            readonly Type: components["schemas"]["com.sap.eic.api.EventType"];
            readonly Reason: string;
            readonly Origin?: string;
            /** Format: int32 */
            readonly OccurrenceCount: number;
            /**
             * Format: date-time
             * @example 2026-04-23T14:53:07Z
             */
            readonly FirstOccurrence: string;
            /**
             * Format: date-time
             * @example 2026-04-23T14:53:07Z
             */
            readonly LastOccurrence?: string;
        };
        /** PodMetric */
        readonly "com.sap.eic.api.PodMetric": {
            readonly MetricKey: string;
            readonly MetricValue?: string;
            readonly IsUnexpected: boolean;
            readonly ExpectedValue?: string;
        };
        /** RuntimeParameter */
        readonly "com.sap.eic.api.RuntimeParameter": {
            readonly ID: string;
            readonly IsDefault?: boolean;
        };
        /** RuntimeParameterBoolean */
        readonly "com.sap.eic.api.RuntimeParameterBoolean": components["schemas"]["com.sap.eic.api.RuntimeParameter"] & {
            readonly Value?: boolean;
        };
        /** RuntimeParameterCarriageReturnHandling */
        readonly "com.sap.eic.api.RuntimeParameterCarriageReturnHandling": components["schemas"]["com.sap.eic.api.RuntimeParameter"] & {
            readonly Value?: components["schemas"]["com.sap.eic.api.CarriageReturnHandling"];
        };
        /** RuntimeParameterInt */
        readonly "com.sap.eic.api.RuntimeParameterInt": components["schemas"]["com.sap.eic.api.RuntimeParameter"] & {
            /** Format: int32 */
            readonly Value?: number;
        };
        /** RuntimeParameterInvalidCharHandling */
        readonly "com.sap.eic.api.RuntimeParameterInvalidCharHandling": components["schemas"]["com.sap.eic.api.RuntimeParameter"] & {
            readonly Value?: components["schemas"]["com.sap.eic.api.InvalidCharacterHandling"];
        };
        /** RuntimeParameterLogLevel */
        readonly "com.sap.eic.api.RuntimeParameterLogLevel": components["schemas"]["com.sap.eic.api.RuntimeParameter"] & {
            readonly Value?: components["schemas"]["com.sap.eic.api.LogLevel"];
        };
        /** RuntimeParameterSiValue */
        readonly "com.sap.eic.api.RuntimeParameterSiValue": components["schemas"]["com.sap.eic.api.RuntimeParameter"] & {
            /** Format: int32 */
            readonly Value?: number;
            readonly Unit?: string;
        };
        /** RuntimeParameterSolaceTier */
        readonly "com.sap.eic.api.RuntimeParameterSolaceTier": components["schemas"]["com.sap.eic.api.RuntimeParameter"] & {
            readonly Value?: components["schemas"]["com.sap.eic.api.SolaceTier"];
        };
        /** RuntimeParameterString */
        readonly "com.sap.eic.api.RuntimeParameterString": components["schemas"]["com.sap.eic.api.RuntimeParameter"] & {
            readonly Value?: string;
        };
        readonly "odata.error": {
            readonly error: {
                readonly code?: string;
                readonly message?: string;
                readonly target?: string;
                readonly details?: readonly {
                    readonly code?: string;
                    readonly target?: string;
                    readonly message?: string;
                }[];
            };
        };
    };
    responses: {
        /** @description Bad Request. Wrong format or structure of the provided request body or parameters. */
        readonly 400: {
            headers: {
                readonly [name: string]: unknown;
            };
            content?: never;
        };
        /** @description Unauthorized. Authorization information is missing or invalid. */
        readonly 401: {
            headers: {
                readonly [name: string]: unknown;
            };
            content?: never;
        };
        /** @description Forbidden. The required permissions to access the resource are missing. */
        readonly 403: {
            headers: {
                readonly [name: string]: unknown;
            };
            content?: never;
        };
        /** @description Not found. The requested resource could not be found. */
        readonly 404: {
            headers: {
                readonly [name: string]: unknown;
            };
            content?: never;
        };
        /** @description Too many requests. Server’s rate limit exceeded. */
        readonly 429: {
            headers: {
                readonly [name: string]: unknown;
            };
            content?: never;
        };
        /** @description Internal server error. The requested operation led to an error during execution. */
        readonly 500: {
            headers: {
                readonly [name: string]: unknown;
            };
            content?: never;
        };
        /** @description Error */
        readonly error: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["odata.error"];
                readonly "text/plain": components["schemas"]["odata.error"];
            };
        };
    };
    parameters: {
        /**
         * @description Component identifier.
         *      Example: ```WORKER```
         */
        readonly ComponentId: string;
        /**
         * @description Pod name.
         *      Example: ```worker-f1234ab-ab1c2```
         */
        readonly PodName: string;
        /**
         * @description Runtime parameter name.
         *      Example:  ```MEMORY_LIMIT```
         */
        readonly ParameterName: string;
        /** @description Include number of items. */
        readonly count: boolean;
        /** @description Show only the first n items. */
        readonly top: number;
        /** @description Skip the first n items. */
        readonly skip: number;
        /** @description Order items by property values. */
        readonly orderby: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export interface operations {
    readonly listComponents: {
        readonly parameters: {
            readonly query?: {
                /** @description Filter components by property values. */
                readonly $filter?: string;
                /** @description Expand related entities. */
                readonly $expand?: readonly ("Pods" | "RuntimeParameters")[];
                /** @description Select properties to be returned. */
                readonly $select?: readonly ("ID" | "Name" | "OverallStatus")[];
                /** @description Include number of items. */
                readonly $count?: components["parameters"]["count"];
                /** @description Show only the first n items. */
                readonly $top?: components["parameters"]["top"];
                /** @description Skip the first n items. */
                readonly $skip?: components["parameters"]["skip"];
                /** @description Order items by property values. */
                readonly $orderby?: components["parameters"]["orderby"];
            };
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Retrieved components. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: {
                            readonly results?: readonly components["schemas"]["com.sap.eic.api.Component"][];
                        };
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly countComponents: {
        readonly parameters: {
            readonly query?: {
                /** @description Filter components by property values. */
                readonly $filter?: string;
            };
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Number of retrieved components. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "text/plain": number;
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly getComponent: {
        readonly parameters: {
            readonly query?: {
                /** @description Expand related entities. */
                readonly $expand?: readonly ("Pods" | "RuntimeParameters")[];
                /** @description Select properties to be returned. */
                readonly $select?: readonly ("Name" | "OverallStatus")[];
            };
            readonly header?: never;
            readonly path: {
                /**
                 * @description Component identifier.
                 *      Example: ```WORKER```
                 */
                readonly componentId: components["parameters"]["ComponentId"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Retrieved component. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.eic.api.Component"];
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly restartComponent: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /**
                 * @description Component identifier.
                 *      Example: ```WORKER```
                 */
                readonly componentId: components["parameters"]["ComponentId"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Restart of component triggered. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content?: never;
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly listComponentPods: {
        readonly parameters: {
            readonly query?: {
                /** @description Expand related entities. */
                readonly $expand?: readonly ("Events" | "Metrics")[];
                /** @description Filter pods by property values. */
                readonly $filter?: string;
                /** @description Select properties to be returned. */
                readonly $select?: readonly ("Name" | "Status" | "RestartCount" | "PodReadyStatus")[];
                /** @description Include number of items. */
                readonly $count?: components["parameters"]["count"];
                /** @description Show only the first n items. */
                readonly $top?: components["parameters"]["top"];
                /** @description Skip the first n items. */
                readonly $skip?: components["parameters"]["skip"];
                /** @description Order items by property values. */
                readonly $orderby?: components["parameters"]["orderby"];
            };
            readonly header?: never;
            readonly path: {
                /**
                 * @description Component identifier.
                 *      Example: ```WORKER```
                 */
                readonly componentId: components["parameters"]["ComponentId"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Retrieved pods. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: {
                            readonly results?: readonly components["schemas"]["com.sap.eic.api.Pod"][];
                        };
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly countComponentPods: {
        readonly parameters: {
            readonly query?: {
                /** @description Filter pods by property values. */
                readonly $filter?: string;
            };
            readonly header?: never;
            readonly path: {
                /**
                 * @description Component identifier.
                 *      Example: ```WORKER```
                 */
                readonly componentId: components["parameters"]["ComponentId"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Number of retrieved pods. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "text/plain": number;
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly getComponentPod: {
        readonly parameters: {
            readonly query?: {
                /** @description Expand related entities. */
                readonly $expand?: readonly ("Events" | "Metrics")[];
                /** @description Select properties to be returned. */
                readonly $select?: readonly ("Status" | "RestartCount" | "PodReadyStatus")[];
            };
            readonly header?: never;
            readonly path: {
                /**
                 * @description Component identifier.
                 *      Example: ```WORKER```
                 */
                readonly componentId: components["parameters"]["ComponentId"];
                /**
                 * @description Pod name.
                 *      Example: ```worker-f1234ab-ab1c2```
                 */
                readonly podName: components["parameters"]["PodName"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Retrieved pod. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.eic.api.Pod"];
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly listPodEvents: {
        readonly parameters: {
            readonly query?: {
                /** @description Filter pod events by property values. */
                readonly $filter?: string;
                /** @description Select properties to be returned. */
                readonly $select?: readonly ("Message" | "Type" | "Reason" | "Origin" | "OccurrenceCount" | "FirstOccurrence" | "LastOccurrence")[];
                /** @description Include number of items. */
                readonly $count?: components["parameters"]["count"];
                /** @description Order items by property values. */
                readonly $orderby?: components["parameters"]["orderby"];
            };
            readonly header?: never;
            readonly path: {
                /**
                 * @description Component identifier.
                 *      Example: ```WORKER```
                 */
                readonly componentId: components["parameters"]["ComponentId"];
                /**
                 * @description Pod name.
                 *      Example: ```worker-f1234ab-ab1c2```
                 */
                readonly podName: components["parameters"]["PodName"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Retrieved event logs. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: {
                            readonly results?: readonly components["schemas"]["com.sap.eic.api.PodEvent"][];
                        };
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly countPodEvents: {
        readonly parameters: {
            readonly query?: {
                /** @description Filter pod events by property values. */
                readonly $filter?: string;
            };
            readonly header?: never;
            readonly path: {
                /**
                 * @description Component identifier.
                 *      Example: ```WORKER```
                 */
                readonly componentId: components["parameters"]["ComponentId"];
                /**
                 * @description Pod name.
                 *      Example: ```worker-f1234ab-ab1c2```
                 */
                readonly podName: components["parameters"]["PodName"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Number of retrieved log events. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "text/plain": number;
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly listPodMetrics: {
        readonly parameters: {
            readonly query?: {
                /** @description Filter metrics by property values. */
                readonly $filter?: string;
                /** @description Select properties to be returned. */
                readonly $select?: readonly ("MetricKey" | "MetricValue" | "IsUnexpected" | "ExpectedValue")[];
                /** @description Include number of items. */
                readonly $count?: components["parameters"]["count"];
                /** @description Order items by property values. */
                readonly $orderby?: components["parameters"]["orderby"];
            };
            readonly header?: never;
            readonly path: {
                /**
                 * @description Component identifier.
                 *      Example: ```WORKER```
                 */
                readonly componentId: components["parameters"]["ComponentId"];
                /**
                 * @description Pod name.
                 *      Example: ```worker-f1234ab-ab1c2```
                 */
                readonly podName: components["parameters"]["PodName"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Retrieved metrics. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: {
                            readonly results?: readonly components["schemas"]["com.sap.eic.api.PodMetric"][];
                        };
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly countPodMetrics: {
        readonly parameters: {
            readonly query?: {
                /** @description Filter metrics by property values. */
                readonly $filter?: string;
            };
            readonly header?: never;
            readonly path: {
                /**
                 * @description Component identifier.
                 *      Example: ```WORKER```
                 */
                readonly componentId: components["parameters"]["ComponentId"];
                /**
                 * @description Pod name.
                 *      Example: ```worker-f1234ab-ab1c2```
                 */
                readonly podName: components["parameters"]["PodName"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Number of retrieved metrics. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "text/plain": number;
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly listPodMetrics_2: {
        readonly parameters: {
            readonly query?: {
                /** @description Select properties to be returned. */
                readonly $select?: readonly ("MetricValue" | "IsUnexpected" | "ExpectedValue")[];
            };
            readonly header?: never;
            readonly path: {
                /**
                 * @description Component identifier.
                 *      Example: ```POLICYENGINE```
                 */
                readonly componentId: string;
                /**
                 * @description Pod name.
                 *      Example: ```policyengine-f1234ab-ab1c2```
                 */
                readonly podName: string;
                /**
                 * @description Metric key.
                 *      Example:  ```pe_solace_connection_status```
                 */
                readonly metricKey: string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Retrieved metric. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.eic.api.PodMetric"];
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly listRuntimeParameters: {
        readonly parameters: {
            readonly query?: {
                /** @description Filter runtime parameters by property values. */
                readonly $filter?: string;
                /** @description Select properties to be returned. */
                readonly $select?: readonly ("ID" | "IsDefault")[];
                /** @description Include number of items. */
                readonly $count?: components["parameters"]["count"];
                /** @description Show only the first n items. */
                readonly $top?: components["parameters"]["top"];
                /** @description Skip the first n items. */
                readonly $skip?: components["parameters"]["skip"];
                /** @description Order items by property values. */
                readonly $orderby?: components["parameters"]["orderby"];
            };
            readonly header?: never;
            readonly path: {
                /**
                 * @description Component identifier.
                 *      Example: ```WORKER```
                 */
                readonly componentId: components["parameters"]["ComponentId"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Retrieved runtime parameters. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: {
                            readonly results?: readonly components["schemas"]["com.sap.eic.api.RuntimeParameter"][];
                        };
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly countRuntimeParameters: {
        readonly parameters: {
            readonly query?: {
                /** @description Filter runtime parameters by property values. */
                readonly $filter?: string;
            };
            readonly header?: never;
            readonly path: {
                /**
                 * @description Component identifier.
                 *      Example: ```WORKER```
                 */
                readonly componentId: components["parameters"]["ComponentId"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Number of retrieved runtime parameters. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "text/plain": number;
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly getRuntimeParameter: {
        readonly parameters: {
            readonly query?: {
                /** @description Select properties to be returned. */
                readonly $select?: readonly "IsDefault"[];
            };
            readonly header?: never;
            readonly path: {
                /**
                 * @description Component identifier.
                 *      Example: ```WORKER```
                 */
                readonly componentId: components["parameters"]["ComponentId"];
                /**
                 * @description Runtime parameter name.
                 *      Example:  ```MEMORY_LIMIT```
                 */
                readonly parameterName: components["parameters"]["ParameterName"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Retrieved runtime parameter. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.eic.api.RuntimeParameter"];
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
}
