export type paths = {
    readonly "/ExportContent": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Exports the entire content
         * @description Export the complete content of the system, including custom-created entities.
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
                /** @description Content exported as a zip file. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/zip": string;
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
    readonly "/ImportContent": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Imports the content
         * @description Import the content to the system.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Binary ZIP file containing the content to import */
            readonly requestBody: {
                readonly content: {
                    readonly "application/zip": string;
                };
            };
            readonly responses: {
                /** @description Content imported successfully. */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
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
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        readonly error: {
            readonly error: {
                readonly code: string;
                readonly message: {
                    readonly lang: string;
                    readonly value: string;
                };
            };
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
        /** @description Conflict - Could not import the data due to a conflict with the existing data. See error message for details. */
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
