export type paths = {
    readonly "/messagingrest/v1/messages": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Publish message to a queue or topic based on the x-address header value.
         * @description Message is published to the queue or topic name provided in header.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description Queue or topic address, detail of the queue needs to be specified as 'queue://'or 'queue:' and topic as 'topic://' or 'topic:'. Example values 'queue:default/app/1/my-queue', 'queue://default/app/1/my-queue' , 'topic:default/app/1/mytopic', 'topic://default/app/1/mytopic' */
                    readonly "x-address": string;
                    /**
                     * @description Quality of service, where 0 specifies "at most once".
                     *     In case of QoS 1, API will return 204 only if message is successfully published to the queue or topic.
                     *     In case of QoS 0, API will return 204 as soon as message is accepted by the service.
                     */
                    readonly "x-qos": 0;
                    /** @description Specifies message content type */
                    readonly "Content-Type": string;
                    /** @description Message TTL in milliseconds */
                    readonly "x-message-expiration"?: number;
                    /** @description Correlation ID can be set to each message while publishing which will be visible in Queue Browser */
                    readonly "x-correlation-id"?: string;
                    /** @description Message ID can be set to each message while publishing which will be visible in Queue Browser. Value needs to be prepend with 'ID:', Example value 'ID:81e0fc54-bacf-419d-af79-876bf2ca6582' */
                    readonly "x-application-message-id"?: string;
                    /** @description Unix timestamp can be set to each message while publishing which will be visible in Queue Browser. Example value '1762953197' for '12 November 2025 13:13:17 GMT' */
                    readonly "x-timestamp"?: number;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody: {
                readonly content: {
                    readonly "any-content-type": string;
                };
            };
            readonly responses: {
                /** @description Message published successfully. */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description In cases of invalid values for request parameters */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description In case of invalid credentials */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If queue does not exist */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description Message size exceeds allowed size */
                readonly 413: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If limit on resources reached. */
                readonly 422: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If too many polling requests are received by service. */
                readonly 429: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
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
    readonly "/messagingrest/v1/queues/{queue-name}/messages": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Publish message to queue
         * @description Message is published to the queue provided in the path. The queue name should be URL encoded.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description Quality of service, where 0 specifies "at most once". */
                    readonly "x-qos": 0;
                    /** @description Specifies message content type */
                    readonly "Content-Type": string;
                    /** @description Message TTL in milliseconds */
                    readonly "x-message-expiration"?: number;
                    /** @description Correlation ID can be set to each message while publishing which will be visible in Queue Browser */
                    readonly "x-correlation-id"?: string;
                    /** @description Message ID can be set to each message while publishing which will be visible in Queue Browser. Value needs to be prepend with 'ID:', Example value 'ID:81e0fc54-bacf-419d-af79-876bf2ca6582' */
                    readonly "x-application-message-id"?: string;
                    /** @description Unix timestamp can be set to each message while publishing which will be visible in Queue Browser. Example value '1762953197' for '12 November 2025 13:13:17 GMT' */
                    readonly "x-timestamp"?: number;
                };
                readonly path: {
                    /** @description URL-encoded queue name */
                    readonly "queue-name": string;
                };
                readonly cookie?: never;
            };
            readonly requestBody: {
                readonly content: {
                    readonly "any-content-type": string;
                };
            };
            readonly responses: {
                /** @description Message published successfully */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description In cases of invalid values for request parameters */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description In case of invalid credentials */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If queue does not exist */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description Message size exceeds allowed size */
                readonly 413: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If limit on resources reached. */
                readonly 422: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If too many polling requests are received by service. */
                readonly 429: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
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
    readonly "/messagingrest/v1/topics/{topic-name}/messages": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Publish message to topic
         * @description Message is published to the topic provided in the path. The topic name should be URL encoded.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description Quality of service, where 0 specifies "at most once" */
                    readonly "x-qos": 0;
                    /** @description Specifies message content type */
                    readonly "Content-Type": string;
                    /** @description Message TTL in milliseconds */
                    readonly "x-message-expiration"?: number;
                    /** @description Correlation ID can be set to each message while publishing which will be visible in Queue Browser */
                    readonly "x-correlation-id"?: string;
                    /** @description Message ID can be set to each message while publishing which will be visible in Queue Browser. Value needs to be prepend with 'ID:', Example value 'ID:81e0fc54-bacf-419d-af79-876bf2ca6582' */
                    readonly "x-application-message-id"?: string;
                    /** @description Unix timestamp can be set to each message while publishing which will be visible in Queue Browser. Example value '1762953197' for '12 November 2025 13:13:17 GMT' */
                    readonly "x-timestamp"?: number;
                };
                readonly path: {
                    /** @description URL-encoded topic name */
                    readonly "topic-name": string;
                };
                readonly cookie?: never;
            };
            readonly requestBody: {
                readonly content: {
                    readonly "any-content-type": string;
                };
            };
            readonly responses: {
                /** @description Message published successfully */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description In cases of invalid values for request parameters */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description In case of invalid credentials */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description Message size exceeds allowed size */
                readonly 413: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If limit on resources reached. */
                readonly 422: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If too many polling requests are received by service. */
                readonly 429: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
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
    readonly "/messagingrest/v1/messages/consumption": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Consume message from a queue based on the x-address header value.
         * @description Message is consumed from the queue provided in header. When number of messages in queue are less than 3 the API might result with no messages at times, in this case its recommend to poll again. Recommended to use this API only for testing.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description Queue address, detail of the queue needs to be specified as 'queue://'or 'queue:'. Example values 'queue:default/app/1/my-queue', 'queue://default/app/1/my-queue' */
                    readonly "x-address": string;
                    /** @description Quality of service, where 0 specifies "at most once", and 1 specifies "at least once" (requires acknowledgment). */
                    readonly "x-qos": 0 | 1;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Message in response body. */
                readonly 200: {
                    headers: {
                        /** @description Content type of the message. */
                        readonly "Content-Type"?: string;
                        /** @description A unique identifier for the message, required when acknowledging messages which consumed with x-qos: 1. Ensure this ID is included in the Acknowledgement API to acknowledge message. Omission may result in message redelivery */
                        readonly "X-Message-Id"?: string;
                        readonly [name: string]: unknown;
                    };
                    content: {
                        /** @example string */
                        readonly "any-content-type": unknown;
                    };
                };
                /** @description If queue is empty. */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description In cases of invalid values for request parameters */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description In case of invalid credentials */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If queue does not exist */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If limit on resources reached. */
                readonly 422: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If too many polling requests are received by service. */
                readonly 429: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
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
    readonly "/messagingrest/v1/queues/{queue-name}/messages/consumption": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Consume message from a queue
         * @description Polls for messages in the queue. Queue name should be URL encoded. When number of messages in queue are less than 3 the API might result with no messages at times, in this case its recommend to poll again. Recommended to use this API only for testing.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description Quality of service, where 0 specifies "at most once", and 1 specifies "at least once" (requires acknowledgment). */
                    readonly "x-qos": 0 | 1;
                };
                readonly path: {
                    /** @description URL-encoded queue name */
                    readonly "queue-name": string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Message in response body. */
                readonly 200: {
                    headers: {
                        /** @description Content type of the message. */
                        readonly "Content-Type"?: string;
                        /** @description Message id that must be passed in acknowledgement API. Available only if its consumed with x-qos 1 */
                        readonly "X-Message-Id"?: string;
                        readonly [name: string]: unknown;
                    };
                    content: {
                        /** @example string */
                        readonly "any-content-type": unknown;
                    };
                };
                /** @description If queue is empty. */
                readonly 204: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description In cases of invalid values for request parameters */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description In case of invalid credentials */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If queue does not exist */
                readonly 404: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If limit on resources reached. */
                readonly 422: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description If too many polling requests are received by service. */
                readonly 429: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
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
    readonly "/messagingrest/v1/queues/{queue-name}/messages/{message-id}/acknowledgement": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Acknowledge message consumption
         * @description This API should be used to acknowledge the messages consumed using x-qos 1
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description URL-encoded queue name */
                    readonly "queue-name": string;
                    /** @description Message id as received in X-Message-Id header of message consumption API */
                    readonly "message-id": string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Request for acknowledging message is accepted */
                readonly 202: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description In cases of invalid values for request parameters */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
                    };
                };
                /** @description In case of invalid credentials */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["ErrorResponseObject"];
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
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        readonly ErrorResponseObject: {
            readonly error?: {
                readonly code?: string;
                readonly message?: string;
            };
            readonly message?: string;
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
