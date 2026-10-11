export type paths = {
    readonly "/CertificateStores": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Entities from CertificateStores
         * @description Returns all the CertificateStores for the tenant.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items */
                    readonly $top?: number;
                    /** @description Skip the first n items */
                    readonly $skip?: number;
                    /** @description Include count of items */
                    readonly $count?: boolean;
                    /** @description Filter items by property values */
                    readonly $filter?: readonly string[];
                    /** @description Search items by search phrases */
                    readonly $search?: readonly string[];
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
                /** @description Retrieved all the CertificateStores entities */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly results?: readonly components["schemas"]["apimgmtconfiguration.CertificateStores"][];
                        };
                    };
                };
                readonly default: components["responses"]["error"];
            };
        };
        readonly put?: never;
        /**
         * Create CertificateStores Entity
         * @description Create CertificateStores
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
                    readonly "application/json": components["schemas"]["apimgmtconfiguration.CertificateStoreTS-create"];
                };
            };
            readonly responses: {
                /** @description Created entity */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["apimgmtconfiguration.CertificateStores"];
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
    readonly "/CertificateStores('{name}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Entity from CertificateStores
         * @description Returns the CertificateStore entity by key
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
                /** @description CertificateStores Entity */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["apimgmtconfiguration.CertificateStores"];
                    };
                };
                /** @description Requested entity could not be found */
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
         * Delete CertificateStores Entity
         * @description Deletes a CertificateStore entity by key.
         *
         *     **Note:**
         *     - The store must exist.
         *     - The store must not contain any certificates.
         *     - The store must not have any API Providers linked to it.
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
                /** @description CertificateStore successfully deleted */
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
        /** CertificateStores */
        readonly "apimgmtconfiguration.CertificateStores": {
            /** @description The name of the CertificateStore. */
            readonly name?: string;
            /** @description Defines the certificateStore type KEY STORE or TRUST STORE. */
            readonly storeType?: string;
            readonly life_cycle?: components["schemas"]["apimgmtconfiguration.History"];
        };
        /** CertificateStore - Truststore - CREATE */
        readonly "apimgmtconfiguration.CertificateStoreTS-create": {
            /** @description The name of the CertificateStore. */
            readonly name: string;
            /** @description The storeType either keyStore or TrustStore. */
            readonly storeType: string;
            readonly certificates: components["schemas"]["apimgmtconfiguration.certificates"];
        };
        /** TrustStore - Certificate - Create */
        readonly "apimgmtconfiguration.certificates": {
            /** @description The name of the certificate. */
            readonly name: string;
            /** @description The description of the certificate. */
            readonly description?: string;
            /**
             * Format: byte
             * @description The certificate content in Base64 format.
             */
            readonly content: string;
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
