export type paths = {
    readonly "/APIMgmt.Applications('{id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get a specific Application
         * @description This operation retrieves specific application details using the application id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Application id */
                    readonly id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved Application entity */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["developer.ApplicationsType"];
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
    readonly "/APIMgmt.Applications": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Create an application entity
         * @description This operation creates a new application.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description New entity */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["applicationPost"];
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
                            readonly d?: components["schemas"]["developer.ApplicationsType"];
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
    readonly "/APIMgmt.Applications('{id}')/ToAttributes": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all custom attributes of a specific Application
         * @description This operation retrieves all the custom attributes of a specific application based on the application id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Application id */
                    readonly id: string;
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
                            /** Collection of Custom Attributes */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["developer.AttributeType"][];
                            };
                        };
                    };
                };
                readonly default: components["responses"]["error"];
            };
        };
        readonly put?: never;
        /**
         * Add new custom attribute to a specific application
         * @description This operation will add a new custom attribute to a specified application based on application id.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Application id */
                    readonly id: string;
                };
                readonly cookie?: never;
            };
            /** @description New custom attribute entity */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["developer.AttributeType"];
                };
            };
            readonly responses: {
                /** @description Created custom attribute entity */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["developer.AttributeType"];
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
    readonly "/APIMgmt.Attributes(name='{attribute_name}',entityId='{application_id},entityType='{entity_type}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get a specific custom attribute of a given application
         * @description This operation retrieves a specific custom attribute attached to an application based on the custom attribute name and application id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description custom attribute name */
                    readonly attribute_name: string;
                    /** @description id of an application to which the custom attribute is attached */
                    readonly application_id: string;
                    /** @description Type of an entity having a custom attribute. Value for this field is always 'applications' */
                    readonly entity_type: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved custom attribute entity */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["developer.AttributeType"];
                        };
                    };
                };
                readonly default: components["responses"]["error"];
            };
        };
        /**
         * Update the value of a specific custom attribute of a given application
         * @description This operation updates a specific custom attribute attached to an application based on the custom attribute name and application id.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description custom attribute name */
                    readonly attribute_name: string;
                    /** @description id of an application to which the custom attribute is attached */
                    readonly application_id: string;
                    /** @description Type of an entity having a custom attribute. Value for this field is always 'applications' */
                    readonly entity_type: string;
                };
                readonly cookie?: never;
            };
            /** @description Enter the updated value for custom attribute */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["customAttributePut"];
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
        readonly post?: never;
        /**
         * Delete a custom attribute of a given application
         * @description This operation deletes a specific custom attribute attached to an application based on the custom attribute name and application id.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description custom attribute name */
                    readonly attribute_name: string;
                    /** @description id of an application to which the custom attribute is attached */
                    readonly application_id: string;
                    /** @description Type of an entity having a custom attribute. Value for this field is always 'applications' */
                    readonly entity_type: string;
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
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        readonly applicationPost: {
            /** @default 00000000000000000000000000000000 */
            readonly id: string;
            /** @default 1 */
            readonly version: string;
            readonly title?: string;
            readonly description?: string | null;
            readonly shortText?: string | null;
            readonly ToSubscriptions?: readonly {
                /** @default 00000000000000000000000000000000 */
                readonly id: string;
                readonly ToAPIProduct?: readonly {
                    readonly items?: {
                        /** @default APIMgmt.APIProducts('productname') */
                        readonly uri: string;
                    };
                }[];
                readonly ToRatePlan?: readonly {
                    readonly __metadata?: {
                        /** @default APIMgmt.RatePlans('RatePlan_ID') */
                        readonly uri: string;
                    };
                }[];
            }[];
            readonly ToAttributes?: readonly components["schemas"]["developer.AttributeType"][];
        };
        readonly customAttributePut: {
            readonly value?: string;
        };
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
        /** ApplicationsType */
        readonly "developer.ApplicationsType": {
            /** @example string */
            readonly reg_id?: string | null;
            readonly id?: string;
            readonly version?: string;
            /** @example string */
            readonly developer_id?: string | null;
            readonly title?: string;
            /** @example string */
            readonly description?: string | null;
            readonly shortText?: string | null;
            /** @example string */
            readonly app_key?: string | null;
            /** @example string */
            readonly app_secret?: string | null;
            /** @example string */
            readonly callbackurl?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly valid_from?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly valid_to?: string | null;
            /** @example string */
            readonly status_code?: string | null;
            /** @example string */
            readonly created_by?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly created_at?: string | null;
            /** @example string */
            readonly modified_by?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly modified_at?: string | null;
            readonly ToAPIProductsDetails?: {
                readonly results?: readonly components["schemas"]["developer.APIProductsType"][];
            };
            readonly ToSubscriptions?: {
                readonly results?: readonly components["schemas"]["developer.SubscriptionsType"][];
            };
            readonly ToAttributes?: {
                readonly results?: readonly components["schemas"]["developer.AttributeType"][];
            };
        };
        readonly "developer.APIProductsType": {
            readonly name?: string;
            readonly title?: string;
            readonly reg_id?: string | null;
            readonly version?: string;
            readonly vendor?: string | null;
            readonly description?: string | null;
            readonly shortText?: string | null;
            /** Format: date-time */
            readonly published_at?: string | null;
            readonly published_by?: string | null;
            /** Format: float */
            readonly avgRating?: (number | string) | null;
            /** Format: int64 */
            readonly ratingCount?: (number | string) | null;
            readonly ToApplicationDetails?: readonly components["schemas"]["developer.ApplicationsType"][];
            readonly ToAPIProxies?: readonly components["schemas"]["developer.APIProxiesType"][];
            readonly ToAPIResources?: readonly components["schemas"]["developer.APIResourcesType"][];
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
        readonly "developer.AttributeType": {
            readonly name: string;
            readonly value: string;
            readonly entityId?: string;
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
