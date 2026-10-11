export type paths = {
    readonly "/VirtualHostRequests": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Entities from VirtualHostRequest
         * @description Returns all the virtual host requests for the tenant.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Order items by property values */
                    readonly $orderby?: readonly string[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly string[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved all the virtual host request entities. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly results?: readonly components["schemas"]["apimgmtconfiguration.VirtualHostRequest"][];
                        };
                    };
                };
                readonly default: components["responses"]["error"];
            };
        };
        readonly put?: never;
        /**
         * Create or update or delete VirtualHostRequest Entity.
         * @description Create or update or delete the virtual host requests.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Create a new entity or update the existing entity. */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["apimgmtconfiguration.VirtualHostRequest-create-update-delete"];
                };
            };
            readonly responses: {
                /** @description Created entity */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["apimgmtconfiguration.VirtualHostRequest"];
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
    readonly "/VirtualHostRequests('{id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Entity from VirtualHostRequest
         * @description Returns the virtual host request entity by key.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly string[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: id */
                    readonly id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description VirtualHostRequest Entity */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["apimgmtconfiguration.VirtualHostRequest"];
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
        /** VirtualHostRequest */
        readonly "apimgmtconfiguration.VirtualHostRequest": {
            /** @description The account ID of the user who created the virtual host request. */
            readonly accountId?: string;
            /** @description The status of the virtual host request allocation. */
            readonly allocationStatus?: string;
            /** @description The unique identifier of the virtual host request. */
            readonly id?: string;
            /**
             * @description Indicates whether client authentication is enabled for the virtual host request.
             * @default false
             */
            readonly isClientAuthEnabled: boolean;
            /**
             * @description Indicates whether the virtual host request is the default virtual host request.
             * @default false
             */
            readonly isDefaultVirtualHostRequest: boolean;
            /**
             * @description Indicates whether the virtual host request is for a custom domain.
             * @default false
             */
            readonly isForCustomDomain: boolean;
            /**
             * @description The alias of the key store used for the virtual host request.
             * @default null
             */
            readonly keyStoreAlias: string;
            /**
             * @description The name of the key store used for the virtual host request.
             * @default null
             */
            readonly keyStoreName: string;
            readonly life_cycle?: components["schemas"]["apimgmtconfiguration.History"];
            /** @description The operation performed on the virtual host request. */
            readonly operation?: string;
            /**
             * @description The trust store used for the virtual host request.
             * @default null
             */
            readonly trustStore: string;
            /** @description The unique identifier of the virtual host. */
            readonly virtualHostId?: string;
            /** @description The URL of the virtual host. */
            readonly virtualHostUrl?: string;
            /**
             * @description The load balancer host required to do CNAME mapping for custom domain.
             * @default null
             */
            readonly lbHost: string;
        };
        /** VirtualHostRequest - CREATE-UPDATE-DELETE */
        readonly "apimgmtconfiguration.VirtualHostRequest-create-update-delete": {
            /**
             * @description Indicates  whether client authentication is enabled for the virtual host request.
             * @default false
             */
            readonly isClientAuthEnabled: boolean;
            /**
             * @description Indicates whether the virtual host request is the default virtual host request.
             * @default false
             */
            readonly isDefaultVirtualHostRequest: boolean;
            /**
             * @description Indicates whether the virtual host request is for a custom domain.
             * @default false
             */
            readonly isForCustomDomain: boolean;
            /**
             * @description The alias of the key store used for the virtual host request.
             * @default null
             */
            readonly keyStoreAlias: string;
            /**
             * @description The name of the key store used for the virtual host request.
             * @default null
             */
            readonly keyStoreName: string;
            /** @description The operation performed on the virtual host request.Allowed values are CREATE or UPDATE or DELETE */
            readonly operation: string;
            /**
             * @description The trust store used for the virtual host request.
             * @default null
             */
            readonly trustStore: string;
            /** @description The URL of the virtual host.This field is mandatory when operation is CREATE */
            readonly virtualHostUrl: string;
            /** @description The unique identifier of the virtual host.This field is mandatory when operation is UPDATE or DELETE */
            readonly virtualHostId: string;
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
        /** History */
        readonly "apimgmtconfiguration.History": {
            /**
             * @default null
             * @example /Date(1710311576000)/
             */
            readonly changed_at: string;
            /** @default null */
            readonly changed_by: string;
            /**
             * @default null
             * @example /Date(1710311576000)/
             */
            readonly created_at: string;
            /** @default null */
            readonly created_by: string;
        };
    };
    responses: {
        /** @description Default error response */
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
        /** @description Order items by property values */
        readonly orderby: readonly string[];
        /** @description Select properties to be returned */
        readonly select: readonly string[];
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
