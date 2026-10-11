export type paths = {
    readonly "/events": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Publish event to service.
         * @description Event should be cloud event, spec version 1.0 compliant and additional restrictions applied. Event can be provided in binary or structured mode. Only json event format is supported for structured mode.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description Specifies if the event is published in structured or binary mode. Use application/cloudevents+json for structured mode. Use any rfc-2046 media type for binary mode. */
                    readonly "Content-Type": "application/cloudevents+json" | "AnyRFC2046ComplaintMediatype";
                    /** @description Content length in bytes */
                    readonly "Content-Length"?: number;
                    /** @description Specifies the cloud events version. Value MUST be 1.0. This MUST be provided when binary mode is used. In case of structured mode this header is ignored. */
                    readonly "ce-specversion"?: "1.0";
                    /** @description MUST be provided when binary mode is used. In case of structured mode this header is ignored. */
                    readonly "ce-source"?: components["schemas"]["ce-source"];
                    /** @description MUST be provided when binary mode is used. In case of structured mode this header is ignored. */
                    readonly "ce-type"?: components["schemas"]["ce-source"];
                    /** @description MUST be provided when binary mode is used. In case of structured mode this header is ignored. */
                    readonly "ce-id"?: string;
                    /** @description Optional, this header is relevant only when binary mode is used. In case of structured mode this header is ignored. */
                    readonly "ce-dataschema"?: string;
                    /** @description Optional, this header is relevant only when binary mode is used. In case of structured mode this header is ignored. */
                    readonly "ce-subject"?: string;
                    /** @description Optional, this header is relevant only when binary mode is used. In case of structured mode this header is ignored. */
                    readonly "ce-time"?: string;
                    /** @description Optional, this header is relevant only when binary mode is used. In case of structured mode this header is ignored. Pattern for extension attribute name is ^[a-z0-9]{1,20}$ */
                    readonly "ce-{extension-attribute-name}"?: string;
                    /** @description Specifies quality of service. Optional, default is AT-LEAST-ONCE. With qos "AT-LEAST-ONCE" the publisher should check the response code and re-publish the events that are failed to publish. */
                    readonly qos?: "AT-MOST-ONCE" | "AT-LEAST-ONCE";
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Event details. */
            readonly requestBody: {
                readonly content: {
                    readonly "application/cloudevents+json": components["schemas"]["cloudEventStructured"];
                    readonly "any-rfc-2046-media-type": string;
                };
            };
            readonly responses: {
                /** @description Event published successfully. */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description In cases invalid cloud event provided */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description In case of invalid credentials */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description In case too many publish requests to the server */
                readonly 429: {
                    headers: {
                        /** @description Client should retry after the number of seconds specified by this header's value */
                        readonly "Retry-After"?: number;
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/events/subscriptions": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get subscriptions
         * @description Get all webhook subscriptions and the settings.
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
                /** @description List of all webhook subscriptions, or an empty array if none exists. Credentials are omitted. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["subscriptionsList"];
                    };
                };
                /** @description In case of invalid credentials */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
            };
        };
        readonly put?: never;
        /**
         * Create webhook subscription on one or more events.
         * @description Create webhook subscription on one or more events. Provide event source & type. You can provide blank value for source if subscription is required for all events for given type. You can provide blank value for type if subscription for all events of the given source is required. Events can be delivered to webhook in either binary or structured content mode.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description Content type */
                    readonly "Content-Type": "application/json";
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            /** @description Subscription details. */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["subscription"];
                };
            };
            readonly responses: {
                /** @description Accepted */
                readonly 202: {
                    headers: {
                        /** @description Relative URL of the subscription. Example: /sap/ems/v1/events/subscriptions/subscription-name */
                        readonly Location?: string;
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description For invalid payload */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description In case of invalid credentails */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description For duplicate subscription name */
                readonly 409: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/events/subscriptions/{subscriptionName}": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Subscription name */
                readonly subscriptionName: string;
            };
            readonly cookie?: never;
        };
        /**
         * Get subscription by name
         * @description Get the webhook subscription and settings by name of the subscription.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Subscription name */
                    readonly subscriptionName: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Subscription details. Credentials are omitted. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["subscriptionInfo"];
                    };
                };
                /** @description For invalid subscription name */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description In case of invalid credentials */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description When no subscription with given name is found */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
            };
        };
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete subscription by name
         * @description Delete the webhook subscription by name of the subscription.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Subscription name */
                    readonly subscriptionName: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Subscription deleted successfully */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description For invalid subscription name */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description In case of invalid credentials */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description When no subscription with given name is found. */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
            };
        };
        readonly options?: never;
        readonly head?: never;
        /**
         * Update subscriptions's auth
         * @description Updates given webhook's auth. This operation is allowed only when webhook is paused. Also allowed only when previous update operation is completed.
         */
        readonly patch: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Subscription name */
                    readonly subscriptionName: string;
                };
                readonly cookie?: never;
            };
            /** @description Updates security schema of the given webhook. */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["webhookAuth"];
                };
            };
            readonly responses: {
                /** @description Successfully updated webhook */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description For invalid subscription name */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description In case of invalid credentials */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description When no subscription with given name is found. */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
            };
        };
        readonly trace?: never;
    };
    readonly "/events/subscriptions/{subscriptionName}/handshake": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Subscription name */
                readonly subscriptionName: string;
            };
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Trigger a handshake request to subscription's webhook endpoint
         * @description Triggers handshake request on the webhook with given name. This API may change the handshake status of the webhook.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Subscription name */
                    readonly subscriptionName: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Handshake triggered */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description For invalid subscription name */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description In case of invalid credentials */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description When no subscription with given name is found */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
            };
        };
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/events/subscriptions/{subscriptionName}/state": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Subscription name */
                readonly subscriptionName: string;
            };
            readonly cookie?: never;
        };
        readonly get?: never;
        /**
         * Update the state of subscription, i.e. pause or resume the subscription
         * @description Subscriptions can be paused or activated with this API. Message delivery is stopped if the subscription is paused.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Subscription name */
                    readonly subscriptionName: string;
                };
                readonly cookie?: never;
            };
            /** @description The desired action to change subscription state. */
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["stateChangeAction"];
                };
            };
            readonly responses: {
                /** @description Subscription paused or resumed */
                readonly 202: {
                    headers: {
                        /** @description Relative URL of the subscription. Example: /sap/ems/v1/events/subscriptions/subscription-name */
                        readonly Location?: string;
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description For invalid subscription name, or if action property is missing */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description In case of invalid credentials. */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description When no subscription with given name is found. */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
                /** @description If handshake is not complete and resume subscription is attempted. */
                readonly 409: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["errorResponse"];
                    };
                };
            };
        };
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
        readonly "ce-source": string;
        readonly "ce-type": string;
        readonly cloudEventStructured: {
            /** @enum {string} */
            readonly specversion: "1.0";
            readonly source: components["schemas"]["ce-source"];
            readonly type: components["schemas"]["ce-type"];
            readonly id: string;
            readonly datacontenttype?: string;
            readonly dataschema?: string;
            readonly subject?: string;
            readonly time?: string;
            readonly data?: Record<string, never>;
            readonly "^[a-z0-9]{1,20}$"?: string;
        };
        readonly errorResponse: {
            readonly error?: components["schemas"]["error"];
        };
        readonly error: {
            readonly code?: string;
            readonly message?: string;
        };
        readonly subscription: {
            readonly name: string;
            readonly events: readonly components["schemas"]["event"][];
            readonly webhookUrl: string;
            readonly webhookAuth?: components["schemas"]["basicAuth"] | components["schemas"]["clientCredentialsAuth"] | components["schemas"]["credentialRef"];
            /** @enum {string} */
            readonly qos?: "AT-MOST-ONCE" | "AT-LEAST-ONCE";
            readonly exemptHandshake?: boolean;
        };
        readonly webhookAuth: {
            readonly webhookAuth?: components["schemas"]["basicAuth"] | components["schemas"]["clientCredentialsAuth"] | components["schemas"]["credentialRef"];
        };
        readonly credentialRef: {
            /** @enum {string} */
            readonly type: "credential-ref";
            readonly credentialName: string;
        };
        readonly basicAuth: {
            /** @enum {string} */
            readonly type: "basic";
            readonly user: string;
            readonly password: string;
        };
        readonly clientCredentialsAuth: {
            /** @enum {string} */
            readonly type: "oAuth2";
            /** @enum {string} */
            readonly grantType: "client_credentials";
            readonly clientId: string;
            readonly clientSecret: string;
            readonly tokenUrl: string;
        };
        readonly subscriptionsList: readonly components["schemas"]["subscriptionInfo"][];
        readonly subscriptionInfo: {
            readonly name?: string;
            readonly events?: readonly components["schemas"]["event"][];
            readonly webhookUrl?: string;
            /** @enum {string} */
            readonly qos?: "AT-MOST-ONCE" | "AT-LEAST-ONCE";
            readonly exemptHandshake?: boolean;
            /** Format: date-time */
            readonly createdOn?: string;
            /** @enum {string} */
            readonly lastUpdateStatus?: "in progress" | "completed" | "failed";
            /** Format: date-time */
            readonly lastUpdatedOn?: string;
            /** @enum {string} */
            readonly handshakeStatus?: "Not Initiated" | "Requested" | "Completed" | "Failed" | "Exempted";
            /** @enum {string} */
            readonly subscriptionStatus?: "Active" | "Paused";
            readonly subscriptionStatusReason?: string;
            /** Format: date-time */
            readonly lastSuccessfulDelivery?: string;
            /** Format: date-time */
            readonly lastFailedDelivery?: string;
            readonly lastFailedDeliveryReason?: string;
        };
        readonly stateChangeAction: {
            /** @enum {string} */
            readonly action: "pause" | "resume";
        };
        readonly event: {
            readonly source?: string;
            readonly type?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
