export type paths = {
    readonly "/queues": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get Queues
         * @description Get settings and information for all queues
         */
        readonly get: operations["getQueues"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/queues/{queue}": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get Queue
         * @description Get settings and information for a queue
         */
        readonly get: operations["getQueue"];
        /**
         * Create / Update Queue
         * @description Creates or updates a queue by the parameters specified in the request body. When this API is called on an existing queue, only parameters in the request body are updated. The queue name (path segment/parameter) must be URL encoded.
         */
        readonly put: operations["putQueue"];
        readonly post?: never;
        /**
         * Delete Queue
         * @description Deletes a queue by the name given in the parameters. The queue name (path segment/parameter) must be URL encoded.
         */
        readonly delete: operations["deleteQueue"];
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/queues/{queue}/purge": {
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
         * Purge Queue
         * @description Clear all messages from a queue
         */
        readonly delete: operations["purgeQueue"];
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/queues/{queue}/subscriptions": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get Queue Subscriptions
         * @description Get list of queue subscriptions of a given queue name. The queue name (path segment/parameter) must be URL encoded.
         */
        readonly get: operations["getQueueSubscriptions"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/queues/{queue}/subscriptions/{topic}": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        /**
         * Create / Update Queue Subscriptions
         * @description Creates or updates a queue subscription. The queue name and topic pattern (path segment/parameter) must be URL encoded.
         */
        readonly put: operations["putQueueSubscription"];
        readonly post?: never;
        /**
         * Delete Queue Subscription
         * @description Deletes given queue subscription. The queue name and topic pattern (path segment/parameter) must be URL encoded.
         */
        readonly delete: operations["deleteQueueSubscription"];
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/subscriptions": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all subscriptions
         * @description Returns list of all webhook subscriptions and their properties.
         */
        readonly get: operations["getWebhookSubscriptions"];
        readonly put?: never;
        /**
         * Create subscription
         * @description Creates a webhook subscription on specified queue. Messages published to the queue are delivered to the webhook.
         */
        readonly post: operations["createWebhookSubscription"];
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/subscriptions/{subscription-name}": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Subscription name */
                readonly "subscription-name": string;
            };
            readonly cookie?: never;
        };
        /**
         * Get subscription by name
         * @description Returns a webhook subscriptions and properties by name.
         */
        readonly get: operations["getWebhookSubscription"];
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete subscription by name
         * @description Deletes a webhook subscription by name.
         */
        readonly delete: operations["deleteWebhookSubscription"];
        readonly options?: never;
        readonly head?: never;
        /**
         * Update subscription's security schema
         * @description Updates given webhook's security schema. This operation is allowed only when webhook is paused. Also allowed only when previous update operation is completed.
         */
        readonly patch: operations["updateWebhookSubscriptionSecuritySchema"];
        readonly trace?: never;
    };
    readonly "/subscriptions/{subscription-name}/handshake": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Subscription name */
                readonly "subscription-name": string;
            };
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Trigger a handshake request to subscription's webhook endpoint
         * @description This API is useful in case handshake request at webhook creation time failed. Note this can change the state of webhook subscription depending on the response to the latest handshake request to webhook.
         */
        readonly post: operations["triggerWebhookHandshake"];
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/subscriptions/{subscription-name}/state": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Subscription name */
                readonly "subscription-name": string;
            };
            readonly cookie?: never;
        };
        readonly get?: never;
        /**
         * PUT webhook state
         * @description Pause or Resume a webhook
         */
        readonly put: operations["putWebhookState"];
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/webhook-credentials": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all uploaded webhook credentials.
         * @description Gets list of all webhook credentials. Passwords, secrets, keys are not provided in the response.
         */
        readonly get: operations["getWebhookCredentials"];
        readonly put?: never;
        /**
         * Upload webhook credentials.
         * @description Stores the credentials in the service. The uploaded credentials can be used in security schema of one or more webhooks, by referring to credentials name. Certificates & keys must be provided in PEM format with \n for newline character.
         */
        readonly post: operations["uploadWebhookCredentials"];
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/webhook-credentials/{credential-name}": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Name of the credentials that was previously uploaded to service. */
                readonly "credential-name": string;
            };
            readonly cookie?: never;
        };
        /**
         * Get webhook credentials by name.
         * @description Gets the credentials by name. Passwords, secrets, api key values are not provided in the response.
         */
        readonly get: operations["getWebhookCredential"];
        /**
         * Update credentials by name.
         * @description Updates the credentials by name in the service. The credentials are updated immediately. The webhooks that use given credentials are paused and resumed. To check which webhooks are using given credentials & status of webhook do GET on the credentials status API.
         */
        readonly put: operations["updateWebhookCredential"];
        readonly post?: never;
        /**
         * Delete credentials.
         * @description Deletes the credentials in the service. Deletion is possible only if no webhook is using this credentials.
         */
        readonly delete: operations["deleteWebhookCredential"];
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/webhook-credentials/{credential-name}/status": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Name of the credentials that was previously uploaded to service. */
                readonly "credential-name": string;
            };
            readonly cookie?: never;
        };
        /**
         * Get list and status of all webhooks that use given credential name.
         * @description Gets status of all webhooks that use the given credential name. The response contains active/paused state of webhook and if the webhook is running with the latest update of credentials or not.
         */
        readonly get: operations["getWebhookCredentialStatus"];
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
        /** Queue */
        readonly Queue: {
            /**
             * @description A queue has an access type, which determines how messages are delivered when multiple consumer flows are bound to it. Queues can be assigned one of the following access types
             *     EXCLUSIVE: Only one consumer can receive a message at any one time, while additional consumers may be connected as standby. That is, only one flow can be active. Only the first consumer to bind can receive messages. If the first consumer disconnects, the second consumer receives data, and so on. An exclusive queue always delivers messages in the order they are received.
             *     NON_EXCLUSIVE: Multiple consumers can bind to a non-exclusive queue. Each consumer is serviced in round-robin fashion. This provides load-balancing; however, if a connection fails, then unacknowledged messages are delivered to another consumer with the re-delivered flag set. In this way, messages can be delivered to consumers out of order.
             *     The access type can be changed for a durable queue, but only when client access to the queue has been disabled.
             *     The default value is: NON_EXCLUSIVE.
             * @example EXCLUSIVE
             * @enum {string}
             */
            readonly accessType?: "EXCLUSIVE" | "NON_EXCLUSIVE";
            /**
             * Format: int64
             * @description Maximum number of unacknowledged messages allowed in the queue. The default value is: 10000.
             */
            readonly maxDeliveredUnackedMsgsPerFlow?: number;
            /**
             * Format: int64
             * @description Maximum message size allowed in the queue (in bytes). The default value is: 10000000.
             */
            readonly maxMessageSizeInBytes?: number;
            /**
             * Format: int64
             * @description Maximum allowed queue size (in bytes).
             *     The default value is: 1572864000 in (binary) which equates to  1500 megabytes.
             *     The value will always be rounded(ceiling) to a multiple of 1048576.
             *     1048576 equates to 1 megabyte.
             */
            readonly maxQueueSizeInBytes?: number;
            /**
             * Format: int64
             * @description This property is applicable only when AMQP 1.0 is used. When messages are consumed with AMQP 1.0 protocol, client can reject a message delivered from queue. In such case the message is redelivered to the client. This property determines maximum number of times the queue attempts redelivery of a message. After maximum redelivery count is reached, the message is moved to the queue that is set as dead message queue for this queue. If dead message queue is not specified, the message is discarded after maximum redelivery count is reached. See property deadMessageQueue for how to specify dead message queue.
             * @default 0
             */
            readonly maxRedeliveryCount: number;
            /**
             * Format: int64
             * @description Maximum time in seconds a message can stay in the queue when respectTtl option enabled for queue. A message expires when the lesser of the sender assigned time-to-live (TTL) in the message and the maxTtl configured for the queue is exceeded. The expired message is moved the queue that is set as dead message queue for this queue. If dead message queue is not specified, the message is discarded after expiry. See property deadMsgQueue for how to specify dead message queue. A value of 0 for this property disables expiry.
             * @default 0
             */
            readonly maxTtl: number;
            /** @description A queue can be created or updated with dead message queue using this property.  Value of deadMsgQueue is name of another queue. Expired messages or messages that reach maximum redelivery count are moved to dead message queue. See properties maxRedeliveryCount and maxTtl for details. */
            readonly deadMsgQueue?: string;
            /**
             * @description Name of the queue.
             * @example samplequeue
             */
            readonly name: string;
            /**
             * Format: int64
             * @description Current number of messages residing in the queue.
             */
            readonly messageCount?: number;
            /**
             * Format: int64
             * @description Total size of messages in the queue (in bytes).
             */
            readonly queueSizeInBytes?: number;
            /**
             * Format: int64
             * @description Total count of unacknowledged messages in the queue.
             */
            readonly unacknowledgedMessageCount?: number;
        };
        /** QueueP */
        readonly QueueP: {
            /**
             * @description A queue has an access type, which determines how messages are delivered when multiple consumer flows are bound to it. Queues can be assigned one of the following access types
             *     EXCLUSIVE: Only one consumer can receive a message at any one time, while additional consumers may be connected as standby. That is, only one flow can be active. Only the first consumer to bind can receive messages. If the first consumer disconnects, the second consumer receives data, and so on. An exclusive queue always delivers messages in the order they are received.
             *     NON_EXCLUSIVE: Multiple consumers can bind to a non-exclusive queue. Each consumer is serviced in round-robin fashion. This provides load-balancing; however, if a connection fails, then unacknowledged messages are delivered to another consumer with the re-delivered flag set. In this way, messages can be delivered to consumers out of order.
             *     The access type can be changed for a durable queue, but only when client access to the queue has been disabled.
             *     The default value is: NON_EXCLUSIVE.
             * @default NON_EXCLUSIVE
             * @example EXCLUSIVE
             * @enum {string}
             */
            readonly accessType: "EXCLUSIVE" | "NON_EXCLUSIVE";
            /**
             * Format: int64
             * @description Maximum number of unacknowledged messages allowed in the queue. The default value is: 10000.
             * @default 10000
             */
            readonly maxDeliveredUnackedMsgsPerFlow: number;
            /**
             * Format: int64
             * @description Maximum message size allowed in the queue (in bytes). The default value is: 10000000.
             * @default 10000000
             */
            readonly maxMessageSizeInBytes: number;
            /**
             * Format: int64
             * @description Maximum allowed queue size (in bytes).
             *     The default value is: 1572864000 in (binary) which equates to 1500 megabytes.
             *     The value will always be rounded(ceiling) to a multiple of 1048576.
             *     1048576 bytes equates to 1 megabyte.
             *     minimum value is equal to 1 megabyte.
             *     maximum value is equal to 6000000 megabytes (with consideration of ceiling result)
             * @default 1572864000
             */
            readonly maxQueueSizeInBytes: number;
            /**
             * @description This field does not take effect currently. respectTtl is always enabled now.
             *     Enable or disable the respecting of the "time to live" (TTL). If enabled, then messages contained in the Queue are checked for expiry. If expired, the message is removed from the Queue and discarded. The default value is `true`
             * @default true
             */
            readonly respectTtl: boolean;
            /**
             * Format: int64
             * @description This property is applicable only when AMQP 1.0 is used. When messages are consumed with AMQP 1.0 protocol, client can reject a message delivered from queue. In such case the message is redelivered to the client. This property determines maximum number of times the queue attempts redelivery of a message. After maximum redelivery count is reached, the message is moved to the queue that is set as dead message queue for this queue. If dead message queue is not specified, the message is discarded after maximum redelivery count is reached. See property deadMessageQueue for how to specify dead message queue.
             * @default 0
             */
            readonly maxRedeliveryCount: number;
            /**
             * Format: int64
             * @description Maximum time in seconds a message can stay in the queue when respectTtl option enabled for queue. A message expires when the lesser of the sender assigned time-to-live (TTL) in the message and the maxTtl configured for the queue is exceeded. The expired message is moved the queue that is set as dead message queue for this queue. If dead message queue is not specified, the message is discarded after expiry. See property deadMsgQueue for how to specify dead message queue.
             * @default 2592000
             */
            readonly maxTtl: number;
            /** @description A queue can be created or updated with dead message queue using this property.  Value of deadMsgQueue is name of another queue. Expired messages or messages that reach maximum redelivery count are moved to dead message queue. See properties maxRedeliveryCount and maxTtl for details. */
            readonly deadMsgQueue?: string;
            /**
             * @description This field does not take effect currently. Egress is always enabled now.
             *     Enable or disable the transmission of messages from the Queue. The default value is false.
             * @default false
             */
            readonly egressDisabled: boolean;
            /**
             * @description This field does not take effect currently. Ingress is always enabled now.
             *     Enable or disable the reception of messages to the Queue. The default value is false.
             * @default false
             */
            readonly ingressDisabled: boolean;
        };
        /** QueueSubscription */
        readonly QueueSubscription: {
            /** @description Topic pattern */
            readonly topicPattern: string;
            /** @description Name of the queue */
            readonly queueName: string;
        };
        /** QueueName */
        readonly QueueName: string;
        /** TopicPattern */
        readonly TopicPattern: string;
        readonly webhookSubscription: {
            readonly name: string;
            readonly address: string;
            /** @enum {integer} */
            readonly qos: 0 | 1;
            readonly pushConfig: components["schemas"]["pushConfig"];
            readonly defaultContentType?: string;
        };
        readonly pushConfig: {
            /** @enum {string} */
            readonly type: "webhook";
            readonly endpoint: string;
            readonly exemptHandshake?: boolean;
            readonly securitySchema?: components["schemas"]["basicAuth"] | components["schemas"]["OAuth2"] | components["schemas"]["OAuth2X509"] | components["schemas"]["x509Auth"] | components["schemas"]["apiKeyAuth"] | components["schemas"]["credentialRef"];
            readonly cloudConnectorLocationId?: string;
            readonly onPremise: boolean;
        };
        readonly credentialRef: {
            /** @enum {string} */
            readonly type: "credential-ref";
            readonly credentialName: string;
        };
        readonly basicAuth: {
            /** @enum {string} */
            readonly type: "basicAuth";
            readonly user: string;
            readonly password: string;
        };
        readonly OAuth2: {
            readonly clientSecret: string;
        } & components["schemas"]["OAuth2Info"];
        readonly OAuth2X509: {
            readonly key: string;
        } & components["schemas"]["OAuth2X509Info"];
        readonly x509Auth: {
            readonly key: string;
        } & components["schemas"]["x509AuthInfo"];
        readonly apiKeyAuth: {
            readonly apiKeyValue: string;
        } & components["schemas"]["apiKeyAuthInfo"];
        readonly basicAuthInfo: {
            /** @enum {string} */
            readonly type: "basicAuth";
            readonly user: string;
        };
        readonly OAuth2BasicInfo: {
            /** @enum {string} */
            readonly grantType: "client_credentials";
            readonly clientId: string;
            readonly tokenUrl: string;
            readonly scopes?: readonly string[];
        };
        readonly OAuth2Info: {
            /** @enum {string} */
            readonly type: "oauth2";
        } & components["schemas"]["OAuth2BasicInfo"];
        readonly OAuth2X509Info: {
            /** @enum {string} */
            readonly type: "oauth2-x509";
            readonly certificate: string;
        } & components["schemas"]["OAuth2BasicInfo"];
        readonly x509AuthInfo: {
            /** @enum {string} */
            readonly type: "x509-auth";
            readonly certificate: string;
        };
        readonly apiKeyAuthInfo: {
            /** @enum {string} */
            readonly type: "api-key-auth";
            /** @enum {string} */
            readonly in: "header" | "query";
            readonly apiKeyName: string;
        };
        readonly webhookSubscriptionCreated: {
            /** Format: uri */
            readonly href?: string;
        };
        readonly errorResponseWebhook: {
            readonly error?: components["schemas"]["errorWebhook"];
            readonly message?: string;
        };
        readonly errorWebhook: {
            readonly code?: string;
            readonly message?: string;
        };
        readonly webhookSubscriptionsList: readonly components["schemas"]["webhookSubscriptionInfo"][];
        readonly webhookSubscriptionInfo: components["schemas"]["webhookSubscriptionResponse"] & {
            /** Format: uuid */
            readonly serviceInstanceId: string;
            /** Format: date-time */
            readonly createdOn: string;
            /** Format: date-time */
            readonly lastUpdatedOn: string;
            /** @enum {string} */
            readonly handshakeStatus: "Not Initiated" | "Requested" | "Completed" | "Failed" | "Exempted";
            /** @enum {string} */
            readonly subscriptionStatus: "Active" | "Paused";
            readonly subscriptionStatusReason: string;
        };
        readonly webhookSubscriptionResponse: {
            readonly name: string;
            readonly address: string;
            /** @enum {integer} */
            readonly qos: 0 | 1;
            readonly pushConfig: components["schemas"]["pushConfigResponse"];
        };
        readonly pushConfigResponse: {
            /** @enum {string} */
            readonly type: "webhook";
            readonly endpoint: string;
            readonly exemptHandshake: boolean;
            readonly securitySchema?: {
                /** @enum {string} */
                readonly type?: "credential-ref";
                readonly credentialName?: string;
            };
            readonly cloudConnectorLocationId: string;
            readonly onPremise: boolean;
        };
        readonly webhooksStatusList: {
            /** Format: date-time */
            readonly credentialLastUpdatedOn: string;
            /** @description This can be an empty array if no webhook is using the given credentials. */
            readonly subscriptions: readonly components["schemas"]["webhooksStatus"][];
        };
        readonly webhooksStatus: {
            /** @description Name of the webhook subscription. */
            readonly name: string;
            /**
             * Format: uri
             * @description Using this href URI details of webhook can be obtained.
             */
            readonly href: string;
            /** @enum {string} */
            readonly status: "active" | "paused" | "inactive";
        };
        readonly errorResponse: {
            readonly error?: components["schemas"]["error"];
        };
        readonly error: {
            readonly code?: string;
            readonly message?: string;
        };
        readonly webhookCredentials: {
            readonly name?: string;
            readonly securitySchema?: components["schemas"]["basicAuth"] | components["schemas"]["OAuth2"] | components["schemas"]["OAuth2X509"] | components["schemas"]["x509Auth"] | components["schemas"]["apiKeyAuth"];
        };
        readonly webhookCredentialsList: {
            readonly results: readonly components["schemas"]["webhookCredentialsInfo"][];
        };
        readonly "credentials-update-response": {
            /**
             * Format: uri
             * @description Using the href URI all webhooks that are using the credentials and their status can be retrieved.
             */
            readonly href: string;
        };
        readonly webhookCredentialsInfo: {
            readonly name: string;
            /** Format: date-time */
            readonly createdOn: string;
            /** Format: date-time */
            readonly lastModifiedOn: string;
            readonly securitySchema: components["schemas"]["basicAuthInfo"] | components["schemas"]["OAuth2Info"] | components["schemas"]["OAuth2X509Info"] | components["schemas"]["x509AuthInfo"] | components["schemas"]["apiKeyAuthInfo"];
        };
        readonly securitySchema: {
            readonly securitySchema?: components["schemas"]["basicAuth"] | components["schemas"]["OAuth2"] | components["schemas"]["OAuth2X509"] | components["schemas"]["x509Auth"] | components["schemas"]["apiKeyAuth"];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export interface operations {
    readonly getQueues: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Ok: Successfully retrieved list of queues */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": readonly components["schemas"]["Queue"][];
                };
            };
            /** @description Unauthorized: if the authorization failed */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Forbidden: if the provided authentication credentials were insufficient */
            readonly 403: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
        };
    };
    readonly getQueue: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Name of the queue (must be URL encoded). For allowed characters & the pattern to be followed for queue name, please refer to the pattern in schema QueueName. */
                readonly queue: string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Ok: successfully retrieved the queue */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["Queue"];
                };
            };
            /** @description Bad Request: if the given parameters have invalid values */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Unauthorized: if the authorization failed */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Forbidden: if the provided authentication credentials were insufficient */
            readonly 403: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Not Found: if the queue was not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
        };
    };
    readonly putQueue: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Name of the queue (must be URL encoded). For allowed characters & the pattern to be followed for queue name, please refer to the pattern in schema QueueName. */
                readonly queue: string;
            };
            readonly cookie?: never;
        };
        /** @description queueConfig */
        readonly requestBody?: {
            readonly content: {
                readonly "application/json": components["schemas"]["QueueP"];
            };
        };
        readonly responses: {
            /** @description Ok: if the queue was successfully updated */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["Queue"];
                };
            };
            /** @description Created: if the queue was successfully created */
            readonly 201: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["Queue"];
                };
            };
            /** @description Bad Request: if the given parameters have invalid values */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Unauthorized: if the authorization failed */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Forbidden: if the provided authentication credentials were insufficient */
            readonly 403: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
        };
    };
    readonly deleteQueue: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Name of the queue (must be URL encoded). For allowed characters & the pattern to be followed for queue name, please refer to the pattern in schema QueueName. */
                readonly queue: string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description No Content: if the queue was successfully deleted */
            readonly 204: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad Request: if the given parameters have invalid values */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Unauthorized: if the authorization failed */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Forbidden: if the provided authentication credentials were insufficient */
            readonly 403: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Not Found: if the queue was not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
        };
    };
    readonly purgeQueue: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Name of the queue (must be URL encoded). For allowed characters & the pattern to be followed for queue name, please refer to the pattern in schema QueueName. */
                readonly queue: string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description No Content: if the queue was successfully purged */
            readonly 204: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad Request: if the given parameters have invalid values */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Unauthorized: if the authorization failed */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Forbidden: if the provided authentication credentials were insufficient */
            readonly 403: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Not Found: if the queue was not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
        };
    };
    readonly getQueueSubscriptions: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Name of the queue (must be URL encoded). For allowed characters & the pattern to be followed for queue name, please refer to the pattern in schema QueueName. */
                readonly queue: string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Response with list of queue subscriptions. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": readonly components["schemas"]["QueueSubscription"][];
                };
            };
            /** @description Bad Request: if the given parameters have invalid values */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Unauthorized: if the authorization failed */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Forbidden: if the provided authentication credentials were insufficient */
            readonly 403: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Not Found:  if the queue was not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
        };
    };
    readonly putQueueSubscription: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Name of the queue (must be URL encoded). For allowed characters & the pattern to be followed for queue name, please refer to the pattern in schema QueueName. */
                readonly queue: string;
                /** @description Topic (Subscription) (must be URL encoded). For allowed characters & the pattern to be followed for topic name, please refer to the pattern in schema TopicName. */
                readonly topic: string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Ok: if the queue subscription was successfully updated */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["QueueSubscription"];
                };
            };
            /** @description Created: if the queue subscription was successfully created */
            readonly 201: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["QueueSubscription"];
                };
            };
            /** @description Bad Request: if the given parameters have invalid values */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Unauthorized: if the authorization failed */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Forbidden: if the provided authentication credentials were insufficient */
            readonly 403: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Not Found: if the queue was not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
        };
    };
    readonly deleteQueueSubscription: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Name of the queue (must be URL encoded). For allowed characters & the pattern to be followed for queue name, please refer to the pattern in schema QueueName. */
                readonly queue: string;
                /** @description Topic (Subscription) (must be URL encoded). For allowed characters & the pattern to be followed for topic name, please refer to the pattern in schema TopicName. */
                readonly topic: string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description No Content: if the queue subscription was successfully deleted */
            readonly 204: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad Request: if the given parameters have invalid values */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Unauthorized: if the authorization failed */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Forbidden: if the provided authentication credentials were insufficient */
            readonly 403: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
            /** @description Not Found: if the queue or queue subscription was not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["error"];
                };
            };
        };
    };
    readonly getWebhookSubscriptions: {
        readonly parameters: {
            readonly query?: {
                /** @description Filter subscriptions on queue name */
                readonly "queue-name"?: string;
            };
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description List of all subscriptions, or an empty array if none exists. Credentials are omitted. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["webhookSubscriptionsList"];
                };
            };
            /** @description In case of invalid credentials */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description Internal Server Error */
            readonly 500: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
        };
    };
    readonly createWebhookSubscription: {
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
                readonly "application/json": components["schemas"]["webhookSubscription"];
            };
        };
        readonly responses: {
            /** @description Accepted */
            readonly 202: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["webhookSubscriptionCreated"];
                };
            };
            /** @description For invalid payload */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description In case of invalid credentials */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description For duplicate subscription name */
            readonly 409: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description Internal Server Error */
            readonly 500: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
        };
    };
    readonly getWebhookSubscription: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Subscription name */
                readonly "subscription-name": string;
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
                    readonly "application/json": components["schemas"]["webhookSubscriptionInfo"];
                };
            };
            /** @description For invalid subscription name */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description In case of invalid credentials */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description When no subscription with given name is found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
        };
    };
    readonly deleteWebhookSubscription: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Subscription name */
                readonly "subscription-name": string;
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
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description In case of invalid credentials */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description When no subscription with given name is found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
        };
    };
    readonly updateWebhookSubscriptionSecuritySchema: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Subscription name */
                readonly "subscription-name": string;
            };
            readonly cookie?: never;
        };
        /** @description Updates security schema of the given webhook. */
        readonly requestBody: {
            readonly content: {
                readonly "application/json": components["schemas"]["securitySchema"];
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
            /** @description If given input is not correct or name is not valid */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description In case of invalid credentials */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description If given webhook not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description Internal Server Error */
            readonly 500: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
        };
    };
    readonly triggerWebhookHandshake: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Subscription name */
                readonly "subscription-name": string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Handshake OK */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content?: never;
            };
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
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description In case of invalid credentials */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description When no subscription with given name is found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description Internal Server Error */
            readonly 500: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
        };
    };
    readonly putWebhookState: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Subscription name */
                readonly "subscription-name": string;
            };
            readonly cookie?: never;
        };
        /** @description webhook state */
        readonly requestBody?: {
            readonly content: {
                readonly "application/json": {
                    /** @enum {string} */
                    readonly action: "resume" | "pause";
                };
            };
        };
        readonly responses: {
            /** @description Accepted webhook state change */
            readonly 202: {
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
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description In case of invalid credentials */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description When no subscription with given name is found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
            /** @description Internal Server Error */
            readonly 500: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponseWebhook"];
                };
            };
        };
    };
    readonly getWebhookCredentials: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description List of all credentials, or results will be empty array if none exists. Passwords, secrets, keys are omitted. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["webhookCredentialsList"];
                };
            };
            /** @description In case of auth failure */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description Internal Server Error */
            readonly 500: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
        };
    };
    readonly uploadWebhookCredentials: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /** @description Credential that can be used for webhooks. */
        readonly requestBody: {
            readonly content: {
                readonly "application/json": components["schemas"]["webhookCredentials"];
            };
        };
        readonly responses: {
            /** @description Successfully uploaded credentials */
            readonly 201: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content?: never;
            };
            /** @description For invalid credentials, like missing required property or invalid value for a property */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description In case of auth failure */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description If the credentials with given name already exist. */
            readonly 409: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description Internal Server Error */
            readonly 500: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
        };
    };
    readonly getWebhookCredential: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Name of the credentials that was previously uploaded to service. */
                readonly "credential-name": string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Details of credential with the given name if exists. Passwords, secrets, API key values are omitted in response. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["webhookCredentialsInfo"];
                };
            };
            /** @description In case of auth failure */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description In case of credential with given name not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description Internal Server Error */
            readonly 500: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
        };
    };
    readonly updateWebhookCredential: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Name of the credentials that was previously uploaded to service. */
                readonly "credential-name": string;
            };
            readonly cookie?: never;
        };
        /** @description Updates security schema of the credentials. */
        readonly requestBody: {
            readonly content: {
                readonly "application/json": components["schemas"]["securitySchema"];
            };
        };
        readonly responses: {
            /** @description On successful update of credentials. To know impacted webhooks check the 'Location' header in response. */
            readonly 202: {
                headers: {
                    /** @description To get status of webhooks that use updated credentials. */
                    readonly Location?: string;
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["credentials-update-response"];
                };
            };
            /** @description If given input not correct. */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description In case of auth failure */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description In case of credential with given name not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description Internal Server Error */
            readonly 500: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
        };
    };
    readonly deleteWebhookCredential: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Name of the credentials that was previously uploaded to service. */
                readonly "credential-name": string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Deleted given credential. */
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
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description In case of auth failure */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description In case of credential with given name not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description Internal Server Error */
            readonly 500: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
        };
    };
    readonly getWebhookCredentialStatus: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Name of the credentials that was previously uploaded to service. */
                readonly "credential-name": string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description List of all webhook subscriptions & status that use the given credential name. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["webhooksStatusList"];
                };
            };
            /** @description In case of auth failure */
            readonly 401: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description In case of credential with given name not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
            /** @description Internal Server Error */
            readonly 500: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["errorResponse"];
                };
            };
        };
    };
}
