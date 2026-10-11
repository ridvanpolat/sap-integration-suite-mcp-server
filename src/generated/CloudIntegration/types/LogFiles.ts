export type paths = {
    readonly "/LogFileArchives": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all log file collections.
         * @description You can use the following request to get all log file collections.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved log file archive collections */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.LogFileArchive"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
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
    readonly "/LogFileArchives(Scope='{Scope}',LogFileType='{LogFileType}',NodeScope='worker')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get log file collections by scope and type in a compressed file.
         * @description You can use the following request to get log file collections for a scope and type in a compressed file (zip format), which could be downloaded via OData $value option.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Time after which the log files were modified<br>
                     *     Expected date format: yyyy-MM-dd'T'HH:mm:ss'Z'<br>
                     *     Example: ```2017-04-13T15:51:04Z```
                     */
                    readonly ModifiedAfter?: string;
                };
                readonly header?: never;
                readonly path: {
                    /** @description Range for collecting log files */
                    readonly Scope: readonly ("all" | "latest")[];
                    /** @description Log type */
                    readonly LogFileType: readonly ("http" | "trace")[];
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved log file collections */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.LogFileArchive"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
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
    readonly "/LogFileArchives(Scope='{Scope}',LogFileType='{LogFileType}',NodeScope='worker')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download log file collections.
         * @description You can use the following request to download log file collections for a scope and type in a compressed file (zip format).
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Time after which the log files were modified<br>
                     *     Expected date format: yyyy-MM-dd'T'HH:mm:ss'Z'<br>
                     *     Example: ```2017-04-13T15:51:04Z```
                     */
                    readonly ModifiedAfter?: string;
                };
                readonly header?: never;
                readonly path: {
                    /** @description Range for collecting log files */
                    readonly Scope: readonly ("all" | "latest")[];
                    /** @description Log type */
                    readonly LogFileType: readonly ("http" | "trace")[];
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved log file collections */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/zip": string;
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
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
    readonly "/LogFiles": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all log files.
         * @description You can use the following request to get all log files.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /**
                     * @description Filter items by property values.<br>
                     *     Examples:
                     *     * ```NodeScope eq 'worker'```
                     *     * ```LogFileType eq 'http'```
                     *     * ```LogFileType eq 'trace'```
                     *     * ```NodeScope eq 'worker' and LogFileType eq 'http'```
                     */
                    readonly $filter?: string;
                    /** @description Order items by property values. */
                    readonly $orderby?: readonly ("Name" | "Name desc" | "Application" | "Application desc" | "LastModified" | "LastModified desc" | "ContentType" | "ContentType desc" | "LogFileType" | "LogFileType desc" | "NodeScope" | "NodeScope desc")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Name" | "Application" | "LastModified" | "ContentType" | "LogFileType" | "NodeScope")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved log files */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.LogFile"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
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
    readonly "/LogFiles(Name='{Name}',Application='{Application}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get log files by name and application.
         * @description You can use the following request to get log file by name and application, which could be downloaded via OData $value option.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Log File Name */
                    readonly Name: string;
                    /** @description SAP BTP Application */
                    readonly Application: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved entities */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.LogFile"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
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
    readonly "/LogFiles(Name='{Name}',Application='{Application}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download log file.
         * @description You can use the following request to download log file by name and application.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Log File Name */
                    readonly Name: string;
                    /** @description SAP BTP Application */
                    readonly Application: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved entities */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/gzip": string;
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
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
        /** AuditLog */
        readonly "com.sap.hci.api.AuditLog": {
            readonly ChangeId?: string | null;
            readonly Action?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04Z
             */
            readonly Timestamp?: string | null;
            readonly UserName?: string | null;
            readonly ObjName?: string | null;
            readonly ObjType?: string | null;
            readonly Source?: string | null;
            readonly NodeType?: string | null;
            readonly UserType?: string | null;
            readonly CustomerVisible?: string | null;
        };
        /** LogFileArchive */
        readonly "com.sap.hci.api.LogFileArchive": {
            readonly Scope?: string | null;
            readonly LogFileType?: string | null;
            readonly NodeScope?: string | null;
            readonly ContentType?: string | null;
        };
        /** LogFile */
        readonly "com.sap.hci.api.LogFile": {
            readonly Name?: string | null;
            readonly Application?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04Z
             */
            readonly LastModified?: string | null;
            readonly ContentType?: string | null;
            readonly LogFileType?: string | null;
            readonly NodeScope?: string | null;
            /** Format: int64 */
            readonly Size?: number | null;
        };
        readonly "odata.error": {
            readonly error: components["schemas"]["odata.error.main"];
        };
        readonly "odata.error.main": {
            readonly code: string;
            readonly message: {
                readonly lang: string;
                readonly value: string;
            };
        };
        readonly "odata.error.detail": {
            readonly code: string;
            readonly message: string;
            readonly target?: string;
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
            };
        };
    };
    parameters: {
        /** @description Show only the first n items. */
        readonly top: number;
        /** @description Skip the first n items. */
        readonly skip: number;
        /** @description Filter items by property values. */
        readonly filter: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
