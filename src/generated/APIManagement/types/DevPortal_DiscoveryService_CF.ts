export type paths = {
    readonly "/apipackages": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all the API packages
         * @description Lists all the packages available in the Developer Hub
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first N elements, where N is a positive integar. If a value less than 0 is specified, the URI should be considered malformed. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first N elements, where N is a positive integer as specified by this query option. If a value less than 0 is specified, the URI should be considered malformed. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values. Supported operations are eq and substring */
                    readonly $filter?: components["parameters"]["filter"];
                    /** @description Free text search on selected name. */
                    readonly $search?: components["parameters"]["search"];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("name" | "title" | "summary" | "description" | "version" | "aggregrateRating" | "termsOfService" | "license" | "logo" | "image" | "url" | "lastUpdated" | "isSAPContent" | "provider" | "tags")[];
                    /** @description Expand related APIs and Actions */
                    readonly $expand?: readonly ("apis" | "actions")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Package Entity */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["APIPackage"];
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 404: components["responses"]["404"];
                readonly 500: components["responses"]["500"];
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
    readonly "/apipackages('{name}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get API Package by name
         * @description Lists a specific package available in Developer Hub by providing the package name as the parameter.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("name" | "title" | "summary" | "description" | "version" | "aggregrateRating" | "termsOfService" | "license" | "logo" | "image" | "url" | "lastUpdated" | "isSAPContent" | "provider" | "tags")[];
                    /** @description Expand related APIs and Actions */
                    readonly $expand?: readonly ("apis" | "actions")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Package name */
                    readonly name: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Package Entity */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["APIPackage"];
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 404: components["responses"]["404"];
                readonly 500: components["responses"]["500"];
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
    readonly "/apis": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all the APIs
         * @description Lists all the APIs available in the Developer Hub
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first N elements, where N is a positive integar. If a value less than 0 is specified, the URI should be considered malformed. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first N elements, where N is a positive integer as specified by this query option. If a value less than 0 is specified, the URI should be considered malformed. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values. Supported operations are eq and substring */
                    readonly $filter?: components["parameters"]["filter"];
                    /** @description Free text search on selected name. */
                    readonly $search?: components["parameters"]["search"];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("name" | "title" | "summary" | "description" | "version" | "documentation" | "logo" | "image" | "url" | "deprecated" | "releaseStatus" | "protocol")[];
                    /** @description Expand related API Packages and Actions */
                    readonly $expand?: readonly ("apiPackages" | "actions")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description List of APIs */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["API"][];
                        };
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 404: components["responses"]["404"];
                readonly 500: components["responses"]["500"];
                readonly 501: components["responses"]["501"];
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
    readonly "/apis('{name}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get API by name
         * @description Lists a specific API available in Developer Hub, by providing the API name as the parameter.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("name" | "title" | "summary" | "description" | "version" | "documentation" | "logo" | "image" | "url" | "deprecated" | "releaseStatus" | "protocol")[];
                    /** @description Expand related API Packages and Actions */
                    readonly $expand?: readonly ("apiPackages" | "actions")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description API name */
                    readonly name: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description API Entity */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["API"];
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 404: components["responses"]["404"];
                readonly 500: components["responses"]["500"];
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
        /** API Entity */
        readonly API: {
            /**
             * Name of the API and the identifier field.
             * @example API_RFQ_PROCESS_SRV
             */
            readonly name?: string;
            /**
             * Title of the API.
             * @example Process Request for Quotation
             */
            readonly title?: string;
            /**
             * A short summary of the API that can be used in the list/tile view.
             * @example This service enables you to create Request for Quotation (RFQ) through an API call from a source system outside SAP S/4HANA or SAP S/4HANA on- Premise.
             */
            readonly summary?: string;
            /**
             * A description of the API.
             * @example This service enables you to create Request for Quotation (RFQ) through an API call from a source system outside SAP S/4HANA or SAP S/4HANA on- Premise. Furthermore, the service enables you to read existing Request for Quotation data from the SAP S/4HANA or SAP S/4HANA on-Premise.
             */
            readonly description?: string;
            /**
             * Version of the API
             * @example 1
             */
            readonly version?: string;
            /**
             * Further documentation describing the API in more detail.
             * Format: uri
             */
            readonly documentation?: string;
            /**
             * Link to an associated API logo.
             * Format: uri
             */
            readonly logo?: string;
            /**
             * Link to the API image
             * Format: uri
             */
            readonly image?: string;
            /**
             * URL of the item, e.g., link to the package page in SAP API Business Hub / SAP API Management
             * Format: uri
             */
            readonly url?: string;
            /**
             * Timestamp when the API was last updated
             * @example /Date(1492098664000)/
             */
            readonly lastUpdated?: string;
            /**
             * Flag to indicate in case the API has been deprecated. Default value is false to indicate that the API has not been deprecated
             * @default false
             * @example false
             */
            readonly deprecated: boolean;
            /**
             * The release status specifies the stability of the service entity towards incompatible changes in the future for cloud related usage scenarios.  Possible values would be public, beta. The default value is public.
             * @default PUBLIC
             * @example PUBLIC
             * @enum {string}
             */
            readonly releaseStatus: "PUBLIC" | "BETA";
            /**
             * API Protocol including the protocol version if applicable. The possible values are ODATAV2, ODATAV4, SOAP, REST. The default value is REST.
             * @default REST
             * @example REST
             * @enum {string}
             */
            readonly protocol: "ODATAV2" | "ODATAV4" | "SOAP" | "REST";
            readonly apiDefinitions?: readonly components["schemas"]["APIDefinition"][];
            readonly entryPoints?: readonly components["schemas"]["EntryPoint"][];
            readonly actions?: readonly components["schemas"]["APIAction"][];
            readonly apipackages?: readonly components["schemas"]["APIPackage"][];
        };
        /** API Package Entity */
        readonly APIPackage: {
            /**
             * Name of the package and the identifier field.
             * @example SAPS4HANA
             */
            readonly name: string;
            /**
             * Title of the package.
             * @example SAP S/4HANA
             */
            readonly title: string;
            /**
             * A short summary of the package that can be used in the list/tile view.
             * @example SAP S/4HANA, our next generation cloud ERP suite designed for in-memory computing.
             */
            readonly summary?: string;
            /**
             * A description of the package.
             * @example SAP S/4HANA, our next generation cloud ERP suite designed for in-memory computing, acts as a digital core, connecting your enterprise with people, business networks, the Internet of Things, Big Data, and more.
             */
            readonly description?: string;
            /**
             * Version of the package
             * @example 1
             */
            readonly version?: string;
            readonly aggregrateRating?: components["schemas"]["AggregrateRating"];
            /**
             * Link to human-readable terms of service documentation.
             * Format: uri
             * @example https://www.sap.com/corporate/en/legal/terms-of-use.html
             */
            readonly termsOfService?: string;
            /**
             * Link to human-readable license documentations
             * Format: uri
             */
            readonly license?: string;
            /**
             * Link to an associated package logo.
             * Format: uri
             */
            readonly logo?: string;
            /**
             * Link to the package image
             * Format: uri
             */
            readonly image?: string;
            /**
             * URL of the item, e.g., link to the package page in SAP API Business Hub / SAP API Management
             * Format: uri
             */
            readonly url?: string;
            /**
             * Timestamp when the Package was last updated
             * @example /Date(1492098664000)/
             */
            readonly lastUpdated: string;
            /**
             * Flag to indicate if its partner content or not.
             * @default false
             */
            readonly partnerContent: boolean;
            readonly provider?: components["schemas"]["Organization"];
            readonly tags?: components["schemas"]["Tag"];
            readonly actions?: readonly components["schemas"]["PackageAction"][];
            readonly apis: readonly components["schemas"]["API"][];
        };
        /**
         * Organization Entity
         * @description The package producer or provider
         */
        readonly Organization: {
            /**
             * Name of the organization
             * @example SAP
             */
            readonly name: string;
            /**
             * Name of the department or team within the organization.
             * @example S4HANA
             */
            readonly department?: string;
            /**
             * Link to an associated logo of the Organization
             * Format: uri
             */
            readonly logo?: string;
            /**
             * Type of the organization. Possible values are self (to indicate SAP), customer , partner
             * @example self
             * @enum {string}
             */
            readonly type?: "self" | "customer" | "partner";
        };
        /**
         * Package Action Entity
         * @description Links to human-readable pages for Client Registrations, Payment or pricing details, Sandbox etc.
         */
        readonly PackageAction: {
            /**
             * Indicates a UI endpoint for the action.
             * Format: uri
             * @example https://accounts.sap.com/ui/public/showRegisterForm?spName=https://netweaver.ondemand.com&targetUrl=https://cloudintegration.hana.ondemand.com
             */
            readonly target: string;
            /**
             * Description of the action item
             * @example Client Registration
             */
            readonly description?: string;
            /**
             * Action item type. The possible values for packages are client registration, payment and sandbox
             * @example clientRegistration
             * @enum {string}
             */
            readonly type: "clientRegistration" | "payment" | "sandbox";
        };
        /**
         * API Action Entity
         * @description Possible actions on the API like link to the console to test the APIs
         */
        readonly APIAction: {
            /**
             * Indicates a UI endpoint for the action.
             * Format: uri
             * @example https://api.sap.com/shell/discover/contentpackage/SAPS4HANACloud/api/API_RFQ_PROCESS_SRV?section=RESOURCE
             */
            readonly target: string;
            /**
             * Description of the action item
             * @example Link to the API testing console
             */
            readonly description?: string;
            /**
             * Action item type. The possible values for packages are client registration, payment and sandbox
             * @example console
             * @enum {string}
             */
            readonly type: "console" | "authentications";
        };
        /** Entity Point entity */
        readonly EntryPoint: {
            /**
             * Name of the entry point
             * @example sandboxurl
             */
            readonly name?: string;
            /**
             * Type of the entry points. Possible values are DEV, TEST, PROD, SANDBOX
             * @example sandbox
             * @enum {string}
             */
            readonly type: "dev" | "test" | "production" | "sandbox";
            /**
             * Fully qualified API endpoint or the fully qualified root Path of the API.
             * Format: uri
             * @example https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_RFQ_PROCESS_SRV
             */
            readonly url: string;
        };
        /**
         * API Definition Entity
         * @description Links to the machine-readable API definitions like Open API Specifications files, OData Metadata etc.
         */
        readonly APIDefinition: {
            /**
             * Type of the API Definition
             * @example edmx
             * @enum {string}
             */
            readonly type: "oas-yaml" | "oas-json" | "raml" | "edmx" | "wsdl";
            /**
             * Fully qualified endpoint to the API Definitions file.
             * Format: uri
             * @example https://api.sap.com/odata/1.0/catalog.svc/APIContent.APIs('API_RFQ_PROCESS_SRV')/$value?type=edmx
             */
            readonly url: string;
        };
        /** Tag Entity */
        readonly Tag: {
            /**
             * Comma separated list of products tags
             * @example SAP S/4HANA
             */
            readonly products?: string;
            /** Comma separated list of line of business tags */
            readonly lineOfBusiness?: string;
            /** Comma separated list of country tags */
            readonly country?: string;
            /** Comma separated list of free text style tags */
            readonly keywords?: string;
        };
        /**
         * Aggregrate Rating Entity
         * @description The average rating based on multiple ratings or reviews.
         */
        readonly AggregrateRating: {
            /**
             * The average rating value based on multiple ratings or reviews.
             * @example 4.5
             */
            readonly ratingValue: number;
            /**
             * Number of the review counts on which the rating value is calculated
             * @example 2
             */
            readonly reviewCount: number;
            /** The count of total number of ratings. */
            readonly ratingCount?: number;
        };
        /** Inner Error Details */
        readonly InnerErrorDetails: {
            /** technical code of the error situation to be used for support purposes */
            readonly code: string;
            /** user facing message describing the error */
            readonly message: string;
            /** Exception message details */
            readonly exception?: string;
        };
        /** Error Item Entity */
        readonly ErrorItem: {
            /** technical code of the error situation to be used for support purposes */
            readonly code: string;
            /** user facing message describing the error */
            readonly message: string;
            /** Internal Error details */
            readonly innererror?: {
                readonly ErrorDetails?: readonly components["schemas"]["InnerErrorDetails"][];
            };
        };
        /** Error Entity */
        readonly Error: {
            readonly error?: components["schemas"]["ErrorItem"];
        };
    };
    responses: {
        /** @description Bad Request - Required parameters are either missing or incorrect. */
        readonly 400: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Unauthorized - Login to access the API. */
        readonly 401: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Not Found - Requested resource not found. */
        readonly 404: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Internal server error - Try again later. If the issue persists, then contact your system administrator. */
        readonly 500: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Not Implemented */
        readonly 501: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["Error"];
            };
        };
    };
    parameters: {
        /** @description Show only the first N elements, where N is a positive integar. If a value less than 0 is specified, the URI should be considered malformed. */
        readonly top: number;
        /** @description Skip the first N elements, where N is a positive integer as specified by this query option. If a value less than 0 is specified, the URI should be considered malformed. */
        readonly skip: number;
        /** @description Filter items by property values. Supported operations are eq and substring */
        readonly filter: string;
        /** @description Free text search on selected name. */
        readonly search: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
