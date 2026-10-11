export type paths = {
    readonly "/Application": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all applications.
         * @description Retrieve the list of applications.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc" | "ApiHubId" | "ApiHubId desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "ApiHubId" | "ApplicationInstances" | "Vendor")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("ApplicationInstances" | "Vendor")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved Application */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of Application */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.Application"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        /**
         * Create new application.
         * @description Create new application according to the specified values.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Name: name of application, ApiHubId: Technical name of application on SAP Business Accelerator Hub, Vendor: Vendor of application */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.Application-create"];
                };
            };
            readonly responses: {
                /** @description Created Application */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.intas.entities.Application-create"];
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 409: components["responses"]["error_409"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Application('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific application.
         * @description Retrieve specific application using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "ApiHubId" | "ApplicationInstances" | "Vendor")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("ApplicationInstances" | "Vendor")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved Application */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.Application"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete specific application.
         * @description Delete specific application using id.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Update specific application.
         * @description Update specific application using id.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.intas.entities.Application-update"];
                    };
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly trace?: never;
    };
    readonly "/Application('{Id}')/ApplicationInstances": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get entities from related ApplicationInstances */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values, see [Filtering](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=64) */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values, see [Sorting](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=65) */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc" | "Description" | "Description desc")[];
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "Application" | "DeploymentModel")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Application" | "DeploymentModel")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            /** Collection of ApplicationInstance */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.ApplicationInstance"][];
                            };
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/Application('{Id}')/Vendor": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Vendor */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Vendor"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/ApplicationInstance": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all application instance.
         * @description Retrieve the list of application instance.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc" | "Description" | "Description desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "Application" | "DeploymentModel")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Application" | "DeploymentModel")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved Application Instance */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of Application Instance */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.ApplicationInstance"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        /**
         * Create new application instance.
         * @description Create new application instance according to the specified values.
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
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.ApplicationInstance-create"];
                };
            };
            readonly responses: {
                /** @description Created Application Instance */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.intas.entities.ApplicationInstance-create"];
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 409: components["responses"]["error_409"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/ApplicationInstance('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific application instance.
         * @description Retrieve specific application instance using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "Application" | "DeploymentModel")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Application" | "DeploymentModel")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved application instance */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.ApplicationInstance"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete specific application instance.
         * @description Delete specific application instance using id.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Update specific application instance.
         * @description Update specific application instance using id.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.intas.entities.ApplicationInstance-update"];
                    };
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly trace?: never;
    };
    readonly "/ApplicationInstance('{Id}')/Application": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Application */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "ApiHubId" | "ApplicationInstances" | "Vendor")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("ApplicationInstances" | "Vendor")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Application"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/ApplicationInstance('{Id}')/DeploymentModel": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related DeploymentModel */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.DeploymentModel"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/Vendor": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all vendors.
         * @description Retrieve the list of vendors.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved vendor */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of vendor */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.Vendor"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        /**
         * Create new vendor.
         * @description Create new vendor according to the specified values.
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
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.Vendor-create"];
                };
            };
            readonly responses: {
                /** @description Created vendor */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.intas.entities.Vendor-create"];
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 409: components["responses"]["error_409"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Vendor('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific vendor.
         * @description Retrieve specific vendor using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved vendor */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.Vendor"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete specific vendor.
         * @description Delete specific vendor using id.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Update specific vendor.
         * @description Update specific vendor using id.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.intas.entities.Vendor-update"];
                    };
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly trace?: never;
    };
    readonly "/Technology": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all technologies.
         * @description Retrieve the list of technologies.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Vendor" | "TechnologyDomains" | "TechnologyInstances" | "TechnologyStyles" | "TechnologyKeyCharacteristics")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Vendor" | "TechnologyDomains" | "TechnologyInstances" | "TechnologyStyles" | "TechnologyKeyCharacteristics")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved technology */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of technology */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.Technology"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        /**
         * Create new technology.
         * @description Create new technology according to the specified values.
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
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.Technology-create"];
                };
            };
            readonly responses: {
                /** @description Created technology */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.intas.entities.Technology-create"];
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 409: components["responses"]["error_409"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Technology('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific technology.
         * @description Retrieve specific technology using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Vendor" | "TechnologyDomains" | "TechnologyInstances" | "TechnologyStyles" | "TechnologyKeyCharacteristics")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Vendor" | "TechnologyDomains" | "TechnologyInstances" | "TechnologyStyles" | "TechnologyKeyCharacteristics")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved technology */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.Technology"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete specific technology.
         * @description Delete specific technology using id.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Update specific technology.
         * @description Update specific technology using id.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.intas.entities.Technology-update"];
                    };
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly trace?: never;
    };
    readonly "/Technology('{Id}')/Vendor": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Vendor */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Vendor"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/Technology('{Id}')/TechnologyDomains": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get entities from related TechnologyDomains */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values, see [Filtering](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=64) */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values, see [Sorting](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=65) */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc")[];
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Technology" | "Domain")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Technology" | "Domain")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            /** Collection of TechnologyDomain */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.TechnologyDomain"][];
                            };
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/Technology('{Id}')/TechnologyInstances": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get entities from related TechnologyInstances */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values, see [Filtering](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=64) */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values, see [Sorting](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=65) */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc")[];
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Technology" | "DeploymentModel")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Technology" | "DeploymentModel")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            /** Collection of TechnologyInstance */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.TechnologyInstance"][];
                            };
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/Technology('{Id}')/TechnologyStyles": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get entities from related TechnologyStyles */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values, see [Filtering](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=64) */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values, see [Sorting](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=65) */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc")[];
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Technology" | "Style")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Technology" | "Style")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            /** Collection of TechnologyStyle */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.TechnologyStyle"][];
                            };
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/Technology('{Id}')/TechnologyKeyCharacteristics": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get entities from related TechnologyKeyCharacteristics */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values, see [Filtering](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=64) */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values, see [Sorting](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=65) */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Description" | "Description desc")[];
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Description" | "Technology" | "KeyCharacteristicValue" | "RecommendationDegree")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Technology" | "KeyCharacteristicValue" | "RecommendationDegree")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            /** Collection of TechnologyKeyCharacteristic */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.TechnologyKeyCharacteristic"][];
                            };
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/TechnologyDomain": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all technology domains.
         * @description Retrieve the list of technology domains.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Technology" | "Domain")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Technology" | "Domain")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved technology domain */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of technology domain */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.TechnologyDomain"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        /**
         * Create new technology domain.
         * @description Create new technology domain according to the specified values.
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
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.TechnologyDomain-create"];
                };
            };
            readonly responses: {
                /** @description Created technology domain */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.intas.entities.TechnologyDomain-create"];
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 409: components["responses"]["error_409"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/TechnologyDomain('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific technology domain.
         * @description Retrieve specific technology domain using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Technology" | "Domain")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Technology" | "Domain")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved technology domain */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.TechnologyDomain"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete specific technology domain.
         * @description Delete specific technology domain using id.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Update specific technology domain.
         * @description Update specific technology domain using id.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.intas.entities.TechnologyDomain-update"];
                    };
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly trace?: never;
    };
    readonly "/TechnologyDomain('{Id}')/Technology": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Technology */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Vendor" | "TechnologyDomains" | "TechnologyInstances" | "TechnologyStyles" | "TechnologyKeyCharacteristics")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Vendor" | "TechnologyDomains" | "TechnologyInstances" | "TechnologyStyles" | "TechnologyKeyCharacteristics")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Technology"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/TechnologyDomain('{Id}')/Domain": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Domain */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Domain"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/Domain": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all domains.
         * @description Retrieve the list of domains.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc" | "Description" | "Description desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved domain */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of domain */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.Domain"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/Domain('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific domain.
         * @description Retrieve specific domain using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved domain */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.Domain"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/Style": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all styles.
         * @description Retrieve the list of styles.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc" | "Description" | "Description desc" | "IsCrossUseCase" | "IsCrossUseCase desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "IsCrossUseCase")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved style */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of style */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.Style"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/Style('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific style.
         * @description Retrieve specific style using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "IsCrossUseCase")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved style */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.Style"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/IntegrationPattern": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all integration patterns.
         * @description Retrieve the list of integration patterns.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Domain" | "Style")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Domain" | "Style")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved integration pattern */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of integration pattern */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.IntegrationPattern"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/IntegrationPattern('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific integration pattern.
         * @description Retrieve specific integration pattern using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Domain" | "Style")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Domain" | "Style")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved integration pattern */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.IntegrationPattern"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/IntegrationPattern('{Id}')/Domain": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Domain */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Domain"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/IntegrationPattern('{Id}')/Style": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Style */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "IsCrossUseCase")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Style"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/DeploymentModel": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all deployment models.
         * @description Retrieve the list of deployment models.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc" | "Description" | "Description desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved deployment model */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of deployment model */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.DeploymentModel"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/DeploymentModel('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific deployment model.
         * @description Retrieve specific deployment model using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved deployment model */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.DeploymentModel"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/DomainDetermination": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all domain determinations.
         * @description Retrieve the list of domain determinations.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Domain" | "SourceDeploymentModel" | "TargetDeploymentModel")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Domain" | "SourceDeploymentModel" | "TargetDeploymentModel")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved domain determination */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of domain determination */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.DomainDetermination"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/DomainDetermination('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific domain determination.
         * @description Retrieve specific domain determination using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Domain" | "SourceDeploymentModel" | "TargetDeploymentModel")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Domain" | "SourceDeploymentModel" | "TargetDeploymentModel")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved domain determination */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.DomainDetermination"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/DomainDetermination('{Id}')/Domain": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Domain */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Domain"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/DomainDetermination('{Id}')/SourceDeploymentModel": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related SourceDeploymentModel */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.DeploymentModel"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/DomainDetermination('{Id}')/TargetDeploymentModel": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related TargetDeploymentModel */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.DeploymentModel"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/UseCasePattern": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all use case patterns.
         * @description Retrieve the list of use case patterns.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc" | "Description" | "Description desc" | "Example" | "Example desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "Example" | "Style")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly "Style"[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved use case pattern */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of use case pattern */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.UseCasePattern"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/UseCasePattern('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific use case pattern.
         * @description Retrieve specific use case pattern using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "Example" | "Style")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly "Style"[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved use case pattern */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.UseCasePattern"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/UseCasePattern('{Id}')/Style": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Style */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "IsCrossUseCase")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Style"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/KeyCharacteristicRecommendationDegree": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all key characteristics recommendation degrees.
         * @description Retrieve the list of key characteristic recommendation degrees.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc" | "CssColor" | "CssColor desc" | "Score" | "Score desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "CssColor" | "Score")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved key characteristic recommendation degree */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of key characteristic recommendation degree */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.KeyCharacteristicRecommendationDegree"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/KeyCharacteristicRecommendationDegree('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific key characteristic recommendation degree.
         * @description Retrieve specific key characteristic recommendation degree using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "CssColor" | "Score")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved key characteristic recommendation degree */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.KeyCharacteristicRecommendationDegree"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/KeyCharacteristicGroup": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all characteristic groups.
         * @description Retrieve the list of key characteristic groups.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc" | "Description" | "Description desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved key characteristic group */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of key characteristic group */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.KeyCharacteristicGroup"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        /**
         * Create new key characteristic group.
         * @description Create new key characteristic group according to the specified values.
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
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.KeyCharacteristicGroup-create"];
                };
            };
            readonly responses: {
                /** @description Created key characteristic group */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.intas.entities.KeyCharacteristicGroup-create"];
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 409: components["responses"]["error_409"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/KeyCharacteristicGroup('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific key characteristic group.
         * @description Retrieve specific key characteristic group using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved key characteristic group */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.KeyCharacteristicGroup"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete specific key characteristic group.
         * @description Delete specific key characteristic group using id.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Update specific key characteristic group.
         * @description Update specific key characteristic group using id.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.intas.entities.KeyCharacteristicGroup-update"];
                    };
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly trace?: never;
    };
    readonly "/KeyCharacteristic": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all key characteristics.
         * @description Retrieve the list of key characteristics.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc" | "Description" | "Description desc" | "IsSingle" | "IsSingle desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "IsSingle" | "KeyCharacteristicGroup")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly "KeyCharacteristicGroup"[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved key characteristic */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of key characteristic */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.KeyCharacteristic"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        /**
         * Create new key characteristic.
         * @description Create new key characteristic according to the specified values.
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
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.KeyCharacteristic-create"];
                };
            };
            readonly responses: {
                /** @description Created key characteristic */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.intas.entities.KeyCharacteristic-create"];
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 409: components["responses"]["error_409"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/KeyCharacteristic('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific key characteristic.
         * @description Retrieve specific key characteristic using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "IsSingle" | "KeyCharacteristicGroup")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly "KeyCharacteristicGroup"[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved key characteristic */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.KeyCharacteristic"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete specific key characteristic.
         * @description Delete specific key characteristic using id.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Update specific key characteristic.
         * @description Update specific key characteristic using id.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.intas.entities.KeyCharacteristic-update"];
                    };
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly trace?: never;
    };
    readonly "/KeyCharacteristic('{Id}')/KeyCharacteristicGroup": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related KeyCharacteristicGroup */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.KeyCharacteristicGroup"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/KeyCharacteristicValue": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all key characteristic valuess.
         * @description Retrieve the list of key characteristic values.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc" | "Description" | "Description desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "KeyCharacteristic")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly "KeyCharacteristic"[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved key characteristic value */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of key characteristic value */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.KeyCharacteristicValue"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        /**
         * Create new key characteristic value.
         * @description Create new key characteristic value according to the specified values.
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
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.KeyCharacteristicValue-create"];
                };
            };
            readonly responses: {
                /** @description Created key characteristic value */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.intas.entities.KeyCharacteristicValue-create"];
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 409: components["responses"]["error_409"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/KeyCharacteristicValue('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific key characteristic value.
         * @description Retrieve specific key characteristic value using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "KeyCharacteristic")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly "KeyCharacteristic"[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved key characteristic value */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.KeyCharacteristicValue"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete specific key characteristic value.
         * @description Delete specific key characteristic value using id.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Update specific key characteristic value.
         * @description Update specific key characteristic value using id.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.intas.entities.KeyCharacteristicValue-update"];
                    };
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly trace?: never;
    };
    readonly "/KeyCharacteristicValue('{Id}')/KeyCharacteristic": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related KeyCharacteristic */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "IsSingle" | "KeyCharacteristicGroup")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly "KeyCharacteristicGroup"[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.KeyCharacteristic"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/TechnologyInstance": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all technology instances.
         * @description Retrieve the list of technology instances.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Technology" | "DeploymentModel")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Technology" | "DeploymentModel")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved technology instance */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of technology instance */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.TechnologyInstance"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        /**
         * Create new technology instance.
         * @description Create new technology instance according to the specified values.
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
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.TechnologyInstance-create"];
                };
            };
            readonly responses: {
                /** @description Created technology instance */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.intas.entities.TechnologyInstance-create"];
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 409: components["responses"]["error_409"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/TechnologyInstance('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific technology instance.
         * @description Retrieve specific technology instance using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Technology" | "DeploymentModel")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Technology" | "DeploymentModel")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved technology instance */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.TechnologyInstance"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete specific technology instance.
         * @description Delete specific technology instance using id.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Update specific technology instance.
         * @description Update specific technology instance using id.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.intas.entities.TechnologyInstance-update"];
                    };
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly trace?: never;
    };
    readonly "/TechnologyInstance('{Id}')/Technology": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Technology */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Vendor" | "TechnologyDomains" | "TechnologyInstances" | "TechnologyStyles" | "TechnologyKeyCharacteristics")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Vendor" | "TechnologyDomains" | "TechnologyInstances" | "TechnologyStyles" | "TechnologyKeyCharacteristics")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Technology"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/TechnologyInstance('{Id}')/DeploymentModel": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related DeploymentModel */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.DeploymentModel"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/TechnologyKeyCharacteristic": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all technology key characteristics.
         * @description Retrieve the list of technology key characteristics.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Description" | "Description desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Description" | "Technology" | "KeyCharacteristicValue" | "RecommendationDegree")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Technology" | "KeyCharacteristicValue" | "RecommendationDegree")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved technology key characteristic */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of technology key characteristic */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.TechnologyKeyCharacteristic"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        /**
         * Create new technology key characteristic.
         * @description Create new technology key characteristic according to the specified values.
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
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.TechnologyKeyCharacteristic-create"];
                };
            };
            readonly responses: {
                /** @description Created technology key characteristic */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.intas.entities.TechnologyKeyCharacteristic-create"];
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 409: components["responses"]["error_409"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/TechnologyKeyCharacteristic('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific technology key characteristic.
         * @description Retrieve specific technology key characteristic using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Description" | "Technology" | "KeyCharacteristicValue" | "RecommendationDegree")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Technology" | "KeyCharacteristicValue" | "RecommendationDegree")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved technology key characteristic */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.TechnologyKeyCharacteristic"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete specific technology key characteristic.
         * @description Delete specific technology key characteristic using id.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Update specific technology key characteristic.
         * @description Update specific technology key characteristic using id.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.intas.entities.TechnologyKeyCharacteristic-update"];
                    };
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly trace?: never;
    };
    readonly "/TechnologyKeyCharacteristic('{Id}')/Technology": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Technology */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Vendor" | "TechnologyDomains" | "TechnologyInstances" | "TechnologyStyles" | "TechnologyKeyCharacteristics")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Vendor" | "TechnologyDomains" | "TechnologyInstances" | "TechnologyStyles" | "TechnologyKeyCharacteristics")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Technology"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/TechnologyKeyCharacteristic('{Id}')/KeyCharacteristicValue": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related KeyCharacteristicValue */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "KeyCharacteristic")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly "KeyCharacteristic"[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.KeyCharacteristicValue"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/TechnologyKeyCharacteristic('{Id}')/RecommendationDegree": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related RecommendationDegree */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "CssColor" | "Score")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.KeyCharacteristicRecommendationDegree"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/TechnologyStyle": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all technology styles.
         * @description Retrieve the list of technology styles.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Technology" | "Style")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Technology" | "Style")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved technology style */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of technology style */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.TechnologyStyle"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        /**
         * Create new technology style.
         * @description Create new technology style according to the specified values.
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
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.TechnologyStyle-create"];
                };
            };
            readonly responses: {
                /** @description Created technology style */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.intas.entities.TechnologyStyle-create"];
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 409: components["responses"]["error_409"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/TechnologyStyle('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific technology style.
         * @description Retrieve specific technology style using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Technology" | "Style")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Technology" | "Style")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved technology style */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.TechnologyStyle"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete specific technology style.
         * @description Delete specific technology style using id.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Update specific technology style.
         * @description Update specific technology style using id.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.intas.entities.TechnologyStyle-update"];
                    };
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 404: components["responses"]["error_404"];
            };
        };
        readonly trace?: never;
    };
    readonly "/TechnologyStyle('{Id}')/Technology": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Technology */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Vendor" | "TechnologyDomains" | "TechnologyInstances" | "TechnologyStyles" | "TechnologyKeyCharacteristics")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Vendor" | "TechnologyDomains" | "TechnologyInstances" | "TechnologyStyles" | "TechnologyKeyCharacteristics")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Technology"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/TechnologyStyle('{Id}')/Style": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Style */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "IsCrossUseCase")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Style"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/MessageFlow": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all message flows.
         * @description Retrieve the list of message flows.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc" | "Status" | "Status desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Status" | "SourceApplicationInstance" | "TargetApplicationInstance" | "Domain" | "Style")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("SourceApplicationInstance" | "TargetApplicationInstance" | "Domain" | "Style")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved message flow */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of message flow */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.MessageFlow"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/MessageFlow('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific message flow.
         * @description Retrieve specific message flow using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Status" | "SourceApplicationInstance" | "TargetApplicationInstance" | "Domain" | "Style")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("SourceApplicationInstance" | "TargetApplicationInstance" | "Domain" | "Style")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved message flow */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.MessageFlow"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/MessageFlow('{Id}')/SourceApplicationInstance": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related SourceApplicationInstance */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "Application" | "DeploymentModel")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Application" | "DeploymentModel")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.ApplicationInstance"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/MessageFlow('{Id}')/TargetApplicationInstance": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related TargetApplicationInstance */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "Application" | "DeploymentModel")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Application" | "DeploymentModel")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.ApplicationInstance"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/MessageFlow('{Id}')/Domain": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Domain */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Domain"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/MessageFlow('{Id}')/Style": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Style */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Description" | "IsCrossUseCase")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Style"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/IntegrationFlow": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all integration flows.
         * @description Retrieve the list of integration flows.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "IntegrationFlowMessageFlows")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly "IntegrationFlowMessageFlows"[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved integration flow */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of integration flow */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.IntegrationFlow"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/IntegrationFlow('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific integration flow.
         * @description Retrieve specific integration flow using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "IntegrationFlowMessageFlows")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly "IntegrationFlowMessageFlows"[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved integration flow */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.IntegrationFlow"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/IntegrationFlow('{Id}')/IntegrationFlowMessageFlows": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get entities from related IntegrationFlowMessageFlows */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values, see [Filtering](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=64) */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values, see [Sorting](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=65) */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc")[];
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "IntegrationFlow" | "MessageFlow")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("IntegrationFlow" | "MessageFlow")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            /** Collection of IntegrationFlowMessageFlow */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.IntegrationFlowMessageFlow"][];
                            };
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/IntegrationFlowMessageFlow": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all integration flow message flows.
         * @description Retrieve the list of integration flow message flows.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "IntegrationFlow" | "MessageFlow")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("IntegrationFlow" | "MessageFlow")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved integration flow message flow */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of integration flow message flow */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.IntegrationFlowMessageFlow"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/IntegrationFlowMessageFlow('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific integration flow message flow.
         * @description Retrieve specific integration flow message flow using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "IntegrationFlow" | "MessageFlow")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("IntegrationFlow" | "MessageFlow")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved integration flow message flow */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.IntegrationFlowMessageFlow"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/IntegrationFlowMessageFlow('{Id}')/IntegrationFlow": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related IntegrationFlow */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "IntegrationFlowMessageFlows")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly "IntegrationFlowMessageFlows"[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.IntegrationFlow"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/IntegrationFlowMessageFlow('{Id}')/MessageFlow": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related MessageFlow */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Status" | "SourceApplicationInstance" | "TargetApplicationInstance" | "Domain" | "Style")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("SourceApplicationInstance" | "TargetApplicationInstance" | "Domain" | "Style")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.MessageFlow"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/Request": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all requests.
         * @description Retrieve the list of requests.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Name" | "Name desc" | "Status" | "Status desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Status" | "RequestLineItems")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly "RequestLineItems"[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved request */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of request */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.Request"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        /**
         * Create a new request.
         * @description Create new request according to the specified values.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Name: name of the request */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.Request-create"];
                };
            };
            readonly responses: {
                /** @description Request created */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.intas.entities.Request-created"];
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
                readonly 409: components["responses"]["error_409"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Request('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific request.
         * @description Retrieve specific request using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Status" | "RequestLineItems")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly "RequestLineItems"[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved request */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.Request"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete a specific request.
         * @description Use the request Id to delete a request.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Update properties of a specific request.
         * @description Updates a request according to the specified values.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description Update properties of a request. The request must only contain the properties to be updated. */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.Request-patch"];
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly trace?: never;
    };
    readonly "/Request('{Id}')/RequestLineItems": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get entities from related RequestLineItems */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values, see [Filtering](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=64) */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values, see [Sorting](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=65) */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Status" | "Status desc")[];
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Status" | "Request" | "IntegrationFlow" | "RequestLineItemTechnologyInstanceDecisions")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Request" | "IntegrationFlow" | "RequestLineItemTechnologyInstanceDecisions")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            /** Collection of RequestLineItem */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.RequestLineItem"][];
                            };
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/RequestLineItem": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all request line items.
         * @description Retrieve the list of request line items.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "Status" | "Status desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Status" | "Request" | "IntegrationFlow" | "RequestLineItemTechnologyInstanceDecisions")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Request" | "IntegrationFlow" | "RequestLineItemTechnologyInstanceDecisions")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved request line item */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of request line item */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.RequestLineItem"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/RequestLineItem('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific request line item.
         * @description Retrieve specific request line item using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Status" | "Request" | "IntegrationFlow" | "RequestLineItemTechnologyInstanceDecisions")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("Request" | "IntegrationFlow" | "RequestLineItemTechnologyInstanceDecisions")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved request line item */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.RequestLineItem"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete specific request line item.
         * @description Delete specific request line item using id.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/RequestLineItem('{Id}')/Request": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related Request */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Status" | "RequestLineItems")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly "RequestLineItems"[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.Request"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/RequestLineItem('{Id}')/IntegrationFlow": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related IntegrationFlow */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "IntegrationFlowMessageFlows")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly "IntegrationFlowMessageFlows"[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.IntegrationFlow"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/RequestLineItem('{Id}')/RequestLineItemTechnologyInstanceDecisions": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get entities from related RequestLineItemTechnologyInstanceDecisions */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values, see [Filtering](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=64) */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values, see [Sorting](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=65) */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "RecommendationValue" | "RecommendationValue desc" | "Selected" | "Selected desc")[];
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "RecommendationValue" | "Selected" | "RequestLineItem" | "TechnologyInstance")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("RequestLineItem" | "TechnologyInstance")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            /** Collection of RequestLineItemTechnologyInstanceDecision */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.RequestLineItemTechnologyInstanceDecision"][];
                            };
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/RequestLineItemTechnologyInstanceDecision": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Retrieve all request line item technology instance decisions.
         * @description Retrieve the list of request line item technology instance decisions.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Include count of items */
                    readonly $inlinecount?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "CreatedAt" | "CreatedAt desc" | "ModifiedAt" | "ModifiedAt desc" | "RecommendationValue" | "RecommendationValue desc" | "Selected" | "Selected desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "RecommendationValue" | "Selected" | "RequestLineItem" | "TechnologyInstance")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("RequestLineItem" | "TechnologyInstance")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved request line item technology instance decision */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of request line item technology instance decision */
                            readonly d?: {
                                readonly __count?: components["schemas"]["count"];
                                readonly results?: readonly components["schemas"]["com.sap.intas.entities.RequestLineItemTechnologyInstanceDecision"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/CreateInterfaceRequest": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Create an interface request
         * @description Creates an interface request (request line item and associated entities).
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Name: name of the interface request, RequestId: The id of the related request, StyleId: The id of the related style, SourceApplicationInstances: The list of ids of source applications, TargetApplicationInstances: The list of ids of target applications */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.intas.entities.CreateInterfaceRequest"];
                };
            };
            readonly responses: {
                /** @description Interface request created */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.intas.entities.RequestLineItem"];
                        };
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/RequestLineItemTechnologyInstanceDecision('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /**
         * Retrieve specific request line item technology instance decision.
         * @description Retrieve specific request line item technology instance decision using id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "RecommendationValue" | "Selected" | "RequestLineItem" | "TechnologyInstance")[];
                    /** @description Expand related entities */
                    readonly $expand?: readonly ("RequestLineItem" | "TechnologyInstance")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved request line item technology instance decision */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.intas.entities.RequestLineItemTechnologyInstanceDecision"];
                    };
                };
                readonly 400: components["responses"]["error_400"];
                readonly 401: components["responses"]["error_401"];
                readonly 403: components["responses"]["error_403"];
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
    readonly "/RequestLineItemTechnologyInstanceDecision('{Id}')/RequestLineItem": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related RequestLineItem */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Status" | "Request" | "IntegrationFlow" | "RequestLineItemTechnologyInstanceDecisions")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Request" | "IntegrationFlow" | "RequestLineItemTechnologyInstanceDecisions")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.RequestLineItem"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
    readonly "/RequestLineItemTechnologyInstanceDecision('{Id}')/TechnologyInstance": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description key: Id */
                readonly Id: string;
            };
            readonly cookie?: never;
        };
        /** Get related TechnologyInstance */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned, see [Select](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=68) */
                    readonly $select?: readonly ("Id" | "CreatedAt" | "ModifiedAt" | "Name" | "Technology" | "DeploymentModel")[];
                    /** @description Expand related entities, see [Expand](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=63) */
                    readonly $expand?: readonly ("Technology" | "DeploymentModel")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: Id */
                    readonly Id: string;
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
                            readonly d?: components["schemas"]["com.sap.intas.entities.TechnologyInstance"];
                        };
                    };
                };
                readonly "4XX": components["responses"]["error"];
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
         * @description Group multiple requests into a single request payload, see [Batch Requests](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=152).
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
                     * @example --batch_a5e6-cbee-abcd
                     *      Content-Type: multipart/mixed; boundary=changeset_41a4-6f7d-6b47
                     *
                     *       --changeset_41a4-6f7d-6b47
                     *      Content-Type: application/http
                     *      Content-Transfer-Encoding: binary
                     *
                     *       POST Technology HTTP/1.1
                     *      sap-contextid-accept: header
                     *      Accept: application/json
                     *      Accept-Language: en-US
                     *      DataServiceVersion: 2.0
                     *      MaxDataServiceVersion: 2.0
                     *      X-Requested-With: XMLHttpRequest
                     *      Content-Type: application/json
                     *      Content-ID: id-1673275700086-71
                     *      Content-Length: 82
                     *
                     *       {...}
                     *      --changeset_41a4-6f7d-6b47--
                     *
                     *       --batch_a5e6-cbee-abcd
                     *      Content-Type: application/http
                     *      Content-Transfer-Encoding: binary
                     *
                     *       GET Technology/
                     *      count HTTP/1.1
                     *      sap-cancel-on-close: true
                     *      sap-contextid-accept: header
                     *      Accept: text/plain, *\/*;q=0.5
                     *      Accept-Language: en-US
                     *      DataServiceVersion: 2.0
                     *      MaxDataServiceVersion: 2.0
                     *      X-Requested-With: XMLHttpRequest
                     *
                     *       --batch_a5e6-cbee-abcd--
                     */
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
                        /**
                         * @example --batch_2b2b7397-30cc-402c-9140-cbc1cb49885f
                         *      Content-Type: multipart/mixed; boundary=changeset_da3fddb8-b8a2-4556-a97e-8c3be41547b9
                         *
                         *       --changeset_da3fddb8-b8a2-4556-a97e-8c3be41547b9
                         *      Content-Type: application/http
                         *      Content-Transfer-Encoding: binary
                         *
                         *       HTTP/1.1 201 Created
                         *      Content-Id: id-1679581440001-83
                         *      DataServiceVersion: 2.0
                         *      Location: https://test.com
                         *      Content-Type: application/json
                         *      Content-Length: 2366
                         *
                         *       {...}
                         *      --changeset_da3fddb8-b8a2-4556-a97e-8c3be41547b9--
                         *      --batch_2b2b7397-30cc-402c-9140-cbc1cb49885f
                         *      Content-Type: application/http
                         *      Content-Transfer-Encoding: binary
                         *
                         *       --batch_2b2b7397-30cc-402c-9140-cbc1cb49885f
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
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        /** Application */
        readonly "com.sap.intas.entities.Application": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly ApiHubId?: string | null;
            readonly ApplicationInstances?: {
                readonly results?: readonly components["schemas"]["com.sap.intas.entities.ApplicationInstance"][];
            };
            readonly Vendor?: components["schemas"]["com.sap.intas.entities.Vendor"];
        };
        /** Application (for create) */
        readonly "com.sap.intas.entities.Application-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly ApiHubId?: string | null;
            readonly Vendor?: components["schemas"]["association"];
        };
        /** Application (for update) */
        readonly "com.sap.intas.entities.Application-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly ApiHubId?: string | null;
        };
        /** ApplicationInstance */
        readonly "com.sap.intas.entities.ApplicationInstance": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            readonly Application?: components["schemas"]["com.sap.intas.entities.Application"];
            readonly DeploymentModel?: components["schemas"]["com.sap.intas.entities.DeploymentModel"];
        };
        /** ApplicationInstance (for create) */
        readonly "com.sap.intas.entities.ApplicationInstance-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            readonly Application?: components["schemas"]["association"];
            readonly DeploymentModel?: components["schemas"]["association"];
        };
        /** ApplicationInstance (for update) */
        readonly "com.sap.intas.entities.ApplicationInstance-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
        };
        /** Vendor */
        readonly "com.sap.intas.entities.Vendor": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
        };
        /** Vendor (for create) */
        readonly "com.sap.intas.entities.Vendor-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
        };
        /** Vendor (for update) */
        readonly "com.sap.intas.entities.Vendor-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
        };
        /** Technology */
        readonly "com.sap.intas.entities.Technology": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Vendor?: components["schemas"]["com.sap.intas.entities.Vendor"];
            readonly TechnologyDomains?: {
                readonly results?: readonly components["schemas"]["com.sap.intas.entities.TechnologyDomain"][];
            };
            readonly TechnologyInstances?: {
                readonly results?: readonly components["schemas"]["com.sap.intas.entities.TechnologyInstance"][];
            };
            readonly TechnologyStyles?: {
                readonly results?: readonly components["schemas"]["com.sap.intas.entities.TechnologyStyle"][];
            };
            readonly TechnologyKeyCharacteristics?: {
                readonly results?: readonly components["schemas"]["com.sap.intas.entities.TechnologyKeyCharacteristic"][];
            };
        };
        /** Technology (for create) */
        readonly "com.sap.intas.entities.Technology-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Vendor?: components["schemas"]["association"];
        };
        /** Technology (for update) */
        readonly "com.sap.intas.entities.Technology-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
        };
        /** TechnologyDomain */
        readonly "com.sap.intas.entities.TechnologyDomain": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Technology?: components["schemas"]["com.sap.intas.entities.Technology"];
            readonly Domain?: components["schemas"]["com.sap.intas.entities.Domain"];
        };
        /** TechnologyDomain (for create) */
        readonly "com.sap.intas.entities.TechnologyDomain-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Technology?: components["schemas"]["association"];
            readonly Domain?: components["schemas"]["association"];
        };
        /** TechnologyDomain (for update) */
        readonly "com.sap.intas.entities.TechnologyDomain-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
        };
        /** Domain */
        readonly "com.sap.intas.entities.Domain": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
        };
        /** Domain (for create) */
        readonly "com.sap.intas.entities.Domain-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
        };
        /** Domain (for update) */
        readonly "com.sap.intas.entities.Domain-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
        };
        /** Style */
        readonly "com.sap.intas.entities.Style": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            readonly IsCrossUseCase?: boolean | null;
        };
        /** Style (for create) */
        readonly "com.sap.intas.entities.Style-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            readonly IsCrossUseCase?: boolean | null;
        };
        /** Style (for update) */
        readonly "com.sap.intas.entities.Style-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            readonly IsCrossUseCase?: boolean | null;
        };
        /** IntegrationPattern */
        readonly "com.sap.intas.entities.IntegrationPattern": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Domain?: components["schemas"]["com.sap.intas.entities.Domain"];
            readonly Style?: components["schemas"]["com.sap.intas.entities.Style"];
        };
        /** IntegrationPattern (for create) */
        readonly "com.sap.intas.entities.IntegrationPattern-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Domain?: components["schemas"]["association"];
            readonly Style?: components["schemas"]["association"];
        };
        /** IntegrationPattern (for update) */
        readonly "com.sap.intas.entities.IntegrationPattern-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
        };
        /** DeploymentModel */
        readonly "com.sap.intas.entities.DeploymentModel": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
        };
        /** DeploymentModel (for create) */
        readonly "com.sap.intas.entities.DeploymentModel-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
        };
        /** DeploymentModel (for update) */
        readonly "com.sap.intas.entities.DeploymentModel-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
        };
        /** DomainDetermination */
        readonly "com.sap.intas.entities.DomainDetermination": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Domain?: components["schemas"]["com.sap.intas.entities.Domain"];
            readonly SourceDeploymentModel?: components["schemas"]["com.sap.intas.entities.DeploymentModel"];
            readonly TargetDeploymentModel?: components["schemas"]["com.sap.intas.entities.DeploymentModel"];
        };
        /** DomainDetermination (for create) */
        readonly "com.sap.intas.entities.DomainDetermination-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Domain?: components["schemas"]["association"];
            readonly SourceDeploymentModel?: components["schemas"]["association"];
            readonly TargetDeploymentModel?: components["schemas"]["association"];
        };
        /** DomainDetermination (for update) */
        readonly "com.sap.intas.entities.DomainDetermination-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
        };
        /** UseCasePattern */
        readonly "com.sap.intas.entities.UseCasePattern": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            readonly Example?: string | null;
            readonly Style?: components["schemas"]["com.sap.intas.entities.Style"];
        };
        /** UseCasePattern (for create) */
        readonly "com.sap.intas.entities.UseCasePattern-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            readonly Example?: string | null;
            readonly Style?: components["schemas"]["association"];
        };
        /** UseCasePattern (for update) */
        readonly "com.sap.intas.entities.UseCasePattern-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            readonly Example?: string | null;
        };
        /** KeyCharacteristicRecommendationDegree */
        readonly "com.sap.intas.entities.KeyCharacteristicRecommendationDegree": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly CssColor?: string | null;
            /** Format: int32 */
            readonly Score?: number | null;
        };
        /** KeyCharacteristicRecommendationDegree (for create) */
        readonly "com.sap.intas.entities.KeyCharacteristicRecommendationDegree-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly CssColor?: string | null;
            /** Format: int32 */
            readonly Score?: number | null;
        };
        /** KeyCharacteristicRecommendationDegree (for update) */
        readonly "com.sap.intas.entities.KeyCharacteristicRecommendationDegree-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly CssColor?: string | null;
            /** Format: int32 */
            readonly Score?: number | null;
        };
        /** KeyCharacteristicGroup */
        readonly "com.sap.intas.entities.KeyCharacteristicGroup": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
        };
        /** KeyCharacteristicGroup (for create) */
        readonly "com.sap.intas.entities.KeyCharacteristicGroup-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
        };
        /** KeyCharacteristicGroup (for update) */
        readonly "com.sap.intas.entities.KeyCharacteristicGroup-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
        };
        /** KeyCharacteristic */
        readonly "com.sap.intas.entities.KeyCharacteristic": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            readonly IsSingle?: boolean | null;
            readonly KeyCharacteristicGroup?: components["schemas"]["com.sap.intas.entities.KeyCharacteristicGroup"];
        };
        /** KeyCharacteristic (for create) */
        readonly "com.sap.intas.entities.KeyCharacteristic-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            readonly IsSingle?: boolean | null;
            readonly KeyCharacteristicGroup?: components["schemas"]["association"];
        };
        /** KeyCharacteristic (for update) */
        readonly "com.sap.intas.entities.KeyCharacteristic-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            readonly IsSingle?: boolean | null;
        };
        /** KeyCharacteristicValue */
        readonly "com.sap.intas.entities.KeyCharacteristicValue": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            readonly KeyCharacteristic?: components["schemas"]["com.sap.intas.entities.KeyCharacteristic"];
        };
        /** KeyCharacteristicValue (for create) */
        readonly "com.sap.intas.entities.KeyCharacteristicValue-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            readonly KeyCharacteristic?: components["schemas"]["association"];
        };
        /** KeyCharacteristicValue (for update) */
        readonly "com.sap.intas.entities.KeyCharacteristicValue-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
        };
        /** TechnologyInstance */
        readonly "com.sap.intas.entities.TechnologyInstance": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Technology?: components["schemas"]["com.sap.intas.entities.Technology"];
            readonly DeploymentModel?: components["schemas"]["com.sap.intas.entities.DeploymentModel"];
        };
        /** TechnologyInstance (for create) */
        readonly "com.sap.intas.entities.TechnologyInstance-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string;
            readonly Technology?: components["schemas"]["association"];
            readonly DeploymentModel?: components["schemas"]["association"];
        };
        /** TechnologyInstance (for update) */
        readonly "com.sap.intas.entities.TechnologyInstance-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
        };
        /** TechnologyKeyCharacteristic */
        readonly "com.sap.intas.entities.TechnologyKeyCharacteristic": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Description?: string | null;
            readonly Technology?: components["schemas"]["com.sap.intas.entities.Technology"];
            readonly KeyCharacteristicValue?: components["schemas"]["com.sap.intas.entities.KeyCharacteristicValue"];
            readonly RecommendationDegree?: components["schemas"]["com.sap.intas.entities.KeyCharacteristicRecommendationDegree"];
        };
        /** TechnologyKeyCharacteristic (for create) */
        readonly "com.sap.intas.entities.TechnologyKeyCharacteristic-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Description?: string | null;
            readonly Technology?: components["schemas"]["association"];
            readonly KeyCharacteristicValue?: components["schemas"]["association"];
            readonly RecommendationDegree?: components["schemas"]["association"];
        };
        /** TechnologyKeyCharacteristic (for update) */
        readonly "com.sap.intas.entities.TechnologyKeyCharacteristic-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Description?: string | null;
        };
        /** TechnologyStyle */
        readonly "com.sap.intas.entities.TechnologyStyle": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Technology?: components["schemas"]["com.sap.intas.entities.Technology"];
            readonly Style?: components["schemas"]["com.sap.intas.entities.Style"];
        };
        /** TechnologyStyle (for create) */
        readonly "com.sap.intas.entities.TechnologyStyle-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Technology?: components["schemas"]["association"];
            readonly Style?: components["schemas"]["association"];
        };
        /** TechnologyStyle (for update) */
        readonly "com.sap.intas.entities.TechnologyStyle-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
        };
        /** MessageFlow */
        readonly "com.sap.intas.entities.MessageFlow": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Status?: string | null;
            readonly SourceApplicationInstance?: components["schemas"]["com.sap.intas.entities.ApplicationInstance"];
            readonly TargetApplicationInstance?: components["schemas"]["com.sap.intas.entities.ApplicationInstance"];
            readonly Domain?: components["schemas"]["com.sap.intas.entities.Domain"];
            readonly Style?: components["schemas"]["com.sap.intas.entities.Style"];
        };
        /** MessageFlow (for create) */
        readonly "com.sap.intas.entities.MessageFlow-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Status?: string | null;
            readonly SourceApplicationInstance?: components["schemas"]["association"];
            readonly TargetApplicationInstance?: components["schemas"]["association"];
            readonly Domain?: components["schemas"]["association"];
            readonly Style?: components["schemas"]["association"];
        };
        /** MessageFlow (for update) */
        readonly "com.sap.intas.entities.MessageFlow-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Status?: string | null;
        };
        /** IntegrationFlow */
        readonly "com.sap.intas.entities.IntegrationFlow": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly IntegrationFlowMessageFlows?: {
                readonly results?: readonly components["schemas"]["com.sap.intas.entities.IntegrationFlowMessageFlow"][];
            };
        };
        /** IntegrationFlow (for create) */
        readonly "com.sap.intas.entities.IntegrationFlow-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly IntegrationFlowMessageFlows?: components["schemas"]["association"];
        };
        /** IntegrationFlow (for update) */
        readonly "com.sap.intas.entities.IntegrationFlow-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
        };
        /** IntegrationFlowMessageFlow */
        readonly "com.sap.intas.entities.IntegrationFlowMessageFlow": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly IntegrationFlow?: components["schemas"]["com.sap.intas.entities.IntegrationFlow"];
            readonly MessageFlow?: components["schemas"]["com.sap.intas.entities.MessageFlow"];
        };
        /** IntegrationFlowMessageFlow (for create) */
        readonly "com.sap.intas.entities.IntegrationFlowMessageFlow-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly IntegrationFlow?: components["schemas"]["association"];
            readonly MessageFlow?: components["schemas"]["association"];
        };
        /** IntegrationFlowMessageFlow (for update) */
        readonly "com.sap.intas.entities.IntegrationFlowMessageFlow-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
        };
        /** Request */
        readonly "com.sap.intas.entities.Request": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Status?: string | null;
            readonly RequestLineItems?: {
                readonly results?: readonly components["schemas"]["com.sap.intas.entities.RequestLineItem"][];
            };
        };
        /** Request (for create) */
        readonly "com.sap.intas.entities.Request-create": {
            readonly Name?: string;
        };
        /** Request (for create) */
        readonly "com.sap.intas.entities.Request-created": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string;
            readonly Status?: string;
        };
        /** Request (for update) */
        readonly "com.sap.intas.entities.Request-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Name?: string | null;
            readonly Status?: string | null;
        };
        /** Request (for patch) */
        readonly "com.sap.intas.entities.Request-patch": {
            readonly Name?: string | null;
            readonly Status?: string | null;
        };
        /** RequestLineItem */
        readonly "com.sap.intas.entities.RequestLineItem": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Status?: string | null;
            readonly Request?: components["schemas"]["com.sap.intas.entities.Request"];
            readonly IntegrationFlow?: components["schemas"]["com.sap.intas.entities.IntegrationFlow"];
            readonly RequestLineItemTechnologyInstanceDecisions?: {
                readonly results?: readonly components["schemas"]["com.sap.intas.entities.RequestLineItemTechnologyInstanceDecision"][];
            };
        };
        /** RequestLineItem (for create) */
        readonly "com.sap.intas.entities.RequestLineItem-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Status?: string | null;
            readonly Request?: components["schemas"]["association"];
        };
        /** RequestLineItem (for update) */
        readonly "com.sap.intas.entities.RequestLineItem-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            readonly Status?: string | null;
        };
        /** RequestLineItem (for patch) */
        readonly "com.sap.intas.entities.RequestLineItem-patch": {
            /** @description The status to update */
            readonly Status?: string | null;
        };
        /** CreateInterfaceRequest */
        readonly "com.sap.intas.entities.CreateInterfaceRequest": {
            /** @description The name of the interface request */
            readonly Name?: string;
            /** @description The id of the associated request */
            readonly RequestId?: string;
            /** @description The id of the associated style */
            readonly StyleId?: string;
            /** @description List of references to source application instances */
            readonly SourceApplicationInstances?: readonly components["schemas"]["com.sap.intas.entities.EntityReference"][];
            /** @description List of references to source application instances */
            readonly TargetApplicationInstances?: readonly components["schemas"]["com.sap.intas.entities.EntityReference"][];
        };
        /** EntityReference */
        readonly "com.sap.intas.entities.EntityReference": {
            /** @description The id of the referenced entity */
            readonly Id?: string | null;
        };
        /** RequestLineItemTechnologyInstanceDecision */
        readonly "com.sap.intas.entities.RequestLineItemTechnologyInstanceDecision": {
            readonly Id?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            /**
             * Format: double
             * @example 3.14
             */
            readonly RecommendationValue?: (number | string) | null;
            readonly Selected?: boolean | null;
            readonly RequestLineItem?: components["schemas"]["com.sap.intas.entities.RequestLineItem"];
            readonly TechnologyInstance?: components["schemas"]["com.sap.intas.entities.TechnologyInstance"];
        };
        /** RequestLineItemTechnologyInstanceDecision (for create) */
        readonly "com.sap.intas.entities.RequestLineItemTechnologyInstanceDecision-create": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            /**
             * Format: double
             * @example 3.14
             */
            readonly RecommendationValue?: (number | string) | null;
            readonly Selected?: boolean | null;
            readonly RequestLineItem?: components["schemas"]["association"];
            readonly TechnologyInstance?: components["schemas"]["association"];
        };
        /** RequestLineItemTechnologyInstanceDecision (for update) */
        readonly "com.sap.intas.entities.RequestLineItemTechnologyInstanceDecision-update": {
            /** @example /Date(1492098664000)/ */
            readonly CreatedAt?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ModifiedAt?: string | null;
            /**
             * Format: double
             * @example 3.14
             */
            readonly RecommendationValue?: (number | string) | null;
            readonly Selected?: boolean | null;
        };
        /** @description The number of entities in the collection. Available when using the [$inlinecount](https://help.sap.com/doc/5890d27be418427993fafa6722cdc03b/Cloud/en-US/OdataV2.pdf#page=67) query option. */
        readonly count: string;
        readonly error: {
            readonly error: {
                readonly code: string;
                readonly message: {
                    readonly lang: string;
                    readonly value: string;
                };
            };
        };
        readonly association: {
            readonly Id?: string;
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
        /** @description Bad Request - You have provided an invalid request parameter or the payload does not match the expected format. See error message for details. */
        readonly error_400: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["error"];
            };
        };
        /** @description Unauthorized - No valid access token (JWT) has been provided or it has expired. */
        readonly error_401: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["error"];
            };
        };
        /** @description Forbidden - You do not have the necessary authorization to perform this action or access the requested resource. */
        readonly error_403: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["error"];
            };
        };
        /** @description Not found - The requested resource does not exist. */
        readonly error_404: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["error"];
            };
        };
        /** @description Conflict - Could not create the resource due to a conflict with an existing one (e.g., a unique value that is already in use). See error message for details. */
        readonly error_409: {
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
         * @description Show only the first n items
         * @example 50
         */
        readonly top: number;
        /** @description Skip the first n items */
        readonly skip: number;
        /** @description Include count of items */
        readonly count: "allpages" | "none";
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
