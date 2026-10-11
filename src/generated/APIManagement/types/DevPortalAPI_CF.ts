export type paths = {
    readonly "/APIMgmt.APIProducts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all Product entities
         * @description A product is a vehicle that lets the Application developer know which APIs are exposed on the API Management portal. When you create an application, you select the Product to include in the application. For each application that you create, API Management generates an Application key and secret. Use this key to gain access to multiple products.
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
                /** @description Retrieved entities */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of APIProducts */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["developer.APIProductsType"][];
                            };
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
    readonly "/APIMgmt.APIProducts('{name}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get a specific product
         * @description A product is a vehicle that lets the Application developer know which APIs are exposed on the API Management portal. When you create an application, you select the Product to include in the application. For each application that you create, API Management generates an Application key and secret. Use this key to gain access to multiple products.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description name */
                    readonly name: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved entity */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["developer.APIProductsType"];
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
    readonly "/APIMgmt.APIProxies": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all entities from API Proxy
         * @description An API is exposed in API Management as an API Proxy. An API Proxy is a discrete representation of an API. It is implemented as a set of configuration files, policies, and code snippets that rely on the resource information provided by API Management. The API Proxy decouples an API from any backend changes. This provides flexibility to application developers to continue calling the same API.
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
                /** @description Retrieved entities */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of APIProxies */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["developer.APIProxiesType"][];
                            };
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
    readonly "/APIMgmt.APIProxies('{name}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get a specific entity from API Proxy
         * @description An API is exposed in API Management as an API Proxy. An API Proxy is a discrete representation of an API. It is implemented as a set of configuration files, policies, and code snippets that rely on the resource information provided by API Management. The API Proxy decouples an API from any backend changes. This provides flexibility to application developers to continue calling the same API.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description name */
                    readonly name: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved entity */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["developer.APIProxiesType"];
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
        readonly "developer.ApplicationsType": {
            readonly reg_id?: string | null;
            readonly id?: string;
            readonly version?: string;
            readonly developer_id?: string | null;
            readonly title?: string;
            readonly description?: string | null;
            readonly app_key?: string | null;
            readonly app_secret?: string | null;
            readonly callbackurl?: string | null;
            /** Format: date-time */
            readonly valid_from?: string | null;
            /** Format: date-time */
            readonly valid_to?: string | null;
            readonly status_code?: string | null;
            readonly created_by?: string | null;
            /** Format: date-time */
            readonly created_at?: string | null;
            readonly modified_by?: string | null;
            /** Format: date-time */
            readonly modified_at?: string | null;
            readonly ToAPIProductsDetails?: readonly components["schemas"]["developer.APIProductsType"][];
        };
        /** APIProductsType */
        readonly "developer.APIProductsType": {
            readonly name?: string;
            readonly title?: string;
            /** @example string */
            readonly reg_id?: string | null;
            readonly version?: string;
            /** @example string */
            readonly vendor?: string | null;
            /** @example string */
            readonly description?: string | null;
            /** @example string */
            readonly shortText?: string | null;
            /** @example string */
            readonly productResources?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly published_at?: string | null;
            /** @example string */
            readonly published_by?: string | null;
            /**
             * Format: float
             * @example 3.14
             */
            readonly avgRating?: (number | string) | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly ratingCount?: string | null;
            readonly isRestricted?: boolean | null;
            readonly managed?: boolean | null;
            readonly ToApplicationDetails?: {
                readonly results?: readonly components["schemas"]["developer.ApplicationsType"][];
            };
            readonly ToAPIProxies?: {
                readonly results?: readonly components["schemas"]["developer.APIProxiesType"][];
            };
            readonly ToRatePlans?: {
                readonly results?: readonly components["schemas"]["developer.RatePlansType"][];
            };
            readonly ToSubscriptions?: {
                readonly results?: readonly components["schemas"]["developer.SubscriptionsType"][];
            };
        };
        /** SubscriptionsType */
        readonly "developer.SubscriptionsType": {
            readonly id?: string;
            /** @example string */
            readonly reg_id?: string | null;
            /** @example string */
            readonly app_id?: string | null;
            /** @example string */
            readonly product_id?: string | null;
            /** @example string */
            readonly developer_id?: string | null;
            /** @example string */
            readonly ratePlan_id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly validFrom?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly validTo?: string | null;
            /** @example string */
            readonly app_name?: string | null;
            readonly isSubscribed?: boolean | null;
            /** @example string */
            readonly status?: string | null;
            /** @example string */
            readonly comment?: string | null;
            /** @example string */
            readonly created_by?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly created_at?: string | null;
            /** @example string */
            readonly modified_by?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly modified_at?: string | null;
            readonly ToApplication?: components["schemas"]["developer.ApplicationsType"];
            readonly ToRatePlan?: components["schemas"]["developer.RatePlansType"];
            readonly ToAPIProduct?: components["schemas"]["developer.APIProductsType"];
        };
        /** RatePlansType */
        readonly "developer.RatePlansType": {
            /** @example string */
            readonly reg_id?: string | null;
            readonly id?: string;
            readonly name?: string;
            readonly isSeasonal?: boolean | null;
            readonly frequency?: string;
            /** @example string */
            readonly description?: string | null;
            /** @example string */
            readonly rate?: string | null;
            readonly currency?: string;
            readonly isActive?: boolean;
            /** @example string */
            readonly type?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly validFrom?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly validTo?: string | null;
            readonly ToSubscriptions?: {
                readonly results?: readonly components["schemas"]["developer.SubscriptionsType"][];
            };
        };
        readonly "developer.APIProxiesType": {
            readonly reg_id?: string | null;
            readonly version?: string;
            readonly name?: string;
            readonly title?: string;
            readonly description?: string | null;
            /** Format: date-time */
            readonly published_at?: string | null;
            readonly published_by?: string | null;
            readonly releaseStatus?: string | null;
            readonly service_code?: string | null;
            readonly ToAPIProducts?: readonly components["schemas"]["developer.APIProductsType"][];
            readonly ToProxyEndPoints?: readonly components["schemas"]["developer.ProxyEndPointsType"][];
        };
        readonly "developer.ProxyEndPointsType": {
            readonly id?: string;
            readonly reg_id?: string | null;
            readonly name?: string;
            readonly base_path?: string;
            readonly apiproxy_name?: string | null;
            /** @description This navigation property only contains information about the SWAGGER API resource. */
            readonly ToAPIResources?: readonly components["schemas"]["developer.APIResourcesType"][];
        };
        readonly "developer.APIResourcesType": {
            readonly id?: string;
            readonly reg_id?: string | null;
            readonly title?: string | null;
            readonly description?: string | null;
            readonly isGetChecked?: boolean | null;
            readonly isPostChecked?: boolean | null;
            readonly isPutChecked?: boolean | null;
            readonly isDeleteChecked?: boolean | null;
            readonly proxyendpoint_id?: string | null;
            readonly resource_path?: string | null;
            readonly ToAPIResourceDocumentation?: readonly components["schemas"]["developer.APIResourceDocumentationsType"][];
        };
        readonly "developer.APIResourceDocumentationsType": {
            readonly id?: string;
            readonly reg_id?: string | null;
            readonly mime_type?: string | null;
            readonly content?: string | null;
            readonly apiresource_id?: string | null;
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
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
