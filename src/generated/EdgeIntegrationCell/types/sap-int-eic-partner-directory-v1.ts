export type paths = {
    readonly "/AlternativePartners": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all alternative partners.
         * @description You can use the following request to get all alternative partners.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values. */
                    readonly $filter?: components["parameters"]["filter"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Hexagency" | "Hexagency desc" | "Hexscheme" | "Hexscheme desc" | "Hexid" | "Hexid desc" | "Agency" | "Agency desc" | "Scheme" | "Scheme desc" | "Id" | "Id desc" | "Pid" | "Pid desc" | "LastModifiedBy" | "LastModifiedBy desc" | "LastModifiedTime" | "LastModifiedTime desc" | "CreatedBy" | "CreatedBy desc" | "CreatedTime" | "CreatedTime desc")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Hexagency" | "Hexscheme" | "Hexid" | "Agency" | "Scheme" | "Id" | "Pid" | "LastModifiedBy" | "LastModifiedTime" | "CreatedBy" | "CreatedTime")[];
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
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.AlternativePartner"][];
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
         * Add new alternative partner.
         * @description You can use the following request to add new alternative partner.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update the partner directory. __This operation is only available via cloud endpoint.__
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description New entity */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.AlternativePartner-create"];
                };
            };
            readonly responses: {
                /** @description Created entity */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.AlternativePartner"];
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - alternative partner already exists or the request body does not contain the required attributes. */
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
    readonly "/AlternativePartners(Hexagency='{Hexagency}',Hexscheme='{Hexscheme}',Hexid='{Hexid}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get alternative partner by key fields.
         * @description You can use the following request to get an alternative partner by key fields.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Agency" | "Scheme" | "Id" | "Pid" | "LastModifiedBy" | "LastModifiedTime" | "CreatedBy" | "CreatedTime")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Hexadecimal value in string format of the values for Agency <br>
                     *     Example: ```4167656E637958595A```
                     */
                    readonly Hexagency: string;
                    /**
                     * @description Hexadecimal value in string format of the values for Schema <br>
                     *     Example: ```4C4F4E47```
                     */
                    readonly Hexscheme: string;
                    /**
                     * @description Hexadecimal value in string format of the values for Id <br>
                     *     Example: ```5265636569766572205072656D69756D```
                     */
                    readonly Hexid: string;
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
                            readonly d?: components["schemas"]["com.sap.hci.api.AlternativePartner"];
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
         * Update alternative partner.
         * @description You can use the following request to update alternative partner.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update the partner directory. __This operation is only available via cloud endpoint.__
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
                     * @description Hexadecimal value in string format of the values for Agency <br>
                     *     Example: ```4167656E637958595A```
                     */
                    readonly Hexagency: string;
                    /**
                     * @description Hexadecimal value in string format of the values for Schema <br>
                     *     Example: ```4C4F4E47```
                     */
                    readonly Hexscheme: string;
                    /**
                     * @description Hexadecimal values in string format of the values for Id <br>
                     *     Example: ```5265636569766572205072656D69756D```
                     */
                    readonly Hexid: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.AlternativePartner-update"];
                };
            };
            readonly responses: {
                readonly 204: components["responses"]["204"];
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - request body does not contain values for expected attributes. */
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
        readonly post?: never;
        /**
         * Delete alternative partner.
         * @description You can use the following request to delete alternative partner.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update the partner directory. __This operation is only available via cloud endpoint.__
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
                     * @description Hexadecimal value in string format of the values for Agency <br>
                     *     Example: ```4167656E637958595A```
                     */
                    readonly Hexagency: string;
                    /**
                     * @description Hexadecimal value in string format of the values for Schema <br>
                     *     Example: ```4C4F4E47```
                     */
                    readonly Hexscheme: string;
                    /**
                     * @description Hexadecimal values in string format of the values for Id <br>
                     *     Example: ```5265636569766572205072656D69756D```
                     */
                    readonly Hexid: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                readonly 204: components["responses"]["204"];
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - wrong parameter values. */
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
    readonly "/AuthorizedUsers": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all authorized users.
         * @description You can use the following request to get all authorized users.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values. */
                    readonly $filter?: components["parameters"]["filter"];
                    /** @description Order items by property values. */
                    readonly $orderby?: readonly ("User" | "User desc" | "Pid" | "Pid desc" | "LastModifiedBy" | "LastModifiedBy desc" | "LastModifiedTime" | "LastModifiedTime desc" | "CreatedBy" | "CreatedBy desc" | "CreatedTime" | "CreatedTime desc")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("User" | "Pid" | "LastModifiedBy" | "LastModifiedTime" | "CreatedBy" | "CreatedTime")[];
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
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.AuthorizedUser"][];
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
         * Add new authorized user.
         * @description You can use the following request to add new authorized user.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update the partner directory. __This operation is only available via cloud endpoint.__
         */
        readonly post: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description New authorized user */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.AuthorizedUser-create"];
                };
            };
            readonly responses: {
                /** @description Created AuthorizedUser */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.AuthorizedUser"];
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - authorized user already exists or request body does not contain the expected content. */
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
    readonly "/AuthorizedUsers('{User}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get authorized user by key.
         * @description You can use the following request to get an authorized user by key.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Pid" | "LastModifiedBy" | "LastModifiedTime" | "CreatedBy" | "CreatedTime")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Authorized user <br>
                     *     Example: ```oauth_client_client_sender_oauth```
                     */
                    readonly User: string;
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
                            readonly d?: components["schemas"]["com.sap.hci.api.AuthorizedUser"];
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
         * Update authorized user.
         * @description You can use the following request to update authorized user.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update the partner directory. __This operation is only available via cloud endpoint.__
         */
        readonly put: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Authorized user which should be updated */
                    readonly User: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.AuthorizedUser-update"];
                };
            };
            readonly responses: {
                readonly 204: components["responses"]["204"];
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - request body does not contain the expected content. */
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
        readonly post?: never;
        /**
         * Delete authorized users.
         * @description You can use the following request to delete authorized users.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update the partner directory. __This operation is only available via cloud endpoint.__
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Authorized user which should be deleted */
                    readonly User: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                readonly 204: components["responses"]["204"];
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
    readonly "/BinaryParameters": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all binary parameters.
         * @description You can use the following request to get all binary parameters.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values. */
                    readonly $filter?: components["parameters"]["filter"];
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("ContentType" | "ContentType desc" | "Value" | "Value desc")[];
                    /** @description Select properties to be returned */
                    readonly $select?: readonly ("ContentType" | "Value")[];
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
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.BinaryParameter"][];
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
         * Add a new binary parameter.
         * @description You can use the following request to add a new binary parameter.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update the partner directory. __This operation is only available via cloud endpoint.__
         */
        readonly post: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description New binary parameter */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.BinaryParameter-create"];
                };
            };
            readonly responses: {
                /** @description Created BinaryParameter */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.BinaryParameter"];
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - binary parameter already exists or request body does not contain the expected content. */
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
    readonly "/BinaryParameters(Pid='{Pid}',Id='{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get binary parameter by key
         * @description You can use the following request to get a binary parameter by key.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("ContentType" | "Value")[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Internal identifier of a partner <br>
                     *     Example: ```GenericPartner```
                     */
                    readonly Pid: string;
                    /**
                     * @description Internal identifier of a parameter <br>
                     *     Example: ```xsl_util```
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
                            readonly d?: components["schemas"]["com.sap.hci.api.BinaryParameter"];
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
         * Update binary parameter by key.
         * @description You can use the following request to update binary parameter by key.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update the partner directory. __This operation is only available via cloud endpoint.__
         */
        readonly put: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Internal identifier of a partner <br>
                     *     Example: ```GenericPartner```
                     */
                    readonly Pid: string;
                    /**
                     * @description Internal identifier of a parameter <br>
                     *     Example: ```xsl_util```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New parameter value */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.BinaryParameter-update"];
                };
            };
            readonly responses: {
                readonly 204: components["responses"]["204"];
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - request body does not contain the expected content. */
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
        readonly post?: never;
        /**
         * Delete binary parameter.
         * @description You can use the following request to delete binary parameter.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update the partner directory. __This operation is only available via cloud endpoint.__
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Internal identifier of a partner <br>
                     *     Example: ```GenericPartner```
                     */
                    readonly Pid: string;
                    /**
                     * @description Internal identifier of a parameter <br>
                     *     Example: ```xsl_util```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                readonly 204: components["responses"]["204"];
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
    readonly "/Partners": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all partners.
         * @description You can use the following request to get all partners.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
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
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.Partner"][];
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
    readonly "/Partners('{Pid}')": {
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
         * Delete partner.
         * @description You can use the following request to delete partner.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update the partner directory. __This operation is only available via cloud endpoint.__
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: {
                    /** @description Exclude certain entity types from deletion */
                    readonly exclude?: readonly ("AuthorizedUsers" | "AlternativePartners" | "BinaryParameters" | "StringParameters" | "UserCredentialParameters")[];
                    /** @description User which initiates the call */
                    readonly user?: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Internal identifier of a partner which should be deleted <br>
                     *     Example: ```GenericPartner```
                     */
                    readonly Pid: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                readonly 204: components["responses"]["204"];
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
    readonly "/StringParameters": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all string parameters.
         * @description You can use the following request to get all string parameters.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values. */
                    readonly $filter?: components["parameters"]["filter"];
                    /** @description Order items by property values. */
                    readonly $orderby?: readonly ("Value" | "Value desc")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly "Value"[];
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
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.StringParameter"][];
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
         * Add new string parameter.
         * @description You can use the following request to add new string parameter.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update the partner directory.  __This operation is only available via cloud endpoint.__
         */
        readonly post: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description New string parameter */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.StringParameter-create"];
                };
            };
            readonly responses: {
                /** @description Created string parameter */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.StringParameter"];
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - string parameter already exists or request body does not contain the expected content. */
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
    readonly "/StringParameters(Pid='{Pid}',Id='{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get string parameter by key.
         * @description You can use the following request to get a string parameter by key.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly "Value"[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Internal identifier of a partner <br>
                     *     Example: ```Sender_BASIC```
                     */
                    readonly Pid: string;
                    /**
                     * @description Internal identifier of a parameter <br>
                     *     Example: ```AGENCY```
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
                            readonly d?: components["schemas"]["com.sap.hci.api.StringParameter"];
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
         * Update string parameter.
         * @description You can use the following request to update string parameter.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update the partner directory. __This operation is only available via cloud endpoint.__
         */
        readonly put: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Internal identifier of a partner <br>
                     *     Example: ```Sender_BASIC```
                     */
                    readonly Pid: string;
                    /**
                     * @description Internal identifier of a parameter <br>
                     *     Example: ```AGENCY```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            /** @description New string parameter */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.StringParameter-update"];
                };
            };
            readonly responses: {
                readonly 204: components["responses"]["204"];
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
         * Delete string parameter.
         * @description You can use the following request to delete string parameter.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update the partner directory. __This operation is only available via cloud endpoint.__
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: {
                    /** @description User which initiates the call */
                    readonly user?: string;
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Internal identifier of a partner <br>
                     *     Example: ```Sender_BASIC```
                     */
                    readonly Pid: string;
                    /**
                     * @description Internal identifier of a parameter <br>
                     *     Example: ```AGENCY```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                readonly 204: components["responses"]["204"];
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
    readonly "/": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get CSRF token.
         * @description You can use the following request to request the CSRF token for this session, which is required for write access via POST, PUT and DELETE operations. Copy the received X-CSRF-Token from the response header.
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
        readonly "com.sap.hci.api.StringParameter": components["schemas"]["com.sap.hci.api.Parameter"] & {
            readonly Value?: string;
            readonly LastModifiedBy?: string | null;
        };
        readonly "com.sap.hci.api.StringParameter-create": components["schemas"]["com.sap.hci.api.Parameter-create"] & {
            readonly Value?: string;
        };
        /** StringParameter (for update) */
        readonly "com.sap.hci.api.StringParameter-update": {
            readonly Value?: string;
        };
        readonly "com.sap.hci.api.StringConfigurationParameter": components["schemas"]["com.sap.hci.api.ConfigurationParameter"] & {
            readonly Value?: string;
        };
        readonly "com.sap.hci.api.StringConfigurationParameter-create": components["schemas"]["com.sap.hci.api.ConfigurationParameter-create"] & {
            readonly Value?: string;
        };
        readonly "com.sap.hci.api.StringConfigurationParameter-update": components["schemas"]["com.sap.hci.api.ConfigurationParameter-update"] & {
            readonly Value?: string;
        };
        /** AlternativePartner */
        readonly "com.sap.hci.api.AlternativePartner": {
            readonly Hexagency?: string;
            readonly Hexscheme?: string;
            readonly Hexid?: string;
            readonly Agency?: string;
            readonly Scheme?: string;
            readonly Id?: string;
            readonly Pid?: string;
            readonly LastModifiedBy?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly LastModifiedTime?: string | null;
            readonly CreatedBy?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly CreatedTime?: string | null;
        };
        /** AlternativePartner (for create) */
        readonly "com.sap.hci.api.AlternativePartner-create": {
            readonly Agency?: string;
            readonly Scheme?: string;
            readonly Id?: string;
            readonly Pid?: string;
        };
        /** AlternativePartner (for update) */
        readonly "com.sap.hci.api.AlternativePartner-update": {
            readonly Pid?: string;
        };
        readonly "com.sap.hci.api.BinaryParameter": components["schemas"]["com.sap.hci.api.Parameter"] & {
            readonly ContentType?: string;
            /** Format: base64url */
            readonly Value?: string;
        };
        readonly "com.sap.hci.api.BinaryParameter-create": components["schemas"]["com.sap.hci.api.Parameter-create"] & {
            readonly ContentType?: string;
            /** Format: base64url */
            readonly Value?: string;
        };
        /** BinaryParameter (for update) */
        readonly "com.sap.hci.api.BinaryParameter-update": {
            readonly ContentType?: string;
            /** Format: base64url */
            readonly Value?: string;
        };
        /** Partner */
        readonly "com.sap.hci.api.Partner": {
            readonly Pid?: string;
        };
        /** AuthorizedUser */
        readonly "com.sap.hci.api.AuthorizedUser": {
            readonly User?: string;
            readonly Pid?: string;
            readonly LastModifiedBy?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly LastModifiedTime?: string | null;
            readonly CreatedBy?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly CreatedTime?: string | null;
        };
        /** AuthorizedUser (for create) */
        readonly "com.sap.hci.api.AuthorizedUser-create": {
            readonly User?: string;
            readonly Pid?: string;
        };
        /** AuthorizedUser (for update) */
        readonly "com.sap.hci.api.AuthorizedUser-update": {
            readonly Pid?: string;
        };
        /** ConfigurationParameter */
        readonly "com.sap.hci.api.ConfigurationParameter": {
            readonly Name?: string;
            readonly Namespace?: string;
            readonly LastModifiedBy?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly LastModifiedTime?: string | null;
            readonly CreatedBy?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly CreatedTime?: string | null;
        };
        /** ConfigurationParameter (for create) */
        readonly "com.sap.hci.api.ConfigurationParameter-create": {
            readonly Name?: string;
            readonly Namespace?: string;
        };
        /** ConfigurationParameter (for update) */
        readonly "com.sap.hci.api.ConfigurationParameter-update": {
            readonly Name?: string;
            readonly Namespace?: string;
        };
        /** Parameter */
        readonly "com.sap.hci.api.Parameter": {
            readonly Pid?: string;
            readonly Id?: string;
            readonly LastModifiedBy?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly LastModifiedTime?: string | null;
            readonly CreatedBy?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly CreatedTime?: string | null;
        };
        /** Parameter (for create) */
        readonly "com.sap.hci.api.Parameter-create": {
            readonly Pid?: string;
            readonly Id?: string;
        };
        /** Parameter (for update) */
        readonly "com.sap.hci.api.Parameter-update": {
            readonly Pid?: string;
            readonly Id?: string;
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
                readonly "*/*": components["schemas"]["odata.error"];
                readonly "application/json": unknown;
            };
        };
    };
    parameters: {
        /** @description Show only the first n items. */
        readonly top: number;
        /** @description Skip the first n items. */
        readonly skip: number;
        /** @description Filter items by property values. */
        readonly filter: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
