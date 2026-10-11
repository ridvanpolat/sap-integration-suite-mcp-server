export type paths = {
    readonly "/CertificateStoreReferences": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Entities from CertificateStoreReferences
         * @description Returns all the CertificateStoreReferences for the tenant.
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
                /** @description Retrieved all the CertificateStoreReferences entities */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly results?: readonly components["schemas"]["apimgmtconfiguration.CertificateStoreReference"][];
                        };
                    };
                };
                readonly default: components["responses"]["error"];
            };
        };
        readonly put?: never;
        /**
         * Create CertificateStoreReference Entity
         * @description Create CertificateStoreReference
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Create New entity */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["apimgmtconfiguration.CertificateStoreReference-create"];
                };
            };
            readonly responses: {
                /** @description Created entity */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["apimgmtconfiguration.CertificateStoreReference"];
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
    readonly "/CertificateStoreReferences('{name}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Entity from CertificateStoreReference
         * @description Returns the CertificateStoreReference entity by key
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly string[];
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
                /** @description CertificateStoreReference Entity */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["apimgmtconfiguration.CertificateStoreReference"];
                    };
                };
                readonly default: components["responses"]["error"];
            };
        };
        /**
         * Update CertificateStoreReference Entity
         * @description Update CertificateStoreReference
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: name */
                    readonly name: string;
                };
                readonly cookie?: never;
            };
            /** @description Update Existing entity */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["apimgmtconfiguration.CertificateStoreReference-update"];
                };
            };
            readonly responses: {
                /** @description Created entity */
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
         * Delete CertificateStoreReference Entity
         * @description delete CertificateStoreReference
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: name */
                    readonly name: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description CertificateStoreReference Entity */
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
        /** CertificateStoreReference */
        readonly "apimgmtconfiguration.CertificateStoreReference": {
            /** @description The name of the CertificateStoreReference. */
            readonly name?: string;
            /** @description The name of keyStore or TrustStore. */
            readonly certificateStoreName?: string;
            /** @description Defines the certificateStore type KEY STORE or TRUST STORE. */
            readonly storeType?: string;
            readonly life_cycle?: components["schemas"]["apimgmtconfiguration.History"];
        };
        /** CertificateStoreReference - CREATE */
        readonly "apimgmtconfiguration.CertificateStoreReference-create": {
            /** @description The name of the CertificateStoreReference. */
            readonly name: string;
            /** @description The name of keyStore or TrustStore. */
            readonly certificateStoreName: string;
        };
        /** CertificateStoreReference - UPDATE */
        readonly "apimgmtconfiguration.CertificateStoreReference-update": {
            /** @description The name of keyStore or TrustStore. */
            readonly certificateStoreName: string;
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
