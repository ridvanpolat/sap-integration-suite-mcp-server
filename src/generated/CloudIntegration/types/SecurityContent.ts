export type paths = {
    readonly "/UserCredentials": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all deployed user credentials.
         * @description You can use the following request to get all deployed user credentials.
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
                /** @description Retrieved user credentials collections */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.UserCredential"][];
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
         * Add user credentials.
         * @description You can use the following request to add user credentials.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to add user credentials.
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
            /** @description User credentials which should be deployed */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.UserCredential-create"];
                };
            };
            readonly responses: {
                /** @description Accepted. Deployment triggered for user credentials */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - request body does not contain the expected content. */
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
                /** @description Conflict - user credentials with the same name already exists. */
                readonly 409: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": unknown;
                    };
                };
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - possibly wrong kind value is provided, must be one of [successfactors, default, openconnectors] or expected company Id for kind ```successfactors``` is missing or password does not match Open Connectors Credentials pattern, required pattern is : User \S{0,44},Organization \S{0,32},Element \S{0,44} */
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
    readonly "/UserCredentials('{Name}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get user credentials by name.
         * @description You can use the following request to get user credentials for a given credentials name.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Name of the user credentials <br>
                     *     Example: ```User ABC```
                     */
                    readonly Name: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved user credentials */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.UserCredential"];
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
         * Update user credentials.
         * @description You can use the following request to update user credentials.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update user credentials.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Name of the user credentials  <br>
                     *     Example: ```User ABC```
                     */
                    readonly Name: string;
                };
                readonly cookie?: never;
            };
            /** @description New property values */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.UserCredential-update"];
                };
            };
            readonly responses: {
                /** @description Accepted. Deployment triggered for user credentials */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - request body does not contain the expected content. */
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
                /** @description Conflict - user credentials with specified name does not exist. */
                readonly 409: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - possibly wrong kind value is provided -  must be one of [successfactors, default, openconnectors] or expected company Id for kind ```successfactors``` is missing or password does not match Open Connectors Credentials pattern - required pattern is : User \S{0,44},Organization \S{0,32},Element \S{0,44} */
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
         * Delete user credentials.
         * @description You can use the following request to delete user credentials.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete user credentials.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Name of the user credentials <br>
                     *     Example: ```User ABC```
                     */
                    readonly Name: string;
                };
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
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/SecureParameters": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all deployed secure parameters.
         * @description You can use the following request to get all deployed secure parameters. The response body does not contain the values for the secure parameters. You can only store the values with the OData API, but you can't retrieve the values. This resource is only available in the Neo environment.
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
                /** @description Retrieved secure parameters */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.SecureParameter"][];
                            };
                        };
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Not implemented - not implemented OData query parameters like $select or $filter. */
                readonly 501: {
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
        /**
         * Add secure parameters.
         * @description You can use the following request to add secure parameters.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to add secure parameters. This resource is only available in the Neo environment.
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
            /** @description Secure parameters to be deployed */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.SecureParameter-create"];
                };
            };
            readonly responses: {
                /** @description Deployment triggered for secure parameters. Request was successfully accepted. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - request body is invalid. Examples: Name is null or empty, too long, or contains an invalid character; SecureParam is null, empty, or too long; description is null or too long; request body contains an invalid parameter. */
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
                /** @description Conflict - secure parameters artifact with the same name already exists. */
                readonly 409: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 429: components["responses"]["429"];
                readonly 500: components["responses"]["500"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/SecureParameters('{Name}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get secure parameters by name.
         * @description You can use the following request to get secure parameters for a artifact name. This resource is only available in the Neo environment.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Name of the secure parameters <br>
                     *     Example: ```User ABC```
                     */
                    readonly Name: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved secure parameters */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.SecureParameter"];
                        };
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Not implemented - not implemented OData query parameters like $select or $filter. */
                readonly 501: {
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
        /**
         * Update secure parameters.
         * @description You can use the following request to update secure parameters.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update secure parameters.
         *      There are the following length restrictions: Name: 150 characters, SecureParam: 255 characters, Description: 1024 chacracters. This resource is only available in the Neo environment.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Name of the secure parameters artifact. the name in the request path must be URL-encoded, the name in the request body is optional. If you specify it there as well, it must be equal to the name in the request path. */
                    readonly Name: string;
                };
                readonly cookie?: never;
            };
            /** @description Request body */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.SecureParameter-update"];
                };
            };
            readonly responses: {
                /** @description Accepted. Deployment triggered for secure parameters */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - request body is invalid. Name is null, empty, or too long, or contains an invalid character; name in the request body is not equal to the name in the request path (if the name is specified in the request body); SecureParam is null, empty, or too long; Description is null or too long; request body contains an invalid parameter. */
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
                /** @description Conflict - secure parameters artifact with specified name does not exist. */
                readonly 409: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 429: components["responses"]["429"];
                readonly 500: components["responses"]["500"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        /**
         * Delete secure parameters.
         * @description You can use the following request to delete secure parameters.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete secure parameters. This resource is only available in the Neo environment.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Name of the secure parameters <br>
                     *     Example: ```User ABC```
                     */
                    readonly Name: string;
                };
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
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/OAuth2ClientCredentials": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all OAuth2 client credentials.
         * @description You can use the following request to get all OAuth2 client credentials.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Expand related entities. */
                    readonly $expand?: readonly "CustomParameters"[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved OAuth2 client credentials collection */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.OAuth2ClientCredential"][];
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
         * Add OAuth2 client credentials
         * @description You can use the following request to add OAuth2 client credentials.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to add credentials.
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
            /** @description OAuth2 client credentials which should be deployed. */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.OAuth2ClientCredential-create"];
                };
            };
            readonly responses: {
                /** @description Accepted - deployment triggered for OAuth2 client credentials. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - request body does not contain the expected parameters and values. */
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
                /** @description Conflict - OAuth2 client credentials with the same name already exists. */
                readonly 409: {
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
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/OAuth2ClientCredentials('{Name}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get OAuth2 client credentials by name.
         * @description You can use the following request to get OAuth2 client credentials for a given credentials name.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Expand related entities. */
                    readonly $expand?: readonly "CustomParameters"[];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Name of the OAuth2 client credentials <br>
                     *     Example: ```OAuth2 Client Credentials ABC```
                     */
                    readonly Name: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved OAuth2 client credentials */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.OAuth2ClientCredential"];
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
         * Update OAuth2 client credentials
         * @description You can use the following request to update OAuth2 client credentials.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update credentials.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Name of the OAuth2 client credentials <br>
                     *     Example: ```OAuth2 Client Credentials ABC```
                     */
                    readonly Name: string;
                };
                readonly cookie?: never;
            };
            /** @description Updated OAuth2 client credentials which should be deployed. */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.OAuth2ClientCredential-update"];
                };
            };
            readonly responses: {
                /** @description Accepted - deployment triggered for changed OAuth2 client credentials. */
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
         * Delete OAuth2 client credentials
         * @description You can use the following request to delete OAuth2 client credentials.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete credentials.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Name of the OAuth2 client credentials <br>
                     *     Example: ```OAuth2 Client Credentials ABC```
                     */
                    readonly Name: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Accepted - deletion triggered for OAuth2 client credentials. */
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
    readonly "/CertificateResources('{Hexalias}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        /**
         * Import/update a certificate.
         * @description You can use the following request to import or update a certificate.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to add/update certificates.
         */
        readonly put: {
            readonly parameters: {
                readonly query: {
                    /** @description Verify certificate signature. */
                    readonly fingerprintVerified: readonly ("true" | "false")[];
                    /** @description Provide current keystore entries in the response. */
                    readonly returnKeystoreEntries: readonly ("true" | "false")[];
                    /** @description Update existing certificate. */
                    readonly update: readonly ("true" | "false")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Content-Type must be set to ```application/pkix-cert```. */
                    readonly "Content-Type": string;
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Hex encoded value for certificate alias */
                    readonly Hexalias: string;
                };
                readonly cookie?: never;
            };
            /** @description New certificate in byte format (only DER without PEM transport encoding!) or in DER with base64 encoding (without the PEM header and footer) */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": string;
                };
            };
            readonly responses: {
                /** @description Retrieved  entries for ```returnKeystoreEntries=true``` */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of KeystoreEntry */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.KeystoreEntry"][];
                            };
                        };
                    };
                };
                /** @description No content. Success without content for ```returnKeystoreEntries=false``` */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - entry already exists for ```update=false``` or entry does not exists for ```update=true``` or certificate validation failed . */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 401: components["responses"]["401"];
                /** @description Forbidden - either permission is missing or request alias is reserved for SAP (alias 'hcicertificate', 'hcicertificate1', 'hcimsgcertificate' or if alias has the prefix 'sap_') */
                readonly 403: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 404: components["responses"]["404"];
                /**
                 * @description Conflict - Trust path to the certificate could not be established. The response error body contains the certificate as KeystoreEntry entity with the validity value 'notTrusted' in JSON-format.<br>
                 *     You can check the fingerprint and can make again the request with the custom option ```fingerprintVerified=true```.
                 */
                readonly 409: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                /** @description Payload too large - request body is too large (maximum size is restricted to 10kB) or this certificate would exceed the maximum size of the keystore, which is restricted to 1 MB. */
                readonly 413: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Unsupported media type - request body has the wrong format (correct formats are X.509 certificate in DER: binary format or with PEM textual encoding or with base 64 textual encoding) */
                readonly 415: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 429: components["responses"]["429"];
                /** @description Service unavailable - keystore is locked by another user. */
                readonly 503: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
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
    readonly "/KeystoreEntries('{Hexalias}')/Certificate/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Export certificate.
         * @description You can use the following request to export a certificate for a certain alias (hex encoded value). If the specified alias represents a key pair, the certificate with the public key is exported.
         */
        readonly get: {
            readonly parameters: {
                readonly query: {
                    /** @description Select the , from which the certificate chain shall be exported: Tenant keystore ```system```, the backup keystore ```backup_admin_system```, the renewal keystore ```KeyRenewal``` or the history keystore ```KeyHistory```. */
                    readonly keystoreName: readonly ("system" | "backup_admin_system" | "KeyRenewal" | "KeyHistory")[];
                    /** @description Provide root ca certificate for key pairs if existing. */
                    readonly rootCA: readonly ("true" | "false")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Content-Type must be set to ```application/pkix-cert```. */
                    readonly "Content-Type": string;
                };
                readonly path: {
                    /** @description Hex encoded value for certificate alias */
                    readonly Hexalias: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success - retrieved certificate */
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
                /** @description Internal server error */
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
    readonly "/KeyPairGenerationRequests": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Generate a key pair.
         * @description You can use the following request to generate a key pair.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to generate key pair.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /** @description Provide current keystore entries in the response. */
                    readonly returnKeystoreEntries: readonly ("true" | "false")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Content-Type must be set to ```application/json;charset=utf-8```. */
                    readonly "Content-Type": string;
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description New entity */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.KeyPairGenerationRequest-create"];
                };
            };
            readonly responses: {
                /** @description Success - all key store entries for ```returnKeystoreEntries=true``` */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.KeyPairGenerationRequest"];
                        };
                    };
                };
                /** @description No content. Success without content for ```returnKeystoreEntries=false``` */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - Keystore entry with the provided alias already exists or alias/common name is empty or null. */
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
                /** @description Request entity too large - generated key pair would exceed the maximum size of the keystore, which is restricted to 1 MB. */
                readonly 413: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 429: components["responses"]["429"];
                /** @description Service unavailable - keystore is locked by another user. */
                readonly 503: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
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
    readonly "/RSAKeyGenerationRequests": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Generate an RSA key pair.
         * @description You can use the following request to generate an RSA key pair.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to generate key pair.<br>As 'Hexalias', provide any hexadecimal value; the system calculates the correct hexadecimal value from the specified 'Alias' property.<br>Note the following regarding the 'RSAFile': If you're using a simple HTTP request with a JSON body, the value of the property 'RSAFile' must contain the base64-encoded private key with padding.<br>Possible values for 'SignatureAlgorithm' are 'SHA-512/RSA', 'SHA-256/RSA', 'SHA-384/RSA', 'SHA-224/RSA', 'SHA-1/RSA'.<br>For private keys, only PKCS#1 format with a PEM header 'BEGIN RSA PRIVATE KEY' is supported. This operation can only by performed on the 'system' keystore.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /** @description Provide current keystore entries in the response. */
                    readonly returnKeystoreEntries: readonly ("true" | "false")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Content-Type must be set to ```application/json;charset=utf-8```. */
                    readonly "Content-Type": string;
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description New entity */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.RSAKeyGenerationRequest-create"];
                };
            };
            readonly responses: {
                /** @description Success - all key store entries for ```returnKeystoreEntries=true``` */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.KeyPairGenerationRequest"];
                        };
                    };
                };
                /** @description No content. Success without content for ```returnKeystoreEntries=false``` */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - possible reasons: Keystore entry with the provided alias already exists; 'Alias', 'CommonName', or 'Country' is empty or null; invalid RSA file; RSA file is larger than 10000 bytes; 'SignatureAlgorithm' does not fit to the length of the key contained in the RSA file. */
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
                /** @description Request entity too large - generated key pair would exceed the maximum size of the keystore, which is restricted to 1 MB. */
                readonly 413: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Locked - keystore is locked by another user. */
                readonly 423: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
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
    readonly "/SSHKeyGenerationRequests": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Generate SSH private key pair.
         * @description You can use the following request to generate an SSH private key pair from an OpenSSH key (with cryptographic algorithms RSA, DSA or EC) or a PuTTY file (with cryptographic algorithms RSA or DSA, but not EC). The alias for the generated key pair depends on the algorithm: id_rsa, id_dsa or id_ec.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to generate key pair.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /** @description Provide current keystore entries in the response. */
                    readonly returnKeystoreEntries?: readonly ("true" | "false")[];
                    /** @description Update existing SSH key pair. */
                    readonly update: readonly ("true" | "false")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Content-Type must be set to ```application/json;charset=utf-8```. */
                    readonly "Content-Type": string;
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Base64 encoded file content */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.SSHKeyGenerationRequest-create"];
                };
            };
            readonly responses: {
                /** @description Success - alias in the response for ```returnKeystoreEntries=false``` or all keystore entries in the response for ```returnKeystoreEntries=true``` */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.SSHKeyGenerationRequest-create_response"];
                        };
                    };
                };
                /** @description Bad request - entry with provided alias already exists for ```returnKeystoreEntries=false```; alias or common name is empty or null. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 401: components["responses"]["401"];
                /** @description Forbidden - either permission is missing or request alias is reserved for SAP (alias 'hcicertificate', 'hcicertificate1', 'hcimsgcertificate' or if alias has the prefix 'sap_') */
                readonly 403: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 404: components["responses"]["404"];
                /** @description Request entity too large - generated key pair would exceed the maximum size of the keystore, which is restricted to 1 MB. */
                readonly 413: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 429: components["responses"]["429"];
                /** @description Service unavailable - keystore is locked by another user. */
                readonly 503: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
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
    readonly "/KeyPairResources": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Import/update a key pair.
         * @description You can use the following request to import or update a key pair.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to add/update key pair.
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /** @description Verify signature of the top CA certificate. */
                    readonly fingerprintVerified: readonly ("true" | "false")[];
                    /** @description Provide current keystore entries in the response. */
                    readonly returnKeystoreEntries: readonly ("true" | "false")[];
                    /** @description Update existing key pair. */
                    readonly update: readonly ("true" | "false")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Content-Type must be set to ```application/json;charset=utf-8```. */
                    readonly "Content-Type": string;
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Key pair for import */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.KeyPairResource-update"];
                };
            };
            readonly responses: {
                /** @description Success - all keystore entries for ```returnKeystoreEntries=true``` */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of KeystoreEntry */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.KeystoreEntry"][];
                            };
                        };
                    };
                };
                /** @description No content. Success without content for ```returnKeystoreEntries=false``` */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - entry already exists for ```update=false```, entry does not exists for ```update=true```, alias contains invalid character, certificate chain validation failed or password is not correct. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 401: components["responses"]["401"];
                /** @description Forbidden - either permission is missing or request alias is reserved for SAP (alias 'hcicertificate', 'hcicertificate1', 'hcimsgcertificate' or if alias has the prefix 'sap_') */
                readonly 403: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 404: components["responses"]["404"];
                /**
                 * @description Conflict - Trust path to the top CA certificate could not be established. The response error body contains the certificate as KeystoreEntry entity with the validity value 'notTrusted' in JSON-format.<br>
                 *     You can check the fingerprint and can make again the request with the custom option ```fingerprintVerified=true```.
                 */
                readonly 409: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Payload to large - request body is too large (maximum size is restricted to 30072 bytes) or this key pair would exceed the maximum size of the keystore, which is restricted to 1 MB. */
                readonly 413: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Unsupported media type - resource property does not contain a PKCS#12 file. */
                readonly 415: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 429: components["responses"]["429"];
                /** @description Service unavailable - keystore is locked by another user. */
                readonly 503: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
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
    readonly "/KeystoreEntries('{Hexalias}')/SigningRequest/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Generate a certificate signing request.
         * @description You can use the following request to generate a certificate signing request.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description HTTP header attribute Content-Type must be set to ```application/pkcs10```. */
                    readonly "Content-Type": string;
                };
                readonly path: {
                    /** @description Hex encoded value for key pair alias */
                    readonly Hexalias: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success - certificate signing request provided. */
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
    readonly "/CertificateChainResources('{Hexalias}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        /**
         * Import a certificate chain.
         * @description You can use the following request to import a certificate chain.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions for the keystore.
         */
        readonly put: {
            readonly parameters: {
                readonly query: {
                    /** @description Verify signature of the top CA certificate . */
                    readonly fingerprintVerified: readonly ("true" | "false")[];
                    /** @description Provide current keystore entries in the response. */
                    readonly returnKeystoreEntries: readonly ("true" | "false")[];
                };
                readonly header: {
                    /**
                     * @description HTTP header attribute Content-Type must be set according to the certificate chain format:
                     *     * ```application/pkcs7-mime``` for PKCS7
                     *     * ```application/x-pkcs7-certificates``` for SPC
                     *     * ```application/pkix-pkipath``` for PKIPath
                     *     * no mime-type for chain of DER-PEM encoded X.509 certificates in one file.
                     */
                    readonly "Content-Type"?: readonly ("application/pkcs7-mime" | "application/x-pkcs7-certificates" | "application/pkix-pkipath")[];
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Hex encoded value for key pair alias */
                    readonly Hexalias: string;
                };
                readonly cookie?: never;
            };
            /**
             * @description New certificate chain in one of the supported formats:
             *     * PKCS#7 in binary or PEM or base 64 textual encoding
             *     * chain of DER-PEM encoded X.509 certificates in one file
             *     *  X.509 PKI path (sequence of certificates with top CA certificate at index 0)
             *     * Software Publisher Certificate (SPC)
             */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": string;
                };
            };
            readonly responses: {
                /** @description Success - all keystore entries for ```returnKeystoreEntries=true``` */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of KeystoreEntry */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.KeystoreEntry"][];
                            };
                        };
                    };
                };
                /** @description No content - success without content for ```returnKeystoreEntries=false``` */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - entry with provided alias does not represent key pair, certificate chain does not fit to the public key or certificate chain validation failed. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 401: components["responses"]["401"];
                /** @description Forbidden - either permission is missing or request alias is reserved for SAP (alias 'hcicertificate', 'hcicertificate1', 'hcimsgcertificate' or if alias has the prefix 'sap_') */
                readonly 403: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not found - alias does not exist. */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                /**
                 * @description Conflict - Trust path to the top CA certificate could not be established. The response error body contains the certificate as KeystoreEntry entity with the validity value 'notTrusted' in JSON-format.<br>
                 *     You can check the fingerprint and can make again the request with the custom option ```fingerprintVerified=true```.
                 */
                readonly 409: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Request body is too large (maximum size is restricted to 30072 bytes) or this added certificate chain would exceed the maximum size of the keystore, which is restricted to 1 MB. */
                readonly 413: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Unsupported media type - request body has the wrong format (correct formats are PKCS7, SPC, PKIPath, Chain of DER-PEM encoded X.509 certificates). */
                readonly 415: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 429: components["responses"]["429"];
                /** @description Service unavailable - keystore is locked by another user. */
                readonly 503: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
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
    readonly "/KeystoreEntries('{Hexalias}')/ChainCertificates": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get certificate chain.
         * @description You can use the following request to get a certificate chain of a key pair.
         */
        readonly get: {
            readonly parameters: {
                readonly query: {
                    /** @description Select the , from which the certificate chain shall be exported: Tenant keystore ```system```, the backup keystore ```backup_admin_system``` or the key renewal keystore ```KeyRenewal```. */
                    readonly keystoreName: readonly ("system" | "backup_admin_system" | "KeyRenewal" | "KeyHistory")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Alias" | "KeyType" | "LastModifiedBy" | "LastModifiedTime" | "Owner" | "Validity")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                };
                readonly path: {
                    /** @description Hex encoded value for key pair alias */
                    readonly Hexalias: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success - retrieved chain certificate entities */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of ChainCertificate */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.ChainCertificate"][];
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
    readonly "/KeystoreEntries('{Hexalias}')/ChainResource/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Export certificate chain.
         * @description You can use the following request to export a certificate chain.
         */
        readonly get: {
            readonly parameters: {
                readonly query: {
                    /** @description Select the , from which the certificate chain shall be exported: Tenant keystore ```system```, the backup keystore ```backup_admin_system```, the key renewal keystore ```KeyRenewal``` or the history keystore ```KeyHistory```. */
                    readonly keystoreName: readonly ("system" | "backup_admin_system" | "KeyRenewal" | "KeyHistory")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Content-Type must be set to ```application/pkcs7-mime```. */
                    readonly "Content-Type": string;
                };
                readonly path: {
                    /** @description Hex encoded value for key pair alias */
                    readonly Hexalias: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success - retrieved certificate chain */
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
    readonly "/KeystoreEntries": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all entries of a keystore.
         * @description You can use the following request to get all entries of a keystore.
         */
        readonly get: {
            readonly parameters: {
                readonly query: {
                    /** @description Select the keystore, from which the certificate chain shall be exported: Tenant keystore ```system```, the backup keystore ```backup_admin_system``` or the key renewal keystore ```KeyRenewal```. */
                    readonly keystoreName: readonly ("system" | "backup_admin_system" | "KeyRenewal")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Alias" | "Hexalias" | "KeyType" | "LastModifiedBy" | "LastModifiedTime" | "Owner" | "Status" | "Type" | "Validity")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success - all keystore entries */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of KeystoreEntry */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.KeystoreEntry"][];
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
    readonly "/KeystoreEntries('{Hexalias}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get keystore entry by alias
         * @description You can use the following request to get a keystore entry for a certain alias.
         */
        readonly get: {
            readonly parameters: {
                readonly query: {
                    /** @description Select the keystore, from which the certificate chain shall be exported: Tenant keystore ```system```, the backup keystore ```backup_admin_system``` or the key renewal keystore ```KeyRenewal```. */
                    readonly keystoreName: readonly ("system" | "backup_admin_system" | "KeyRenewal")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Alias" | "KeyType" | "LastModifiedBy" | "LastModifiedTime" | "Owner" | "Status" | "Type" | "Validity")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                };
                readonly path: {
                    /** @description Hex encoded value for keystore entry alias */
                    readonly Hexalias: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success - retrieved keystore entry */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.KeystoreEntry"];
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
         * Rename an entry alias of tenant keystore.
         * @description You can use the following request to rename entry alias of the current tenant keystore.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions for the keystore.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: {
                    /** @description URL encoded new alias name */
                    readonly renameAlias?: string;
                    /** @description Return HeaAlias (in square brackets) of the renamed entry in the response */
                    readonly returnHexAlias?: readonly ("true" | "false")[];
                    /** @description Provide current keystore entries in the response. */
                    readonly returnKeystoreEntries?: readonly ("true" | "false")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Content-Type must be set to ```application/json;charset=utf-8```. */
                    readonly "Content-Type": string;
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Hex encoded value for keystore entry alias */
                    readonly Hexalias: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: components["requestBodies"]["com.sap.hci.api.KeystoreEntry-Rename"];
            readonly responses: {
                /** @description Success - for ```returnHexAlias=true``` the new Hexalias value  (in square brackets) or for ```returnKeystoreEntries=true``` the all keystore entries */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.KeystoreEntry"];
                        };
                    };
                };
                /** @description No content. Success without content - successfully renamed for```returnKeystoreEntries=false``` and ```returnHexAlias=false``` */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - entry with provided new alias already exists, custom query parameter ```renameHexAlias``` is missing or is empty/null or body content is invalid. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 401: components["responses"]["401"];
                /** @description Forbidden - either permission is missing or the new alias is reserved for SAP (alias 'hcicertificate', 'hcicertificate1', 'hcimsgcertificate' or if alias has the prefix 'sap_') */
                readonly 403: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not found - alias does not exist. */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 429: components["responses"]["429"];
                /** @description Service unavailable - keystore is locked by another user. */
                readonly 503: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly default: components["responses"]["error"];
            };
        };
        readonly post?: never;
        /**
         * Delete/activate keystore entry.
         * @description You can use the following request to delete an entry of the tenant keystore or to activate an entry from the renewal keystore (keystoreName=KeyRenewal).<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions for the keystore.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: {
                    /** @description Only relevant for activating an entry from the renewal keystore: ```KeyRenewal``` must be selected. */
                    readonly keystoreName?: readonly "KeyRenewal"[];
                    /** @description Only relevant for activating a renewal entry: ```true``` must be selected. */
                    readonly activate?: readonly "true"[];
                    /** @description Provide current keystore entries in the response. */
                    readonly returnKeystoreEntries?: readonly ("true" | "false")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Hex encoded value for keystore entry alias */
                    readonly Hexalias: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Deleted keystore entry for ```returnKeystoreEntries=true``` */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.KeystoreEntry"];
                        };
                    };
                };
                /** @description No content. Success without content for ```returnKeystoreEntries=false``` */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                /** @description Forbidden - either permission is missing or request alias is reserved for SAP (alias 'hcicertificate', 'hcicertificate1', 'hcimsgcertificate' or if alias has the prefix 'sap_') */
                readonly 403: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not found - alias does not exist. */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 429: components["responses"]["429"];
                /** @description Service unavailable - keystore is locked by another user. */
                readonly 503: {
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
    readonly "/KeystoreEntries('69645F727361')/Sshkey/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Export public key in OpenSSH format.
         * @description You can use the following request to export the public key of the provided certificate/key pair in OpenSSH format.
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
                /** @description Retrieved public key in OpenSSH format */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - unsupported algorithm - SSH key export is only available for RSA and DSA encrypted entries. */
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
    readonly "/Keystores('{KeystoreName}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get keystore properties and entries.
         * @description You can use the following request to get keystore properties and entries.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Entries" | "LastModifiedBy" | "LastModifiedTime" | "Size")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly "Entries"[];
                };
                readonly header: {
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                };
                readonly path: {
                    /** @description Select the keystore, from which the certificate chain shall be exported: Tenant keystore ```system``` or the backup keystore ```backup_admin_system```. */
                    readonly KeystoreName: readonly ("system" | "backup_admin_system")[];
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success - retrieved keystore properties and entries for $expand=Entries */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of KeystoreEntry */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.KeystoreEntry"][];
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
    readonly "/Keystores('{KeystoreName}')/Size/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of keystore entries.
         * @description You can use the following request to get the number of keystore entries.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Select keystore: Tenant keystore ```system``` or the key renewal keystore ```KeyRenewal```. */
                    readonly KeystoreName: readonly ("system" | "KeyRenewal")[];
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success - retrieved number of keystore entries. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - invalid keystore name. Only ```system``` and ```KeyRenewal``` are allowed. */
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
    readonly "/KeystoreResources": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Import/back up a keystore.
         * @description You can use the following request to import entries to the tenant keystore (target keystore name ```system```) or to back up the keystore entries owned by tenant administrator (target keystore name ```backup_admin_system```).
         *      For the import entries are ignored during import, which do not represent a X.509 certificate entry or a key pair entry with a certificate chain of X.509 certificates.
         *      The backup overwrites the old backup keystore. <br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to import the keystore entries.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Only required for keystore import - must be deselected for backup. There are different options possible:<br>
                     *     * ```replace``` - old keystore entries are deleted and imported entries are added.<br>
                     *     * ```merge``` - only entries with new alias are added.<br>
                     *     * ```overwrite``` - all entries are uploaded and possibly replace existing entries with the same alias.
                     */
                    readonly importOption?: readonly ("replace" | "merge" | "overwrite")[];
                    /** @description Provide current keystore entries with the import status in the response. */
                    readonly returnKeystoreEntries?: readonly ("true" | "false")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Content-Type must be set to ```application/json;charset=utf-8```. */
                    readonly "Content-Type": string;
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /**
             * @description Keystore for import or for backup:<br>
             *     * Name ```system``` resource with base64 encoded JKS or JCEKS and password for import<br>
             *     * ```{"Name": "backup_admin_system"}``` for backup.
             */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.KeystoreResource-create"];
                };
            };
            readonly responses: {
                /**
                 * @description Imported keystore entries for ```returnKeystoreEntries=true``` with the following status values:<br>
                 *     ```unchanged```,```changed```,```new```,```removed```,```notImported: An entry with the same alias already exists```, ```notImported: The alias is not allowed. Aliases starting with 'sap_' are reserved for SAP.```, ```notImported: The alias is not allowed. The alias 'hcicertificate' is reserved for SAP.```, ```notImported :Key Pair entry cannot be overwritten by a certificate entry.```
                 */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of KeystoreEntry */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.KeystoreEntry-Imported"][];
                            };
                        };
                    };
                };
                /** @description No content. Success without content for ```returnKeystoreEntries=false```. */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - name property is not ```system``` for import or is not  ```backup_admin_system``` for backup or wrong import password or for ```returnKeystoreEntries=false``` at least one entry could not be imported and the complete import failed. The importOption ```merge``` is not recommended for returnKeystoreEntries ```false``` */
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
                /** @description Payload too large - maximum size or resource property is restricted to 1MB or resulting keystore would exceed the maximum size of 1 MB. */
                readonly 413: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Unsupported media type - resource property does not contain JKS or JCEKS keystore. */
                readonly 415: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 429: components["responses"]["429"];
                /** @description Service unavailable - keystore is locked by another user. */
                readonly 503: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
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
    readonly "/KeystoreResources('{KeystoreName}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Export public keystore content.
         * @description You can use the following request to export the public content of the keystore, which was created by SAP or tenant administrator.<br>
         *     For a private key entry the complete chain is exported as described in the following example: If the key pair entry has the alias ```test```, and has a chain of three certificates, the certificate of the entry gets the alias ```test``` in the exported keystore, the intermediate CA certificate gets the alias ```test_1```, and the root CA certificate gets the alias ```test_2```. If entries with ```test_1```or ```test_2``` already exist, an additional underscore ```_``` is added to the alias until it is unique.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                };
                readonly path: {
                    /** @description Select the keystore, from which the public content shall be exported: Tenant keystore ```system``` or the backup keystore ```backup_admin_system```. */
                    readonly KeystoreName: readonly ("system" | "backup_admin_system")[];
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved keystore in JCEKS format */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of KeystoreEntry */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.KeystoreResource"][];
                            };
                        };
                    };
                };
                /** @description Bad request - invalid keystore name. Only ```system``` and ```backup_admin_system``` are allowed. */
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
    readonly "/KeystoreResources('system')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        /**
         * Retrieve backed up/delete keystore entries.
         * @description You can use the following request to retrieve backed up keystore entries or to delete several entries of the current keystore, which are owned by tenant administrator.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions for the keystore.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: {
                    /** @description Only for retrieving backed up keystore entries ```backup_admin_system``` must be selected. For deletion of several keystore entries this parameter is not relevant. */
                    readonly retrieveBackup?: readonly "backup_admin_system"[];
                    /** @description Only for deletion of keystore entries ```true``` must be selected. For retrieving backed up keystore entries this parameter is not relevant. */
                    readonly deleteEntries?: readonly ("true" | "false")[];
                    /**
                     * @description Only relevant for retrieving backed up keystore entries (default ```overwrite```). There are different options possible:<br>
                     *     * ```replace``` - old keystore entries are deleted and imported entries are added.<br>
                     *     * ```overwrite``` - all entries are uploaded and possibly replace existing entries with the same alias.
                     */
                    readonly importOption?: readonly ("replace" | "overwrite")[];
                    /** @description Provide current keystore entries with the import status in the response. */
                    readonly returnKeystoreEntries?: readonly ("true" | "false")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Content-Type must be set to ```application/json```. */
                    readonly "Content-Type": string;
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /**
             * @description For retrieving backed up keystore entries ```{"Resource":null}``` must be entered.<br>
             *     For deletion of several keystore entries: List of aliases for the  entries, which should be deleted, must be entered as ; seperated list. Specical characters ';','\' must be escaped. Example: The both aliases ```Company A; B``` and ```Company \ C \``` must be entered as ```Company A\; B;Company \\ C \\```.
             */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias-massdelete"];
                };
            };
            readonly responses: {
                /**
                 * @description Success - all keystore entries for ```returnKeystoreEntries=true```.<br>
                 *     For ```retrieveBackup=backup_admin_system``` the entries are provided with the following status values:<br>
                 *     ```unchanged```,```changed```,```new```,```removed```.<br>
                 *     For ```deletedEntries=true``` this response code is also provided, if no keystore entries are deleted because of not found aliases.
                 */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of KeystoreEntry */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.KeystoreEntry-Imported"][];
                            };
                        };
                    };
                };
                /** @description No content. Success without content for ```returnKeystoreEntries=false```. */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - keystore name is not ```system``` or request body is not provided in the expected format. */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 401: components["responses"]["401"];
                /** @description Forbidden - user permission is missing or for ```deletedEntries=true``` the alias list contains values, which are reserved for SAP (alias is equal with 'hcicertificate', is equal 'hcicertificate1', 'hcimsgcertificate' or alias has the prefix 'sap_') */
                readonly 403: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not found - no backed up keystore entries owned by tenant administrator. Only relevant for ```retrieveBackup=backup_admin_system```. */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                readonly 429: components["responses"]["429"];
                /** @description Service unavailable - keystore is locked by another user. */
                readonly 503: {
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
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/HistoryKeystoreEntries": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get entries of the history keystore.
         * @description You can use the following request to get entries of the history keystore.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Alias" | "Hexalias" | "KeyType" | "LastModifiedBy" | "LastModifiedTime" | "Owner" | "Validity")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved entries of the history keystore */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of HistoryKeystoreEntry */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.HistoryKeystoreEntry"][];
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
    readonly "/HistoryKeystoreEntries('{Hexalias}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get keystore history entry by alias
         * @description You can use the following request to get a keystore history entry for a certain alias.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Alias" | "KeyType" | "LastModifiedBy" | "LastModifiedTime" | "Owner" | "Validity")[];
                };
                readonly header: {
                    /** @description HTTP header attribute Accept must be set to ```application/json```. */
                    readonly Accept: string;
                };
                readonly path: {
                    /** @description Hex encoded value for keystore entry alias */
                    readonly Hexalias: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved entry of history keystore */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.HistoryKeystoreEntry"];
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
         * Restore an entry from history to renewal keystore.
         * @description You can use the following request to restore an entry from the keystore history to the renewal keystore.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions for the keystore.
         */
        readonly put: {
            readonly parameters: {
                readonly query: {
                    /** @description URL encoded destination alias name (optional). If it is empty the new alias is provided in the form ```[number]_original alias```. */
                    readonly destinationAlias?: string;
                    /** @description Copy attribute must be ```true``` */
                    readonly copy: readonly ("true" | "false")[];
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Hex encoded value for entry alias of the history keystore */
                    readonly Hexalias: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: components["requestBodies"]["com.sap.hci.api.KeystoreEntry-Rename"];
            readonly responses: {
                /** @description No content. Success without content */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - destination alias already exists in renewal keystore or is not in the SAP namespace (alias 'hcicertificate', 'hcicertificate1', 'hcimsgcertificate' or with prefix 'sap_'), provided alias of the entry in the history keystore does not have the form ```[number]_original alias``` or invalid request body. */
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
                /** @description Not found - alias does not exist in history keystory. */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
                readonly 429: components["responses"]["429"];
                /** @description Service unavailable - renewal keystore is locked by another user. */
                readonly 503: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
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
    readonly "/CertificateUserMappings": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all certificate-to-user mappings.
         * @description You can use the following request to get all certificate-to-user mappings.This resource is only available in the Neo environment.<br>For more information, see SAP Help Portal documentation at [Environment-Specific Aspects Integration Developers Should Know](https://help.sap.com/docs/CLOUD_INTEGRATION/368c481cd6954bdfa5d0435479fd4eaf/639a0612e32c498fa7480580d90c9ea6.html?locale=en-US).
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Filter items only by user is supported.<br>
                     *     Example: ```User eq 'supplier1'``` returns certificate mapping for the user 'supplier1'
                     */
                    readonly $filter?: string;
                    /** @description Order items by property values. */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "User" | "User desc" | "Certificate" | "Certificate desc" | "CreatedBy" | "CreatedBy desc" | "CreatedTime" | "CreatedTime desc" | "LastModifiedBy" | "LastModifiedBy desc" | "LastModifiedTime" | "LastModifiedTime desc" | "ValidUntil")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "User" | "Certificate" | "LastModifiedBy" | "LastModifiedTime" | "CreatedBy" | "CreatedTime" | "ValidUntil")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved collection of certificate-to-user mapping */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            /** Collection of CertificateUserMapping */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.CertificateUserMapping"][];
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
         * Add new certificate-to-user mapping.
         * @description You can use the following request to add a new certificate-to-user mapping or to update the user of an existing mapping.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to create certificate-to-user mappings.This resource is only available in the Neo environment.<br>For more information, see SAP Help Portal documentation at [Environment-Specific Aspects Integration Developers Should Know](https://help.sap.com/docs/CLOUD_INTEGRATION/368c481cd6954bdfa5d0435479fd4eaf/639a0612e32c498fa7480580d90c9ea6.html?locale=en-US).
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
                    readonly "application/json": components["schemas"]["com.sap.hci.api.CertificateUserMapping-create"];
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
                            readonly d?: components["schemas"]["com.sap.hci.api.CertificateUserMapping"];
                        };
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - possibly certificate is not provided in base64 encoded PEM-DER format. */
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
    readonly "/CertificateUserMappings('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get certificate-to-user mapping.
         * @description You can use the following request to get a certificate-to-user mapping for a given Id.This resource is only available in the Neo environment.<br>For more information, see SAP Help Portal documentation at [Environment-Specific Aspects Integration Developers Should Know](https://help.sap.com/docs/CLOUD_INTEGRATION/368c481cd6954bdfa5d0435479fd4eaf/639a0612e32c498fa7480580d90c9ea6.html?locale=en-US).
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("User" | "Certificate" | "LastModifiedBy" | "LastModifiedTime" | "CreatedBy" | "CreatedTime")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Identifier for certificate-to-user mapping */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved certificate-to-user mapping */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.CertificateUserMapping"];
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
         * Delete certificate-to-user mapping.
         * @description You can use the following request to delete certificate-to-user mapping.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete certificate-to-user mappings.This resource is only available in the Neo environment.<br>For more information, see SAP Help Portal documentation at [Environment-Specific Aspects Integration Developers Should Know](https://help.sap.com/docs/CLOUD_INTEGRATION/368c481cd6954bdfa5d0435479fd4eaf/639a0612e32c498fa7480580d90c9ea6.html?locale=en-US).
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Identifier for certificate-to-user mapping */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description No content. Success */
                readonly 204: {
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
    readonly "/AccessPolicies": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all access policies.
         * @description You can use the following request to get all access policies.<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Count the number of retrieved entries by selecting ```allpages```. */
                    readonly $inlinecount?: readonly "allpages"[];
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /**
                     * @description Filter items by property values.<br>
                     *     For any filter use only the 'eq' operator.<br>
                     *     Example: ```RoleName eq 'AccessPolicy1'```.<br>
                     *     Available properties for filter: Id, RoleName, Description
                     */
                    readonly $filter?: string;
                    /** @description Order items by property values 'RoleName' and/or 'Id'. */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "RoleName" | "RoleName desc")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "RoleName" | "Description")[];
                    /** @description Related artifact references to be returned. */
                    readonly $expand?: readonly "ArtifactReferences"[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved access policies */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.AccessPolicy"][];
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
         * Add access policies.
         * @description You can use the following request to add access policies. You can also create respective artifact reference in one call.<br>
         *      **ArtifactReference** - Following values of the *Type* property:
         *      'MESSAGE_QUEUE'
         *      'GLOBAL_DATA_STORE'
         *      'GLOBAL_VARIABLE'
         *     have only one value for the property *ConditionAttribute*:
         *     'Name'
         *     Check the ArtifactReference model for more values.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to add user credentials.
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
            /** @description Example body to create access policy with artifact reference in one call */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.AccessPolicy-create"];
                };
            };
            readonly responses: {
                /** @description Created. Access Policy created */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - request body does not contain the expected content. */
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
                /** @description Conflict - access policy with the same name already exists. */
                readonly 409: {
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
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/AccessPolicies({Id})": {
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
         * Delete access policy with a certain Id.
         * @description You can use the following request to delete access policy.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete access policies.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of the access policy to be deleted<br>
                     *     Example: ```101```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description No content. Success - no conent sent from server */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - request body does not contain the expected content. */
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
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Updates access policy with a certain Id.
         * @description You can use the following request to update access policy.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update access policies.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of the access policy to be updated<br>
                     *     Example: ```101```
                     */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description No content. Successfully changed access policy - no content sent from server */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - E.g. the Id is not correct. */
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
                readonly default: components["responses"]["error"];
            };
        };
        readonly trace?: never;
    };
    readonly "/ArtifactReferences": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all artifact references.
         * @description You can use the following request to get all artifact references.<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Count the number of retrieved entries by selecting ```allpages```. */
                    readonly $inlinecount?: readonly "allpages"[];
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /**
                     * @description Filter items by property values.<br>
                     *     For any filter use only the 'eq' operator.<br>
                     *     Example: ```Id eq 'ArtifactReference1'```.<br>
                     *     Available properties for filter: Id
                     */
                    readonly $filter?: string;
                    /** @description Order items by property values. */
                    readonly $orderby?: readonly ("Id" | "Id desc" | "Name" | "Name desc")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Name" | "Description" | "Type" | "ConditionAttribute" | "ConditionValue" | "ConditionType")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved artifact references */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.ArtifactReference"][];
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
         * Add artifact reference to access policy.
         * @description You can use the following request to add artifact references to access policies. <br>
         *      **ArtifactReference** - Following values of the *Type* property:
         *      'MESSAGE_QUEUE'
         *      'GLOBAL_DATA_STORE'
         *      'GLOBAL_VARIABLE'
         *     have only one value for the property *ConditionAttribute*:
         *     'Name'
         *     Check the ArtifactReference model for more values.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to add user credentials.
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
            /** @description Example body to create artiact reference for an existing access policy */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.ArtifactReference-createsep"];
                };
            };
            readonly responses: {
                /** @description Created. Artifact reference created */
                readonly 201: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request - request body does not contain the expected content. */
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
                readonly default: components["responses"]["error"];
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/ArtifactReferences({Id})": {
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
         * Delete artifact reference with a certain Id.
         * @description You can use the following request to delete artifact reference.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete artifact reference.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /**
                     * @description Id of the artifact reference  to be deleted<br>
                     *     Example: ```101```
                     */
                    readonly Id: string;
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
    readonly "/": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get CSRF token.
         * @description You can use the following request to request the CSRF token for this session, which is required for write access via POST, PUT and DELETE operations. Copy the received X-CSRF-Token from the response header.<br>
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
        /** HistoryKeystoreEntry */
        readonly "com.sap.hci.api.HistoryKeystoreEntry": components["schemas"]["com.sap.hci.api.KeystoreEntry"] & {
            /** @example string */
            readonly ActivatedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly ActiveFrom?: string;
            /** @example string */
            readonly DeactivatedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly ActiveUntil?: string;
            /** Format: int32 */
            readonly ActivationSequenceNumber?: number;
            /** @example string */
            readonly OriginalAlias?: string;
        };
        /** HistoryKeystoreEntry (for create) */
        readonly "com.sap.hci.api.HistoryKeystoreEntry-create": components["schemas"]["com.sap.hci.api.KeystoreEntry-create"] & {
            /** @example string */
            readonly ActivatedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly ActiveFrom?: string;
            /** @example string */
            readonly DeactivatedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly ActiveUntil?: string;
            /** Format: int32 */
            readonly ActivationSequenceNumber?: number;
            /** @example string */
            readonly OriginalAlias?: string;
        };
        /** HistoryKeystoreEntry (for update) */
        readonly "com.sap.hci.api.HistoryKeystoreEntry-update": components["schemas"]["com.sap.hci.api.KeystoreEntry-update"] & {
            /** @example string */
            readonly ActivatedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly ActiveFrom?: string;
            /** @example string */
            readonly DeactivatedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly ActiveUntil?: string;
            /** Format: int32 */
            readonly ActivationSequenceNumber?: number;
            /** @example string */
            readonly OriginalAlias?: string;
        };
        /** KeystoreResource */
        readonly "com.sap.hci.api.KeystoreResource": {
            readonly Name?: string;
            /** Format: binary */
            readonly Resource?: string;
            /** @example string */
            readonly Password?: string;
            /** @example string */
            readonly Aliases?: string;
        };
        /** KeystoreResource (for create) */
        readonly "com.sap.hci.api.KeystoreResource-create": {
            /** @example system */
            readonly Name: string;
            /**
             * Format: binary
             * @example base64 encoded JKS or JCEKS keystore
             */
            readonly Resource?: string;
            /** @example string */
            readonly Password?: string;
        };
        /** KeystoreResource (for update) */
        readonly "com.sap.hci.api.KeystoreResource-update": {
            /** Format: binary */
            readonly Resource?: string;
            /** @example string */
            readonly Password?: string;
            /** @example string */
            readonly Aliases?: string;
        };
        /** KeystoreResource (for export) */
        readonly "com.sap.hci.api.KeystoreResource-export": {
            /** @example system */
            readonly Name?: string;
            /** Format: binary */
            readonly Resource?: string;
        };
        /** Keystore (for restore) */
        readonly "com.sap.hci.api.KeystoreResource-restore": {
            /** Format: binary */
            readonly Resource: string;
        };
        /** CertificateChainResource */
        readonly "com.sap.hci.api.CertificateChainResource": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias"] & {
            readonly KeystoreEntry?: components["schemas"]["com.sap.hci.api.KeystoreEntry"];
        };
        /** CertificateChainResource (for create) */
        readonly "com.sap.hci.api.CertificateChainResource-create": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias-create"] & {
            readonly KeystoreEntry?: components["schemas"]["com.sap.hci.api.KeystoreEntry-create"];
        };
        /** CertificateChainResource (for update) */
        readonly "com.sap.hci.api.CertificateChainResource-update": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias-update"] & Record<string, never>;
        /** KeystoreEntryCertificatePartBase */
        readonly "com.sap.hci.api.KeystoreEntryCertificatePartBase": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias"] & {
            /** @example string */
            readonly KeyType?: string;
            /** Format: int32 */
            readonly KeySize?: number;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotBefore?: string;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotAfter?: string;
            /** @example string */
            readonly SerialNumber?: string;
            /** @example string */
            readonly SignatureAlgorithm?: string;
            /** @example string */
            readonly EllipticCurve?: string;
        };
        /** KeystoreEntryCertificatePartBase (for create) */
        readonly "com.sap.hci.api.KeystoreEntryCertificatePartBase-create": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias-create"] & {
            /** @example string */
            readonly KeyType?: string;
            /** @example string */
            readonly SignatureAlgorithm?: string;
            /** Format: int32 */
            readonly KeySize?: number;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotBefore?: string;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotAfter?: string;
            /** @example string */
            readonly SerialNumber?: string;
        };
        /** KeystoreEntryCertificatePartBase (for update) */
        readonly "com.sap.hci.api.KeystoreEntryCertificatePartBase-update": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias-update"] & {
            /** @example string */
            readonly KeyType?: string;
            /** Format: int32 */
            readonly KeySize?: number;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotBefore?: string;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotAfter?: string;
            /** @example string */
            readonly SerialNumber?: string;
            /** @example string */
            readonly SignatureAlgorithm?: string;
        };
        /** KeystoreEntryAlias */
        readonly "com.sap.hci.api.KeystoreEntryAlias": {
            readonly Hexalias?: string;
            readonly Alias?: string;
        };
        /** KeystoreEntryAlias (for create) */
        readonly "com.sap.hci.api.KeystoreEntryAlias-create": {
            readonly Hexalias: string;
            readonly Alias?: string;
        };
        /** KeystoreEntryAlias (for update) */
        readonly "com.sap.hci.api.KeystoreEntryAlias-update": {
            readonly Alias?: string;
        };
        /** KeystoreEntryAliases (for mass delete) */
        readonly "com.sap.hci.api.KeystoreEntryAlias-massdelete": {
            /** @example alias1;alias2 */
            readonly Aliases?: string;
        };
        /** SSHKeyResource */
        readonly "com.sap.hci.api.SSHKeyResource": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias"] & {
            readonly KeystoreEntry?: components["schemas"]["com.sap.hci.api.KeystoreEntry"];
        };
        /** SSHKeyResource (for create) */
        readonly "com.sap.hci.api.SSHKeyResource-create": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias-create"] & {
            readonly KeystoreEntry?: components["schemas"]["com.sap.hci.api.KeystoreEntry-create"];
        };
        /** SSHKeyResource (for update) */
        readonly "com.sap.hci.api.SSHKeyResource-update": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias-update"] & Record<string, never>;
        /** KeystoreEntry */
        readonly "com.sap.hci.api.KeystoreEntry": components["schemas"]["com.sap.hci.api.KeystoreEntryCertificatePart"] & {
            /** @example string */
            readonly Type?: string;
            /** @example string */
            readonly Owner?: string;
            /** @example string */
            readonly LastModifiedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly LastModifiedTime?: string;
            /** @example string */
            readonly CreatedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly CreatedTime?: string;
            /** @example string */
            readonly Status?: string;
            /** Collection of ChainCertificate */
            readonly ChainCertificates?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.ChainCertificate"][];
            };
            readonly Certificate?: components["schemas"]["com.sap.hci.api.CertificateResource"];
            readonly Sshkey?: components["schemas"]["com.sap.hci.api.SSHKeyResource"];
            readonly Keystore?: components["schemas"]["com.sap.hci.api.Keystore"];
            readonly ChainResource?: components["schemas"]["com.sap.hci.api.CertificateChainResource"];
            readonly SigningRequest?: components["schemas"]["com.sap.hci.api.CertificateSigningRequest"];
        };
        /** KeystoreEntry (for create) */
        readonly "com.sap.hci.api.KeystoreEntry-create": components["schemas"]["com.sap.hci.api.KeystoreEntryCertificatePart-create"] & {
            /** @example string */
            readonly Type?: string;
            /** @example string */
            readonly Owner?: string;
            /** @example string */
            readonly LastModifiedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly LastModifiedTime?: string;
            /** @example string */
            readonly CreatedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly CreatedTime?: string;
            /** @example string */
            readonly Status?: string;
            /** Collection of ChainCertificate */
            readonly ChainCertificates?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.ChainCertificate-create"][];
            };
            readonly Certificate?: components["schemas"]["com.sap.hci.api.CertificateResource-create"];
            readonly Sshkey?: components["schemas"]["com.sap.hci.api.SSHKeyResource-create"];
            readonly Keystore?: components["schemas"]["com.sap.hci.api.Keystore-create"];
            readonly ChainResource?: components["schemas"]["com.sap.hci.api.CertificateChainResource-create"];
            readonly SigningRequest?: components["schemas"]["com.sap.hci.api.CertificateSigningRequest-create"];
        };
        /** KeystoreEntry (for update) */
        readonly "com.sap.hci.api.KeystoreEntry-update": components["schemas"]["com.sap.hci.api.KeystoreEntryCertificatePart-update"] & {
            /** @example string */
            readonly Type?: string;
            /** @example string */
            readonly Owner?: string;
            /** @example string */
            readonly LastModifiedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly LastModifiedTime?: string;
            /** @example string */
            readonly CreatedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly CreatedTime?: string;
            /** @example string */
            readonly Status?: string;
        };
        /** KeystoreEntry (for rename) */
        readonly "com.sap.hci.api.KeystoreEntry-Rename": {
            readonly Status: string;
        };
        /** KeystoreEntry (imported) */
        readonly "com.sap.hci.api.KeystoreEntry-Imported": {
            readonly Hexalias?: string;
            readonly Alias?: string;
            /** @example string */
            readonly KeyType?: string;
            /** Format: int32 */
            readonly KeySize?: number;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotBefore?: string;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotAfter?: string;
            /** @example string */
            readonly SerialNumber?: string;
            /** @example string */
            readonly SignatureAlgorithm?: string;
            /** @example string */
            readonly Validity?: string;
            /** @example string */
            readonly SubjectDN?: string;
            /** @example string */
            readonly IssuerDN?: string;
            /** Format: int32 */
            readonly Version?: number;
            /** @example string */
            readonly FingerprintSha1?: string;
            /** @example string */
            readonly FingerprintSha256?: string;
            /** @example string */
            readonly FingerprintSha512?: string;
            /** @example string */
            readonly Type?: string;
            /** @example string */
            readonly Owner?: string;
            /** @example string */
            readonly LastModifiedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly LastModifiedTime?: string;
            /** @example string */
            readonly CreatedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly CreatedTime?: string;
            /** @example string */
            readonly Status?: string;
            /** Collection of ChainCertificate */
            readonly ChainCertificates?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.ChainCertificate"][];
            };
            readonly Certificate?: components["schemas"]["com.sap.hci.api.CertificateResource"];
            readonly Sshkey?: components["schemas"]["com.sap.hci.api.SSHKeyResource"];
            readonly Keystore?: components["schemas"]["com.sap.hci.api.Keystore"];
            readonly ChainResource?: components["schemas"]["com.sap.hci.api.CertificateChainResource"];
            readonly SigningRequest?: components["schemas"]["com.sap.hci.api.CertificateSigningRequest"];
        };
        /** Keystore */
        readonly "com.sap.hci.api.Keystore": {
            readonly Name?: string;
            /** @example string */
            readonly LastModifiedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly LastModifiedTime?: string;
            /** Format: int32 */
            readonly Size?: number;
            /** Collection of KeystoreEntry */
            readonly Entries?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.KeystoreEntry"][];
            };
        };
        /** Keystore (for create) */
        readonly "com.sap.hci.api.Keystore-create": {
            readonly Name: string;
            /** @example string */
            readonly LastModifiedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly LastModifiedTime?: string;
            /** Format: int32 */
            readonly Size?: number;
            /** Collection of KeystoreEntry */
            readonly Entries?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.KeystoreEntry-create"][];
            };
        };
        /** Keystore (for update) */
        readonly "com.sap.hci.api.Keystore-update": {
            /** @example string */
            readonly LastModifiedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly LastModifiedTime?: string;
            /** Format: int32 */
            readonly Size?: number;
        };
        /** CertificateResource */
        readonly "com.sap.hci.api.CertificateResource": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias"] & {
            readonly KeystoreEntry?: components["schemas"]["com.sap.hci.api.KeystoreEntry"];
        };
        /** CertificateResource (for create) */
        readonly "com.sap.hci.api.CertificateResource-create": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias-create"] & {
            readonly KeystoreEntry?: components["schemas"]["com.sap.hci.api.KeystoreEntry-create"];
        };
        /** CertificateResource (for update) */
        readonly "com.sap.hci.api.CertificateResource-update": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias-update"] & Record<string, never>;
        /** CertificateSigningRequest */
        readonly "com.sap.hci.api.CertificateSigningRequest": {
            readonly Hexalias?: string;
            readonly KeystoreEntry?: components["schemas"]["com.sap.hci.api.KeystoreEntry"];
        };
        /** CertificateSigningRequest (for create) */
        readonly "com.sap.hci.api.CertificateSigningRequest-create": {
            readonly Hexalias: string;
            readonly KeystoreEntry?: components["schemas"]["com.sap.hci.api.KeystoreEntry-create"];
        };
        /** CertificateSigningRequest (for update) */
        readonly "com.sap.hci.api.CertificateSigningRequest-update": Record<string, never>;
        /** KeystoreEntryCertificatePart */
        readonly "com.sap.hci.api.KeystoreEntryCertificatePart": components["schemas"]["com.sap.hci.api.KeystoreEntryCertificatePartBase"] & {
            /** @example string */
            readonly Validity?: string;
            /** @example string */
            readonly SubjectDN?: string;
            /** @example string */
            readonly IssuerDN?: string;
            /** Format: int32 */
            readonly Version?: number;
            /** @example string */
            readonly FingerprintSha1?: string;
            /** @example string */
            readonly FingerprintSha256?: string;
            /** @example string */
            readonly FingerprintSha512?: string;
        };
        /** KeystoreEntryCertificatePart (for update) */
        readonly "com.sap.hci.api.KeystoreEntryCertificatePart-update": components["schemas"]["com.sap.hci.api.KeystoreEntryCertificatePartBase-update"] & {
            /** @example string */
            readonly Validity?: string;
            /** @example string */
            readonly SubjectDN?: string;
            /** @example string */
            readonly IssuerDN?: string;
            /** Format: int32 */
            readonly Version?: number;
            /** @example string */
            readonly FingerprintSha1?: string;
            /** @example string */
            readonly FingerprintSha256?: string;
            /** @example string */
            readonly FingerprintSha512?: string;
        };
        /** KeystoreEntryCertificatePart (for create) */
        readonly "com.sap.hci.api.KeystoreEntryCertificatePart-create": components["schemas"]["com.sap.hci.api.KeystoreEntryCertificatePartBase-create"] & {
            /** @example string */
            readonly Validity?: string;
            /** @example string */
            readonly SubjectDN?: string;
            /** @example string */
            readonly IssuerDN?: string;
            /** Format: int32 */
            readonly Version?: number;
            /** @example string */
            readonly FingerprintSha1?: string;
            /** @example string */
            readonly FingerprintSha256?: string;
            /** @example string */
            readonly FingerprintSha512?: string;
        };
        /** KeyPairGenerationRequest */
        readonly "com.sap.hci.api.KeyPairGenerationRequest": components["schemas"]["com.sap.hci.api.KeystoreEntryCertificatePartBase"] & {
            /** @example string */
            readonly KeyAlgorithmParameter?: string;
            /** @example string */
            readonly CommonName?: string;
            /** @example string */
            readonly OrganizationUnit?: string;
            /** @example string */
            readonly Organization?: string;
            /** @example string */
            readonly Locality?: string;
            /** @example string */
            readonly State?: string;
            /** @example string */
            readonly Country?: string;
            /** @example string */
            readonly Email?: string;
        };
        /** KeyPairGenerationRequest (for create) */
        readonly "com.sap.hci.api.KeyPairGenerationRequest-create": {
            readonly Hexalias?: string;
            readonly Alias?: string;
            /** @example RSA */
            readonly KeyType?: string;
            /** @example SHA256/RSA */
            readonly SignatureAlgorithm?: string;
            /**
             * Format: int32
             * @example 2048
             */
            readonly KeySize?: number;
            /** @example string */
            readonly CommonName?: string;
            /** @example string */
            readonly OrganizationUnit?: string;
            /** @example string */
            readonly Organization?: string;
            /** @example string */
            readonly Locality?: string;
            /** @example string */
            readonly State?: string;
            /** @example string */
            readonly Country?: string;
            /** @example string */
            readonly Email?: string;
            /** @example /Date(1562673915367)/ */
            readonly ValidNotBefore?: string;
            /** @example /Date(1662673915367)/ */
            readonly ValidNotAfter?: string;
        };
        /** KeyPairGenerationRequest (for update) */
        readonly "com.sap.hci.api.KeyPairGenerationRequest-update": components["schemas"]["com.sap.hci.api.KeystoreEntryCertificatePartBase-update"] & {
            /** @example string */
            readonly KeyAlgorithmParameter?: string;
            /** @example string */
            readonly CommonName?: string;
            /** @example string */
            readonly OrganizationUnit?: string;
            /** @example string */
            readonly Organization?: string;
            /** @example string */
            readonly Locality?: string;
            /** @example string */
            readonly State?: string;
            /** @example string */
            readonly Country?: string;
            /** @example string */
            readonly Email?: string;
        };
        /** KeyPairResource (for create) */
        readonly "com.sap.hci.api.KeyPairResource-create": components["schemas"]["com.sap.hci.api.KeystoreEntryAlias-create"] & {
            /** Format: binary */
            readonly Resource?: string;
            /** @example string */
            readonly Password?: string;
        };
        /** KeyPairResource (for update) */
        readonly "com.sap.hci.api.KeyPairResource-update": {
            /** @example any dummy hex encoded value */
            readonly Hexalias?: string;
            readonly Alias?: string;
            /** @example string */
            readonly Password?: string;
            /**
             * Format: binary
             * @example base64 encoded PKCS#12 binary
             */
            readonly Resource?: string;
        };
        /** ChainCertificate */
        readonly "com.sap.hci.api.ChainCertificate": {
            readonly Hexalias?: string;
            readonly Alias?: string;
            /** Format: int32 */
            readonly Index?: number;
            /** @example string */
            readonly Validity?: string;
            /** @example string */
            readonly KeyType?: string;
            /** Format: int32 */
            readonly KeySize?: number;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotBefore?: string;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotAfter?: string;
            /** @example string */
            readonly SubjectDN?: string;
            /** @example string */
            readonly IssuerDN?: string;
            /** @example string */
            readonly SerialNumber?: string;
            /** @example string */
            readonly SignatureAlgorithm?: string;
            /** Format: int32 */
            readonly Version?: number;
            /** @example string */
            readonly FingerprintSha1?: string;
            /** @example string */
            readonly FingerprintSha256?: string;
            /** @example string */
            readonly FingerprintSha512?: string;
            readonly KeystoreEntry?: components["schemas"]["com.sap.hci.api.KeystoreEntry"];
        };
        /** ChainCertificate */
        readonly "com.sap.hci.api.ChainCertificate-create": {
            readonly Hexalias: string;
            readonly Alias?: string;
            /** Format: int32 */
            readonly Index: number;
            /** @example string */
            readonly Validity?: string;
            /** @example string */
            readonly KeyType?: string;
            /** Format: int32 */
            readonly KeySize?: number;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotBefore?: string;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotAfter?: string;
            /** @example string */
            readonly SubjectDN?: string;
            /** @example string */
            readonly IssuerDN?: string;
            /** @example string */
            readonly SerialNumber?: string;
            /** @example string */
            readonly SignatureAlgorithm?: string;
            /** Format: int32 */
            readonly Version?: number;
            /** @example string */
            readonly FingerprintSha1?: string;
            /** @example string */
            readonly FingerprintSha256?: string;
            /** @example string */
            readonly FingerprintSha512?: string;
            readonly KeystoreEntry?: components["schemas"]["com.sap.hci.api.KeystoreEntry-create"];
        };
        /** ChainCertificate (for update) */
        readonly "com.sap.hci.api.ChainCertificate-update": {
            readonly Alias?: string;
            /** @example string */
            readonly Validity?: string;
            /** @example string */
            readonly KeyType?: string;
            /** Format: int32 */
            readonly KeySize?: number;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotBefore?: string;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotAfter?: string;
            /** @example string */
            readonly SubjectDN?: string;
            /** @example string */
            readonly IssuerDN?: string;
            /** @example string */
            readonly SerialNumber?: string;
            /** @example string */
            readonly SignatureAlgorithm?: string;
            /** Format: int32 */
            readonly Version?: number;
            /** @example string */
            readonly FingerprintSha1?: string;
            /** @example string */
            readonly FingerprintSha256?: string;
            /** @example string */
            readonly FingerprintSha512?: string;
        };
        /** SSHKeyGenerationRequest (for create) */
        readonly "com.sap.hci.api.SSHKeyGenerationRequest-create": {
            readonly Alias?: string;
            /** @example string */
            readonly SSHFile?: string;
            /** @example string */
            readonly Password?: string;
            /** @example string */
            readonly CommonName?: string;
            /** @example string */
            readonly OrganizationUnit?: string;
            /** @example string */
            readonly Organization?: string;
            /** @example string */
            readonly Locality?: string;
            /** @example string */
            readonly State?: string;
            /** @example string */
            readonly Country?: string;
            /** @example string */
            readonly Email?: string;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotBefore?: string;
            /** @example /Date(1492098664000)/ */
            readonly ValidNotAfter?: string;
        };
        /** SSHKeyGenerationRequest (response) */
        readonly "com.sap.hci.api.SSHKeyGenerationRequest-create_response": {
            readonly Alias?: string;
        };
        /** UserCredential */
        readonly "com.sap.hci.api.UserCredential": {
            /** @example credentials name */
            readonly Name?: string;
            /** @example default, successfactors or openconnectors */
            readonly Kind?: string;
            /** @example description */
            readonly Description?: string;
            /** @example user */
            readonly User?: string;
            /** @example password */
            readonly Password?: string;
            /** @example successfactors: company ID */
            readonly CompanyId?: string;
            readonly SecurityArtifactDescriptor?: components["schemas"]["com.sap.hci.api.SecurityArtifactDescriptor"];
        };
        /** RSAKeyGenerationRequest (for create) */
        readonly "com.sap.hci.api.RSAKeyGenerationRequest-create": {
            /** @example AB */
            readonly Hexalias?: string;
            /** @example testRSA */
            readonly Alias?: string;
            /** @example string */
            readonly RSAFile?: string;
            /** @example SHA256/RSA */
            readonly SignatureAlgorithm?: string;
            /** @example string */
            readonly CommonName?: string;
            /** @example string */
            readonly OrganizationUnit?: string;
            /** @example string */
            readonly Organization?: string;
            /** @example string */
            readonly Locality?: string;
            /** @example string */
            readonly State?: string;
            /** @example string */
            readonly Country?: string;
            /** @example string */
            readonly Email?: string;
            /** @example /Date(1562673915367)/ */
            readonly ValidNotBefore?: string;
            /** @example /Date(1662673915367)/ */
            readonly ValidNotAfter?: string;
        };
        /** UserCredential (for create) */
        readonly "com.sap.hci.api.UserCredential-create": {
            /** @example credentials name */
            readonly Name: string;
            /** @example default, successfactors or openconnectors */
            readonly Kind: string;
            /** @example descrption */
            readonly Description?: string;
            /** @example user */
            readonly User?: string;
            /** @example password */
            readonly Password?: string;
            /** @example successfactors: company ID */
            readonly CompanyId?: string;
        };
        /** UserCredential (for update) */
        readonly "com.sap.hci.api.UserCredential-update": {
            /** @example credentials name */
            readonly Name?: string;
            /** @example default, successfactors or openconnectors */
            readonly Kind?: string;
            /** @example description */
            readonly Description?: string;
            /** @example user */
            readonly User?: string;
            /** @example password */
            readonly Password?: string;
            /** @example successfactors: company ID */
            readonly CompanyId?: string;
        };
        /** SecureParameter */
        readonly "com.sap.hci.api.SecureParameter": {
            /** @example secure parameters artifact name */
            readonly Name?: string;
            /** @example description */
            readonly Description?: string;
            /** @example value */
            readonly SecureParam?: string;
            readonly DeployedBy?: string;
            /**
             * Format: date-time
             * @example /Date(1687242561034)/
             */
            readonly DeployedOn?: string;
            readonly Status?: string;
        };
        /** SecureParameter (for create) */
        readonly "com.sap.hci.api.SecureParameter-create": {
            /** @example secure parameters artifact name */
            readonly Name: string;
            /** @example description */
            readonly Description?: string;
            /** @example value */
            readonly SecureParam: string;
        };
        /** SecureParameter (for update) */
        readonly "com.sap.hci.api.SecureParameter-update": {
            /** @example secure parameters artifact name */
            readonly Name?: string;
            /** @example description */
            readonly Description?: string;
            /** @example value */
            readonly SecureParam?: string;
        };
        /** CertificateUserMapping */
        readonly "com.sap.hci.api.CertificateUserMapping": {
            readonly Id?: string;
            readonly User?: string;
            /** Format: binary */
            readonly Certificate?: string;
            /** @example string */
            readonly LastModifiedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly LastModifiedTime?: string;
            /** @example string */
            readonly CreatedBy?: string;
            /** @example /Date(1492098664000)/ */
            readonly CreatedTime?: string;
            /** Format: int64 */
            readonly ValidUntil?: number;
        };
        /** CertificateUserMapping (for create) */
        readonly "com.sap.hci.api.CertificateUserMapping-create": {
            /** @example user */
            readonly User?: string;
            /**
             * Format: binary
             * @example certificate in base64 encoded PEM-DER format
             */
            readonly Certificate?: string;
        };
        /** CertificateUserMapping (for update) */
        readonly "com.sap.hci.api.CertificateUserMapping-update": {
            readonly User?: string;
            /** Format: binary */
            readonly Certificate?: string;
        };
        /** OAuth2ClientCredential */
        readonly "com.sap.hci.api.OAuth2ClientCredential": {
            readonly Name?: string;
            readonly Description?: string;
            readonly TokenServiceUrl?: string;
            readonly ClientId?: string;
            readonly ClientSecret?: string;
            readonly ClientAuthentication?: string;
            readonly Scope?: string;
            readonly ScopeContentType?: string;
            readonly Resource?: string;
            readonly Audience?: string;
            readonly SecurityArtifactDescriptor?: components["schemas"]["com.sap.hci.api.SecurityArtifactDescriptor"];
        };
        /** OAuth2ClientCredential (for create) */
        readonly "com.sap.hci.api.OAuth2ClientCredential-create": {
            readonly Name: string;
            readonly Description?: string;
            readonly TokenServiceUrl?: string;
            readonly ClientId?: string;
            readonly ClientSecret?: string;
            /** @example body (default) or header */
            readonly ClientAuthentication?: string;
            readonly Scope?: string;
            /** @example urlencoded (default) or json */
            readonly ScopeContentType?: string;
            readonly Resource?: string;
            readonly Audience?: string;
            readonly CustomParameters?: readonly components["schemas"]["com.sap.hci.api.OAuth2ClientCredentialCustomParameters"][];
        };
        /** OAuth2ClientCredential (for update) */
        readonly "com.sap.hci.api.OAuth2ClientCredential-update": {
            readonly Name?: string;
            readonly Description?: string;
            readonly TokenServiceUrl?: string;
            readonly ClientId?: string;
            readonly ClientSecret?: string;
            readonly ClientAuthentication?: string;
            readonly Scope?: string;
            readonly ScopeContentType?: string;
            readonly Resource?: string;
            readonly Audience?: string;
        };
        /** OAuth2ClientCredentialCustomParameters */
        readonly "com.sap.hci.api.OAuth2ClientCredentialCustomParameters": {
            readonly Key?: string;
            readonly Value?: string;
            /** @example body or url */
            readonly SendAsPartOf?: string;
        };
        /** SecurityArtifactDescriptor */
        readonly "com.sap.hci.api.SecurityArtifactDescriptor": {
            readonly Type?: string;
            readonly DeployedBy?: string;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly DeployedOn?: string;
            readonly Status?: string;
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
        /** AccessPolicy */
        readonly "com.sap.hci.api.AccessPolicy": {
            readonly Id?: string;
            readonly RoleName?: string;
            readonly Description?: string;
        };
        /** AccessPolicy-create */
        readonly "com.sap.hci.api.AccessPolicy-create": {
            /** @example AccessPolicy1 */
            readonly RoleName?: string;
            /** @example Description */
            readonly Description?: string;
            readonly ArtifactReferences?: readonly components["schemas"]["com.sap.hci.api.ArtifactReference-create"][];
        };
        /** ArtifactReference-create */
        readonly "com.sap.hci.api.ArtifactReference-create": {
            /** @example ArtifactReference1 */
            readonly Name?: string;
            /** @example Description */
            readonly Description?: string;
            /** @example INTEGRATION_FLOW */
            readonly Type?: string;
            /** @example Name */
            readonly ConditionAttribute?: string;
            /** @example Iflow1 */
            readonly ConditionValue?: string;
            /** @example exactString */
            readonly ConditionType?: string;
        };
        /** ArtifactReference-createsep */
        readonly "com.sap.hci.api.ArtifactReference-createsep": {
            /** @example ArtifactReference2 */
            readonly Name?: string;
            /** @example Description */
            readonly Description?: string;
            /** @example INTEGRATION_FLOW */
            readonly Type?: string;
            /** @example Name */
            readonly ConditionAttribute?: string;
            /** @example Iflow2 */
            readonly ConditionValue?: string;
            /** @example exactString */
            readonly ConditionType?: string;
            /**
             * @example [
             *       {
             *         "Id": "101"
             *       }
             *     ]
             */
            readonly AcessPolicy?: Record<string, never>;
        };
        /** ArtifactReference */
        readonly "com.sap.hci.api.ArtifactReference": {
            /** @example ArtifactReference1 */
            readonly Id?: string;
            /** @example ArtifactReference1 */
            readonly Name?: string;
            /** @example Description */
            readonly Description?: string;
            readonly Type?: readonly ("INTEGRATION_FLOW" | "ODATA_SERVICE" | "SCRIPT_COLLECTION" | "VALUE_MAPPING" | "MESSAGE_MAPPING" | "MESSAGE_QUEUE" | "GLOBAL_DATASTORE" | "GLOBAL_VARIABLE" | "SOAP_API_PROVIDER" | "REST_API_PROVIDER" | "DATA_TYPE" | "MESSAGE_TYPE")[];
            readonly ConditionAttribute?: readonly ("Name" | "ID")[];
            /** @example Iflow1 */
            readonly ConditionValue?: string;
            readonly ConditionType?: readonly ("exactString" | "regularExpression")[];
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
        /** @description Filter items by property values. */
        readonly filter: string;
    };
    requestBodies: {
        /** @description Body needs to contain ```{"Status":null}``` */
        readonly "com.sap.hci.api.KeystoreEntry-Rename": {
            readonly content: {
                readonly "application/json": components["schemas"]["com.sap.hci.api.KeystoreEntry-Rename"];
            };
        };
    };
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
