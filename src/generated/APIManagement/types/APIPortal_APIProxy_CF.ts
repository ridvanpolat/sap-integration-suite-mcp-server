export type paths = {
    readonly "/APIProxies": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * API proxies on the API portal
         * @description Returns all the API proxies on the API portal. An API proxy anonymize any HTTP endpoints like REST, OData or SOAP and enhance it with policies, and routes.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: components["parameters"]["filter"];
                    /** @description Include count of items */
                    readonly $count?: components["parameters"]["count"];
                    /** @description Search items by search phrases */
                    readonly $search?: components["parameters"]["search"];
                    /** @description Order by property values, see [OData Sorting](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398305) */
                    readonly $orderby?: "isPublished" | "isPublished desc" | "life_cycle" | "life_cycle desc" | "isVersioned" | "isVersioned desc" | "apiVersionGroup" | "apiVersionGroup desc" | "name" | "name desc" | "provider_name" | "provider_name desc" | "service_code" | "service_code desc" | "state" | "state desc" | "status_code" | "status_code desc" | "version" | "version desc" | "title" | "title desc" | "description" | "description desc";
                    /** @description Select properties to be returned, see [OData Select](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398297) */
                    readonly $select?: "isPublished" | "life_cycle" | "isVersioned" | "apiVersionGroup" | "name" | "provider_name" | "service_code" | "state" | "status_code" | "version" | "title" | "description";
                    /** @description Expand related entities, see [OData Expand](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398298) */
                    readonly $expand?: "apiProducts" | "apiProvider" | "fileResources" | "policies" | "proxyEndPoints" | "resources" | "targetEndPoints";
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description EntitySet APIProxies */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["apiportal.APIProxy"][];
                        };
                    };
                };
                readonly default: components["responses"]["error"];
            };
        };
        readonly put?: never;
        /**
         * API proxies on the API portal
         * @description Adds a new entity to the API proxies.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description New entity */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["apiportal.APIProxyPost"];
                };
            };
            readonly responses: {
                /** @description Created entity */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["apiportal.APIProxy"];
                        };
                    };
                };
                /** @description Bad Request */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                /** @description Unsupported Media Type */
                readonly 415: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                /** @description Internal Server Error */
                readonly 500: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/APIProxies('{name}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * API Proxy name used to identify the entity
         * @description Returns the entity with the specified name from the API proxies.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Revision number of the API proxy */
                    readonly revisionID?: number;
                    /** @description Select properties to be returned, see [OData Select](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398297) */
                    readonly $select?: "isPublished" | "life_cycle" | "isVersioned" | "apiVersionGroup" | "name" | "provider_name" | "service_code" | "state" | "status_code" | "version" | "title" | "description";
                    /** @description Expand related entities, see [OData Expand](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398298) */
                    readonly $expand?: "apiProducts" | "apiProvider" | "fileResources" | "policies" | "proxyEndPoints" | "resources" | "targetEndPoints";
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: name */
                    readonly name: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Entity APIProxy */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["apiportal.APIProxy"];
                    };
                };
                /** @description APIProxy Not Found */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly default: components["responses"]["error"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * API proxy from API proxies
         * @description Deletes the specified API proxy and its revision from the API portal. The behavior of the revision deletion depends on the selected `mode`.
         *
         *     -If the mode is set to `discarddraft`, the revision is deleted only if it is in a draft state.
         *
         *     -If the mode is `discardrevision`, the specified revision is deleted regardless of its state.
         *
         *     **Note**: That this operation is irreversible.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: {
                    readonly mode?: "discarddraft" | "discardrevision";
                    /** @description Required only for `discardrevision` mode */
                    readonly revisionID?: number;
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: name */
                    readonly name: string;
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
                /** @description The specified API proxy does not exist or has been deleted. Please provide a valid API proxy and try again. */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                /** @description API proxy revision or draft deletion is not allowed. */
                readonly 500: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * API proxy update
         * @description Allows multiple actions on an API proxy revision, based on the mode `query parameter`. Supported values for mode include saveasrevision, revertrevision, deploy, and undeploy.
         */
        readonly patch: {
            readonly parameters: {
                readonly query: {
                    readonly mode: "saveasrevision" | "revertfromrevision" | "deploy" | "undeploy";
                    /** @description Required only for `revertfromrevision` mode */
                    readonly revisionID?: number;
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: name */
                    readonly name: string;
                };
                readonly cookie?: never;
            };
            /**
             * @description Patch request
             *      ***Note**: *When copying the code, remove the comments and keep only the payload relevant to the selected mode*
             */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": string;
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
                /** @description This API cannot be undeployed as it is the only API Proxy associated with the product. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                /** @description Requested entity could not be found. */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                /** @description UPDATE operation not supported on APIProxy entity. */
                readonly 405: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                /** @description API Proxy Revision creation or revert is not allowed */
                readonly 500: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly default: components["responses"]["error"];
            };
        };
        readonly trace?: never;
    };
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
         * Send a group of requests
         * @description Group multiple requests into a single request payload. For more information, see [Batch Requests](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=152).
         *
         *      ***Note:** *The "Try out" action is not supported for this request.*
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            /**
             * @description Batch request
             *     ***Note**: *While copying the code, please remove the comments from the examples.*
             */
            readonly requestBody: {
                readonly content: {
                    readonly "multipart/mixed;boundary=request-separator": string;
                };
            };
            readonly responses: {
                /** @description Batch response */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "multipart/mixed": string;
                    };
                };
                /** @description Bad Request */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "multipart/mixed": components["schemas"]["odata.error"];
                    };
                };
                /** @description Unsupported Media Type */
                readonly 415: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "multipart/mixed": components["schemas"]["odata.error"];
                    };
                };
                /** @description Internal Server Error */
                readonly 500: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "multipart/mixed": components["schemas"]["odata.error"];
                    };
                };
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/GetAllRevisions": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * API proxies revisions on the API portal
         * @description Returns all the revisions of API proxies on the API portal.
         */
        readonly get: {
            readonly parameters: {
                readonly query: {
                    /** @description 'key:apiProxyName' */
                    readonly apiProxyName: string;
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description APIProxies Revision */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["apiportal.ApiRevision"][];
                        };
                    };
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
         * @description --request-separator
         *
         *     Content-Type: multipart/mixed;boundary=changeset-separator
         *
         *     Content-Transfer-Encoding: binary
         *
         *     --changeset-separator
         *
         *     PUT APIProxies({name})/?saveLocal=true HTTP/1.1
         *
         *     x-csrf-token: {x-csrf-token}
         *
         *     Accept-Language: en
         *
         *     Accept: application/json
         *
         *
         *     RequestId: {requestId}
         *
         *     Content-Type: application/json
         *
         *     Content-Length: {content-length}
         *
         *
         *
         *     {...}
         *
         *     --changeset-separator
         *
         *
         *
         *     Content-Type: application/http
         *
         *     Content-Transfer-Encoding: binary
         *
         *     POST Policies HTTP/1.1
         *
         *     x-csrf-token: {x-csrf-token}
         *
         *     Accept-Language: en
         *
         *     Accept: application/json
         *
         *
         *     RequestId: {requestId}
         *
         *     Content-Type: application/json
         *
         *     Content-Length: {content-length}
         *
         *     {...}
         *
         *     --changeset-separator--
         *
         *     --request-separator--
         */
        readonly payload: string;
        readonly "odata.error": {
            readonly error?: components["schemas"]["odata.error.main"];
        };
        readonly "odata.error.main": {
            readonly code?: string;
            readonly message?: components["schemas"]["odata.error.message"];
            /** @description The contents of this object are service-defined */
            readonly innererror?: unknown;
        };
        readonly "odata.error.message": {
            readonly lang?: string;
            readonly value?: string;
        };
        /** Resource */
        readonly "apiportal.Resource": {
            readonly locale?: string;
            /** @default null */
            readonly long_text: string;
            /** @default null */
            readonly medium_text: string;
            readonly object_id?: string;
            /** @default null */
            readonly short_text: string;
            readonly type?: string;
        };
        readonly "apiportal.APIProxyPost": {
            /**
             * @description Indicates whether the API Proxy is published or not.
             * @default false
             */
            readonly isPublished: boolean;
            /**
             * @description Indicates whether the version is enabled for API Proxy or not.
             * @default null
             */
            readonly isVersioned: boolean;
            /** @description Technical name of the API Proxy. */
            readonly name: string;
            /**
             * @description Technical name of the API Proxy Provider.
             * @default NONE
             */
            readonly provider_name: string;
            /**
             * @description APIProxy of the type REST, ODATA or SOAP.
             * @default REST
             */
            readonly service_code: string;
            /**
             * @description It verifies whether the status of the API Proxy on the runtime is DEPLOYED or UNDEPLOYED.
             * @default UNDEPLOYED
             */
            readonly state: string;
            /**
             * @description Checks whether the API Proxy status is EXTERNAL or REGISTERED.
             * @default REGISTERED
             */
            readonly status_code: string;
            /**
             * @description Current state of the API Proxy.
             * @default null
             */
            readonly releaseStatus: string;
            /**
             * @description Current version of the API Proxy.
             * @default 1
             */
            readonly version: string;
            /**
             * @description Title of the API Proxy displayed on the Product.
             * @default null
             */
            readonly title: string;
            /**
             * @description API Proxy description.
             * @default null
             */
            readonly description: string;
            /**
             * @description API Proxy short text.
             * @default null
             */
            readonly shortText: string;
            /**
             * @description Policy templates attached to the API Proxy.
             * @default null
             * @example policy-template-name1,policy-template-name2
             */
            readonly policyTemplateNames: string;
            /**
             * @description List of the API Providers associated with the API Proxy.
             * @default null
             */
            readonly apiProvider: readonly {
                /**
                 * @description Description of the API Provider.
                 * @default null
                 */
                readonly description: string;
                /**
                 * @description Destination type of the API Provider.
                 * @default null
                 * @enum {string}
                 */
                readonly destType: "ODATA" | "CPIDISCOVERY" | "CPIRUNTIME";
                /**
                 * @description API Provider host.
                 * @default example.com
                 */
                readonly host: string;
                /** @description The technical name of the API Provider. */
                readonly name?: string;
                /**
                 * @description Indicates whether all the certificates attached to the API Provider are authorized.
                 * @default null
                 * @enum {boolean}
                 */
                readonly trustAll: false | true;
                /**
                 * @description API Provider title
                 * @default null
                 */
                readonly title: string;
                /**
                 * @description API Provider authentication type.
                 * @enum {string}
                 */
                readonly authType?: "NONE" | "BASIC";
                /**
                 * Format: int32
                 * @description API Provider port.
                 * @default 1
                 */
                readonly port: number;
                /**
                 * @description API Provider path prefix.
                 * @default null
                 */
                readonly pathPrefix: string;
                /**
                 * @description Indicates whether the API Provider is useSSL enabled or not.
                 * @enum {boolean}
                 */
                readonly useSSL?: false | true;
                /**
                 * @description Indicates whether the API Provider is on-premise or not.
                 * @default null
                 * @enum {boolean}
                 */
                readonly isOnPremise: false | true;
                /**
                 * @description Name of API Provider cloudConnectorLocation.
                 * @default null
                 */
                readonly cloudConnectorLocation: string;
                /**
                 * @description Name of API Provider runtime authentication type.
                 * @default null
                 * @enum {string}
                 */
                readonly rt_auth: "NONE" | "PRINCIPALPROPAGATION";
                /**
                 * @description API Provider url
                 * @default null
                 */
                readonly url: string;
                /**
                 * @description API Provider authentication username.
                 * @default null
                 */
                readonly userName: string;
                /**
                 * @description API Provider authentication password.
                 * @default null
                 */
                readonly password: string;
                /**
                 * @description It's the API Provider SSL configuration.
                 * @default null
                 */
                readonly sslInfo: {
                    /** @default null */
                    readonly ciphers: string;
                    /** @default null */
                    readonly clientAuthEnabled: boolean;
                    /** @default null */
                    readonly enabled: boolean;
                    /** @default null */
                    readonly ignoreValidationErrors: boolean;
                    /** @default null */
                    readonly keyAlias: string;
                    /** @default null */
                    readonly keyStore: string;
                    /** @default null */
                    readonly protocols: string;
                    /** @default null */
                    readonly trustStore: string;
                };
            }[];
            /** @description API Proxy proxyEndPoints */
            readonly proxyEndPoints: readonly {
                /**
                 * @description It's the proxyEndPoint basepath.
                 * @default /{api_base_path}
                 */
                readonly base_path: string;
                /**
                 * @description Checks whether it's the default API proxyEndPoint.
                 * @default false
                 */
                readonly isDefault: boolean;
                /**
                 * @description Name of the proxyEndPoint associated with the API Proxy.
                 * @default default
                 */
                readonly name: string;
                /**
                 * @description Name of the API Resources associated with the proxyEndPoint.
                 * @default null
                 */
                readonly apiResources: readonly unknown[];
                /**
                 * @description ConditionalFlows of the API proxyEndPoint.
                 * @default null
                 */
                readonly conditionalFlows: readonly unknown[];
                /** @description It's the route rules configuration of the API proxyEndPoint. */
                readonly routeRules?: readonly {
                    readonly name?: string;
                    /** Format: int32 */
                    readonly sequence?: number;
                    readonly targetEndPointName?: string;
                }[];
                /**
                 * @description It's the virtualhosts configuration of the API proxyEndPoint.
                 * @default null
                 */
                readonly virtualhosts: readonly unknown[];
            }[];
            /** @description API Proxy targetEndPoints. */
            readonly targetEndPoints: readonly {
                /**
                 * @description Checks whether it's the default API targetEndPoints.
                 * @default false
                 */
                readonly isDefault: boolean;
                /**
                 * @description Name of the targetEndPoint associated with the API Proxy.
                 * @default default
                 */
                readonly name: string;
                /**
                 * @description It's the provider id associated with the API Proxy.
                 * @default NONE
                 */
                readonly provider_id: string;
                /**
                 * @description Relative path of the API targetEndPoint.
                 * @default null
                 */
                readonly relativePath: string;
                /**
                 * @description Url of the API targetEndPoint.
                 * @default null
                 */
                readonly url: string;
                /**
                 * @description Properties of the API targetEndPoint.
                 * @default []
                 */
                readonly properties: readonly unknown[];
                /**
                 * @description Name of the target API Proxy.
                 * @default null
                 */
                readonly targetAPIProxyName: string;
            }[];
            /**
             * @description Checks whether the API Proxy is to be cloned or not.
             * @default null
             */
            readonly isCopy: boolean;
            /**
             * @description Checks whether the API Proxy has delta changes or not.
             * @default null
             */
            readonly hasChanges: boolean;
            /**
             * @description Checks whether the API Proxy is externally managed or not.
             * @default null
             */
            readonly isUnmanaged: boolean;
        };
        /** APIProxy */
        readonly "apiportal.APIProxy": {
            /** @default null */
            readonly FK_PROVIDERNAME: string;
            /**
             * @description Indicates whether the API Proxy is published or not.
             * @default false
             */
            readonly isPublished: boolean;
            /**
             * @description Indicates whether the version is enabled for API Proxy or not.
             * @default false
             */
            readonly isVersioned: boolean;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            /** @description Technical name of the API Proxy. */
            readonly name?: string;
            /**
             * @description Version used in the API Proxy export.
             * @default null
             */
            readonly apiVersionGroup: string;
            /**
             * @description Technical name of the API Proxy Provider.
             * @default null
             */
            readonly provider_name: string;
            /**
             * @description APIProxy of the type REST, ODATA or SOAP.
             * @default REST
             * @enum {string}
             */
            readonly service_code: "REST" | "ODATA" | "SOAP";
            /**
             * @description It verifies whether the status of the API Proxy on the runtime is DEPLOYED or UNDEPLOYED.
             * @default UNDEPLOYED
             * @enum {string}
             */
            readonly state: "DEPLOYED" | "UNDEPLOYED";
            /**
             * @description Checks whether the API Proxy status is EXTERNAL or REGISTERED.
             * @default REGISTERED
             * @enum {string}
             */
            readonly status_code: "EXTERNAL" | "REGISTERED";
            /**
             * @description Current state of the API Proxy.
             * @default null
             */
            readonly releaseStatus: string;
            /**
             * @description API Proxy release metadata
             * @default null
             */
            readonly releaseMetadata: string;
            /**
             * @description Current version of the API Proxy.
             * @default null
             */
            readonly version: string;
            /**
             * @description Title of the API Proxy displayed on the Product.
             * @default null
             */
            readonly title: string;
            /**
             * @description API Proxy description.
             * @default null
             */
            readonly description: string;
            /**
             * Related Collection(apiportal.APIProduct)
             * @description List of Products associated with an api proxy.
             */
            readonly apiProducts?: {
                readonly results?: readonly components["schemas"]["apiportal.APIProduct"][];
            };
            readonly apiProvider?: components["schemas"]["apiportal.APIProvider"];
            /**
             * Related Collection(apiportal.FileResource)
             * @description List of the fileResources associated with the API Proxy.
             */
            readonly fileResources?: {
                readonly results?: readonly components["schemas"]["apiportal.FileResource"][];
            };
            /**
             * Related Collection(apiportal.Policy)
             * @description List of the policies associated with the API Proxy.
             */
            readonly policies?: {
                readonly results?: readonly components["schemas"]["apiportal.Policy"][];
            };
            /**
             * Related Collection(apiportal.APIProxyEndPoint)
             * @description List of the proxyEndPoints associated with the API Proxy.
             */
            readonly proxyEndPoints?: {
                readonly results?: readonly components["schemas"]["apiportal.APIProxyEndPoint"][];
            };
            /**
             * Related Collection(apiportal.Resource)
             * @description List of the resources associated with the API Proxy.
             */
            readonly resources?: {
                readonly results?: readonly components["schemas"]["apiportal.Resource"][];
            };
            /**
             * Related Collection(apiportal.APITargetEndPoint)
             * @description Available targetEndPoints for the API Proxy.
             */
            readonly targetEndPoints?: {
                readonly results?: readonly components["schemas"]["apiportal.APITargetEndPoint"][];
            };
            /**
             * @description Policy templates attached to the API Proxy.
             * @default null
             */
            readonly policyTemplateNames: string;
            /**
             * @description Checks whether the API Proxy to be  cloned or not.
             * @default false
             */
            readonly isCopy: boolean;
            /**
             * @description Checks whether the API Proxy has delta changes or not
             * @default false
             */
            readonly hasChanges: boolean;
            /**
             * @description Checks whether the API Proxy is externally managed or not.
             * @default false
             */
            readonly isUnmanaged: boolean;
        };
        /** Developer */
        readonly "apiportal.Developer": {
            /** @default null */
            readonly country: string;
            readonly emailId?: string;
            readonly firstName?: string;
            readonly id?: string;
            readonly lastName?: string;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            /** Related Collection(apiportal.Application) */
            readonly applications?: {
                readonly results?: readonly components["schemas"]["apiportal.Application"][];
            };
        };
        /** EndPointProperty */
        readonly "apiportal.EndPointProperty": {
            readonly id?: string;
            /** @default null */
            readonly name: string;
            /** @default null */
            readonly FK_PROXYENDPOINT_ID: string;
            /** @default null */
            readonly FK_TARGETENDPOINT_ID: string;
            /** @default null */
            readonly value: string;
            readonly proxyEndPoint?: components["schemas"]["apiportal.APIProxyEndPoint"];
            readonly targetEndPoint?: components["schemas"]["apiportal.APITargetEndPoint"];
        };
        /** APITargetEndPoint */
        readonly "apiportal.APITargetEndPoint": {
            /** @default null */
            readonly FK_API_NAME: string;
            /** @default null */
            readonly FK_DEFAULTFAULTRULE_ID: string;
            readonly id?: string;
            /** @default null */
            readonly isDefault: boolean;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            /** @default null */
            readonly name: string;
            /** @default null */
            readonly FK_POSTFLOW_ID: string;
            /** @default null */
            readonly FK_PREFLOW_ID: string;
            /** @default null */
            readonly provider_id: string;
            /** @default null */
            readonly relativePath: string;
            /** @default null */
            readonly url: string;
            readonly apiProxy?: components["schemas"]["apiportal.APIProxy"];
            /** Related Collection(apiportal.ConditionalFlowRule) */
            readonly conditionalFlows?: {
                readonly results?: readonly components["schemas"]["apiportal.ConditionalFlowRule"][];
            };
            readonly defaultFaultRule?: components["schemas"]["apiportal.DefaultFaultRule"];
            /** Related Collection(apiportal.FaultRule) */
            readonly faultRules?: {
                readonly results?: readonly components["schemas"]["apiportal.FaultRule"][];
            };
            readonly postFlow?: components["schemas"]["apiportal.FlowRule"];
            readonly preFlow?: components["schemas"]["apiportal.FlowRule"];
            /** Related Collection(apiportal.EndPointProperty) */
            readonly properties?: {
                readonly results?: readonly components["schemas"]["apiportal.EndPointProperty"][];
            };
        };
        /** Certificate */
        readonly "apiportal.Certificate": {
            /** @default null */
            readonly certName: string;
            /** @default null */
            readonly description: string;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string;
            readonly storeName?: string;
            /** @default null */
            readonly password: string;
            /** @default null */
            readonly storeType: string;
            /** @default null */
            readonly expiryDate: string;
            /** @default null */
            readonly issuerEmail: string;
            /** @default null */
            readonly subjectEmail: string;
            /** @default null */
            readonly signAlgName: string;
            /** @default null */
            readonly isValid: string;
            /** @default null */
            readonly validFrom: string;
            /** @default null */
            readonly version: string;
            /**
             * Format: base64url
             * @default null
             */
            readonly content: string;
            readonly certificateStore?: components["schemas"]["apiportal.CertificateStore"];
        };
        /** Step */
        readonly "apiportal.Step": {
            /** @default null */
            readonly condition: string;
            /** @default null */
            readonly FK_DEFAULTFAULTRULE_ID: string;
            /** @default null */
            readonly FK_FAULTRULE_ID: string;
            readonly id?: string;
            /** @default null */
            readonly policy_name: string;
            /**
             * Format: int32
             * @default null
             */
            readonly sequence: number;
            /** @default null */
            readonly FK_STREAM_ID: string;
            readonly defaultFaultRule?: components["schemas"]["apiportal.DefaultFaultRule"];
            readonly faultRule?: components["schemas"]["apiportal.FaultRule"];
            readonly stream?: components["schemas"]["apiportal.Stream"];
        };
        /** APIProxyEndPoint */
        readonly "apiportal.APIProxyEndPoint": {
            /** @default null */
            readonly FK_API_NAME: string;
            /** @default null */
            readonly base_path: string;
            /** @default null */
            readonly FK_DEFAULTFAULTRULE_ID: string;
            readonly id?: string;
            /** @default null */
            readonly isDefault: boolean;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            /** @default null */
            readonly name: string;
            /** @default null */
            readonly FK_POSTCLIENTFLOW_ID: string;
            /** @default null */
            readonly FK_POSTFLOW_ID: string;
            /** @default null */
            readonly FK_PREFLOW_ID: string;
            readonly apiProxy?: components["schemas"]["apiportal.APIProxy"];
            /** Related Collection(apiportal.APIResource) */
            readonly apiResources?: {
                readonly results?: readonly components["schemas"]["apiportal.APIResource"][];
            };
            /** Related Collection(apiportal.ConditionalFlowRule) */
            readonly conditionalFlows?: {
                readonly results?: readonly components["schemas"]["apiportal.ConditionalFlowRule"][];
            };
            readonly defaultFaultRule?: components["schemas"]["apiportal.DefaultFaultRule"];
            /** Related Collection(apiportal.FaultRule) */
            readonly faultRules?: {
                readonly results?: readonly components["schemas"]["apiportal.FaultRule"][];
            };
            readonly postClientFlow?: components["schemas"]["apiportal.FlowRule"];
            readonly postFlow?: components["schemas"]["apiportal.FlowRule"];
            readonly preFlow?: components["schemas"]["apiportal.FlowRule"];
            /** Related Collection(apiportal.EndPointProperty) */
            readonly properties?: {
                readonly results?: readonly components["schemas"]["apiportal.EndPointProperty"][];
            };
            /** Related Collection(apiportal.RouteRule) */
            readonly routeRules?: {
                readonly results?: readonly components["schemas"]["apiportal.RouteRule"][];
            };
            /** Related Collection(apiportal.VirtualHost) */
            readonly virtualhosts?: {
                readonly results?: readonly components["schemas"]["apiportal.VirtualHost"][];
            };
        };
        /** RouteRule */
        readonly "apiportal.RouteRule": {
            /** @default null */
            readonly conditions: string;
            readonly id?: string;
            /** @default null */
            readonly name: string;
            /** @default null */
            readonly FK_PROXYENDPOINT_ID: string;
            /**
             * Format: int32
             * @default null
             */
            readonly sequence: number;
            /** @default null */
            readonly targetEndPointName: string;
            /** @default null */
            readonly url: string;
            /** Related Collection(apiportal.FaultRule) */
            readonly faultRules?: {
                readonly results?: readonly components["schemas"]["apiportal.FaultRule"][];
            };
            readonly proxyEndPoint?: components["schemas"]["apiportal.APIProxyEndPoint"];
        };
        /** DefaultFaultRule */
        readonly "apiportal.DefaultFaultRule": {
            /** @default null */
            readonly alwaysEnforce: boolean;
            readonly id?: string;
            /** @default null */
            readonly name: string;
            /** @default null */
            readonly FK_PROXYENDPOINT_ID: string;
            /** @default null */
            readonly FK_TARGETENDPOINT_ID: string;
            readonly proxyEndPoint?: components["schemas"]["apiportal.APIProxyEndPoint"];
            /** Related Collection(apiportal.Step) */
            readonly steps?: {
                readonly results?: readonly components["schemas"]["apiportal.Step"][];
            };
            readonly targetEndPoint?: components["schemas"]["apiportal.APITargetEndPoint"];
        };
        /** Stream */
        readonly "apiportal.Stream": {
            /** @default null */
            readonly FK_FLOW_ID: string;
            readonly id?: string;
            /** @default null */
            readonly isRequest: boolean;
            readonly flow?: components["schemas"]["apiportal.FlowRule"];
            /** Related Collection(apiportal.Step) */
            readonly steps?: {
                readonly results?: readonly components["schemas"]["apiportal.Step"][];
            };
        };
        /** APIResource */
        readonly "apiportal.APIResource": {
            /** @default null */
            readonly FK_PROXYENDPOINT_ID: string;
            /** @default false */
            readonly canShowDelete: boolean;
            /** @default false */
            readonly canShowGet: boolean;
            /** @default false */
            readonly canShowPost: boolean;
            /** @default false */
            readonly canShowPut: boolean;
            readonly id?: string;
            /** @default false */
            readonly isDeleteChecked: boolean;
            /** @default false */
            readonly isGetChecked: boolean;
            /** @default false */
            readonly isPostChecked: boolean;
            /** @default false */
            readonly isPutChecked: boolean;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            /** @default null */
            readonly name: string;
            /** @default null */
            readonly proxyEndPointName: string;
            /** @default null */
            readonly resource_path: string;
            /** @default null */
            readonly title: string;
            /** @default null */
            readonly description: string;
            readonly apiProxyEndPoint?: components["schemas"]["apiportal.APIProxyEndPoint"];
            /** Related Collection(apiportal.Documentation) */
            readonly documentations?: {
                readonly results?: readonly components["schemas"]["apiportal.Documentation"][];
            };
            /** Related Collection(apiportal.Resource) */
            readonly resources?: {
                readonly results?: readonly components["schemas"]["apiportal.Resource"][];
            };
        };
        /** FaultRule */
        readonly "apiportal.FaultRule": {
            /** @default null */
            readonly condition: string;
            readonly id?: string;
            /** @default null */
            readonly name: string;
            /** @default null */
            readonly FK_PROXYENDPOINT_ID: string;
            /** @default null */
            readonly FK_ROUTERULE_ID: string;
            /** @default null */
            readonly FK_TARGETENDPOINT_ID: string;
            readonly proxyEndPoint?: components["schemas"]["apiportal.APIProxyEndPoint"];
            readonly routeRule?: components["schemas"]["apiportal.RouteRule"];
            /** Related Collection(apiportal.Step) */
            readonly steps?: {
                readonly results?: readonly components["schemas"]["apiportal.Step"][];
            };
            readonly targetEndPoint?: components["schemas"]["apiportal.APITargetEndPoint"];
        };
        /** FileResource */
        readonly "apiportal.FileResource": {
            /** @default null */
            readonly content: string;
            readonly id?: string;
            /** @default null */
            readonly name: string;
            /** @default null */
            readonly scope: string;
            /** @default null */
            readonly type: string;
            /** Related Collection(apiportal.APIProxy) */
            readonly apiProxies?: {
                readonly results?: readonly components["schemas"]["apiportal.APIProxy"][];
            };
        };
        /** CertificateStore */
        readonly "apiportal.CertificateStore": {
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string;
            /** @default null */
            readonly storeType: string;
            /** Related Collection(apiportal.Certificate) */
            readonly certificates?: {
                readonly results?: readonly components["schemas"]["apiportal.Certificate"][];
            };
        };
        /** KeyMapEntryValue */
        readonly "apiportal.KeyMapEntryValue": {
            readonly map_name?: string;
            readonly name?: string;
            /** @default null */
            readonly value: string;
            readonly keyMapEntry?: components["schemas"]["apiportal.KeyMapEntry"];
        };
        /** APIProduct */
        readonly "apiportal.APIProduct": {
            /** @default null */
            readonly isPublished: boolean;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string;
            /**
             * Format: date-time
             * @default null
             */
            readonly published_at: string;
            /** @default null */
            readonly published_by: string;
            /**
             * Format: int32
             * @default null
             */
            readonly quotaCount: number;
            /**
             * Format: int32
             * @default null
             */
            readonly quotaInterval: number;
            /** @default null */
            readonly quotaTimeUnit: string;
            /** @default null */
            readonly scope: string;
            /** @default null */
            readonly status_code: string;
            /** @default null */
            readonly version: string;
            /** @default null */
            readonly title: string;
            /** @default null */
            readonly description: string;
            /** Related Collection(apiportal.APIProxy) */
            readonly apiProxies?: {
                readonly results?: readonly components["schemas"]["apiportal.APIProxy"][];
            };
            /** Related Collection(apiportal.APIResource) */
            readonly apiResources?: {
                readonly results?: readonly components["schemas"]["apiportal.APIResource"][];
            };
            /** Related Collection(apiportal.Application) */
            readonly applications?: {
                readonly results?: readonly components["schemas"]["apiportal.Application"][];
            };
            /** Related Collection(apiportal.Resource) */
            readonly resources?: {
                readonly results?: readonly components["schemas"]["apiportal.Resource"][];
            };
        };
        /** APIProvider */
        readonly "apiportal.APIProvider": {
            /**
             * @description Indicates whether API Provider is on-premise or not
             * @default null
             */
            readonly isOnPremise: boolean;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            /** @description The technical name of the API Provider. */
            readonly name?: string;
            readonly sslInfo?: components["schemas"]["apiportal.SSLInfo"];
            /**
             * @description API Provider url
             * @default null
             */
            readonly url: string;
            /**
             * @description API Provider title
             * @default null
             */
            readonly title: string;
            /**
             * @description Description of the API Provider.
             * @default null
             */
            readonly description: string;
            /**
             * @description Destination type of the API Provider.
             * @default null
             */
            readonly destType: string;
            /**
             * @description API Provider host.
             * @default null
             */
            readonly host: string;
            /**
             * Format: int32
             * @description API Provider port
             * @default null
             */
            readonly port: number;
            /**
             * @description Indicates whether API Provider useSSL or not
             * @default null
             */
            readonly useSSL: boolean;
            /**
             * @description Indicates whether all the certificates attached to the API Provider are authorized.
             * @default null
             */
            readonly trustAll: boolean;
            /**
             * @description API Provider authentication username
             * @default null
             */
            readonly userName: string;
            /**
             * @description API Provider authentication password
             * @default null
             */
            readonly password: string;
            /**
             * @description API Provider authentication type
             * @default null
             */
            readonly authType: string;
            /**
             * @description API Provider path prefix
             * @default null
             */
            readonly pathPrefix: string;
            /**
             * Format: int32
             * @description API Provider timeout
             * @default null
             */
            readonly timeout: number;
            /**
             * @description API Provider cockpit url
             * @default null
             */
            readonly cockpit_url: string;
            /**
             * Related Collection(apiportal.APIProxy)
             * @description API Provider associated API Proxies
             */
            readonly apiProxies?: {
                readonly results?: readonly components["schemas"]["apiportal.APIProxy"][];
            };
            /**
             * Related Collection(apiportal.Resource)
             * @description API Provider associated Resources
             */
            readonly resources?: {
                readonly results?: readonly components["schemas"]["apiportal.Resource"][];
            };
        };
        /** KeyMapEntry */
        readonly "apiportal.KeyMapEntry": {
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string;
            /** Related Collection(apiportal.KeyMapEntryValue) */
            readonly keyMapEntryValues?: {
                readonly results?: readonly components["schemas"]["apiportal.KeyMapEntryValue"][];
            };
        };
        /** FlowRule */
        readonly "apiportal.FlowRule": {
            readonly id?: string;
            /** @default null */
            readonly FK_REQUEST_ID: string;
            /** @default null */
            readonly FK_RESPONSE_ID: string;
            readonly request?: components["schemas"]["apiportal.Stream"];
            readonly response?: components["schemas"]["apiportal.Stream"];
        };
        /** ConditionalFlowRule */
        readonly "apiportal.ConditionalFlowRule": {
            /** @default null */
            readonly FK_APIRESOURCE_ID: string;
            /** @default null */
            readonly conditions: string;
            readonly id?: string;
            /** @default null */
            readonly name: string;
            /** @default null */
            readonly FK_PROXYENDPOINT_ID: string;
            /** @default null */
            readonly readOnly: boolean;
            /** @default null */
            readonly FK_REQUEST_ID: string;
            /** @default null */
            readonly FK_RESPONSE_ID: string;
            /**
             * Format: int32
             * @default null
             */
            readonly sequence: number;
            /** @default null */
            readonly FK_TARGETENDPOINT_ID: string;
            readonly apiResource?: components["schemas"]["apiportal.APIResource"];
            readonly proxyEndPoint?: components["schemas"]["apiportal.APIProxyEndPoint"];
            readonly request?: components["schemas"]["apiportal.Stream"];
            readonly response?: components["schemas"]["apiportal.Stream"];
            readonly targetEndPoint?: components["schemas"]["apiportal.APITargetEndPoint"];
        };
        /** Policy */
        readonly "apiportal.Policy": {
            /** @default null */
            readonly FK_API_NAME: string;
            readonly id?: string;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            /** @default null */
            readonly name: string;
            /** @default null */
            readonly policy_content: string;
            /** @default null */
            readonly type: string;
            readonly apiProxy?: components["schemas"]["apiportal.APIProxy"];
        };
        /** Documentation */
        readonly "apiportal.Documentation": {
            /** @default null */
            readonly FK_APIRESOURCE_ID: string;
            /** @default null */
            readonly apiResourceName: string;
            /** @default null */
            readonly content: string;
            readonly id?: string;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly locale?: string;
            /** @default null */
            readonly mime_type: string;
            readonly apiResource?: components["schemas"]["apiportal.APIResource"];
        };
        /** Application */
        readonly "apiportal.Application": {
            /** @default null */
            readonly callbackurl: string;
            /** @default null */
            readonly FK_DEVELOPER_ID: string;
            readonly id?: string;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            /** @default null */
            readonly status_code: string;
            /**
             * Format: date-time
             * @default null
             */
            readonly valid_from: string;
            /**
             * Format: date-time
             * @default null
             */
            readonly valid_to: string;
            /** @default null */
            readonly version: string;
            /** @default null */
            readonly title: string;
            /** @default null */
            readonly description: string;
            /** @default null */
            readonly app_key: string;
            /** @default null */
            readonly app_secret: string;
            /** Related Collection(apiportal.APIProduct) */
            readonly apiProducts?: {
                readonly results?: readonly components["schemas"]["apiportal.APIProduct"][];
            };
            readonly developer?: components["schemas"]["apiportal.Developer"];
            /** Related Collection(apiportal.Resource) */
            readonly resources?: {
                readonly results?: readonly components["schemas"]["apiportal.Resource"][];
            };
        };
        /** VirtualHost */
        readonly "apiportal.VirtualHost": {
            readonly id?: string;
            /** @default false */
            readonly isDefault: boolean;
            /** @default false */
            readonly isSSL: boolean;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            /** @default null */
            readonly name: string;
            /** @default null */
            readonly projectPath: string;
            /** @default null */
            readonly virtual_host: string;
            /**
             * Format: int32
             * @default null
             */
            readonly virtual_port: number;
        };
        /** ApiRevision */
        readonly "apiportal.ApiRevision": {
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            /** @default null */
            readonly changed_at: string;
            /**
             * Format: date-time
             * @default null
             */
            readonly created_at: string;
            /** @default null */
            readonly created_by: string;
        };
        /** History */
        readonly "apiportal.History": {
            /**
             * Format: date-time
             * @default null
             */
            readonly changed_at: string;
            /** @default null */
            readonly changed_by: string;
            /**
             * Format: date-time
             * @default null
             */
            readonly created_at: string;
            /** @default null */
            readonly created_by: string;
        };
        /** SSLInfo */
        readonly "apiportal.SSLInfo": {
            /** @default null */
            readonly ciphers: string;
            /** @default false */
            readonly clientAuthEnabled: boolean;
            /** @default false */
            readonly enabled: boolean;
            /** @default false */
            readonly ignoreValidationErrors: boolean;
            /** @default null */
            readonly keyAlias: string;
            /** @default null */
            readonly keyStore: string;
            /** @default null */
            readonly protocols: string;
            /** @default null */
            readonly trustStore: string;
        };
    };
    responses: {
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
        /** @description Show only the first n items */
        readonly top: number;
        /** @description Skip the first n items */
        readonly skip: number;
        /** @description Include count of items */
        readonly count: boolean;
        /** @description Filter items by property values */
        readonly filter: string;
        /** @description Search items by search phrases */
        readonly search: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
