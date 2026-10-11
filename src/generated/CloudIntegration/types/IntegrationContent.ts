export type paths = {
    readonly "/CopyIntegrationPackage": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Copy an integration package.
         * @description You can use the following request to copy an integration package from 'Discover' to 'Design' section. If the package already exists, either the existing package can be overwritten or a new package with a suffix for name and Id can be created. <br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to create an integration package.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of integration package - enclosed in single quotes <br>
                     *     Example: ```'ERPtoSuccessFactorsEmployeeCentralEmployeeandOrganizationalData'```.<br>
                     *     The Id can be found in the package URL.
                     */
                    readonly Id: string;
                    /**
                     * @description If the package already exists, it can be overwritten by the copied package, or a new package could be created with a new suffix, which needs to be provided by query parameter 'Suffix'.<br>
                     *      OVERWRITE_MERGE - With this mode, the package will be copied and overwritten to an existing/already copied package from Discover, would keep the configurations (of externalized parameters) intact for the existing/already copied package's artifacts.
                     */
                    readonly ImportMode?: readonly ("'CREATE_COPY'" | "'OVERWRITE'" | "'OVERWRITE_MERGE'")[];
                    /**
                     * @description Suffix is required, if a package with the same name already exists and an additional copy of the same package should be created. The entered value must be enclosed in single quotes.<br>
                     *     Example: Entered Suffix ```'ABC'``` creates a new package, where ```.ABC``` is added to the name and to the artifacts Ids.<br>
                     *     Note: Only relevant for query parameter 'ImportMode' ```'CREATE_COPY'```.
                     */
                    readonly Suffix?: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Package copied to Design section. */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.IntegrationPackage"];
                        };
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                /** @description Conflict. Indicates that the request could not be processed because of conflict in the current state of the resource. */
                readonly 409: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
                    };
                };
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationPackages": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all integration packages.
         * @description You can use the following request to get all integration packages.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Custom Tag property defined in the tenant settings. You can provide multiple values.<br>
                     *     Example1: ```Author=Fred```
                     *     Example2: ```Author=Fred|John```
                     */
                    readonly Author?: string;
                    /**
                     * @description Custom Tag property defined in the tenant settings. You can provide multiple values.<br>
                     *     Example1: ```LoB=Sales```
                     *     Example2: ```LoB=Sales|Marketing```
                     */
                    readonly LoB?: string;
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved integration packages */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.IntegrationPackage"][];
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
        /**
         * Create/Import new integration package.
         * @description You can use the following request to create/import an integration package.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to create integration package.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: {
                    /** @description You can use the Overwrite parameter to overwrite an existing package. */
                    readonly Overwrite?: readonly ("true" | "false")[];
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Attributes of the new integration package/base64-encoded package content */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.IntegrationPackage-create"];
                };
            };
            readonly responses: {
                /** @description Integration package successfully created. */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.IntegrationPackage"];
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                /** @description Conflict. Indicates that the request could not be processed because of conflict in the current state of the resource. */
                readonly 409: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
                    };
                };
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationPackages('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get integration package by ID
         * @description You can use the following request to get an integration packages by Id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description ID of integration package <br>
                     *     Example: ```ERPtoSuccessFactorsEmployeeCentralEmployeeandOrganizationalData```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved integration package */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.IntegrationPackage"];
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
        /**
         * Update integration package.
         * @description You can use the following request to update an existing integration package.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration package.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description ID integration package */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New attributes values of integration package */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.IntegrationPackage-update"];
                };
            };
            readonly responses: {
                /** @description Update triggered for integration package. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        /**
         * Delete integration package.
         * @description You can use the following request to delete an existing integration package.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete integration package.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description ID of integration package */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Deletion triggered for integration package. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationPackages('{Id}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download integration package by ID
         * @description You can use the following request to download an integration package of as .zip file. Download fails if the package contains one or more artifacts in draft state.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description ID of integration package <br>
                     *     Example: ```ERPtoSuccessFactorsEmployeeCentralEmployeeandOrganizationalData```
                     */
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
                        readonly "application/json": string;
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error. The requested operation led to an error during execution. */
                readonly 500: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
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
    readonly "/IntegrationPackages('{Id}')/IntegrationDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all integration flows of a package.
         * @description You can use the following request to get all integration flows of an integration package by package Id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description ID of integration package <br>
                     *     Example: ```ERPtoSuccessFactorsEmployeeCentralEmployeeandOrganizationalData```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved integration flows of the integration package */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.IntegrationDesigntimeArtifact"][];
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
    readonly "/IntegrationPackages('{Id}')/IntegrationDesigntimeArtifacts(Id='{ArtifactId}',Version='{ArtifactVersion}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get an integration flow of a package.
         * @description You can use the following request to get an integration flow of an integration package by package Id, integration flow and integration flow version.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description ID of integration package <br>
                     *     Example: ```ERPtoSuccessFactorsEmployeeCentralEmployeeandOrganizationalData```
                     */
                    readonly Id: string;
                    /**
                     * @description ID of integration flow <br>
                     *     Example: ```com.sap.PA_SE_IN.erp2ec.SAPtoSFSFGenericODataUpsert.v1```
                     */
                    readonly ArtifactId: string;
                    /**
                     * @description Version of integration flow <br>
                     *     You can enter either ```active``` or the version name (e.g. ```8.1.0```) for retrieving the current version.
                     */
                    readonly ArtifactVersion: string;
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
                        readonly "application/json": components["schemas"]["com.sap.hci.api.IntegrationDesigntimeArtifact"];
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
    readonly "/IntegrationPackages('{Id}')/MessageMappingDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all message mappings of an integration package.
         * @description You can use the following request to get all message mappings of an integration package by package Id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Version" | "PackageId" | "Name" | "Description" | "ArtifactContent")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description ID of integration package <br>
                     *     Example: ```MessageMappingExamples```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved message mappings of the integration package */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.MessageMappingDesigntimeArtifact"][];
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
    readonly "/IntegrationPackages('{Id}')/MessageMappingDesigntimeArtifacts(Id='{ArtifactId}',Version='{ArtifactVersion}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get message mapping of an integration package.
         * @description Use the following request to get a message mapping of an integration package by package Id, message mapping Id, and message mapping version.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Version" | "PackageId" | "Name" | "Description" | "ArtifactContent")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description ID of integration package <br>
                     *     Example: ```MessageMappingExamples```
                     */
                    readonly Id: string;
                    /**
                     * @description ID of message mapping <br>
                     *     Example: ```MessageMapping1```
                     */
                    readonly ArtifactId: string;
                    /**
                     * @description Version of message mapping <br>
                     *     You can enter either ```active``` or the version name (e.g. ```2.0.0```) for retrieving the current version.
                     */
                    readonly ArtifactVersion: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved message mapping of the integration package */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.MessageMappingDesigntimeArtifact"][];
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
    readonly "/IntegrationPackages('{Id}')/ValueMappingDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all value mappings of a package.
         * @description You can use the following request to get all value mappings of an integration package by package Id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description ID of integration package <br>
                     *     Example: ```ValueMappingExamples```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved value mappings of the integration package */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.ValueMappingDesigntimeArtifact"][];
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
    readonly "/IntegrationPackages('{Id}')/ValueMappingDesigntimeArtifacts(Id='{ArtifactId}',Version='{ArtifactVersion}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get a value mapping of a package.
         * @description You can use the following request to get a value mapping of an integration package by package Id, valuen mapping and value mapping version.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description ID of integration package <br>
                     *     Example: ```ValueMappingExamples```
                     */
                    readonly Id: string;
                    /**
                     * @description ID of value mapping <br>
                     *     Example: ```ValueMapping1```
                     */
                    readonly ArtifactId: string;
                    /**
                     * @description Version of value mapping <br>
                     *     You can enter either ```active``` or the version name (e.g. ```2.0.0```) for retrieving the current version.
                     */
                    readonly ArtifactVersion: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved value mapping */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.ValueMappingDesigntimeArtifact"];
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
    readonly "/IntegrationPackages('{Id}')/ScriptCollectionDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all script collections of a package.
         * @description You can use the following request to get all script collections of an integration package by package Id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration package <br>
                     *     Example: ```packageName```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved script collections of the integration package */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.ScriptCollectionDesigntimeArtifact"][];
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
    readonly "/IntegrationPackages('{Id}')/ScriptCollectionDesigntimeArtifacts(Id='{ScriptCollectionArtifactID}',Version='{ArtifactVersion}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get a script collection of a package.
         * @description You can use the following request to get script collection of an integration package by package Id, script collection Id and script collection version.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration package <br>
                     *     Example: ```packageName```
                     */
                    readonly Id: string;
                    /**
                     * @description Id of script collection <br>
                     *     Example: ```ScriptCollectionArtifactID```
                     */
                    readonly ArtifactId: string;
                    /**
                     * @description Version of script collection <br>
                     *     You can enter either ```active``` or the version name (e.g. ```2.0.0```) for retrieving the current version.
                     */
                    readonly ArtifactVersion: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved script collection */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.ScriptCollectionDesigntimeArtifact"];
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
    readonly "/IntegrationPackages('{Id}')/CustomTags": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get Custom Tags of a package.
         * @description You can use the following request to get custom tags of an integration package by package Id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Order items by property values, see [Orderby System Query Option](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/) */
                    readonly $orderby?: readonly ("Name" | "Name desc")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description ID of integration package <br>
                     *     Example: ```CloudPlatformAPITestPackage```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved Custom Tags */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
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
    readonly "/IntegrationPackages('{Id}')/$links/CustomTags('{Name}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        /**
         * Update a Custom Tag.
         * @description You can use the following request to update a Custom Tag.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required  permissions to update Custom Tags.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description ID of integration package. <br>
                     *     Example: ```CloudPlatformAPITestPackage```
                     */
                    readonly Id: string;
                    /** @description Name of the Custom Tag which values are to be updated. */
                    readonly Name: string;
                };
                readonly cookie?: never;
            };
            /** @description Value of the Custom Tag to be udpated. You can define multiple values.<br>Example1: ```Fred```<br>Example2: ```Fred|John``` */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.CustomTags-Update"];
                };
            };
            readonly responses: {
                /** @description Accepted */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationPackages('{Id}')/MessageTypeDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all message types of an integration package.
         * @description You can use the following request to get all message types of an integration package by package Id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Version" | "PackageId" | "Name" | "Namespace" | "Description" | "ArtifactContent")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description ID of integration package <br>
                     *     Example: ```MessageTypeExamples```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved message types of the integration package */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.MessageTypeDesigntimeArtifact"][];
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
    readonly "/IntegrationPackages('{Id}')/FaultMessageTypeDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all fault message types of an integration package.
         * @description You can use the following request to get all fault message types of an integration package by package Id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Version" | "PackageId" | "Name" | "Namespace" | "Description" | "ArtifactContent")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description ID of integration package <br>
                     *     Example: ```MessageTypeExamples```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved fault message types of the integration package */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.FaultMessageTypeDesigntimeArtifact"][];
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
    readonly "/IntegrationPackages('{Id}')/DataTypeDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all data types of an integration package.
         * @description You can use the following request to get all data types of an integration package by package Id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Version" | "PackageId" | "Name" | "Namespace" | "Description" | "ArtifactContent")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description ID of integration package <br>
                     *     Example: ```DataTypeExamples```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved data types of the integration package */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.DataTypeDesigntimeArtifact"][];
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
    readonly "/IntegrationPackages('{Id}')/ServiceInterfaceDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all ServiceInterface artifacs of an integration package.
         * @description You can use the following request to get all ServiceInterface artifacts of an integration package by package Id.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Version" | "PackageId" | "Name" | "Namespace" | "Description" | "ArtifactContent")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description ID of integration package <br>
                     *     Example: ```ServiceInterfaceExamples```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved ServiceInterface artifact of the integration package */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.ServiceInterfaceDesigntimeArtifact"][];
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
    readonly "/CustomTagConfigurations('CustomTags')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all custom tags.
         * @description You can use the following request to get all custom tags.
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
                /** @description Retrieved custom tags */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.CustomTagsConfiguration"][];
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
    readonly "/CustomTagConfigurations": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Create/upload custom tags configuration.
         * @description You can use the following request to create or upload custom tags configuration.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to create integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description As request body, provide the JSON representation of the custom tag configuration in base64 format.<br>For more information, see SAP Help Portal documentation at [Create New Custom Tags Configuration](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/31e830841ace4ab08b1c586e910c47c0.html). */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.CustomTagsConfiguration-create"];
                };
            };
            readonly responses: {
                /** @description Created. */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                /** @description Conflict. Indicates that the request could not be processed because of conflict in the current state of the resource. */
                readonly 409: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
                    };
                };
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Create/upload an integration flow.
         * @description You can use the following request to create or upload an integration flow.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to create integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /**
             * @description New integration flow requires name and package Id. <br>
             *     The name should begin with alphabetic character or underscore ```_``` and can also contain numbers, space, period ```.``` or hyphen ```-```. But it should not end with period ```.```.<br>
             *     The artifact content is only required, if integration flow zip content in base64-encoded format should be uploaded.<br>
             *     Sender and Receiver attributes are optional.
             */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.IntegrationDesigntimeArtifact-create"];
                };
            };
            readonly responses: {
                /** @description Created. Integration flow successfully created. */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.IntegrationDesigntimeArtifact"];
                        };
                    };
                };
                /** @description Bad Request. Wrong format or structure of the provided request body or parameters. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
                    };
                };
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - possibly an integration flow with the same Id already exists. */
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
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get an integration flow by Id and version.
         * @description You can use the following request to get an integration flow by Id and version.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *     In API sandbox, the following integration flows with Id and version are available:
         *     * '__IntegrationFlow_FAILED_DEPLOYMENT__' with version '__1.0.0__'
         *     * '__IntegrationFlow_MessageStore_COMPLETED_PROCESSING__' with version '__1.0.0__'
         *     * '__IntegrationFlow_AdapterData_FAILED_PROCESSING__' with version '__1.0.0__'
         *     * '__IntegrationFlowWithConfiguration__' with version '__1.0.5__'
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Name" | "Version" | "PackageId")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
                            readonly d?: components["schemas"]["com.sap.hci.api.IntegrationDesigntimeArtifact"];
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
        /**
         * Update an integration flow.
         * @description You can use the following request to update an integration flow.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Current version of integration artifact to be updated <br>
                     *     You can enter either ```active``` or the current/latest version name (e.g. ```1.0.5```).
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            /**
             * @description New attribute values of the Integration Designtime artifact. Check the following table for behavior depending on provided or not provided attributes:<br><table><tr><td>```Name```</td><td width=150px>```ArtifactContent```</td><td>```Behavior```</td></tr><tr><td >Yes</td><td>No</td><td>Save as draft</td></tr><tr><td>Yes</td><td>Yes</td><td>Update & Save by picking bundle version from Bundle Manifest</td></tr><tr><td>No</td><td>Yes</td><td>Update & Save by picking bundle version & bundle Name (iFlow name) from Bundle Manifest</td></tr></table><br>
             *     The optional Comment shall be provided with ArtifactContent. Otherwise it will be ignored.<br>
             *     Sender and Receiver attributes are optional.
             */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.IntegrationDesigntimeArtifact-update"];
                };
            };
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        /**
         * Delete an integration flow.
         * @description You can use the following request to delete an integration flow.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete integration flows.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationDesigntimeArtifactSaveAsVersion": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Update an artifact with version.
         * @description You can use the following request to update an artifact with new specified version.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of integration artifact - enclosed in single quotes<br>
                     *     Example: ```'IntegrationFlowWithConfiguration'```
                     */
                    readonly Id: string;
                    /**
                     * @description New version of integration artifact - enclosed in single quotes <br>
                     *      (e.g. ```'1.0.5'```).
                     */
                    readonly SaveAsVersion: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download an integration flow as zip file.
         * @description You can use the following request to download an integration flow as zip file. Integration flows of configure-only packages cannot be downloaded.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *     In API sandbox the following integration flows with Id and version are available:
         *     * '__IntegrationFlow_FAILED_DEPLOYMENT__' with version '__1.0.0__'
         *     * '__IntegrationFlow_MessageStore_COMPLETED_PROCESSING__' with version '__1.0.0__'
         *     * '__IntegrationFlow_AdapterData_FAILED_PROCESSING__' with version '__1.0.0__'
         *     * '__IntegrationFlowWithConfiguration__' with version '__1.0.5__'
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
    readonly "/DeployIntegrationDesigntimeArtifact": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Deploy an integration flow.
         * @description You can use the following request to deploy an integration flow.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to deploy integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of integration artifact - enclosed in single quotes <br>
                     *     Example: ```'IntegrationFlowWithConfiguration'```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact - enclosed in single quotes  <br>
                     *     You can enter either ```'active'``` or the version name (e.g. ```'1.0.5'```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Accepted. Deployment triggered for integration artifact. Response contains task Id. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/ValidateIntegrationDesigntimeArtifact": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Validate an integration flow.
         * @description You can use the following request to validate an integration flow.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to deploy integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of integration artifact - enclosed in single quotes <br>
                     *     Example: ```'IntegrationFlowWithConfiguration'```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact - enclosed in single quotes  <br>
                     *     You can enter either ```'active'``` or the version name (e.g. ```'1.0.5'```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Accepted. Response body contains the result - 'Check execution result: Passed or Failed' and eventually error details. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/MessageMappingDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all message mappings.
         * @description You can use the following request to get all message mappings deployed on the tenant.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Version" | "PackageId" | "Name" | "Description" | "ArtifactContent")[];
                    /** @description Order items by property values, see [Orderby System Query Option](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/). Default order: by 'Name' ascending */
                    readonly $orderby?: readonly ("Name" | "Name desc")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved message mapping */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.MessageMappingDesigntimeArtifact"][];
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
        /**
         * Create/Upload a message mapping.
         * @description You can use the following request to create/upload a message mapping.
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to upload message mappings.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /**
             * @description New message mapping requires name, Id and package Id. <br>
             *     The name should begin with alphabetic character or underscore ```_``` and can also contain numbers, space, period ```.``` or hyphen ```-```. But it should not end with period ```.```.<br>
             *     The artifact content is only required, if message mapping zip content in base64-encoded format should be uploaded.
             */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.ValueMappingDesigntimeArtifact-create"];
                };
            };
            readonly responses: {
                /** @description Created. Message mapping flow successfully created. */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.MessageMappingDesigntimeArtifact-create"];
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
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/MessageMappingDesigntimeArtifacts(Id='{Id}',Version='{Version}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get message mapping by Id and version.
         * @description You can use the following request to get a deployed message mapping deployed by Id and version.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Name" | "Version" | "PackageId")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of message mapping <br>
                     *     Example: ```MessageMapping1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of message mapping <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
                            readonly d?: components["schemas"]["com.sap.hci.api.MessageMappingDesigntimeArtifact"];
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
        /**
         * Update a message mapping.
         * @description You can use the following request to update a message mapping.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update message mappings.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Id of message mapping <br> */
                    readonly Id: string;
                    /**
                     * @description Current version of message mapping to be updated <br>
                     *     You can enter either ```active``` or the current/latest version name (e.g. ```1.0.5```).
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            /** @description New attribute values of message mapping artifact. Check the following table for behavior depending on provided or not provided attributes:<br><table><tr><td>```Name/Description```</td><td width=150px>```ArtifactContent```</td><td>```Behavior```</td></tr><tr><td >Yes</td><td>No</td><td>Update Name, Description & Save as draft</td></tr><tr><td>Yes</td><td>Yes</td><td>Update & Save by picking bundle version from Bundle Manifest</td></tr><tr><td>No</td><td>Yes</td><td>Update & Save by picking bundle version, bundle Name and Description from Bundle Manifest</td></tr></table> */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.MessageMappingDesigntimeArtifact-update"];
                };
            };
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request. Update of Message Mapping failed. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Update of Message Mapping failed. */
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
         * Delete a message mapping.
         * @description You can use the following request to delete a message mapping.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete integration flows.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of message mapping <br>
                     *     Example: ```MessageMapping1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of message mapping artifact.<br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/MessageMappingDesigntimeArtifacts(Id='{Id}',Version='{Version}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download a message mapping as zip file.
         * @description You can use the following request to download a message mapping as zip file. Message mappings of configure-only packages cannot be downloaded<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Id of message mapping<br> */
                    readonly Id: string;
                    /**
                     * @description Version of message mapping <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
                        readonly "application/zip": string;
                    };
                };
                /** @description Bad request. Not possible to download message mapppings in a configure only package. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/zip": components["schemas"]["odata.error"];
                        readonly "application/json": unknown;
                    };
                };
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
    readonly "/DeployMessageMappingDesigntimeArtifact": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Deploy a message mapping.
         * @description You can use the following request to deploy a message mapping.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to deploy message mappings.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /** @description Id of message mapping - enclosed in single quotes <br> */
                    readonly Id: string;
                    /**
                     * @description Version of message mapping - enclosed in single quotes  <br>
                     *     You can enter either ```'active'``` or the version name (e.g. ```'1.0.5'```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Accepted. Deployment triggered for integration artifact. Response contains task Id. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/MessageMappingDesigntimeArtifactSaveAsVersion": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Update an artifact with version.
         * @description You can use the following request to update an artifact with new specified version.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update message mappings flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /** @description Id of message mapping - enclosed in single quotes<br> */
                    readonly Id: string;
                    /**
                     * @description New version of message mapping - enclosed in single quotes <br>
                     *      (e.g. ```'1.0.5'```).
                     */
                    readonly SaveAsVersion: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad Request. Message mapping within a configure only package cannot be updated. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error. Locked artifacts cannot be updated. */
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
    readonly "/BuildAndDeployStatus(TaskId='{taskId}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get build and deploy status for task Id.
         * @description You can use the following request to get the [Build and Deploy Status](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d8934e0d3ab649ecb5ae744663c7962c.html) of an artifact by task Id. For an example scenario that shows you how to use this request in a sequence with other API calls, refer to the SAP Help Portal documentation [Get Runtime Status of Deployed Integration Flow](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/49c733687c80415aa5b67d58cda99dbf.html).
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Task Id of design time artifact */
                    readonly taskId: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description OK */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.BuildAndDeployStatus"];
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
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')/Configurations": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get configurations of an integration flow by Id and version.
         * @description You can use the following request to get the configuration parameters (key/value pairs) of an integration artifact by Id and version.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *     In API sandbox, the following integration flow contains configuration parameters: '__IntegrationFlowWithConfiguration__' with version '__1.0.5__'
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Returns a subset of the entries, which matches the filter condition.<br>
                     *     Supported operators: ```eq``` and ```ne```<br>
                     *     Supported string functions: ```substringof```, ```startswith``` and ```endswith```.<br>
                     *     Example: ```substringof('Receiver_',ParameterKey) eq true```
                     */
                    readonly $filter?: string;
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("ParameterKey" | "ParameterValue" | "DataType" | "Description")[];
                    /** @description Order items by property values. */
                    readonly $orderby?: readonly ("ParameterKey" | "ParameterKey desc")[];
                    /** @description Response format can be JSON or XML. */
                    readonly $format?: readonly ("json" | "xml")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.Configuration"][];
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
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')/Configurations/$count": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of configuration parameters.
         * @description You can use the following request to get the number of configuration parameters (key/value pairs) for an integration artifact by Id and version.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *     In API sandbox, the following integration flow contains configuration parameters: '__IntegrationFlowWithConfiguration__' with version '__1.0.5__'
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Returns a subset of the entries, which matches the filter condition.<br>
                     *     Supported operators: ```eq``` and ```ne```<br>
                     *     Supported string functions: ```substringof```, ```startswith``` and ```endswith```.<br>
                     *     Example: ```substringof('Receiver_',ParameterKey) eq true```
                     */
                    readonly $filter?: string;
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Number of retrieved configuration parameters for an integration flow */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
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
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')/$links/Configurations('{ParameterKey}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        /**
         * Update configuration parameter of an integration flow.
         * @description You can use the following request to update the value for a configuration parameters of an integration flow.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions for integration flows.You need to configure an API endpoint for your account, where you have the required write permissions to update configuration parameters of an integration flow.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                    /**
                     * @description Parameter key <br>
                     *     Example: ```Parameter1```
                     */
                    readonly ParameterKey: string;
                };
                readonly cookie?: never;
            };
            /** @description Configuration Parameter (DataType is optional) */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.Configuration-update"];
                };
            };
            readonly responses: {
                /** @description Update triggered for configuration parameter. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')/Resources": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all resources of an integration flow.
         * @description You can use the following request to get all resources of an integration flow.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Returns a subset of the entries, which matches the filter condition.<br>
                     *     Supported operators: ```eq``` and ```ne```<br>
                     *     Supported string functions: ```substringof```, ```startswith``` and ```endswith```.<br>
                     *     Example: ```substringof('wsdl',Name) eq true```
                     */
                    readonly $filter?: string;
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Name" | "ResourceType" | "ReferencedResourceType")[];
                    /** @description Order items by property values. */
                    readonly $orderby?: readonly ("Name" | "Name desc" | "ResourceType" | "ResourceType desc" | "Name,ResourceType" | "Name desc,ResourceType desc")[];
                    /** @description Response format can be JSON or XML. */
                    readonly $format?: readonly ("json" | "xml")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
                            /** Collection of Resource */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.Resource"][];
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
        /**
         * Add a Resource to an integration flow.
         * @description You can use the following request to add a resource to an integration flow.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            /** @description New entity */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.Resource-create"];
                };
            };
            readonly responses: {
                /** @description Retrieved entities */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.Resource"];
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
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')/Resources/$count": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of resource.
         * @description You can use the following request to get the number of all resources for an integration flow.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Returns a subset of the entries, which matches the filter condition.<br>
                     *     Supported operators: ```eq``` and ```ne```<br>
                     *     Supported string functions: ```substringof```, ```startswith``` and ```endswith```.<br>
                     *     Example: ```substringof('wsdl',Name) eq true```
                     */
                    readonly $filter?: string;
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Number of retrieved resources for an integration flow */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
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
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')/Resources(Name='{Name}',ResourceType='{Type}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get a resource of an integration flow.
         * @description You can use the following request to get a resource of an integration flow.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Reference to another resource type (only for resource type 'xsd' the reference to 'wsdl' is allowed). */
                    readonly ReferencedResourceType?: readonly "wsdl"[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Name" | "ResourceType" | "ReferencedResourceType")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                    /**
                     * @description Resource name <br>
                     *     Example: ```AddSignatureInfo.xsl```
                     */
                    readonly Name: string;
                    /**
                     * @description Resource type <br>
                     *     Example: ```xslt```
                     */
                    readonly Type: readonly ("edmx" | "groovy" | "jar" | "js" | "mmap" | "opmap" | "wsdl" | "xsd" | "xslt")[];
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
                            readonly d?: components["schemas"]["com.sap.hci.api.Resource"];
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
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')/Resources(Name='{Name}',ResourceType='{Type}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download resource content of an integration flow.
         * @description You can use the following request to download resource content of an integration flow. <br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Reference to another resource type (only for resource type 'xsd' the reference to 'wsdl' is allowed). */
                    readonly ReferencedResourceType?: readonly "wsdl"[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                    /**
                     * @description Resource name <br>
                     *     Example: ```AddSignatureInfo.xsl```
                     */
                    readonly Name: string;
                    /**
                     * @description Resource type <br>
                     *     Example: ```xslt```
                     */
                    readonly Type: readonly ("edmx" | "groovy" | "jar" | "js" | "mmap" | "opmap" | "wsdl" | "xsd" | "xslt")[];
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved resource content of an integration flow */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
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
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')/$links/Resources(Name='{Name}',ResourceType='{Type}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        /**
         * Update a resource of an integration flow.
         * @description You can use the following request to update a resource of an integration flow.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update an integration flow.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: {
                    /** @description Reference to another resource type (only for resource type 'xsd' the reference to 'wsdl' is allowed). */
                    readonly ReferencedResourceType?: readonly "wsdl"[];
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                    /**
                     * @description Resource name <br>
                     *     Example: ```AddSignatureInfo.xsl```
                     */
                    readonly Name: string;
                    /**
                     * @description Resource type <br>
                     *     Example: Use ```xslt```
                     */
                    readonly Type: readonly ("edmx" | "groovy" | "jar" | "js" | "mmap" | "opmap" | "wsdl" | "xsd" | "xslt")[];
                };
                readonly cookie?: never;
            };
            readonly requestBody?: components["requestBodies"]["com.sap.hci.api.Resource-update"];
            readonly responses: {
                /** @description Accepted. Update triggered for resource. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        /**
         * Delete a resource of an integration flow.
         * @description You can use the following request to delete a resource of an integration flow.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: {
                    /** @description Reference to another resource type (only for resource type 'xsd' the reference to 'wsdl' is allowed). */
                    readonly ReferencedResourceType?: readonly "wsdl"[];
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```IntegrationFlowWithConfiguration```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration artifact  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                    /**
                     * @description Resource name <br>
                     *     Example: ```AddSignatureInfo.xsl```
                     */
                    readonly Name: string;
                    /**
                     * @description Resource type <br>
                     *     Example: ```xslt```
                     */
                    readonly Type: readonly ("edmx" | "groovy" | "jar" | "js" | "mmap" | "opmap" | "wsdl" | "xsd" | "xslt")[];
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationRuntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all deployed integration artifacts.
         * @description You can use the following request to get all deployed integration artifacts.<br>
         *     In API sandbox the following integration flows are deployed:<br>
         *     * '__Integration Flow - FAILED DEPLOYMENT__' with deployment error information
         *     * '__Integration Flow with MessageStore - COMPLETED PROCESSING__' with attachments and message store entries
         *     * '__Integration Flow with Adapter Data - FAILED PROCESSING__' with message processing log error information, attachments, custom header properties and adapater data
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Version" | "Name" | "Type" | "DeployedBy" | "DeployedOn" | "Status")[];
                    /**
                     * @description Filter items by property values (not possible for DeployedOn). No nesting possible. Only logical operator ```or``` is allowed. <br>
                     *     Example1: ```Status eq 'ERROR'``` returns all deployed integration artifacts in status 'ERROR'.<br>
                     *     Example2: ```Status eq 'ERROR' or Version eq '1.0.0'```
                     */
                    readonly $filter?: string;
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Count the number of retrieved entries by selecting ```allpages```. */
                    readonly $inlinecount?: components["parameters"]["inlinecount"];
                    /** @description Order items by property values, see [Orderby System Query Option](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/) */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "Version" | "Version desc" | "Name" | "Name desc" | "Type" | "Type desc" | "DeployedBy" | "DeployedBy desc" | "DeployedOn" | "DeployedOn desc" | "Status" | "Status desc")[];
                };
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
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.IntegrationRuntimeArtifact"][];
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
        /**
         * Deploy an integration artifact.
         * @description __This method is NOT SUPPORTED in CF__. Please use DeployIntegrationDesigntimeArtifact API in the Integration Flow section!
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Integration artifact which should be deployed */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.IntegrationRuntimeArtifact.Placeholder"];
                };
            };
            readonly responses: {
                /** @description Accepted. Deployment triggered for integration artifact */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationRuntimeArtifacts/$count": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of deployed integration artifacts.
         * @description You can use the following request to get the number of all deployed integration artifacts.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Filter the returned count by property values (not possible for DeployedOn). No nesting possible. Only logical operator ```or``` is allowed. <br>
                     *     Example1: ```Status eq 'ERROR'``` returns all deployed integration artifacts in status 'ERROR'.<br>
                     *     Example2: ```Status eq 'ERROR' or Version eq '1.0.0'```
                     */
                    readonly $filter?: string;
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Number of deployed integration artifacts */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
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
    readonly "/IntegrationRuntimeArtifacts('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get a deployed integration artifact by Id.
         * @description You can use the following request to get a deployed integration artifact by Id.<br>
         *     In API sandbox integration flows with following Ids are deployed:
         *     * '__IntegrationFlow_FAILED_DEPLOYMENT__' with deployment error information
         *     * '__IntegrationFlow_MessageStore_COMPLETED_PROCESSING__' with attachments and message store entries
         *     * '__IntegrationFlow_AdapterData_FAILED_PROCESSING__' with message processing log error information, attachments, custom header properties and adapter data
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of deployed integration artifact <br>
                     *     Example: ```IntegrationFlow_MessageStore_COMPLETED_PROCESSING```
                     */
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
                            readonly d?: components["schemas"]["com.sap.hci.api.IntegrationRuntimeArtifact"];
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
        /**
         * Undeploy an integration artifacts.
         * @description You can use the following request to undeploy an integration artifact.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to undeploy an integration artifact.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of deployed integration artifact <br>
                     *     Example: ```IntegrationFlow_MessageStore_COMPLETED_PROCESSING```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Accepted. Artifact is triggered for undeployment */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationRuntimeArtifacts('{Id}')/ErrorInformation/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get error information of a deployed integration artifact.
         * @description You can use the following request to get error information of a deployed integration artifact by Id.<br>
         *
         *     In API sandbox, only the deployed integration flow with Id '__IntegrationFlow_FAILED_DEPLOYMENT__' provides the required error information.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of deployed integration artifact <br>
                     *     Example: ```IntegrationFlow_FAILED_DEPLOYMENT```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved error information for integration artifact */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
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
    readonly "/ServiceEndpoints": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get endpoints of integration flows.
         * @description You can use the following request to get all endpoints provided for deployed integration flows.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [SAP Cloud Integration - OData API for accessing the service endpoints](https://blogs.sap.com/2019/03/25/sap-cloud-platform-integration-odata-api-for-accessing-the-service-endpoints/).
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /**
                     * @description Returns a subset of the entries, which matches the filter condition.<br>
                     *     Example: ```Name eq 'IntegrationFlowWithConfiguration'``` provides all endpoints of the deployed integration flow with the ID IntegrationFlowWithConfiguration.<br>
                     *     Example: ```Protocol eq 'SOAP'``` provides all endpoints of the deployed integration flows with SOAP protocol type.
                     */
                    readonly $filter?: string;
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Name" | "Id" | "Title" | "Version" | "Summary" | "Description" | "LastUpdated" | "Protocol" | "EntryPoints" | "ApiDefinitions")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("EntryPoints" | "ApiDefinitions")[];
                    /** @description Count the number of retrieved entries by selecting ```allpages```. */
                    readonly $inlinecount?: components["parameters"]["inlinecount"];
                    /** @description Response format can be JSON or XML. */
                    readonly $format?: readonly ("json" | "xml")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved endpoints of the deployed integration flows */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.ServiceEndpoint"][];
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
    readonly "/ServiceEndpoints/$count": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of endpoints.
         * @description You can use the following request to get the number of all endpoints provided for deployed integration flows.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [SAP Cloud Integration - OData API for accessing the service endpoints](https://blogs.sap.com/2019/03/25/sap-cloud-platform-integration-odata-api-for-accessing-the-service-endpoints/).
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Returns a subset of the entries, which matches the filter condition.<br>
                     *     Example: ```Name eq 'IntegrationFlowWithConfiguration'``` provides all endpoints of the deployed integration flow with the ID IntegrationFlowWithConfiguration.<br>
                     *     Example: ```Protocol eq 'SOAP'``` provides all endpoints of the deployed integration flows with SOAP protocol type.
                     */
                    readonly $filter?: string;
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Number of retrieved endpoints for deployed integration flows */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
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
    readonly "/ValueMappingDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all value mappings.
         * @description You can use the following request to get all Value Mappings in the tenant.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Version" | "PackageId" | "Name" | "Description" | "ArtifactContent")[];
                    /** @description Order items by property values, see [Orderby System Query Option](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/). Default order: by 'Name' ascending */
                    readonly $orderby?: readonly ("Name" | "Name desc")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved value mapping */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.ValueMappingDesigntimeArtifact"][];
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
        /**
         * Upload a value mapping.
         * @description You can use the following request to upload a value mapping.
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to upload value mappings.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /**
             * @description New value mapping requires name and package Id. <br>
             *     The name should begin with alphabetic character or underscore ```_``` and can also contain numbers, space, period ```.``` or hyphen ```-```. But it should not end with period ```.```.<br>
             *     The artifact content is only required, if value mapping zip content in base64-encoded format should be uploaded.
             */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.ValueMappingDesigntimeArtifact-create"];
                };
            };
            readonly responses: {
                /** @description Created. Value mapping flow successfully created. */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.ValueMappingDesigntimeArtifact"];
                        };
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error. Possibly an value mapping with the same Id already exists. */
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
    readonly "/ValueMappingDesigntimeArtifacts(Id='{Id}',Version='{Version}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get specific Value Mapping.
         * @description You can use the following request to get a specific Value Mapping in the tenant.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of the value mapping <br>
                     *     Example: ```ValueMapping1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of the value mapping <br>
                     *     Example: ```active```
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved value mapping */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.ValueMappingDesigntimeArtifact"][];
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
        /**
         * Delete a value mapping artifact.
         * @description You can use the following request to delete a value mapping.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete value mapppings.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Id of value mapping artifact <br> */
                    readonly Id: string;
                    /**
                     * @description Version of value mapping artifact  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad Request. Wrong format or structure of the provided request body or parameters. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
                    };
                };
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error. The requested operation led to an error during execution. */
                readonly 500: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
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
    readonly "/ValueMappingDesigntimeArtifacts(Id='{Id}',Version='{Version}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download an integration flow as zip file.
         * @description You can use the following request to download a value mapping as zip file. Value mappings of configure-only packages cannot be downloaded.
         *     In API sandbox, the following integration flows with Id and version are available:
         *     * '__IntegrationFlow_FAILED_DEPLOYMENT__' with version '__1.0.0__'
         *     * '__IntegrationFlow_MessageStore_COMPLETED_PROCESSING__' with version '__1.0.0__'
         *     * '__IntegrationFlow_AdapterData_FAILED_PROCESSING__' with version '__1.0.0__'
         *     * '__IntegrationFlowWithConfiguration__' with version '__1.0.5__'
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of the value mapping <br>
                     *     Example: ```ValueMapping1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of the value mapping  <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
    readonly "/DeployValueMappingDesigntimeArtifact": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Deploy a value mapping.
         * @description You can use the following request to deploy a value mapping.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to deploy value mappings.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of value mapping artifact - enclosed in single quotes <br>
                     *     Example: ```'ValueMapping1'```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of value mapping artifact - enclosed in single quotes  <br>
                     *     You can enter either ```'active'``` or the version name (e.g. ```'1.0.5'```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Deployment triggered for value mapping artifact. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/ValueMappingDesigntimeArtifactSaveAsVersion": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Update an artifact with version.
         * @description You can use the following request to update an artifact with new specified version.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update value mappings.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of value mapping artifact - enclosed in single quotes <br>
                     *     Example: ```'ValueMapping1'```
                     */
                    readonly Id: string;
                    /**
                     * @description New version of value mapping artifact - enclosed in single quotes <br>
                     *      (e.g. ```'1.0.5'```).
                     */
                    readonly SaveAsVersion: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/ValueMappingDesigntimeArtifacts(Id='{Id}',Version='{Version}')/ValMapSchema": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all value mapping agency identifiers.
         * @description You can use the following request to get all bidirectional agency identifiers in the Value Mapping.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Returns a subset of the entries, which matches the filter condition. The only supported expression is:.<br>
                     *     ```State eq 'Configured'```<br>
                     *      It provides all the bidirectional agency identifiers that are in configured state.
                     */
                    readonly $filter?: string;
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration artifact <br>
                     *     Example: ```ValueMapping1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of the integration artifact<br>
                     *     Example: ```active```
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved agency identifiers of the value mapping */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.ValMapSchema"][];
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
    readonly "/ValueMappingDesigntimeArtifacts(Id='{Id}',Version='{Version}')/ValMapSchema(SrcAgency='{SrcAgency}',SrcId='{SrcId}',TgtAgency='{TgtAgency}',TgtId='{TgtId}')/ValMaps": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all value mappings for specific agency identifiers.
         * @description You can use the following request to get all the value mappings for a specific bidirectional agency identifier.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Returns a subset of the entries, which matches the filter condition.<br>
                     *     Example: ```Value/SrcValue eq 'SourceValue' and Value/TgtValue eq 'TargetValue'``` provides all the value mappings based on the source and target value for a specific bidirectional agency identifier.
                     */
                    readonly $filter?: string;
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration artifact Value mapping<br>
                     *     Example: ```ValueMapping1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of the integration artifact Value Mapping<br>
                     *     Example: ```active```
                     */
                    readonly Version: string;
                    /**
                     * @description Source Agency<br>
                     *     Example: ```SourceAgency```
                     */
                    readonly SrcAgency: string;
                    /**
                     * @description Source Id<br>
                     *     Example: ```SrcId```
                     */
                    readonly SrcId: string;
                    /**
                     * @description Target Agency<br>
                     *     Example: ```TargetAgency```
                     */
                    readonly TgtAgency: string;
                    /**
                     * @description Target Id<br>
                     *     Example: ```TgtId```
                     */
                    readonly TgtId: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved value mappings for specific agency identifiers */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.ValMaps"][];
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
    readonly "/ValueMappingDesigntimeArtifacts(Id='{Id}',Version='{Version}')/ValMapSchema(SrcAgency='{SrcAgency}',SrcId='{SrcId}',TgtAgency='{TgtAgency}',TgtId='{TgtId}')/DefaultValMaps": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all default value mappings for specific agency identifiers.
         * @description You can use the following request to get all the default value mappings for a specific bidirectional agency identifier.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration artifact Value mapping<br>
                     *     Example: ```ValueMapping1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of the integration artifact Value Mapping<br>
                     *     Example: ```active```
                     */
                    readonly Version: string;
                    /**
                     * @description Source Agency<br>
                     *     Example: ```SourceAgency```
                     */
                    readonly SrcAgency: string;
                    /**
                     * @description Source Id<br>
                     *     Example: ```SrcId```
                     */
                    readonly SrcId: string;
                    /**
                     * @description Target Agency<br>
                     *     Example: ```TargetAgency```
                     */
                    readonly TgtAgency: string;
                    /**
                     * @description Target Id<br>
                     *     Example: ```TgtId```
                     */
                    readonly TgtId: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved value mappings for specific agency identifiers */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.ValMaps"][];
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
    readonly "/UpsertValMaps": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Create new value mapping.
         * @description You can use the following request to create a value mapping using function import UpsertValMaps.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to create value mappings.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of value mappping artifact - enclosed in single quotes.<br>
                     *     Example: ```'ValueMapping1'```.<br>
                     */
                    readonly Id: string;
                    /**
                     * @description Version of the value mapping artifact - enclosed in single quotes.<br>
                     *     Example: ```'active'```.<br>
                     */
                    readonly Version: string;
                    /**
                     * @description Source Agency - enclosed in single quotes.<br>
                     *     Example: ```'SourceAgency'```.<br>
                     */
                    readonly SrcAgency: string;
                    /**
                     * @description Source Id - enclosed in single quotes.<br>
                     *     Example: ```'123'```.<br>
                     */
                    readonly SrcId: string;
                    /**
                     * @description Target Agency - enclosed in single quotes.<br>
                     *     Example: ```'TargetAgency'```.<br>
                     */
                    readonly TgtAgency: string;
                    /**
                     * @description Target Id - enclosed in single quotes.<br>
                     *     Example: ```'456'```.<br>
                     */
                    readonly TgtId: string;
                    /**
                     * @description Source Value - enclosed in single quotes.<br>
                     *     Example: ```'John'```.<br>
                     */
                    readonly SrcValue: string;
                    /**
                     * @description Target Value - enclosed in single quotes.<br>
                     *     Example: ```'Jan'```.<br>
                     */
                    readonly TgtValue: string;
                    /** @description Boolean value: true or false */
                    readonly IsConfigured: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Accepted */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/UpdateDefaultValMap": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Update default value mapping in value mapping artifact.
         * @description You can use the following request to update a default value mapping in the value mapping artifact.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to create value mappings.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of value mappping artifact - enclosed in single quotes.<br>
                     *     Example: ```'ValueMapping1'```.<br>
                     */
                    readonly Id: string;
                    /**
                     * @description Version of the value mapping artifact - enclosed in single quotes.<br>
                     *     Example: ```'active'```.<br>
                     */
                    readonly Version: string;
                    /**
                     * @description Source Agency - enclosed in single quotes.<br>
                     *     Example: ```'SourceAgency'```.<br>
                     */
                    readonly SrcAgency: string;
                    /**
                     * @description Source Id - enclosed in single quotes.<br>
                     *     Example: ```'123'```.<br>
                     */
                    readonly SrcId: string;
                    /**
                     * @description Target Agency - enclosed in single quotes.<br>
                     *     Example: ```'TargetAgency'```.<br>
                     */
                    readonly TgtAgency: string;
                    /**
                     * @description Target Id - enclosed in single quotes.<br>
                     *     Example: ```'456'```.<br>
                     */
                    readonly TgtId: string;
                    /** @description Boolean value: true or false */
                    readonly IsConfigured: string;
                    /** @description Value Mapping Id - enclosed in single quotes */
                    readonly ValMapId: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Accepted */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad Request. Wrong format or structure of the provided request body or parameters. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
                    };
                };
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/DeleteValMaps": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Delete a Value Mapping CLM.
         * @description You can use the following request to delete a code list mapping along with all of its related code value mappings using function import DeleteValMaps.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to create value mappings.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of value mappping artifact - enclosed in single quotes.<br>
                     *     Example: ```'ValueMapping1'```.<br>
                     */
                    readonly Id: string;
                    /**
                     * @description Version of the value mapping artifact - enclosed in single quotes.<br>
                     *     Example: ```'active'```.<br>
                     */
                    readonly Version: string;
                    /**
                     * @description Source Agency - enclosed in single quotes.<br>
                     *     Example: ```'SourceAgency'```.<br>
                     */
                    readonly SrcAgency: string;
                    /**
                     * @description Source Id - enclosed in single quotes.<br>
                     *     Example: ```'123'```.<br>
                     */
                    readonly SrcId: string;
                    /**
                     * @description Target Agency - enclosed in single quotes.<br>
                     *     Example: ```'TargetAgency'```.<br>
                     */
                    readonly TgtAgency: string;
                    /**
                     * @description Target Id - enclosed in single quotes.<br>
                     *     Example: ```'456'```.<br>
                     */
                    readonly TgtId: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Accepted. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationAdapterDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Import integration adapter artifact.
         * @description You can use the following request to import an integration adapter artifact.<br>
         *
         *     This API is available only in the Cloud Foundry environment. <br>For more information, see SAP Help Portal documentation at [Environment-Specific Aspects Integration Developers Should Know](https://help.sap.com/docs/CLOUD_INTEGRATION/368c481cd6954bdfa5d0435479fd4eaf/639a0612e32c498fa7480580d90c9ea6.html?locale=en-US).<br>In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to import adapters.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Adapter content and package Id in which adapter needs to be imported. */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.IntegrationAdapterDesigntimeArtifact-import"];
                };
            };
            readonly responses: {
                /** @description Integration adapter successfully imported. */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.IntegrationAdapterDesigntimeArtifact"];
                        };
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error. The requested operation led to an error during execution. */
                readonly 500: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
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
    readonly "/DeployIntegrationAdapterDesigntimeArtifact": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Deploy an integration adapter.
         * @description You can use the following request to deploy an integration adapter.<br>
         *
         *     This API is available only in Cloud Foundry environment. In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to deploy integration adapter.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of integration adapter artifact - enclosed in single quotes <br>
                     *     Example: ```'IntegrationAdapterId'```
                     */
                    readonly Id: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Accepted. Deployment triggered for integration adapter. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationAdapterDesigntimeArtifacts(Id='{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete an integration adapter.
         * @description You can use the following request to delete an integration adapter. <br>
         *
         *     This API is available only in Cloud Foundry environment. In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete integration adapter.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of integration adapter artifact <br>
                     *     Example: ```IntegrationAdapterId```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/MDIDeltaToken(Operation='{Operation}',Entity='{Entity}',Version='{Version}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Perform Read operation on MDI delta token database.
         * @description You can use the following request to get the delta token for the SAP Master Data Integration receiver adapter (MDI receiver adapter). This feature is only available with SAP Integration Suite. For more information on the MDI adapter, see SAP Help Portal documentation at [SAP Master Data Integration Receiver Adapter]( https://help.sap.com/docs/integration-suite/sap-integration-suite/e91e373bbb5b49ccbc2977152def61a2.html).
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Operation type <br>
                     *     Example: **READ**
                     */
                    readonly Operation: string;
                    /**
                     * @description Fully qualified entity type <br>
                     *     Example: **sap.odm.businesspartner.BusinessPartner**
                     */
                    readonly Entity: string;
                    /**
                     * @description Entity version <br>
                     *     Example: **2.1.1**
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description OK */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.MDIDeltaToken"];
                        };
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                /** @description Method Not Allowed */
                readonly 405: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Perform Delete operation on MDI delta token database.
         * @description You can use the following request to delete the delta token for the SAP Master Data Integration receiver adapter (MDI receiver adapter). This feature is only available with SAP Integration Suite. For more information on the MDI adapter, see SAP Help Portal documentation at [SAP Master Data Integration Receiver Adapter]( https://help.sap.com/docs/integration-suite/sap-integration-suite/e91e373bbb5b49ccbc2977152def61a2.html).
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Operation type <br>
                     *     Example: **READ**
                     */
                    readonly Operation: string;
                    /**
                     * @description Fully qualified entity type <br>
                     *     Example: **sap.odm.businesspartner.BusinessPartner**
                     */
                    readonly Entity: string;
                    /**
                     * @description Entity version <br>
                     *     Example: **2.1.1**
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Accepted */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                /** @description Method Not Allowed */
                readonly 405: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/ScriptCollectionDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Create/upload a script collection.
         * @description You can use the following request to create or upload a script collection.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to create script collections.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /**
             * @description New script collection requires name, Id and package Id. <br>
             *     The name should begin with alphabetic character or underscore **_** and can also contain numbers, space, period **.** or hyphen **-**. But it should not end with period **.**.<br>
             *     The artifact content is only required, if script collection zip content in base64-encoded format should be uploaded.
             */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.ScriptCollectionDesigntimeArtifact-create"];
                };
            };
            readonly responses: {
                /** @description Created. Script collection successfully created. */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.ScriptCollectionDesigntimeArtifact"];
                        };
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - possibly an script collection with the same Id already exists. */
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
    readonly "/ScriptCollectionDesigntimeArtifacts(Id='{Id}',Version='{Version}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get a script collection by Id and version.
         * @description You can use the following request to get a script collection flow by Id and version.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html)</br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Name" | "Version" | "PackageId")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of script collection <br>
                     *     Example: **ScriptCollection1**
                     */
                    readonly Id: string;
                    /**
                     * @description Version of a script collection artifact <br>
                     *     You can enter either **active** or the version name (e.g. **1.0.2**) for retrieving the current version.
                     */
                    readonly Version: string;
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
                            readonly d?: components["schemas"]["com.sap.hci.api.ScriptCollectionDesigntimeArtifact"];
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
        /**
         * Update a script collection artifact.
         * @description You can use the following request to update a script collection artifact.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of script collection artifact<br>
                     *     Example: **Script collection1**
                     */
                    readonly Id: string;
                    /**
                     * @description Current version of script collection artifact to be updated <br>
                     *     You can enter either **active** or the current/latest version name (e.g. **1.0.5**).
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            /** @description New attribute values of the script collection artifact. Check the following table for behavior depending on provided or not provided attributes:<br><table><tr><td>**Name**</td><td width=150px>**ArtifactContent**</td><td>**Behavior**</td></tr><tr><td >Yes</td><td>No</td><td>Save as draft</td></tr><tr><td>Yes</td><td>Yes</td><td>Update & Save by picking bundle version from Bundle Manifest</td></tr><tr><td>No</td><td>Yes</td><td>Update & Save by picking bundle version & bundle Name (script collection name) from Bundle Manifest</td></tr></table> */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.ScriptCollectionDesigntimeArtifact-update"];
                };
            };
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        /**
         * Delete a script collection.
         * @description You can use the following request to delete a script collection.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete script collections.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of script collection artifact <br>
                     *     Example: **ScriptCollection1**
                     */
                    readonly Id: string;
                    /**
                     * @description Version of script collection artifact  <br>
                     *     You can enter either **active** or the version name (e.g. **1.0.5**) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/ScriptCollectionDesigntimeArtifactSaveAsVersion": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Update a script collection artifact with version.
         * @description You can use the following request to update a script collection artifact with new specified version.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of script collection artifact - enclosed in single quotes <br>
                     *     Example: ```'ScriptCollectionArtifactID'```
                     */
                    readonly Id: string;
                    /**
                     * @description New version of script collection artifact - enclosed in single quotes<br>
                     *      (e.g. ```'1.0.1'```).
                     */
                    readonly SaveAsVersion: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/ScriptCollectionDesigntimeArtifacts(Id='{Id}',Version='{Version}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download a script collection as zip file.
         * @description You can use the following request to download an script collection as zip file. Integration flows of configure-only packages cannot be downloaded.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html)</br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of script collection artifact <br>
                     *     Example: **ScriptCollection1**
                     */
                    readonly Id: string;
                    /**
                     * @description Version of script collection artifact  <br>
                     *     You can enter either **active** or the version name (e.g. **1.0.2**) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success.Retrieved entity */
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
    readonly "/ScriptCollectionDesigntimeArtifacts(Id='{Id}',Version='{Version}')/Resources": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Add a Resource to a script collection.
         * @description You can use the following request to add a resource to a script collection.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) .<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update script collections.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of a script collection artifact <br>
                     *     Example: **ScriptCollection1**
                     */
                    readonly Id: string;
                    /**
                     * @description Version of a script collection artifact  <br>
                     *     You can enter either **active** or the version name (e.g. **1.0.2**) for the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            /** @description New entity */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.ScriptCollectionDesigntimeArtifactResource-create"];
                };
            };
            readonly responses: {
                /** @description Created. Added entities */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.Resource"];
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
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/ScriptCollectionDesigntimeArtifacts(Id='{Id}',Version='{Version}')/$links/Resources(Name='{Name}',ResourceType='{Type}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        /**
         * Update a resource of a script collection.
         * @description You can use the following request to update a resource of a script collection.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update an integration flow.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: {
                    /** @description Reference to another resource type (only for resource type 'xsd' the reference to 'wsdl' is allowed). */
                    readonly ReferencedResourceType?: readonly "wsdl"[];
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of script collection<br>
                     *     Example: **ScriptCollection1**
                     */
                    readonly Id: string;
                    /**
                     * @description Version of script collection<br>
                     *     You can enter either **active** or the version name (e.g. **1.0.5**) for retrieving the current version.
                     */
                    readonly Version: string;
                    /**
                     * @description Resource name <br>
                     *     Example: **AddSignatureInfo.xsl**
                     */
                    readonly Name: string;
                    /**
                     * @description Resource type <br>
                     *     Example: Use **xslt**
                     */
                    readonly Type: readonly ("edmx" | "groovy" | "jar" | "js" | "mmap" | "opmap" | "wsdl" | "xsd" | "xslt")[];
                };
                readonly cookie?: never;
            };
            readonly requestBody?: components["requestBodies"]["com.sap.hci.api.Resource-update"];
            readonly responses: {
                /** @description Accepted. Update triggered for resource. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        /**
         * Delete a resource of a script collection.
         * @description You can use the following request to delete a resource of a script collection.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: {
                    /** @description Reference to another resource type (only for resource type 'xsd' the reference to 'wsdl' is allowed). */
                    readonly ReferencedResourceType?: readonly "wsdl"[];
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of script collection artifact <br>
                     *     Example: **ScriptCollection1**
                     */
                    readonly Id: string;
                    /**
                     * @description Version of script collection artifact  <br>
                     *     You can enter either **active** or the version name (e.g. *1.0.5**) for retrieving the current version.
                     */
                    readonly Version: string;
                    /**
                     * @description Resource name <br>
                     *     Example: ```AddSignatureInfo.xsl```
                     */
                    readonly Name: string;
                    /**
                     * @description Resource type <br>
                     *     Example: ```xslt```
                     */
                    readonly Type: readonly ("edmx" | "groovy" | "jar" | "js" | "mmap" | "opmap" | "wsdl" | "xsd" | "xslt")[];
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/ScriptCollectionDesigntimeArtifacts(Id='{Id}',Version='{Version}')/DesignGuidelineExecutionResults": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get guidelines execution status.
         * @description You can use the following request to get the status of the guidelines execution.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of script collection artifact<br>
                     *     Example: **ScriptCollection1**
                     */
                    readonly Id: string;
                    /**
                     * @description Version of script collection artifact<br>
                     *     You can enter either **active** or the version name (e.g. **1.0.5**) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved execution status */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.DesignGuidelineExecutionResult"][];
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
    readonly "/ScriptCollectionDesigntimeArtifacts(Id='{Id}',Version='{Version}')/DesignGuidelineExecutionResults('{ExecutionId}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get guidelines execution results.
         * @description You can use the following request to get the results of the guidelines execution.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Expand related entities. */
                    readonly $expand?: readonly "DesignGuidelines"[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of script collection artifact<br>
                     *     Example: **ScriptCollection1**.
                     */
                    readonly Id: string;
                    /**
                     * @description Version of script collection artifact<br>
                     *     You can enter either **active** or the version name (e.g. **1.0.5**) for retrieving the current version.
                     */
                    readonly Version: string;
                    /**
                     * @description Id of design guideline execution<br>
                     *     Example: **b609174e95564c0ead17ee319c24bbe7**.
                     */
                    readonly ExecutionId: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved execution status */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.DesignGuidelineExecutionResult"][];
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
    readonly "/ExecuteScriptCollectionDesigntimeArtifactsGuidelines": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Execute guidelines for script collection artifact.
         * @description You can use the following request to validate script collection against activated guidelines.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of script collection artifact - enclosed in single quotes <br>
                     *     Example: **'ScriptCollection1'**.
                     */
                    readonly Id: string;
                    /**
                     * @description Version of script collection artifact - enclosed in single quotes <br>
                     *     You can enter either **'active'** or the version name (e.g. **'1.0.5'**) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error. */
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
    readonly "/ScriptCollectionDesigntimeArtifacts(Id='{Id}',Version='{Version}')/DesignGuidelineExecutionResults('{ExecutionId}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download guidelines execution report.
         * @description You can use the following request to get the report of the guidelines execution as a file.
         */
        readonly get: {
            readonly parameters: {
                readonly query: {
                    /** @description Type of the report file. */
                    readonly type: string;
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of script collection artifact<br>
                     *     Example: **ScriptCollection1**.
                     */
                    readonly Id: string;
                    /**
                     * @description Version of script collection artifact<br>
                     *     You can enter either **active** or the version name (e.g. **1.0.5**) for retrieving the current version.
                     */
                    readonly Version: string;
                    /**
                     * @description Id of design guideline execution<br>
                     *     Example: **b609174e95564c0ead17ee319c24bbe7**.
                     */
                    readonly ExecutionId: string;
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
                        readonly "application/json": string;
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
    readonly "/ScriptCollectionDesigntimeArtifacts(Id='{Id}',Version='{Version}')/$links/DesignGuidelineExecutionResults('{ExecutionId}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        /**
         * Revert or skip a guideline.
         * @description You can use the following request to revert or skip a guidline.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of script collection artifact<br>
                     *     Example: **ScriptCollection1**.
                     */
                    readonly Id: string;
                    /**
                     * @description Version of script collection artifact<br>
                     *     You can enter either **active** or the version name (e.g. **1.0.5**) for retrieving the current version.
                     */
                    readonly Version: string;
                    /**
                     * @description Id of design guideline execution<br>
                     *     Example: **b609174e95564c0ead17ee319c24bbe7**.
                     */
                    readonly ExecutionId: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: components["requestBodies"]["com.sap.hci.api.DesignGuidelineExecutionResults-skip"];
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/DeployScriptCollectionDesigntimeArtifact": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Deploy a script collection.
         * @description You can use the following request to deploy a script collection.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to deploy script collections.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of script collection - enclosed in single quotes <br>
                     *     Example: **'ScriptCollection1'**
                     */
                    readonly Id: string;
                    /**
                     * @description Version of script collection artifact - enclosed in single quotes  <br>
                     *     You can enter either **'active'** or the version name (e.g. **'1.0.5'**) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Accepted. Deployment triggered for script collection artifact. Response contains task Id. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')/DesignGuidelineExecutionResults": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get guidelines execution status.
         * @description You can use the following request to get the status of the guidelines execution.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration flow<br>
                     *     Example: **IntegrationFlowWithConfiguration**
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration flow<br>
                     *     You can enter either **active** or the version name (e.g. **1.0.5**) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved execution status */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.DesignGuidelineExecutionResult"][];
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
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')/DesignGuidelineExecutionResults('{ExecutionId}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get guidelines execution results.
         * @description You can use the following request to get the results of the guidelines execution.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Expand related entities. */
                    readonly $expand?: readonly "DesignGuidelines"[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration flow<br>
                     *     Example: **IntegrationFlowWithConfiguration**.
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration flow<br>
                     *     You can enter either **active** or the version name (e.g. **1.0.5**) for retrieving the current version.
                     */
                    readonly Version: string;
                    /**
                     * @description Id of design guideline execution<br>
                     *     Example: **b609174e95564c0ead17ee319c24bbe7**.
                     */
                    readonly ExecutionId: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved execution status */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.DesignGuidelineExecutionResult"][];
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
    readonly "/ExecuteIntegrationDesigntimeArtifactsGuidelines": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Execute guidelines for intgeration flow.
         * @description You can use the following request to validate integration flow against activated guidelines.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of integration flow - enclosed in single quotes <br>
                     *     Example: **'IntegrationFlowWithConfiguration'**.
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration flow - enclosed in single quotes <br>
                     *     You can enter either **'active'** or the version name (e.g. **'1.0.5'**) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error. */
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
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')/DesignGuidelineExecutionResults('{ExecutionId}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download guidelines execution report.
         * @description You can use the following request to get the report of the guidelines execution as a file.
         */
        readonly get: {
            readonly parameters: {
                readonly query: {
                    /** @description Type of the report file. */
                    readonly type: string;
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of integration flow<br>
                     *     Example: **IntegrationFlowWithConfiguration**.
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration flow<br>
                     *     You can enter either **active** or the version name (e.g. **1.0.5**) for retrieving the current version.
                     */
                    readonly Version: string;
                    /**
                     * @description Id of design guideline execution<br>
                     *     Example: **b609174e95564c0ead17ee319c24bbe7**.
                     */
                    readonly ExecutionId: string;
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
                        readonly "application/json": string;
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
    readonly "/IntegrationDesigntimeArtifacts(Id='{Id}',Version='{Version}')/$links/DesignGuidelineExecutionResults('{ExecutionId}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        /**
         * Revert or skip a guideline.
         * @description You can use the following request to revert or skip a guidline.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of integration flow<br>
                     *     Example: **IntegrationFlowWithConfiguration**.
                     */
                    readonly Id: string;
                    /**
                     * @description Version of integration flow<br>
                     *     You can enter either **active** or the version name (e.g. **1.0.5**) for retrieving the current version.
                     */
                    readonly Version: string;
                    /**
                     * @description Id of design guideline execution<br>
                     *     Example: **b609174e95564c0ead17ee319c24bbe7**.
                     */
                    readonly ExecutionId: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: components["requestBodies"]["com.sap.hci.api.DesignGuidelineExecutionResults-skip"];
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/MessageTypeDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all message types.
         * @description You can use the following request to get all message types deployed on the tenant.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Version" | "PackageId" | "Name" | "Namespace" | "Description" | "ArtifactContent")[];
                    /** @description Order items by property values, see [Orderby System Query Option](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/). Default order: by 'Name' ascending */
                    readonly $orderby?: readonly ("Name" | "Name desc")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved message type */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.MessageTypeDesigntimeArtifact"][];
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
        /**
         * Create/upload a message type.
         * @description You can use the following request to create or upload a message type.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to create integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /**
             * @description New message type requires name, Id and package Id. <br>
             *     The name should begin with alphabetic character or underscore ```_``` and can also contain numbers, space, period ```.``` or hyphen ```-```. But it should not end with period ```.```.<br>
             */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.MessageTypeDesigntimeArtifact-create"];
                };
            };
            readonly responses: {
                /** @description Created. Message type successfully created. */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.MessageTypeDesigntimeArtifact"];
                        };
                    };
                };
                /** @description Bad Request. Wrong format or structure of the provided request body or parameters. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
                    };
                };
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error. */
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
    readonly "/MessageTypeDesigntimeArtifacts(Id='{Id}',Version='{Version}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get message type by Id and version.
         * @description You can use the following request to get a deployed message type deployed by Id and version.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Name" | "Namespace" | "Version" | "PackageId")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of message type <br>
                     *     Example: ```MessageType1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of message type <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
                            readonly d?: components["schemas"]["com.sap.hci.api.MessageTypeDesigntimeArtifact"];
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
        /**
         * Update a message type.
         * @description You can use the following request to update amessage type.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of message type artifact <br>
                     *     Example: ```MessageTypeDesgintimeArtifact1```
                     */
                    readonly Id: string;
                    /**
                     * @description Current version of message type artifact to be updated <br>
                     *     You can enter either ```active``` or the current/latest version name (e.g. ```1.0.5```).
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            /** @description New attribute values of the MessageTypeDesigntimeArtifact. */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.MessageTypeDesigntimeArtifact-update"];
                };
            };
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        /**
         * Delete a message type.
         * @description You can use the following request to delete a message type.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete integration flows.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of message type <br>
                     *     Example: ```MessageType1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of message type artifact.<br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/MessageTypeDesigntimeArtifacts(Id='{Id}',Version='{Version}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download a message type as zip file.
         * @description You can use the following request to download a message type as zip file. <br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Id of message type<br> */
                    readonly Id: string;
                    /**
                     * @description Version of message type <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
                        readonly "application/zip": string;
                    };
                };
                /** @description Bad request. Not possible to download message type in a configure only package. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/zip": components["schemas"]["odata.error"];
                        readonly "application/json": unknown;
                    };
                };
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
    readonly "/MessageTypeDesigntimeArtifactSaveAsVersion": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Update an artifact with version.
         * @description You can use the following request to update an artifact with new specified version.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of message type artifact - enclosed in single quotes<br>
                     *     Example: ```'MessageTypeDesigntimeArtifact1'```
                     */
                    readonly Id: string;
                    /**
                     * @description New version of message type artifact - enclosed in single quotes <br>
                     *      (e.g. ```'1.0.5'```).
                     */
                    readonly SaveAsVersion: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/FaultMessageTypeDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all fault message types.
         * @description You can use the following request to get all fault message types deployed on the tenant.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Version" | "PackageId" | "Name" | "Namespace" | "Description" | "ArtifactContent")[];
                    /** @description Order items by property values, see [Orderby System Query Option](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/). Default order: by 'Name' ascending */
                    readonly $orderby?: readonly ("Name" | "Name desc")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved fault message type */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.FaultMessageTypeDesigntimeArtifact"][];
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
        /**
         * Create/upload an fault message type.
         * @description You can use the following request to create or upload an fault message type.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to create integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /**
             * @description New fault message type requires name, Id and package Id. <br>
             *     The name should begin with alphabetic character or underscore ```_``` and can also contain numbers, space, period ```.``` or hyphen ```-```. But it should not end with period ```.```.<br>
             */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.FaultMessageTypeDesigntimeArtifact-create"];
                };
            };
            readonly responses: {
                /** @description Created. fault message type successfully created. */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.FaultMessageTypeDesigntimeArtifact"];
                        };
                    };
                };
                /** @description Bad Request. Wrong format or structure of the provided request body or parameters. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
                    };
                };
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error. */
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
    readonly "/FaultMessageTypeDesigntimeArtifacts(Id='{Id}',Version='{Version}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get fault message type by Id and version.
         * @description You can use the following request to get a deployed fault message type by Id and version.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Name" | "Namespace" | "Version" | "PackageId")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of fault message type <br>
                     *     Example: ```FaultMessageType1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of fault message type <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
                            readonly d?: components["schemas"]["com.sap.hci.api.FaultMessageTypeDesigntimeArtifact"];
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
        /**
         * Update a fault message type.
         * @description You can use the following request to update a fault message type.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of fault message type artifact <br>
                     *     Example: ```FaultMessageTypeDesgintimeArtifact1```
                     */
                    readonly Id: string;
                    /**
                     * @description Current version of fault message type artifact to be updated <br>
                     *     You can enter either ```active``` or the current/latest version name (e.g. ```1.0.5```).
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            /** @description New attribute values of the FaultmessageTypeDesigntimeArtifact. */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.FaultMessageTypeDesigntimeArtifact-update"];
                };
            };
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        /**
         * Delete a fault message type.
         * @description You can use the following request to delete a fault message type.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete integration flows.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of message type <br>
                     *     Example: ```MessageType1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of message type artifact.<br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/FaultMessageTypeDesigntimeArtifacts(Id='{Id}',Version='{Version}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download a fault message type as zip file.
         * @description You can use the following request to download a fault message type as zip file. <br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Id of fault message type<br> */
                    readonly Id: string;
                    /**
                     * @description Version of fault message type <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
                        readonly "application/zip": string;
                    };
                };
                /** @description Bad request. Not possible to download fault message type in a configure only package. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/zip": components["schemas"]["odata.error"];
                        readonly "application/json": unknown;
                    };
                };
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
    readonly "/FaultMessageTypeDesigntimeArtifactSaveAsVersion": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Update an artifact with version.
         * @description You can use the following request to update an artifact with new specified version.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of fault message type artifact - enclosed in single quotes<br>
                     *     Example: ```'FaultMessageTypeDesigntimeArtifact1'```
                     */
                    readonly Id: string;
                    /**
                     * @description New version of fault message type artifact - enclosed in single quotes <br>
                     *      (e.g. ```'1.0.5'```).
                     */
                    readonly SaveAsVersion: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/DataTypeDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all data types.
         * @description You can use the following request to get all data types deployed on the tenant.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Version" | "PackageId" | "Name" | "Namespace" | "Description" | "ArtifactContent")[];
                    /** @description Order items by property values, see [Orderby System Query Option](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/). Default order: by 'Name' ascending */
                    readonly $orderby?: readonly ("Name" | "Name desc")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved data type */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.DataTypeDesigntimeArtifact"][];
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
        /**
         * Create/upload data type.
         * @description You can use the following request to create or upload a data type.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to create integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /**
             * @description New data type requires name, Id and package Id. <br>
             *     The name should begin with alphabetic character or underscore ```_``` and can also contain numbers, space, period ```.``` or hyphen ```-```. But it should not end with period ```.```.<br>
             */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.DataTypeDesigntimeArtifact-create"];
                };
            };
            readonly responses: {
                /** @description Created. Data type successfully created. */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.DataTypeDesigntimeArtifact"];
                        };
                    };
                };
                /** @description Bad Request. Wrong format or structure of the provided request body or parameters. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
                    };
                };
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error. */
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
    readonly "/DataTypeDesigntimeArtifacts(Id='{Id}',Version='{Version}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get data type by Id and version.
         * @description You can use the following request to get a deployed data type deployed by Id and version.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Name" | "Namespace" | "Version" | "PackageId")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of data type <br>
                     *     Example: ```DataType1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of data type <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
                            readonly d?: components["schemas"]["com.sap.hci.api.DataTypeDesigntimeArtifact"];
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
        /**
         * Update a data type.
         * @description You can use the following request to update a data type.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of data type artifact <br>
                     *     Example: ```DataTypeDesgintimeArtifact1```
                     */
                    readonly Id: string;
                    /**
                     * @description Current version of data type artifact to be updated <br>
                     *     You can enter either ```active``` or the current/latest version name (e.g. ```1.0.5```).
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            /** @description New attribute values of the DataTypeDesigntimeArtifact. */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.DataTypeDesigntimeArtifact-update"];
                };
            };
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        /**
         * Delete a data type.
         * @description You can use the following request to delete a data type.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete integration flows.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of data type <br>
                     *     Example: ```DataType1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of data type artifact.<br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/DataTypeDesigntimeArtifacts(Id='{Id}',Version='{Version}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download a data type as zip file.
         * @description You can use the following request to download a data type as zip file. <br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Id of data type<br> */
                    readonly Id: string;
                    /**
                     * @description Version of data type <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
                        readonly "application/zip": string;
                    };
                };
                /** @description Bad request. Not possible to download data type in a configure only package. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/zip": components["schemas"]["odata.error"];
                        readonly "application/json": unknown;
                    };
                };
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
    readonly "/DataTypeDesigntimeArtifactSaveAsVersion": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Update an artifact with version.
         * @description You can use the following request to update an artifact with new specified version.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of data type artifact - enclosed in single quotes<br>
                     *     Example: ```'DataTypeDesigntimeArtifact1'```
                     */
                    readonly Id: string;
                    /**
                     * @description New version of data type artifact - enclosed in single quotes <br>
                     *      (e.g. ```'1.0.5'```).
                     */
                    readonly SaveAsVersion: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/ServiceInterfaceDesigntimeArtifacts": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all ServiceInterface artifacts.
         * @description You can use the following request to get all ServiceInterface artifacts deployed on the tenant.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Version" | "PackageId" | "Name" | "Namespace" | "Description" | "ArtifactContent")[];
                    /** @description Order items by property values, see [Orderby System Query Option](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/). Default order: by 'Name' ascending */
                    readonly $orderby?: readonly ("Name" | "Name desc")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved ServiceInterface artifact */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["com.sap.hci.api.ServiceInterfaceDesigntimeArtifact"][];
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
        /**
         * Create/upload Service Interface.
         * @description You can use the following request to create or upload a Service Interface.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to create integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /**
             * @description New data type requires name, Id and package Id. <br>
             *     The name should begin with alphabetic character or underscore ```_``` and can also contain numbers, space, period ```.``` or hyphen ```-```. But it should not end with period ```.```.<br>
             */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.ServiceInterfaceDesigntimeArtifact-create"];
                };
            };
            readonly responses: {
                /** @description Created. Service Interface successfully created. */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.ServiceInterfaceDesigntimeArtifact"];
                        };
                    };
                };
                /** @description Bad Request. Wrong format or structure of the provided request body or parameters. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
                    };
                };
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error. */
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
    readonly "/ServiceInterfaceDesigntimeArtifacts(Id='{Id}',Version='{Version}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get Service Interface by Id and version.
         * @description You can use the following request to get a deployed ServiceInterface artifact deployed by Id and version.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Name" | "Namespace" | "Version" | "PackageId")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Id of Service Interface  <br>
                     *     Example: ```ServiceInterface1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of Service Interface <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
                            readonly d?: components["schemas"]["com.sap.hci.api.ServiceInterfaceDesigntimeArtifact"];
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
        /**
         * Update a Service Interface.
         * @description You can use the following request to update a Service Interface.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of message type artifact <br>
                     *     Example: ```ServiceInterfaceDesgintimeArtifact1```
                     */
                    readonly Id: string;
                    /**
                     * @description Current version of Service Interface artifact to be updated <br>
                     *     You can enter either ```active``` or the current/latest version name (e.g. ```1.0.5```).
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            /** @description New attribute values of the ServiceInterfaceDesigntimeArtifact. */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.ServiceInterfaceDesigntimeArtifact-update"];
                };
            };
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        /**
         * Delete a ServiceInterface artifact.
         * @description You can use the following request to delete a ServiceInterface artifact.<br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete integration flows.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of ServiceInterface artifact <br>
                     *     Example: ```ServiceInterface1```
                     */
                    readonly Id: string;
                    /**
                     * @description Version of ServiceInterface artifact.<br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/ServiceInterfaceDesigntimeArtifacts(Id='{Id}',Version='{Version}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download a Service Interface artifact as zip file.
         * @description You can use the following request to download a Service Interface artifact as zip file. <br>For further details, refer to the SAP Help Portal documentation [OData API: Integration Content](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/d1679a80543f46509a7329243b595bdb.html) and to the following SAP Community blog [Remote OData APIs for Integration Flows](https://blogs.sap.com/2018/07/06/cloud-integration-remote-odata-apis-for-integration-flows/).<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Id of Service Interface artifact type<br> */
                    readonly Id: string;
                    /**
                     * @description Version of Service Interface artifact <br>
                     *     You can enter either ```active``` or the version name (e.g. ```1.0.5```) for retrieving the current version.
                     */
                    readonly Version: string;
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
                        readonly "application/zip": string;
                    };
                };
                /** @description Bad request. Not possible to download Service Interface artifact in a configure only package. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/zip": components["schemas"]["odata.error"];
                        readonly "application/json": unknown;
                    };
                };
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
    readonly "/ServiceInterfaceDesigntimeArtifactSaveAsVersion": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Update an artifact with version.
         * @description You can use the following request to update an artifact with new specified version.<br>
         *
         *     In API sandbox, only read APIs can be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /**
                     * @description Id of service interface artifact - enclosed in single quotes<br>
                     *     Example: ```'ServiceInterfaceDesigntimeArtifact1'```
                     */
                    readonly Id: string;
                    /**
                     * @description New version of service interface artifact - enclosed in single quotes <br>
                     *      (e.g. ```'1.0.5'```).
                     */
                    readonly SaveAsVersion: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get CSRF token.
         * @description You can use the following request to get the CSRF token for this session, which is required for write access via POST, PUT and DELETE operations. Copy the received X-CSRF-Token from the response header.<br>
         *
         *     **In API sandbox this request is not relevant!**
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description To retrieve a new CSRF token the value of the header must be set to ```Fetch```. */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description The header provides the CSRF token for this session. */
                readonly 200: {
                    headers: {
                        /** @description CSRF token that can be used for all modifying requests within the same session. */
                        readonly "X-CSRF-Token"?: string;
                        readonly [name: string]: unknown;
                    };
                    content?: never;
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
        /** IntegrationRuntimeArtifact */
        readonly "com.sap.hci.api.IntegrationRuntimeArtifact": {
            readonly Id?: string | null;
            readonly Version?: string | null;
            readonly Name?: string | null;
            readonly Type?: string | null;
            readonly DeployedBy?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly DeployedOn?: string | null;
            readonly Status?: string | null;
            readonly ErrorInformation?: components["schemas"]["com.sap.hci.api.RuntimeArtifactErrorInformation"];
        };
        /** IntegrationRuntimeArtifactPlaceholder */
        readonly "com.sap.hci.api.IntegrationRuntimeArtifact.Placeholder": {
            readonly BinaryFile?: string | null;
        };
        /** IntegrationRuntimeArtifact_Request */
        readonly "com.sap.hci.api.IntegrationRuntimeArtifact_Request": {
            readonly Id?: string | null;
            readonly Version?: string | null;
            readonly Name?: string | null;
            readonly Type?: string | null;
        };
        /** RuntimeArtifactErrorInformation */
        readonly "com.sap.hci.api.RuntimeArtifactErrorInformation": {
            readonly Id?: string | null;
        };
        /** IntegrationDesigntimeArtifact */
        readonly "com.sap.hci.api.IntegrationDesigntimeArtifact": {
            readonly Id?: string | null;
            readonly Version?: string | null;
            readonly PackageId?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            /** Format: base64url */
            readonly ArtifactContent?: string | null;
            readonly Sender?: string | null;
            readonly Receiver?: string | null;
            readonly CreatedBy?: string | null;
            readonly CreatedAt?: string | null;
            readonly ModifiedBy?: string | null;
            readonly ModifiedAt?: string | null;
            readonly Comment?: string | null;
            /** Collection of Configuration */
            readonly Configurations?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.Configuration"][];
            };
            /** Collection of Resource */
            readonly Resources?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.Resource"][];
            };
            /** Collection of DesignGuidelineExecutionResult */
            readonly DesignGuidelineExecutionResults?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.DesignGuidelineExecutionResult"][];
            };
        };
        /** IntegrationDesigntimeArtifact (for creation) */
        readonly "com.sap.hci.api.IntegrationDesigntimeArtifact-create": {
            readonly Name?: string;
            readonly Id?: string;
            readonly PackageId?: string;
            /**
             * Format: base64url
             * @example integration flow zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
            readonly Sender?: string;
            readonly Receiver?: string;
        };
        /** IntegrationDesigntimeArtifact (for update) */
        readonly "com.sap.hci.api.IntegrationDesigntimeArtifact-update": {
            readonly Name?: string;
            /**
             * Format: base64url
             * @example integration flow zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
            readonly Comment?: string;
            readonly Sender?: string;
            readonly Receiver?: string;
        };
        /** MessageMappingDesigntimeArtifact */
        readonly "com.sap.hci.api.MessageMappingDesigntimeArtifact": {
            readonly Id?: string | null;
            readonly Version?: string | null;
            readonly PackageId?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            /** Format: base64url */
            readonly ArtifactContent?: string | null;
            /** Collection of Resource */
            readonly Resources?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.Resource"][];
            };
        };
        /** MessageMappingDesigntimeArtifact (for creation) */
        readonly "com.sap.hci.api.MessageMappingDesigntimeArtifact-create": {
            readonly Name?: string;
            readonly Id?: string;
            readonly PackageId?: string;
            readonly Description?: string;
            /**
             * Format: base64url
             * @example integration flow zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** MessageMappingDesigntimeArtifact (for update) */
        readonly "com.sap.hci.api.MessageMappingDesigntimeArtifact-update": {
            readonly Name?: string;
            readonly Description?: string;
            /**
             * Format: base64url
             * @example integration flow zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** BuildAndDeployStatus */
        readonly "com.sap.hci.api.BuildAndDeployStatus": {
            readonly d: {
                readonly __metadata: {
                    readonly id: string;
                    readonly uri: string;
                    readonly type: string;
                };
                readonly TaskId: string;
                readonly Status: string;
            };
        };
        /** Configuration */
        readonly "com.sap.hci.api.Configuration": {
            readonly ParameterKey?: string;
            readonly ParameterValue?: string;
            readonly DataType?: string;
            readonly Description?: string;
        };
        /** Configuration (for update) */
        readonly "com.sap.hci.api.Configuration-update": {
            /** @example new value */
            readonly ParameterValue?: string;
            /** @example xsd:integer */
            readonly DataType?: string;
            readonly Description?: string;
        };
        /** Resource */
        readonly "com.sap.hci.api.Resource": {
            /** @example file name */
            readonly Name?: string;
            /** @example edmx/groovy/jar/js/mmap/opmap/wsdl/xsd/xslt */
            readonly ResourceType?: string;
            /** @example  */
            readonly ReferencedResourceType?: string | null;
            /** Format: int64 */
            readonly ResourceSize?: number | null;
            readonly ResourceSizeUnit?: string | null;
            /**
             * Format: base64url
             * @example resource in base64 encoded format
             */
            readonly ResourceContent?: string | null;
        };
        /** Resource (for create) */
        readonly "com.sap.hci.api.Resource-create": {
            /** @example file name */
            readonly Name?: string;
            /** @example edmx/groovy/jar/js/mmap/opmap/wsdl/xsd/xslt */
            readonly ResourceType?: string;
            /** @example  */
            readonly ReferencedResourceType?: string | null;
            /**
             * Format: base64url
             * @example resource in base64 encoded format
             */
            readonly ResourceContent?: string | null;
        };
        /** Resource (for update) */
        readonly "com.sap.hci.api.Resource-update": {
            /**
             * Format: base64url
             * @example resource in base64 encoded format
             */
            readonly ResourceContent?: string;
        };
        /** ServiceEndpoint */
        readonly "com.sap.hci.api.ServiceEndpoint": {
            /** @example string */
            readonly Name?: string | null;
            readonly Id?: string;
            readonly Title?: string;
            readonly Version?: string;
            readonly Summary?: string;
            readonly Description?: string;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04Z
             */
            readonly LastUpdated?: string | null;
            /** @example AS2, AS4, ODATAV2, SOAP */
            readonly Protocol?: string;
            readonly EntryPoints?: readonly components["schemas"]["com.sap.hci.api.EntryPoint"][];
            readonly ApiDefinitions?: readonly components["schemas"]["com.sap.hci.api.Definition"][];
        };
        /** EntryPoint */
        readonly "com.sap.hci.api.EntryPoint": {
            readonly Name?: string;
            readonly Url?: string;
            /** @example string */
            readonly Type?: string | null;
            /** @example string */
            readonly AdditionalInformation?: string | null;
        };
        /** APIDefinition */
        readonly "com.sap.hci.api.Definition": {
            readonly Url?: string;
            readonly Name?: string;
        };
        /** CustomTagsConfiguration */
        readonly "com.sap.hci.api.CustomTagsConfiguration": {
            readonly customTagsConfiguration: readonly {
                readonly tagName: string;
                readonly isMandatory: boolean;
            }[];
        };
        /** CustomTagsConfiguration (for creation) */
        readonly "com.sap.hci.api.CustomTagsConfiguration-create": {
            /**
             * Format: base64url
             * @example JSON representation of custom tags definition in base64-encoded format
             */
            readonly customTagsConfiguration?: string | null;
        };
        /** IntegrationPackage */
        readonly "com.sap.hci.api.IntegrationPackage": {
            readonly Id?: string;
            readonly Name?: string;
            readonly ResourceId?: string;
            /** @example string */
            readonly Description?: string | null;
            readonly ShortText?: string;
            /** @example string */
            readonly Version?: string | null;
            /** @example string */
            readonly Vendor?: string | null;
            /** @example string */
            readonly Mode?: string | null;
            /** @example SAP Cloud Integration or SAP Process Orchestration or SuccessFactors Integration Center */
            readonly SupportedPlatform?: string | null;
            /** @example string */
            readonly ModifiedBy?: string | null;
            /** @example string */
            readonly CreationDate?: string | null;
            /** @example string */
            readonly ModifiedDate?: string | null;
            /** @example string */
            readonly CreatedBy?: string | null;
            /** @example string */
            readonly Products?: string | null;
            /** @example string */
            readonly Keywords?: string | null;
            /** @example string */
            readonly Countries?: string | null;
            /** @example string */
            readonly Industries?: string | null;
            /** @example string */
            readonly LineOfBusiness?: string | null;
            readonly PartnerContent?: boolean | null;
            readonly UpdateAvailable?: boolean | null;
            /** Format: base64url */
            readonly PackageContent?: string | null;
            readonly IntegrationDesigntimeArtifacts?: readonly components["schemas"]["com.sap.hci.api.IntegrationDesigntimeArtifact"][];
        };
        /** IntegrationPackage (for create) */
        readonly "com.sap.hci.api.IntegrationPackage-create": {
            /** @example string */
            readonly Id: string | null;
            readonly Name?: string;
            /** @example string */
            readonly Description?: string | null;
            readonly ShortText?: string;
            /** @example string */
            readonly Version?: string | null;
            /** @example SAP Cloud Integration or SAP Process Orchestration or SuccessFactors Integration Center */
            readonly SupportedPlatform?: string | null;
            /** @example string */
            readonly Products?: string | null;
            /** @example string */
            readonly Keywords?: string | null;
            /** @example string */
            readonly Countries?: string | null;
            /** @example string */
            readonly Industries?: string | null;
            /** @example string */
            readonly LineOfBusiness?: string | null;
        };
        /** IntegrationPackage (for update) */
        readonly "com.sap.hci.api.IntegrationPackage-update": {
            readonly Name?: string;
            /** @example string */
            readonly Description?: string | null;
            readonly ShortText?: string;
            /** @example string */
            readonly Version?: string | null;
            /** @example string */
            readonly Vendor?: string | null;
            /** @example string */
            readonly Mode?: string | null;
            /** @example SAP Cloud Integration or SAP Process Orchestration or SuccessFactors Integration Center */
            readonly SupportedPlatform?: string | null;
            /** @example string */
            readonly Products?: string | null;
            /** @example string */
            readonly Keywords?: string | null;
            /** @example string */
            readonly Countries?: string | null;
            /** @example string */
            readonly Industries?: string | null;
            /** @example string */
            readonly LineOfBusiness?: string | null;
        };
        readonly "com.sap.hci.api.sandbox.error": {
            readonly code?: string;
            readonly message?: string;
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
        /** Custom Tags (for update) */
        readonly "com.sap.hci.api.CustomTags-Update": {
            /** @example new value */
            readonly Value?: string;
        };
        /** ValueMappingDesigntimeArtifact */
        readonly "com.sap.hci.api.ValueMappingDesigntimeArtifact": {
            readonly Id?: string;
            readonly Version?: string;
            readonly PackageId?: string;
            readonly Name?: string;
            readonly Description?: string;
            readonly ArtifactContent?: string;
        };
        /** ValueMappingDesigntimeArtifact (for creation) */
        readonly "com.sap.hci.api.ValueMappingDesigntimeArtifact-create": {
            readonly Name?: string;
            readonly Id?: string;
            readonly PackageId?: string;
            readonly Description?: string;
            /**
             * Format: base64url
             * @example integration flow zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** ValMapSchema */
        readonly "com.sap.hci.api.ValMapSchema": {
            readonly SrcAgency?: string;
            readonly SrcId?: string;
            readonly TgtAgency?: string;
            readonly TgtId?: string;
            readonly State?: string | null;
            /** ValMaps */
            readonly DefaultValMaps?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.ValMaps"][];
            };
            /** ValMaps */
            readonly ValMaps?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.ValMaps"][];
            };
        };
        /** ValMaps */
        readonly "com.sap.hci.api.ValMaps": {
            readonly Id?: string;
            readonly Value?: components["schemas"]["com.sap.hci.api.Value"];
        };
        /** Value */
        readonly "com.sap.hci.api.Value": {
            readonly SrcValue?: string;
            readonly TgtValue?: string;
        };
        /** IntegrationAdapterDesigntimeArtifact */
        readonly "com.sap.hci.api.IntegrationAdapterDesigntimeArtifact": {
            readonly Id?: string | null;
            readonly Version?: string | null;
            readonly PackageId?: string | null;
            readonly Name?: string | null;
            /**
             * Format: base64url
             * @example integration adapter esa file content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
            readonly Description?: string | null;
        };
        /** IntegrationAdapterDesigntimeArtifact (for import) */
        readonly "com.sap.hci.api.IntegrationAdapterDesigntimeArtifact-import": {
            readonly PackageId?: string;
            /**
             * Format: base64url
             * @example integration adapter esa file content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** MDIDeltaToken */
        readonly "com.sap.hci.api.MDIDeltaToken": {
            readonly d: {
                readonly __metadata: {
                    readonly id: string;
                    readonly uri: string;
                    readonly type: string;
                };
                readonly Operation: string;
                readonly Entity: string;
                readonly Version: string;
                readonly DeltaToken: string;
                readonly LastUpdateTimestamp: string;
            };
        };
        /** ScriptCollectionDesigntimeArtifact */
        readonly "com.sap.hci.api.ScriptCollectionDesigntimeArtifact": {
            readonly Id?: string | null;
            readonly Version?: string | null;
            readonly PackageId?: string | null;
            readonly Name?: string | null;
            readonly Description?: string | null;
            /** Format: base64url */
            readonly ArtifactContent?: string | null;
            /** Collection of Resource */
            readonly Resources?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.Resource"][];
            };
            /** Collection of DesignGuidelineExecutionResult */
            readonly DesignGuidelineExecutionResults?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.DesignGuidelineExecutionResult"][];
            };
        };
        /** ScriptCollectionDesigntimeArtifact (for creation) */
        readonly "com.sap.hci.api.ScriptCollectionDesigntimeArtifact-create": {
            readonly Name?: string;
            readonly Id?: string;
            readonly PackageId?: string;
            /**
             * Format: base64url
             * @example script collection zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** Script collection resource (for create) */
        readonly "com.sap.hci.api.ScriptCollectionDesigntimeArtifactResource-create": {
            /** @example file name */
            readonly Name?: string;
            /** @example groovy/jar/js/ */
            readonly ResourceType?: string;
            /** @example  */
            readonly ReferencedResourceType?: string | null;
            /**
             * Format: base64url
             * @example resource in base64 encoded format
             */
            readonly ResourceContent?: string | null;
        };
        /** ScriptCollectionDesigntimeArtifact (for update) */
        readonly "com.sap.hci.api.ScriptCollectionDesigntimeArtifact-update": {
            readonly Name?: string;
            /**
             * Format: base64url
             * @example script collection zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** ScriptCollectionDesigntimeArtifact (for update) */
        readonly "com.sap.hci.api.DesignGuidelineExecutionResults-skip": {
            readonly GudelineId?: string;
            /** @description true = skip, false = revert */
            readonly IsGuidelineSkipped?: boolean;
            readonly SkipReason?: string;
        };
        /** DesignGuidelineExecutionResult */
        readonly "com.sap.hci.api.DesignGuidelineExecutionResult": {
            readonly ExecutionId?: string | null;
            readonly ArtifactVersion?: string | null;
            readonly ExecutionStatus?: string | null;
            readonly ExecutionTime?: string | null;
            readonly ReportType?: string | null;
            /** Collection of DesignGuideline */
            readonly DesignGuidelines?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.DesignGuideline"][];
            };
        };
        /** MessageTypeDesigntimeArtifact */
        readonly "com.sap.hci.api.MessageTypeDesigntimeArtifact": {
            readonly Id?: string | null;
            readonly Version?: string | null;
            readonly PackageId?: string | null;
            readonly Name?: string | null;
            readonly Namespace?: string | null;
            readonly Description?: string | null;
            readonly DataTypeUsed?: string | null;
            /** Format: base64url */
            readonly ArtifactContent?: string | null;
        };
        /** MessageTypeDesigntimeArtifact-create */
        readonly "com.sap.hci.api.MessageTypeDesigntimeArtifact-create": {
            /** @example MessageTypeDesigntimeArtifact1 */
            readonly Id?: string | null;
            /** @example Package1 */
            readonly PackageId?: string | null;
            /** @example MessageType1 */
            readonly Name?: string | null;
            /** @example Namespace1 */
            readonly Namespace?: string | null;
            /** @example Description of this message type */
            readonly Description?: string | null;
            /** @example DataType1 */
            readonly DataTypeUsed?: string | null;
            /**
             * Format: base64url
             * @example message type zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** MessageTypeDesigntimeArtifact (for update) */
        readonly "com.sap.hci.api.MessageTypeDesigntimeArtifact-update": {
            /** @example Namespace1 */
            readonly Namespace?: string | null;
            /** @example Description of this message type */
            readonly Description?: string | null;
            /** @example DataType1 */
            readonly DataTypeUsed?: string | null;
            /**
             * Format: base64url
             * @example message type zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** DataTypeDesigntimeArtifact */
        readonly "com.sap.hci.api.DataTypeDesigntimeArtifact": {
            readonly Id?: string | null;
            readonly Version?: string | null;
            readonly PackageId?: string | null;
            readonly Name?: string | null;
            readonly Namespace?: string | null;
            readonly Description?: string | null;
            readonly IsSimpleType?: boolean | null;
            /** Format: base64url */
            readonly ArtifactContent?: string | null;
        };
        /** DataTypeDesigntimeArtifact-create */
        readonly "com.sap.hci.api.DataTypeDesigntimeArtifact-create": {
            /** @example DataTypeDesigntimeArtifact1 */
            readonly Id?: string | null;
            /** @example Package1 */
            readonly PackageId?: string | null;
            /** @example DataType1 */
            readonly Name?: string | null;
            /** @example Namespace1 */
            readonly Namespace?: string | null;
            /** @example Description of this data type */
            readonly Description?: string | null;
            readonly IsSimpleType?: boolean;
            /**
             * Format: base64url
             * @example data type zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** DataTypeDesigntimeArtifact (for update) */
        readonly "com.sap.hci.api.DataTypeDesigntimeArtifact-update": {
            /** @example Description of this data type */
            readonly Description?: string | null;
            /**
             * Format: base64url
             * @example data type zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** ServiceInterfaceDesigntimeArtifact */
        readonly "com.sap.hci.api.ServiceInterfaceDesigntimeArtifact": {
            readonly Id?: string | null;
            readonly Version?: string | null;
            readonly PackageId?: string | null;
            readonly Name?: string | null;
            readonly Namespace?: string | null;
            readonly Description?: string | null;
            /** Format: base64url */
            readonly ArtifactContent?: string | null;
            /** Collection of Resource */
            readonly Resources?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.Resource"][];
            };
        };
        /** ServiceInterfaceDesigntimeArtifact-create */
        readonly "com.sap.hci.api.ServiceInterfaceDesigntimeArtifact-create": {
            /** @example ServiceInterfaceDesigntimeArtifact1 */
            readonly Id?: string | null;
            /** @example Package1 */
            readonly PackageId?: string | null;
            /** @example ServiceInterface1 */
            readonly Name?: string | null;
            /** @example Namespace1 */
            readonly Namespace?: string | null;
            /** @example Description of this service interface */
            readonly Description?: string | null;
            /**
             * Format: base64url
             * @example service interface zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** ServiceInterfaceDesigntimeArtifact (for update) */
        readonly "com.sap.hci.api.ServiceInterfaceDesigntimeArtifact-update": {
            /** @example ServiceInterface1 */
            readonly Name?: string | null;
            /** @example Description of this service interface */
            readonly Description?: string | null;
            /**
             * Format: base64url
             * @example service interface zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** FaultMessageTypeDesigntimeArtifact */
        readonly "com.sap.hci.api.FaultMessageTypeDesigntimeArtifact": {
            readonly Id?: string | null;
            readonly Version?: string | null;
            readonly PackageId?: string | null;
            readonly Name?: string | null;
            readonly Namespace?: string | null;
            readonly Description?: string | null;
            readonly DataTypeUsed?: string | null;
            /** Format: base64url */
            readonly ArtifactContent?: string | null;
        };
        /** FaultMessageTypeDesigntimeArtifact-create */
        readonly "com.sap.hci.api.FaultMessageTypeDesigntimeArtifact-create": {
            /** @example FaultMessageTypeDesigntimeArtifact1 */
            readonly Id?: string | null;
            /** @example Package1 */
            readonly PackageId?: string | null;
            /** @example FaultMessageType1 */
            readonly Name?: string | null;
            /** @example Namespace1 */
            readonly Namespace?: string | null;
            /** @example Description of this fault message type */
            readonly Description?: string | null;
            /** @example DataType1 */
            readonly DataTypeUsed?: string | null;
            /**
             * Format: base64url
             * @example message type zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** FaultMessageTypeDesigntimeArtifact (for update) */
        readonly "com.sap.hci.api.FaultMessageTypeDesigntimeArtifact-update": {
            /** @example Description of this fault message type */
            readonly Description?: string | null;
            /** @example Datatype1 */
            readonly DataTypeUsed?: string | null;
            /**
             * Format: base64url
             * @example message type zip content in base64-encoded format
             */
            readonly ArtifactContent?: string | null;
        };
        /** DesignGuideline */
        readonly "com.sap.hci.api.DesignGuideline": {
            readonly GuidelineId?: string;
            readonly GuidelineName?: string | null;
            readonly Category?: string | null;
            readonly Severity?: string | null;
            readonly Applicability?: string | null;
            readonly Compliance?: string | null;
            readonly IsGuidelineSkipped?: boolean | null;
            readonly SkipReason?: string | null;
            readonly SkippedBy?: string | null;
            readonly ExpectedKPI?: string | null;
            readonly ActualKPI?: string | null;
            readonly ViolatedComponents?: string | null;
        };
        /** CustomTag */
        readonly "com.sap.hci.api.CustomTag": {
            readonly Name?: string;
            readonly Value?: string | null;
        };
        /** DataStore */
        readonly "com.sap.hci.api.DataStore": {
            readonly DataStoreName?: string;
            readonly IntegrationFlow?: string;
            readonly Type?: string;
            readonly Visibility?: string | null;
            /** Format: int64 */
            readonly NumberOfMessages?: number | null;
            /** Format: int64 */
            readonly NumberOfOverdueMessages?: number | null;
            /** Collection of DataStoreEntry */
            readonly Entries?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.DataStoreEntry"][];
            };
        };
        /** DataStoreEntry */
        readonly "com.sap.hci.api.DataStoreEntry": {
            readonly Id?: string;
            readonly DataStoreName?: string;
            readonly IntegrationFlow?: string;
            readonly Type?: string;
            readonly Status?: string | null;
            readonly MessageId?: string | null;
            /** Format: date-time */
            readonly DueAt?: string | null;
            /** Format: date-time */
            readonly CreatedAt?: string | null;
            /** Format: date-time */
            readonly RetainUntil?: string | null;
        };
        /** Variable */
        readonly "com.sap.hci.api.Variable": {
            readonly VariableName?: string;
            readonly IntegrationFlow?: string;
            readonly Visibility?: string | null;
            /** Format: date-time */
            readonly UpdatedAt?: string | null;
            /** Format: date-time */
            readonly RetainUntil?: string | null;
        };
        /** IntegrationDesigntimeLock */
        readonly "com.sap.hci.api.IntegrationDesigntimeLock": {
            readonly ResourceId?: string;
            readonly ArtifactId?: string;
            readonly ArtifactName?: string | null;
            readonly ArtifactType?: string | null;
            readonly PackageId?: string | null;
            readonly PackageName?: string | null;
            /** Format: date-time */
            readonly CreatedAt?: string | null;
            readonly CreatedBy?: string | null;
        };
        /** DefaultValMap */
        readonly "com.sap.hci.api.DefaultValMap": {
            readonly Id?: string;
            readonly Value?: components["schemas"]["com.sap.hci.api.Value"];
        };
        /** RuntimeArtifact */
        readonly "com.sap.hci.api.RuntimeArtifact": {
            readonly id?: string;
            readonly name?: string | null;
            readonly symbolicName?: string | null;
            readonly type?: string | null;
            readonly version?: string | null;
            readonly nodeType?: string | null;
            readonly deployedBy?: string | null;
            /** Format: date-time */
            readonly deployedOn?: string | null;
            readonly deployState?: string | null;
        };
        /** IntegrationArtifact */
        readonly "com.sap.hci.api.IntegrationArtifact": {
            readonly Id?: string | null;
            readonly Name?: string | null;
            readonly Type?: string | null;
            readonly PackageId?: string | null;
            readonly PackageName?: string | null;
        };
        /** Scheduler */
        readonly "com.sap.hci.api.Scheduler": {
            readonly TriggerType?: string | null;
            readonly DateType?: string | null;
            readonly TimeType?: string | null;
            readonly Date?: string | null;
            readonly Time?: string | null;
            readonly DayOfMonth?: string | null;
            readonly Monday?: boolean | null;
            readonly Tuesday?: boolean | null;
            readonly Wednesday?: boolean | null;
            readonly Thursday?: boolean | null;
            readonly Friday?: boolean | null;
            readonly Saturday?: boolean | null;
            readonly Sunday?: boolean | null;
            /** Format: int32 */
            readonly OnEveryDuration?: number | null;
            readonly FromInterval?: string | null;
            readonly ToInterval?: string | null;
            readonly TimeZone?: string | null;
        };
    };
    responses: {
        /** @description No content. The server successfully processed the request and is not returning any content */
        readonly 204: {
            headers: {
                readonly [name: string]: unknown;
            };
            content?: never;
        };
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
        /** @description Conflict. Indicates that the request could not be processed because of conflict in the current state of the resource. */
        readonly 409: {
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
        /** @description Include count of items. */
        readonly count: boolean;
        /** @description Count the number of retrieved entries by selecting ```allpages```. */
        readonly inlinecount: readonly "allpages"[];
        /** @description Filter items by property values. */
        readonly filter: string;
        /** @description Select specific attributes to be listed in the result. */
        readonly select: string;
    };
    requestBodies: {
        /** @description Revert or skip a guideline. */
        readonly "com.sap.hci.api.DesignGuidelineExecutionResults-skip": {
            readonly content: {
                readonly "application/json": components["schemas"]["com.sap.hci.api.DesignGuidelineExecutionResults-skip"];
            };
        };
        /** @description ResourceContent */
        readonly "com.sap.hci.api.Resource-update": {
            readonly content: {
                readonly "application/json": components["schemas"]["com.sap.hci.api.Resource-update"];
            };
        };
    };
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
