export type paths = {
    readonly "/$batch": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Sends a group of requests
         * @description Group multiple requests into a single request payload, see [Batch Requests](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_BatchRequests).
         *
         *     *Please note that "Try it out" is not supported for this request.*
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Batch request */
            readonly requestBody: {
                readonly content: {
                    /**
                     * @example --request-separator
                     *     Content-Type: application/http
                     *     Content-Transfer-Encoding: binary
                     *
                     *     GET GraphConfiguration HTTP/1.1
                     *     Accept: application/json
                     *
                     *
                     *     --request-separator--
                     */
                    readonly "multipart/mixed;boundary=request-separator": string;
                };
            };
            readonly responses: {
                /** @description Batch response */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        /**
                         * @example --response-separator
                         *     Content-Type: application/http
                         *
                         *     HTTP/1.1 200 OK
                         *     Content-Type: application/json
                         *
                         *     {...}
                         *     --response-separator--
                         */
                        readonly "multipart/mixed": string;
                    };
                };
                readonly "4XX": components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Extension": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieves a list of extension.
         * @description Returns a collection of extensions. Use query options such as `$filter`, `$orderby`, `$select`, `$top`, and `$skip` to refine the results.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items, see [Paging - Top](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptiontop)
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items, see [Paging - Skip](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionskip) */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Search items by search phrases, see [Searching](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionsearch) */
                    readonly $search?: components["parameters"]["search"];
                    /** @description Filter items by property values, see [Filtering](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionfilter) */
                    readonly $filter?: string;
                    /** @description Include count of items, see [Count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) */
                    readonly $count?: components["parameters"]["count"];
                    /** @description Order items by property values, see [Sorting](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionorderby) */
                    readonly $orderby?: readonly ("lastModified" | "lastModified desc" | "id" | "id desc" | "name" | "name desc" | "description" | "description desc" | "files/name" | "files/name desc" | "files/content" | "files/content desc")[];
                    /** @description Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect) */
                    readonly $select?: readonly ("lastModified" | "id" | "name" | "description" | "files")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved extension */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly "@count"?: components["schemas"]["count"];
                            readonly value?: readonly components["schemas"]["sap.graph.Extension"][];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
            };
        };
        readonly put?: never;
        /**
         * Creates a single extension.
         * @description Adds a new extension to extend a business data graph with custom entity projections.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Extension */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["sap.graph.Extension-create"];
                };
            };
            readonly responses: {
                /** @description Created extension */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["sap.graph.Extension"];
                    };
                };
                readonly "4XX": components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Extension('{id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description A unique string that identifies the extension. If the extension ID is not provided, a UUID is generated. */
                readonly id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieves a single extension.
         * @description Returns the properties of an extension identified by its unique ID. Use `$select` to limit the returned properties.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect) */
                    readonly $select?: readonly ("lastModified" | "id" | "name" | "description" | "files")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description A unique string that identifies the extension. If the extension ID is not provided, a UUID is generated. */
                    readonly id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved extension */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["sap.graph.Extension"];
                    };
                };
                readonly "4XX": components["responses"]["error"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Deletes a single extension.
         * @description Permanently removes an extension identified by its unique ID from the system.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description A unique string that identifies the extension. If the extension ID is not provided, a UUID is generated. */
                    readonly id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly "4XX": components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Changes a single extension.
         * @description Updates the properties of an extension identified by its unique ID.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description A unique string that identifies the extension. If the extension ID is not provided, a UUID is generated. */
                    readonly id: string;
                };
                readonly cookie?: never;
            };
            /** @description Extension */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["sap.graph.Extension-update"];
                };
            };
            readonly responses: {
                /** @description Success */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly "4XX": components["responses"]["error"];
            };
        };
        readonly trace?: never;
    };
    readonly "/GraphConfiguration": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Creates a single graph configuration.
         * @description Adds a new graph configuration that specifies a business data graph. The `businessDataGraphIdentifier` is required and must be a short string of up to 20 lowercase alphanumeric characters and hyphen separators.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description GraphConfiguration */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["sap.graph.GraphConfiguration-create"];
                };
            };
            readonly responses: {
                /** @description Created graph configuration */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["sap.graph.GraphConfiguration"];
                    };
                };
                readonly "4XX": components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/GraphConfiguration('{businessDataGraphIdentifier}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description A unique identifier that developers use in the Graph URL to access the business data graph. It must be a short string of up to 20 lowercase alphanumeric characters and hyphen separators. */
                readonly businessDataGraphIdentifier: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieves a single graph configuration.
         * @description Returns the properties of a graph configuration identified by its business data graph identifier. Use `$select` to limit the returned properties.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect) */
                    readonly $select?: readonly ("lastModified" | "businessDataGraphIdentifier" | "schemaVersion" | "description" | "graphModelVersion" | "effectiveGraphModelVersion" | "exclude" | "dataSources" | "locatingPolicy" | "statusDetails" | "logMessages" | "extensions" | "status")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description A unique identifier that developers use in the Graph URL to access the business data graph. It must be a short string of up to 20 lowercase alphanumeric characters and hyphen separators. */
                    readonly businessDataGraphIdentifier: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved graph configuration */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["sap.graph.GraphConfiguration"];
                    };
                };
                readonly "4XX": components["responses"]["error"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Deletes a single graph configuration.
         * @description Permanently removes a graph configuration identified by its business data graph identifier from the system.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description A unique identifier that developers use in the Graph URL to access the business data graph. It must be a short string of up to 20 lowercase alphanumeric characters and hyphen separators. */
                    readonly businessDataGraphIdentifier: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly "4XX": components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Changes a single graph configuration.
         * @description Updates the properties of a graph configuration identified by its business data graph identifier. Only the provided fields are modified.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description A unique identifier that developers use in the Graph URL to access the business data graph. It must be a short string of up to 20 lowercase alphanumeric characters and hyphen separators. */
                    readonly businessDataGraphIdentifier: string;
                };
                readonly cookie?: never;
            };
            /** @description GraphConfiguration */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["sap.graph.GraphConfiguration-update"];
                };
            };
            readonly responses: {
                /** @description Success */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly "4XX": components["responses"]["error"];
            };
        };
        readonly trace?: never;
    };
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        /**
         * Cue
         * @description A short string label used to select non-default locating rules in requests.
         */
        readonly "sap.graph.Cue": {
            /**
             * @description Name of the cue.
             * @example EU
             */
            readonly name?: string | null;
            /** @example Europe */
            readonly description?: string | null;
            readonly values?: readonly components["schemas"]["sap.graph.CueValue"][];
        };
        /**
         * Cue (for create)
         * @description A short string label used to select non-default locating rules in requests.
         */
        readonly "sap.graph.Cue-create": {
            /**
             * @description Name of the cue.
             * @example EU
             */
            readonly name?: string | null;
            /** @example Europe */
            readonly description?: string | null;
            readonly values?: readonly components["schemas"]["sap.graph.CueValue-create"][];
        };
        /**
         * Cue (for update)
         * @description A short string label used to select non-default locating rules in requests.
         */
        readonly "sap.graph.Cue-update": {
            /**
             * @description Name of the cue.
             * @example EU
             */
            readonly name?: string | null;
            /** @example Europe */
            readonly description?: string | null;
            readonly values?: readonly components["schemas"]["sap.graph.CueValue-update"][];
        };
        /** CueReference */
        readonly "sap.graph.CueReference": {
            readonly ref?: string | null;
            readonly values?: readonly string[];
        };
        /** CueReference (for create) */
        readonly "sap.graph.CueReference-create": {
            readonly ref?: string | null;
            readonly values?: readonly string[];
        };
        /** CueReference (for update) */
        readonly "sap.graph.CueReference-update": {
            readonly ref?: string | null;
            readonly values?: readonly string[];
        };
        /** CueValue */
        readonly "sap.graph.CueValue": {
            readonly name?: string | null;
            readonly description?: string | null;
        };
        /** CueValue (for create) */
        readonly "sap.graph.CueValue-create": {
            readonly name?: string | null;
            readonly description?: string | null;
        };
        /** CueValue (for update) */
        readonly "sap.graph.CueValue-update": {
            readonly name?: string | null;
            readonly description?: string | null;
        };
        /**
         * DataSource
         * @description Defines a set of services (APIs) configured as destinations in the landscape.
         */
        readonly "sap.graph.DataSource": {
            /**
             * @description The data source name.
             * @example s4
             */
            readonly name?: string | null;
            /**
             * @description The namespace for entities of custom OData services. You do not need to specify a namespace for SAP systems known by Graph.
             * @example company.custom
             */
            readonly namespace?: string | null;
            /** @description The services belonging to the data source. */
            readonly services?: readonly components["schemas"]["sap.graph.DataSourceService"][];
        };
        /**
         * DataSource (for create)
         * @description Defines a set of services (APIs) configured as destinations in the landscape.
         */
        readonly "sap.graph.DataSource-create": {
            /**
             * @description The data source name.
             * @example s4
             */
            readonly name?: string | null;
            /**
             * @description The namespace for entities of custom OData services. You do not need to specify a namespace for SAP systems known by Graph.
             * @example company.custom
             */
            readonly namespace?: string | null;
            /** @description The services belonging to the data source. */
            readonly services?: readonly components["schemas"]["sap.graph.DataSourceService-create"][];
        };
        /**
         * DataSource (for update)
         * @description Defines a set of services (APIs) configured as destinations in the landscape.
         */
        readonly "sap.graph.DataSource-update": {
            /**
             * @description The data source name.
             * @example s4
             */
            readonly name?: string | null;
            /**
             * @description The namespace for entities of custom OData services. You do not need to specify a namespace for SAP systems known by Graph.
             * @example company.custom
             */
            readonly namespace?: string | null;
            /** @description The services belonging to the data source. */
            readonly services?: readonly components["schemas"]["sap.graph.DataSourceService-update"][];
        };
        /**
         * DataSourceService
         * @description Specifies a service (API) configured as a destination in the landscape.
         */
        readonly "sap.graph.DataSourceService": {
            /**
             * @description The destination name of the service.
             * @example s4-business-partner
             */
            readonly destinationName?: string | null;
            /**
             * @description The path of the service.
             * @example /odata/sap/API_BUSINESS_PARTNER
             */
            readonly path?: string | null;
        };
        /**
         * DataSourceService (for create)
         * @description Specifies a service (API) configured as a destination in the landscape.
         */
        readonly "sap.graph.DataSourceService-create": {
            /**
             * @description The destination name of the service.
             * @example s4-business-partner
             */
            readonly destinationName?: string | null;
            /**
             * @description The path of the service.
             * @example /odata/sap/API_BUSINESS_PARTNER
             */
            readonly path?: string | null;
        };
        /**
         * DataSourceService (for update)
         * @description Specifies a service (API) configured as a destination in the landscape.
         */
        readonly "sap.graph.DataSourceService-update": {
            /**
             * @description The destination name of the service.
             * @example s4-business-partner
             */
            readonly destinationName?: string | null;
            /**
             * @description The path of the service.
             * @example /odata/sap/API_BUSINESS_PARTNER
             */
            readonly path?: string | null;
        };
        /**
         * Extension
         * @description Extends a business data graph with custom entity projections.
         */
        readonly "sap.graph.Extension": {
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04.0000000Z
             */
            readonly lastModified?: string | null;
            /**
             * @description A unique string that identifies the extension. If the extension ID is not provided, a UUID is generated.
             * @example abc-xyz-123mn
             */
            readonly id?: string;
            /**
             * @description The name of the extension.
             * @example my-extension
             */
            readonly name?: string | null;
            /**
             * @description Describes the extension.
             * @example Description of the extension.
             */
            readonly description?: string | null;
            /** @description An array of custom entity projection definitions. */
            readonly files?: readonly components["schemas"]["sap.graph.ExtensionFile"][];
        };
        /**
         * Extension (for create)
         * @description Extends a business data graph with custom entity projections.
         */
        readonly "sap.graph.Extension-create": {
            /**
             * @description A unique string that identifies the extension. If the extension ID is not provided, a UUID is generated.
             * @example abc-xyz-123mn
             */
            readonly id: string;
            /**
             * @description The name of the extension.
             * @example my-extension
             */
            readonly name?: string | null;
            /**
             * @description Describes the extension.
             * @example Description of the extension.
             */
            readonly description?: string | null;
            /** @description An array of custom entity projection definitions. */
            readonly files?: readonly components["schemas"]["sap.graph.ExtensionFile-create"][];
        };
        /**
         * Extension (for update)
         * @description Extends a business data graph with custom entity projections.
         */
        readonly "sap.graph.Extension-update": {
            /**
             * @description The name of the extension.
             * @example my-extension
             */
            readonly name?: string | null;
            /**
             * @description Describes the extension.
             * @example Description of the extension.
             */
            readonly description?: string | null;
            /** @description An array of custom entity projection definitions. */
            readonly files?: readonly components["schemas"]["sap.graph.ExtensionFile-update"][];
        };
        /**
         * ExtensionFile
         * @description Defines a custom entity projection.
         */
        readonly "sap.graph.ExtensionFile": {
            /**
             * @description The name of the file.
             * @example my-extension-file.json
             */
            readonly name?: string | null;
            /** @description A custom entity projection definition serialized as JSON or JSON-C. */
            readonly content?: string | null;
        };
        /**
         * ExtensionFile (for create)
         * @description Defines a custom entity projection.
         */
        readonly "sap.graph.ExtensionFile-create": {
            /**
             * @description The name of the file.
             * @example my-extension-file.json
             */
            readonly name?: string | null;
            /** @description A custom entity projection definition serialized as JSON or JSON-C. */
            readonly content?: string | null;
        };
        /**
         * ExtensionFile (for update)
         * @description Defines a custom entity projection.
         */
        readonly "sap.graph.ExtensionFile-update": {
            /**
             * @description The name of the file.
             * @example my-extension-file.json
             */
            readonly name?: string | null;
            /** @description A custom entity projection definition serialized as JSON or JSON-C. */
            readonly content?: string | null;
        };
        /** ExtensionRef */
        readonly "sap.graph.ExtensionRef": {
            /** @description The name of the extension provided by the user. */
            readonly name?: string | null;
        };
        /** ExtensionRef (for create) */
        readonly "sap.graph.ExtensionRef-create": {
            /** @description The name of the extension provided by the user. */
            readonly name?: string | null;
        };
        /** ExtensionRef (for update) */
        readonly "sap.graph.ExtensionRef-update": {
            /** @description The name of the extension provided by the user. */
            readonly name?: string | null;
        };
        /**
         * GraphConfiguration
         * @description Configuration specifies a business data graph.
         */
        readonly "sap.graph.GraphConfiguration": {
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04.0000000Z
             */
            readonly lastModified?: string | null;
            /**
             * @description A unique identifier that developers use in the Graph URL to access the business data graph. It must be a short string of up to 20 lowercase alphanumeric characters and hyphen separators.
             * @example abc-xyz-123mn
             */
            readonly businessDataGraphIdentifier?: string;
            /**
             * @description The version of the Graph configuration object.
             * @example 1.2.0
             */
            readonly schemaVersion?: string | null;
            /**
             * @description Describes the Graph configuration.
             * @default
             * @example Description of the Graph configuration.
             */
            readonly description: string | null;
            /**
             * @description The latest version of the unified API entities of Graph. When generating the configuration, the version is set to the latest available graph model version.
             * @example 1.0.0
             */
            readonly graphModelVersion?: string | null;
            /**
             * @description The Graph model version that is in use for the current Graph configuration.
             * @example 1.0.0
             */
            readonly effectiveGraphModelVersion?: string | null;
            /** @description Excludes mirrored entities from the business data graph. */
            readonly exclude?: readonly string[];
            /** @description Lists the services (APIs) that are configured as destinations in the landscape. */
            readonly dataSources?: readonly components["schemas"]["sap.graph.DataSource"][];
            /** @description Provides Graph with the information to determine where requested data is located. */
            readonly locatingPolicy?: components["schemas"]["sap.graph.LocatingPolicy"] | null;
            /**
             * @description Detailed information about the state of the business data graph.
             * @example Graph configuration processing completed successfully, deployment has been initiated.
             */
            readonly statusDetails?: string | null;
            /** @description A log that provides information, warning, and error messages from the last activation of the business data graph. */
            readonly logMessages?: readonly components["schemas"]["sap.graph.LogMessage"][];
            /** @description Specifies the name of the extensions that are applied to the business data graph. */
            readonly extensions?: readonly components["schemas"]["sap.graph.ExtensionRef"][];
            /**
             * @description The state of the business data graph during design time.
             * @example DEPLOYMENT_INITIATED
             * @enum {string|null}
             */
            readonly status?: "PROCESSING" | "DEPLOYMENT_INITIATED" | "FAILED" | null;
        };
        /**
         * GraphConfiguration (for create)
         * @description Configuration specifies a business data graph.
         */
        readonly "sap.graph.GraphConfiguration-create": {
            /**
             * @description A unique identifier that developers use in the Graph URL to access the business data graph. It must be a short string of up to 20 lowercase alphanumeric characters and hyphen separators.
             * @example abc-xyz-123mn
             */
            readonly businessDataGraphIdentifier: string;
            /**
             * @description The version of the Graph configuration object.
             * @example 1.2.0
             */
            readonly schemaVersion?: string | null;
            /**
             * @description Describes the Graph configuration.
             * @default
             * @example Description of the Graph configuration.
             */
            readonly description: string | null;
            /**
             * @description The latest version of the unified API entities of Graph. When generating the configuration, the version is set to the latest available graph model version.
             * @example 1.0.0
             */
            readonly graphModelVersion?: string | null;
            /** @description Excludes mirrored entities from the business data graph. */
            readonly exclude?: readonly string[];
            /** @description Lists the services (APIs) that are configured as destinations in the landscape. */
            readonly dataSources?: readonly components["schemas"]["sap.graph.DataSource-create"][];
            /** @description Provides Graph with the information to determine where requested data is located. */
            readonly locatingPolicy?: components["schemas"]["sap.graph.LocatingPolicy-create"] | null;
            /** @description Specifies the name of the extensions that are applied to the business data graph. */
            readonly extensions?: readonly components["schemas"]["sap.graph.ExtensionRef-create"][];
        };
        /**
         * GraphConfiguration (for update)
         * @description Configuration specifies a business data graph.
         */
        readonly "sap.graph.GraphConfiguration-update": {
            /**
             * @description The version of the Graph configuration object.
             * @example 1.2.0
             */
            readonly schemaVersion?: string | null;
            /**
             * @description Describes the Graph configuration.
             * @default
             * @example Description of the Graph configuration.
             */
            readonly description: string | null;
            /**
             * @description The latest version of the unified API entities of Graph. When generating the configuration, the version is set to the latest available graph model version.
             * @example 1.0.0
             */
            readonly graphModelVersion?: string | null;
            /** @description Excludes mirrored entities from the business data graph. */
            readonly exclude?: readonly string[];
            /** @description Lists the services (APIs) that are configured as destinations in the landscape. */
            readonly dataSources?: readonly components["schemas"]["sap.graph.DataSource-update"][];
            /** @description Provides Graph with the information to determine where requested data is located. */
            readonly locatingPolicy?: components["schemas"]["sap.graph.LocatingPolicy-update"] | null;
            /** @description Specifies the name of the extensions that are applied to the business data graph. */
            readonly extensions?: readonly components["schemas"]["sap.graph.ExtensionRef-update"][];
        };
        /**
         * InterSourceForeignKey
         * @description Defines a reference between two entities provided by different services. Technically, this defines an inclusion dependency stating that every existing list of the given attributes in the source is contained as a list of given attributes in the target.
         */
        readonly "sap.graph.InterSourceForeignKey": {
            /** @description Optionally, restricts the foreign key to locating rules with an identical set of cues. */
            readonly cues?: readonly (string | null)[];
            /** @description Specifies a foreign key. */
            readonly foreignKey?: components["schemas"]["sap.graph.TupleSpecification"] | null;
            /** @description Specifies a reference to the foreign key. */
            readonly references?: components["schemas"]["sap.graph.TupleSpecification"] | null;
        };
        /**
         * InterSourceForeignKey (for create)
         * @description Defines a reference between two entities provided by different services. Technically, this defines an inclusion dependency stating that every existing list of the given attributes in the source is contained as a list of given attributes in the target.
         */
        readonly "sap.graph.InterSourceForeignKey-create": {
            /** @description Optionally, restricts the foreign key to locating rules with an identical set of cues. */
            readonly cues?: readonly (string | null)[];
            /** @description Specifies a foreign key. */
            readonly foreignKey?: components["schemas"]["sap.graph.TupleSpecification-create"] | null;
            /** @description Specifies a reference to the foreign key. */
            readonly references?: components["schemas"]["sap.graph.TupleSpecification-create"] | null;
        };
        /**
         * InterSourceForeignKey (for update)
         * @description Defines a reference between two entities provided by different services. Technically, this defines an inclusion dependency stating that every existing list of the given attributes in the source is contained as a list of given attributes in the target.
         */
        readonly "sap.graph.InterSourceForeignKey-update": {
            /** @description Optionally, restricts the foreign key to locating rules with an identical set of cues. */
            readonly cues?: readonly (string | null)[];
            /** @description Specifies a foreign key. */
            readonly foreignKey?: components["schemas"]["sap.graph.TupleSpecification-update"] | null;
            /** @description Specifies a reference to the foreign key. */
            readonly references?: components["schemas"]["sap.graph.TupleSpecification-update"] | null;
        };
        /**
         * KeyMappingDecoratorStrategy
         * @description Strategy defining a bi-directional transformation of key values.
         */
        readonly "sap.graph.KeyMappingDecoratorStrategy": {
            /**
             * @description Name of the strategy.
             * @example format
             * @enum {string|null}
             */
            readonly name?: "format" | null;
            /**
             * @description Specific to strategy "format". A regular expression to extract the parts of the attribute value. Use named capturing groups to identify each part.
             * @example 0{4}(?<category>.{5}).(?<num>[+ 0-9]{3})$
             */
            readonly match?: string | null;
            /**
             * @description Specific to strategy "format". A pattern of the referenced attribute value. Use $<name> to reference the values of the capturing groups used in match (keep < and >). Every name used in replace must occur in match.
             * @example $<category>_$<num>
             */
            readonly replace?: string | null;
        };
        /**
         * KeyMappingDecoratorStrategy (for create)
         * @description Strategy defining a bi-directional transformation of key values.
         */
        readonly "sap.graph.KeyMappingDecoratorStrategy-create": {
            /**
             * @description Name of the strategy.
             * @example format
             * @enum {string|null}
             */
            readonly name?: "format" | null;
            /**
             * @description Specific to strategy "format". A regular expression to extract the parts of the attribute value. Use named capturing groups to identify each part.
             * @example 0{4}(?<category>.{5}).(?<num>[+ 0-9]{3})$
             */
            readonly match?: string | null;
            /**
             * @description Specific to strategy "format". A pattern of the referenced attribute value. Use $<name> to reference the values of the capturing groups used in match (keep < and >). Every name used in replace must occur in match.
             * @example $<category>_$<num>
             */
            readonly replace?: string | null;
        };
        /**
         * KeyMappingDecoratorStrategy (for update)
         * @description Strategy defining a bi-directional transformation of key values.
         */
        readonly "sap.graph.KeyMappingDecoratorStrategy-update": {
            /**
             * @description Name of the strategy.
             * @example format
             * @enum {string|null}
             */
            readonly name?: "format" | null;
            /**
             * @description Specific to strategy "format". A regular expression to extract the parts of the attribute value. Use named capturing groups to identify each part.
             * @example 0{4}(?<category>.{5}).(?<num>[+ 0-9]{3})$
             */
            readonly match?: string | null;
            /**
             * @description Specific to strategy "format". A pattern of the referenced attribute value. Use $<name> to reference the values of the capturing groups used in match (keep < and >). Every name used in replace must occur in match.
             * @example $<category>_$<num>
             */
            readonly replace?: string | null;
        };
        /**
         * LocatingPolicy
         * @description Provides Graph with the information to determine where requested data is located.
         */
        readonly "sap.graph.LocatingPolicy": {
            /**
             * @description Describes the locating policy.
             * @default
             * @example Description of the locating policy.
             */
            readonly description: string | null;
            /** @description Specifies OData query options used to select a subset of locating rules that are not the default ones. */
            readonly cues?: readonly components["schemas"]["sap.graph.Cue"][];
            /** @description A set of intersource foreign key definitions. That is, foreign keys that cross the boundary between two services. */
            readonly keyMapping?: readonly components["schemas"]["sap.graph.InterSourceForeignKey"][];
            /** @description Describes the location of the data for specific entity types. */
            readonly rules?: readonly components["schemas"]["sap.graph.LocatingPolicyRule"][];
        };
        /**
         * LocatingPolicy (for create)
         * @description Provides Graph with the information to determine where requested data is located.
         */
        readonly "sap.graph.LocatingPolicy-create": {
            /**
             * @description Describes the locating policy.
             * @default
             * @example Description of the locating policy.
             */
            readonly description: string | null;
            /** @description Specifies OData query options used to select a subset of locating rules that are not the default ones. */
            readonly cues?: readonly components["schemas"]["sap.graph.Cue-create"][];
            /** @description A set of intersource foreign key definitions. That is, foreign keys that cross the boundary between two services. */
            readonly keyMapping?: readonly components["schemas"]["sap.graph.InterSourceForeignKey-create"][];
            /** @description Describes the location of the data for specific entity types. */
            readonly rules?: readonly components["schemas"]["sap.graph.LocatingPolicyRule-create"][];
        };
        /**
         * LocatingPolicy (for update)
         * @description Provides Graph with the information to determine where requested data is located.
         */
        readonly "sap.graph.LocatingPolicy-update": {
            /**
             * @description Describes the locating policy.
             * @default
             * @example Description of the locating policy.
             */
            readonly description: string | null;
            /** @description Specifies OData query options used to select a subset of locating rules that are not the default ones. */
            readonly cues?: readonly components["schemas"]["sap.graph.Cue-update"][];
            /** @description A set of intersource foreign key definitions. That is, foreign keys that cross the boundary between two services. */
            readonly keyMapping?: readonly components["schemas"]["sap.graph.InterSourceForeignKey-update"][];
            /** @description Describes the location of the data for specific entity types. */
            readonly rules?: readonly components["schemas"]["sap.graph.LocatingPolicyRule-update"][];
        };
        /**
         * LocatingPolicyRule
         * @description Describes the location of data of a specific entity type.
         */
        readonly "sap.graph.LocatingPolicyRule": {
            /**
             * @description Entity name, including a namespace, that the rule applies to. An asterisk * (wildcard) applies to all the entities in this namespace.
             * @example sap.s4.A_Product
             */
            readonly name?: string | null;
            /**
             * @description Name of the data source that is the leading system for this entity. The leading system is considered the default source of truth for a given entity.
             * @example s4
             */
            readonly leading?: string | null;
            /** @description List of data sources, where key-based references to this entity are treated as local references, overriding the leading system. */
            readonly local?: readonly string[];
            readonly cue?: components["schemas"]["sap.graph.CueReference"] | null;
            /** @description Optionally, specifies OData query options used to select a subset of locating rules that are not the default ones. The associated cues must exist in the locating policy cues array. */
            readonly cues?: readonly string[];
            /**
             * @description The full name of the mirrored source entity for which the rule applies. It is only applicable to composite custom entities.
             * @example company.custom.CustomProduct
             */
            readonly sourceEntity?: string | null;
        };
        /**
         * LocatingPolicyRule (for create)
         * @description Describes the location of data of a specific entity type.
         */
        readonly "sap.graph.LocatingPolicyRule-create": {
            /**
             * @description Entity name, including a namespace, that the rule applies to. An asterisk * (wildcard) applies to all the entities in this namespace.
             * @example sap.s4.A_Product
             */
            readonly name?: string | null;
            /**
             * @description Name of the data source that is the leading system for this entity. The leading system is considered the default source of truth for a given entity.
             * @example s4
             */
            readonly leading?: string | null;
            /** @description List of data sources, where key-based references to this entity are treated as local references, overriding the leading system. */
            readonly local?: readonly string[];
            readonly cue?: components["schemas"]["sap.graph.CueReference-create"] | null;
            /** @description Optionally, specifies OData query options used to select a subset of locating rules that are not the default ones. The associated cues must exist in the locating policy cues array. */
            readonly cues?: readonly string[];
            /**
             * @description The full name of the mirrored source entity for which the rule applies. It is only applicable to composite custom entities.
             * @example company.custom.CustomProduct
             */
            readonly sourceEntity?: string | null;
        };
        /**
         * LocatingPolicyRule (for update)
         * @description Describes the location of data of a specific entity type.
         */
        readonly "sap.graph.LocatingPolicyRule-update": {
            /**
             * @description Entity name, including a namespace, that the rule applies to. An asterisk * (wildcard) applies to all the entities in this namespace.
             * @example sap.s4.A_Product
             */
            readonly name?: string | null;
            /**
             * @description Name of the data source that is the leading system for this entity. The leading system is considered the default source of truth for a given entity.
             * @example s4
             */
            readonly leading?: string | null;
            /** @description List of data sources, where key-based references to this entity are treated as local references, overriding the leading system. */
            readonly local?: readonly string[];
            readonly cue?: components["schemas"]["sap.graph.CueReference-update"] | null;
            /** @description Optionally, specifies OData query options used to select a subset of locating rules that are not the default ones. The associated cues must exist in the locating policy cues array. */
            readonly cues?: readonly string[];
            /**
             * @description The full name of the mirrored source entity for which the rule applies. It is only applicable to composite custom entities.
             * @example company.custom.CustomProduct
             */
            readonly sourceEntity?: string | null;
        };
        /** LogMessage */
        readonly "sap.graph.LogMessage": {
            /** @enum {string|null} */
            readonly level?: "INFO" | "WARNING" | "ERROR" | null;
            readonly message?: string | null;
            /**
             * @description A unique code for error messages in the log.
             * @example 1000
             */
            readonly code?: string | null;
        };
        /**
         * TupleSpecification
         * @description Specifies a tuple of attributes of a given entity and data source.
         */
        readonly "sap.graph.TupleSpecification": {
            /**
             * @description Name of the data source.
             * @example s4
             */
            readonly dataSource?: string | null;
            /**
             * @description Fully qualified name of the entity.
             * @example sap.s4.A_Product
             */
            readonly entityName?: string | null;
            /** @description An ordered list of attributes identifying the entity in the other data source. */
            readonly attributes?: readonly string[];
            /** @description Defines a strategy to convert key values if the relationship between the foreign key and its reference does not have the same format. */
            readonly strategy?: components["schemas"]["sap.graph.KeyMappingDecoratorStrategy"] | null;
        };
        /**
         * TupleSpecification (for create)
         * @description Specifies a tuple of attributes of a given entity and data source.
         */
        readonly "sap.graph.TupleSpecification-create": {
            /**
             * @description Name of the data source.
             * @example s4
             */
            readonly dataSource?: string | null;
            /**
             * @description Fully qualified name of the entity.
             * @example sap.s4.A_Product
             */
            readonly entityName?: string | null;
            /** @description An ordered list of attributes identifying the entity in the other data source. */
            readonly attributes?: readonly string[];
            /** @description Defines a strategy to convert key values if the relationship between the foreign key and its reference does not have the same format. */
            readonly strategy?: components["schemas"]["sap.graph.KeyMappingDecoratorStrategy-create"] | null;
        };
        /**
         * TupleSpecification (for update)
         * @description Specifies a tuple of attributes of a given entity and data source.
         */
        readonly "sap.graph.TupleSpecification-update": {
            /**
             * @description Name of the data source.
             * @example s4
             */
            readonly dataSource?: string | null;
            /**
             * @description Fully qualified name of the entity.
             * @example sap.s4.A_Product
             */
            readonly entityName?: string | null;
            /** @description An ordered list of attributes identifying the entity in the other data source. */
            readonly attributes?: readonly string[];
            /** @description Defines a strategy to convert key values if the relationship between the foreign key and its reference does not have the same format. */
            readonly strategy?: components["schemas"]["sap.graph.KeyMappingDecoratorStrategy-update"] | null;
        };
        /** @description The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option. */
        readonly count: number | string;
        readonly error: {
            readonly error: {
                readonly code: string;
                readonly message: string;
                readonly target?: string;
                readonly details?: readonly {
                    readonly code: string;
                    readonly message: string;
                    readonly target?: string;
                }[];
                /** @description The structure of this object is service-specific */
                readonly innererror?: Record<string, never>;
            };
        };
    };
    responses: {
        /** @description Error */
        readonly error: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["error"];
            };
        };
    };
    parameters: {
        /**
         * @description Show only the first n items, see [Paging - Top](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptiontop)
         * @example 50
         */
        readonly top: number;
        /** @description Skip the first n items, see [Paging - Skip](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionskip) */
        readonly skip: number;
        /** @description Include count of items, see [Count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) */
        readonly count: boolean;
        /** @description Search items by search phrases, see [Searching](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionsearch) */
        readonly search: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
