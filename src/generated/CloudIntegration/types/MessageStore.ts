export type paths = {
    readonly "/MessageProcessingLogs('{MessageGuid}')/MessageStoreEntries": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get message store entries by message Guid.
         * @description You can use the following request to get message store entries for the specified message Guid.<br>
         *
         *     In API sandbox the integration flow '__Integration Flow with MessageStore - COMPLETED PROCESSING__' creates the corresponding message processing logs with message store entries.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the message for which the message processing log is written */
                    readonly MessageGuid: string;
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
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.MessageStoreEntry"][];
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
    readonly "/MessageStoreEntries('{MessageStoreEntryId}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get message store entry by Id.
         * @description You can use the following request to get entry from message store for a specific entry Id.<br>
         *
         *     In API sandbox the integration flow '__Integration Flow with MessageStore COMPLETED PROCESSING__' creates the corresponding message processing logs with message store entries.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Message store entry Id */
                    readonly MessageStoreEntryId: string;
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
                            readonly d?: components["schemas"]["com.sap.hci.api.MessageStoreEntry"];
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
    readonly "/MessageStoreEntries('{MessageStoreEntryId}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get message payload from message store by entry Id.
         * @description You can use the following request to get message payload from message store for a specific entry Id.<br>
         *
         *     In API sandbox the integration flow '__Integration Flow with MessageStore - COMPLETED PROCESSING__' creates the corresponding message processing logs with message store entries.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Message store entry Id */
                    readonly MessageStoreEntryId: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved payload of message store entry */
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
    readonly "/MessageStoreEntries('{MessageStoreEntryId}')/Attachments": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get attachments from message store by entry Id.
         * @description You can use the following request to get all attachments from the message store entry with specified entry Id.<br>
         *
         *     In API sandbox the integration flow '__Integration Flow with MessageStore COMPLETED PROCESSING__' creates the corresponding message processing logs with message store entries and attachments.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Message store entry Id */
                    readonly MessageStoreEntryId: string;
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
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.MessageStoreEntryAttachment"][];
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
    readonly "/MessageStoreEntryAttachments('{MessageStoreEntryAttachmentId}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get attachment from message store by attachment Id.
         * @description You can use the following request to get the attachment of a message store entry with specified attachment Id.<br>
         *
         *     In API sandbox the integration flow '__Integration Flow with MessageStore - COMPLETED PROCESSING__' creates the corresponding message processing logs with message store entries and attachments.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Attachment Id of the message store entry */
                    readonly MessageStoreEntryAttachmentId: string;
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
                            readonly d?: components["schemas"]["com.sap.hci.api.MessageStoreEntryAttachment"];
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
    readonly "/MessageStoreEntryAttachments('{MessageStoreEntryAttachmentId}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get attachment content from message store by attachment Id.
         * @description You can use the following request to get the attachment content of a message store entry with specified Id.<br>
         *
         *     In API sandbox the integration flow '__Integration Flow with MessageStore - COMPLETED PROCESSING__' creates the corresponding message processing logs with message store entries and attachments.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Attachment Id of a message store entry */
                    readonly MessageStoreEntryAttachmentId: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved attachment content of message store entry */
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
    readonly "/MessageStoreEntryAttachments('{MessageStoreEntryAttachmentId}')/Properties": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get attachment properties from message store by attachment Id.
         * @description You can use the following request to get attachment properties of a message store entry for specified attachment Id.<br>
         *
         *     In API sandbox the integration flow '__Integration Flow with MessageStore - COMPLETED PROCESSING__' creates the corresponding message processing logs with message store entries and attachments.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Attachment Id of a message store entry */
                    readonly MessageStoreEntryAttachmentId: string;
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
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.MessageStoreEntryAttachmentProperty"][];
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
    readonly "/MessageStoreEntryAttachmentProperties(AttachmentId='{MessageStoreEntryAttachmentId}',Name='{Name}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get attachment properties from message store by attachment Id and property name.
         * @description You can use the following request to get attachment properties of a message store entry for specified attachment Id and property name.<br>
         *
         *     In API sandbox the integration flow '__Integration Flow with MessageStore - COMPLETED PROCESSING__' creates the corresponding message processing logs with message store entries and attachments.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Attachment Id of a message store entry */
                    readonly MessageStoreEntryAttachmentId: string;
                    /** @description Property name of the attachment for a message store entry */
                    readonly Name: string;
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
                            readonly d?: components["schemas"]["com.sap.hci.api.MessageStoreEntryAttachmentProperty"];
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
    readonly "/MessageStoreEntries('{MessageStoreEntryId}')/Properties": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all properties of message store by entry Id
         * @description You can use the following request to get all properties of message store entry for the specified entry Id.<br>
         *
         *     In API sandbox the integration flow '__Integration Flow with MessageStore - COMPLETED PROCESSING__' creates the corresponding message processing logs with message store entries and properties.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Message store entry Id */
                    readonly MessageStoreEntryId: string;
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
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.MessageStoreEntryProperty"][];
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
    readonly "/MessageStoreEntryProperties(MessageId='{MessageStoreEntryID}',Name='{PropertyName}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get property from message store by entry Id and property name.
         * @description You can use the following request to get property of message store entry for the specified entry Id and property name.<br>
         *
         *     In API sandbox the integration flow '__Integration Flow with MessageStore - COMPLETED PROCESSING__' creates the corresponding message processing logs with message store entries and properties.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Message store entry Id */
                    readonly MessageStoreEntryID: string;
                    /** @description Property name for the message store entry */
                    readonly PropertyName: string;
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
                            readonly d?: components["schemas"]["com.sap.hci.api.MessageStoreEntryProperty"];
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
    readonly "/JmsBrokers('Broker1')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get available resources of JMS queues.
         * @description You can use the following request to get information on the JMS resources available on the tenant as well as on those actually used by your integration flows.<br>
         *
         *     Additional information about response values for some attributes:
         *     * __IsTransactedSessionsHigh__:
         *     __0__ - enough transactions available
         *     __1__ - number of transactions exceeding the allowed limit
         *     * __IsConsumerHigh__:
         *     __0__ - enough consumer available
         *     __1__ - number of consumers exceeding the allowed limits
         *     * __IsProducersHigh__:
         *     __0__ - enough producers available
         *     __1__ - number of producers exceeding the allowed limit
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("QueueStates" | "InactiveQueues")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved entity with expand on queue states */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.JmsBrokerQueueStates"];
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
    readonly "/MessagingQueues": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * List queues
         * @description Returns all queues for the tenant. **`$top`/`$skip`/…** ignored;
         *     **`$filter`/`$select`/…** → **400** (see API description).
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description OData format selection when supported (e.g. `json`). */
                    readonly $format?: components["parameters"]["QueryFormat"];
                    /** @description Include count of items. */
                    readonly $count?: components["parameters"]["count"];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description OK — feed of **`MessagingQueue`** entries (`d.results`). */
                readonly 200: {
                    headers: {
                        readonly "sap-correlation-id"?: string;
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.MessagingQueue"][];
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
    readonly "/MessagingQueues('{queueName}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Read one queue
         * @description Returns queue by name.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description OData format selection when supported (e.g. `json`). */
                    readonly $format?: components["parameters"]["QueryFormat"];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Queue name inside OData single-quoted literal.
                     * @example QueueName1
                     */
                    readonly queueName: components["parameters"]["QueueNameQuoted"];
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
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.MessagingQueue"];
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
         * Delete queue
         * @description Deletes the queue when permitted. By default the queue must be **empty**
         *     (including sibling **`E.`** / **`C.`** queues). Pass **`forceDelete=true`**
         *     to delete and discard remaining messages. **`400 QUEUE_IN_USE`** when
         *     deployed flows still reference the queue; **`409 QUEUE_NOT_EMPTY`** when
         *     messages remain and **`forceDelete`** is not **`true`**.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description When **`true`**, delete the queue and discard remaining messages.
                     *     Default **`false`** enforces the empty-queue guard (**`409 QUEUE_NOT_EMPTY`** when messages remain).
                     */
                    readonly forceDelete?: components["parameters"]["QueryForceDelete"];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Queue name inside OData single-quoted literal.
                     * @example QueueName1
                     */
                    readonly queueName: components["parameters"]["QueueNameQuoted"];
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success — queue deleted. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.MutationSuccess"];
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 409: components["responses"]["409"];
                readonly 429: components["responses"]["429"];
                readonly default: components["responses"]["error"];
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/MessagingQueues('{queueName}')/MessagingMessages": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * List messages in a queue (capped feed)
         * @description Named filters only — **`$top`/`$skip`/…** ignored (not applied). At most
         *     **`pageSize`** rows (default from **`JMS_ODATA_PUBLIC_PAGE_SIZE`**). No
         *     **`Warning`** header when the matching set exceeds the cap.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description OData format selection when supported (e.g. `json`). */
                    readonly $format?: components["parameters"]["QueryFormat"];
                    /** @description Filter by JMS Message ID (preferred query name). */
                    readonly jmsMessageId?: components["parameters"]["FilterJmsMessageId"];
                    /** @description Legacy alias — normalized server-side to **`jmsMessageId`**. */
                    readonly messageId?: components["parameters"]["FilterMessageIdLegacyAlias"];
                    readonly correlationId?: components["parameters"]["FilterCorrelationId"];
                    readonly sender?: components["parameters"]["FilterSender"];
                    readonly receiver?: components["parameters"]["FilterReceiver"];
                    readonly mplId?: components["parameters"]["FilterMplId"];
                    readonly messageType?: components["parameters"]["FilterMessageType"];
                    readonly applicationId?: components["parameters"]["FilterApplicationId"];
                    /** @description Epoch milliseconds UTC (string or number in practice). */
                    readonly createdAfter?: components["parameters"]["FilterCreatedAfter"];
                    /** @description Epoch milliseconds UTC (string or number in practice). */
                    readonly createdBefore?: components["parameters"]["FilterCreatedBefore"];
                    /**
                     * @description Optional row cap for this message feed request (**100** … **10 000**).
                     *     When omitted, the server default from **`JMS_ODATA_PUBLIC_PAGE_SIZE`** applies.
                     */
                    readonly pageSize?: components["parameters"]["FilterPageSize"];
                };
                readonly header?: never;
                readonly path: {
                    /**
                     * @description Queue name inside OData single-quoted literal.
                     * @example QueueName1
                     */
                    readonly queueName: components["parameters"]["QueueNameQuoted"];
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success — `d.results` (**≤ page-size rows**; silent cap when more match). */
                readonly 200: {
                    headers: {
                        readonly "sap-correlation-id"?: string;
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.MessagingMessage"][];
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
    readonly "/MessagingMessages(jmsMessageId='{jmsMessageId}',queueName='{queueName}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Read one message (canonical key path example)
         * @description Equivalent navigation URL **`…/MessagingQueues('{queueName}')/MessagingMessages(jmsMessageId='…',queueName='…')`** is also supported.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description OData format selection when supported (e.g. `json`). */
                    readonly $format?: components["parameters"]["QueryFormat"];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Message id segment (**hex form `x-hex-…`** when needed). Resolver also accepts key literal **`jmsMessageId`** on the wire — follow **`$metadata`** for alternate spellings. */
                    readonly jmsMessageId: string;
                    readonly queueName: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success */
                readonly 200: {
                    headers: {
                        readonly "sap-correlation-id"?: string;
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.MessagingMessage"];
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
        /** Delete one message */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    readonly jmsMessageId: string;
                    readonly queueName: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success — message deleted. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.MutationSuccess"];
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
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/MessagingMessages(jmsMessageId='{jmsMessageId}',queueName='{queueName}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /** Download message payload bytes */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    readonly jmsMessageId: string;
                    readonly queueName: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success — raw bytes (`Content-Type` from stored message metadata when available). */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/octet-stream": string;
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
    readonly "/MoveMessagingMessages": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Move messages between queues
         * @description JSON body — see **`MoveMessagingMessagesRequest`**. Target queue must not be a system queue (**`E.`** / **`C.`** prefix).
         */
        readonly post: operations["moveMessagingMessages"];
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/RetryMessagingMessages": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Retry messages on error queue
         * @description JSON body — **`RetryMessagingMessagesRequest`**. Retry eligibility follows broker rules (**failed** rows).
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.RetryMessagingMessagesRequest"];
                };
            };
            readonly responses: {
                /** @description Success — retry completed synchronously. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.MutationSuccess"];
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
    readonly "/NumberRanges": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get available Number Ranges.
         * @description You can use the following request to get the Number Range Objects available on the tenant.<br>
         *
         *     There are two Number Ranges defined in API sandbox: '__NumberRange1__' and '__NumberRange2__'
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
                /** @description Retrieved entities */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.NumberRanges"][];
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
         * Add a Number Range Object.
         * @description You can use the following request to add a Number Range Object.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
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
            /** @description Attribute-values of the new NumberRange Object */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.NumberRangesPut"];
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
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/NumberRanges('{objectName}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get specific Number Range by it's name'.
         * @description You can use the following request to get the Number Range Object by a name.<br>
         *
         *     There are two Number Ranges defined in API sandbox: '__NumberRange1__' and '__NumberRange2__'
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Name of the Number Range object */
                    readonly objectName: string;
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
                        readonly "application/json": components["schemas"]["com.sap.hci.api.NumberRanges"];
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
         * Update a Number Range Object.
         * @description You can use the following request to update a Number Range Object.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly put: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Name of the Number Range object */
                    readonly objectName: string;
                };
                readonly cookie?: never;
            };
            /** @description New Attribute-values of the NumberRange Object. The Name must be the same as objectName in the path. You have to provide all attributes. */
            readonly requestBody?: {
                readonly content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.NumberRangesPut"];
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
        /**
         * Delete a Number Range Object.
         * @description You can use the following request to delete a Number Range Object.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to update integration flows.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Name of the Number Range object */
                    readonly objectName: string;
                };
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
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/DataStores": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get available Data Stores.
         * @description You can use the following request to get the Data Stores available on the tenant.<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description If this parameter is ```true``` only Data Stores with overdue messages are shown. If it is ```false``` or not available all Data Stores are shown. */
                    readonly overdueonly?: readonly ("true" | "false")[];
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
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.DataStores"][];
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
    readonly "/DataStores(DataStoreName='{DataStoreName}',IntegrationFlow='{IntegrationFlowId}',Type='{Type}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get specific Data Store by it's name'.
         * @description You can use the following request to get the Data Store by a name.<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Name of the Data Store */
                    readonly DataStoreName: string;
                    /** @description The ID of the IntegrationFlow */
                    readonly IntegrationFlowId: string;
                    /** @description Is used for Data Stores that are created by Adapters (e.g. XI or AS4) or Flowsteps (e.g. Aggregator). Is empty if the visibility is Global or IntegrationFlow */
                    readonly Type: readonly string[];
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
                        readonly "application/json": components["schemas"]["com.sap.hci.api.DataStores"];
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
         * Delete a Data Store.
         * @description You can use the following request to delete a Data Store.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete Data Stores.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Name of the Data Store */
                    readonly DataStoreName: string;
                    /** @description The ID of the IntegrationFlow */
                    readonly IntegrationFlowId: string;
                    /** @description Is used for Data Stores that are created by Adapters (e.g. XI or AS4) or Flowsteps (e.g. Aggregator). Is empty if the visibility is Global or IntegrationFlow */
                    readonly Type: readonly string[];
                };
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
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/DataStoreEntries": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all Data Store entries.
         * @description You can use the following request to get all Data Store entries available on the tenant.<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description If this parameter is ```true``` only Data Store entries with overdue messages are shown. If it is ```false``` or not available all Data Store entries are shown. */
                    readonly overdueonly?: readonly ("true" | "false")[];
                    /** @description Shows all Data Store Entries with the mpl id */
                    readonly messageid?: readonly string[];
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
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.DataStoreEntries"][];
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
    readonly "/DataStores(DataStoreName='{DataStoreName}',IntegrationFlow='{IntegrationFlowId}',Type='{Type}')/Entries": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all Data Store entries for a specific Data Store.
         * @description You can use the following request to get al Data Store entries for a specific Data Store available on the tenant.<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description If this parameter is ```true``` only Data Store entries with overdue messages are shown. If it is ```false``` or not available all Data Store entries are shown. */
                    readonly overdueonly?: readonly ("true" | "false")[];
                    /** @description Shows all Data Store Entries with the mpl id */
                    readonly messageid?: readonly string[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Name of the Data Store */
                    readonly DataStoreName: string;
                    /** @description The ID of the IntegrationFlow */
                    readonly IntegrationFlowId: string;
                    /** @description Is used for Data Stores that are created by Adapters (e.g. XI or AS4) or Flowsteps (e.g. Aggregator). Is empty if the visibility is Global or IntegrationFlow */
                    readonly Type: readonly string[];
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
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.DataStoreEntries"][];
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
    readonly "/DataStoreEntries(Id='{Id}',DataStoreName='{DataStoreName}',IntegrationFlow='{IntegrationFlowId}',Type='{Type}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get specific Data Store entry by it's Id'.
         * @description You can use the following request to get a Data Store entry.<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Id of the Data Store entry */
                    readonly Id: string;
                    /** @description Name of the Data Store */
                    readonly DataStoreName: string;
                    /** @description The ID of the IntegrationFlow */
                    readonly IntegrationFlowId: string;
                    /** @description Is used for Data Stores that are created by Adapters (e.g. XI or AS4) or Flowsteps (e.g. Aggregator). Is empty if the visibility is Global or IntegrationFlow */
                    readonly Type: readonly string[];
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
                        readonly "application/json": components["schemas"]["com.sap.hci.api.DataStores"];
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
         * Delete a Data Store entry.
         * @description You can use the following request to delete a Data Store entry.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete Data Stores.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Id of the Data Store entry */
                    readonly Id: string;
                    /** @description Name of the Data Store */
                    readonly DataStoreName: string;
                    /** @description The ID of the IntegrationFlow */
                    readonly IntegrationFlowId: string;
                    /** @description Is used for Data Stores that are created by Adapters (e.g. XI or AS4) or Flowsteps (e.g. Aggregator). Is empty if the visibility is Global or IntegrationFlow */
                    readonly Type: readonly string[];
                };
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
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/DataStoreEntries(Id='{Id}',DataStoreName='{DataStoreName}',IntegrationFlow='{IntegrationFlowId}',Type='{Type}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Download content of a specific Data Store entry by it's Id'.
         * @description You can use the following request to download a Data Store entry content.<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Id of the Data Store entry */
                    readonly Id: string;
                    /** @description Name of the Data Store */
                    readonly DataStoreName: string;
                    /** @description The ID of the IntegrationFlow */
                    readonly IntegrationFlowId: string;
                    /** @description Is used for Data Stores that are created by Adapters (e.g. XI or AS4) or Flowsteps (e.g. Aggregator). Is empty if the visibility is Global or IntegrationFlow */
                    readonly Type: readonly string[];
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved content */
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
    readonly "/Variables": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all Variables entries.
         * @description You can use the following request to get all Variables entries available on the tenant.<br>
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
                /** @description Retrieved entities */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.Variables"][];
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
    readonly "/Variables(VariableName='{VariableName}',IntegrationFlow='{IntegrationFlowId}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get specific Variable by it's name'.
         * @description You can use the following request to get the Variable by a name.<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Name of the Variable */
                    readonly VariableName: string;
                    /** @description The ID of the IntegrationFlow */
                    readonly IntegrationFlowId: string;
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
                        readonly "application/json": components["schemas"]["com.sap.hci.api.Variables"];
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
         * Delete a Variable.
         * @description You can use the following request to delete a Variable.<br>
         *
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete Variables.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Name of the Variable */
                    readonly VariableName: string;
                    /** @description The ID of the IntegrationFlow */
                    readonly IntegrationFlowId: string;
                };
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
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Variables(VariableName='{VariableName}',IntegrationFlow='{IntegrationFlowId}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Downlaod Variable's content by it's name'.
         * @description You can use the following request to get the content of a Variable by a name.<br>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Name of the Variable */
                    readonly VariableName: string;
                    /** @description The ID of the IntegrationFlow */
                    readonly IntegrationFlowId: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved content */
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
        /** MessageStoreEntry */
        readonly "com.sap.hci.api.MessageStoreEntry": {
            readonly Id?: string | null;
            readonly MessageGuid?: string | null;
            readonly MessageStoreId?: string | null;
            /**
             * Format: date-time
             * @example 2020-04-13T15:51:04Z
             */
            readonly Timestamp?: string | null;
            readonly HasAttachments?: boolean;
            /** Attachments of MessageStoreEntries */
            readonly Attachments?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.MessageStoreEntryAttachment"][];
            };
            /** Properties of MessageStoreEntries */
            readonly Properties?: {
                readonly results?: readonly components["schemas"]["com.sap.hci.api.MessageStoreEntryProperty"][];
            };
        };
        /** MessageStoreEntryProperty */
        readonly "com.sap.hci.api.MessageStoreEntryProperty": {
            readonly MessageId?: string | null;
            readonly Name?: string | null;
            readonly Value?: string | null;
        };
        /** MessageStoreEntryAttachmentProperty */
        readonly "com.sap.hci.api.MessageStoreEntryAttachmentProperty": {
            readonly AttachmentId?: string | null;
            readonly Name?: string | null;
            readonly Value?: string | null;
        };
        /** MessageStoreEntryAttachment */
        readonly "com.sap.hci.api.MessageStoreEntryAttachment": {
            readonly Id?: string | null;
            readonly Name?: string | null;
            readonly ContentType?: string | null;
            readonly Properties?: readonly components["schemas"]["com.sap.hci.api.MessageStoreEntryAttachmentProperty"][];
        };
        /** JmsBroker */
        readonly "com.sap.hci.api.JmsBroker": {
            readonly Key?: string;
            /**
             * Format: int64
             * @example 42
             */
            readonly Capacity?: (number | string) | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly MaxCapacity?: (number | string) | null;
            /** Format: int32 */
            readonly IsTransactedSessionsHigh?: number | null;
            /** Format: int32 */
            readonly IsConsumersHigh?: number | null;
            /** Format: int32 */
            readonly IsProducersHigh?: number | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly MaxQueueNumber?: (number | string) | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly QueueNumber?: (number | string) | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly CapacityOk?: (number | string) | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly CapacityWarning?: (number | string) | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly CapacityError?: (number | string) | null;
        };
        /** JmsBrokerQueueStates */
        readonly "com.sap.hci.api.JmsBrokerQueueStates": {
            readonly Key?: string;
            /**
             * Format: int64
             * @example 42
             */
            readonly Capacity?: (number | string) | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly MaxCapacity?: (number | string) | null;
            /** Format: int32 */
            readonly IsTransactedSessionsHigh?: number | null;
            /** Format: int32 */
            readonly IsConsumersHigh?: number | null;
            /** Format: int32 */
            readonly IsProducersHigh?: number | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly MaxQueueNumber?: (number | string) | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly QueueNumber?: (number | string) | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly CapacityOk?: (number | string) | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly CapacityWarning?: (number | string) | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly CapacityError?: (number | string) | null;
            readonly QueueStates?: {
                readonly Name?: string;
                /**
                 * Format: int64
                 * @example 0
                 */
                readonly State?: (number | string) | null;
            };
        };
        /** NumberRanges */
        readonly "com.sap.hci.api.NumberRanges": {
            readonly Name?: string;
            readonly Description?: string;
            readonly MaxValue?: string;
            readonly MinValue?: string;
            readonly Rotate?: string;
            readonly CurrentValue?: string;
            readonly FieldLength?: string;
            readonly DeployedBy?: string;
            /**
             * Format: date-time
             * @example 2021-04-13T15:51:04
             */
            readonly DeployedOn?: string;
        };
        /** NumberRanges-create */
        readonly "com.sap.hci.api.NumberRangesPut": {
            readonly Name?: string;
            readonly Description?: string;
            readonly MaxValue?: string;
            readonly MinValue?: string;
            readonly Rotate?: string;
            readonly CurrentValue?: string;
            readonly FieldLength?: string;
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
        /** DataStores */
        readonly "com.sap.hci.api.DataStores": {
            readonly DataStoreName?: string;
            readonly IntegrationFlow?: string;
            readonly Type?: string;
            readonly Visibility?: string;
            /**
             * Format: int64
             * @example 42
             */
            readonly NumberOfMessages?: number;
            /**
             * Format: int64
             * @example 42
             */
            readonly NumberOfOverdueMessages?: number;
        };
        /** DataStoreEntries */
        readonly "com.sap.hci.api.DataStoreEntries": {
            readonly Id?: string;
            readonly DataStoreName?: string;
            readonly IntegrationFlow?: string;
            readonly Type?: string;
            readonly Status?: string;
            readonly Messageid?: string;
            /**
             * Format: date-time
             * @example 2021-04-13T15:51:04
             */
            readonly DueAt?: string;
            /**
             * Format: date-time
             * @example 20121-04-13T15:51:04
             */
            readonly CreatedAt?: string;
            /**
             * Format: date-time
             * @example 2021-04-13T15:51:04
             */
            readonly RetainUntil?: string;
        };
        /** Variables */
        readonly "com.sap.hci.api.Variables": {
            readonly VariableName?: string;
            readonly IntegrationFlow?: string;
            readonly Visibility?: string;
            /**
             * Format: date-time
             * @example 20121-04-13T15:51:04
             */
            readonly UpdatedAt?: string;
            /**
             * Format: date-time
             * @example 2021-04-13T15:51:04
             */
            readonly RetainUntil?: string;
        };
        /**
         * MessagingQueue
         * @description Public queue entity. JSON property names are camelCase. **`numberOfMessages`** is the combined customer-visible depth (processing queue plus failed sibling), aligned with the legacy Web UI count.
         */
        readonly "com.sap.hci.api.MessagingQueue": {
            readonly queueName?: string;
            /** @description Customer-visible queue depth. */
            readonly numberOfMessages?: string;
            readonly active?: boolean;
            readonly exclusive?: boolean;
        };
        /**
         * MessagingMessage
         * @description Public message entity. JSON property names are camelCase. **`jmsMessageId`** uses the hex encoding form when required for URL safety.
         */
        readonly "com.sap.hci.api.MessagingMessage": {
            readonly jmsMessageId?: string;
            readonly queueName?: string;
            readonly failed?: boolean;
            readonly mplId?: string;
            /** @description Epoch milliseconds (string representation). */
            readonly createdAt?: string;
            /** @description Retry counter (string representation). */
            readonly retryCount?: string;
            /** @description Epoch milliseconds of next retry (string representation). */
            readonly nextRetry?: string;
            /** @description Epoch milliseconds when message becomes overdue (string representation). */
            readonly overdueAt?: string;
            /** @description Epoch milliseconds of expiration (string representation). */
            readonly expirationDate?: string;
            readonly sender?: string;
            readonly receiver?: string;
            readonly messageType?: string;
            readonly applicationId?: string;
            readonly correlationId?: string;
        };
        /**
         * MutationSuccess
         * @description Minimal success body for synchronous delete, move, and retry operations.
         */
        readonly "com.sap.hci.api.MutationSuccess": {
            /** @enum {string} */
            readonly operation: "DELETE" | "MOVE" | "RETRY";
            /**
             * @description Reported count for the operation. Whole-queue move/retry use the
             *     pre-call customer-visible queue depth; filter/id-list modes report
             *     the dispatched count for that call. Delete always returns **1**.
             */
            readonly processedCount: number;
        };
        /** MoveMessagingMessagesRequest */
        readonly "com.sap.hci.api.MoveMessagingMessagesRequest": {
            readonly sourceQueue: string;
            readonly targetQueue: string;
            readonly jmsMessageId?: string;
            /** @description OData-style alias merged into jmsMessageId. */
            readonly JmsMessageId?: string;
            /** @description Legacy alias merged into jmsMessageId. */
            readonly messageId?: string;
            /** @description Array of ids — mutually exclusive with filters when using ID mode. Also accepts comma-separated string (use jmsMessageIds as array or send as string via messageIds). */
            readonly jmsMessageIds?: readonly string[];
            /** @description Alias of **`jmsMessageIds`** — must not disagree if both present. */
            readonly messageIds?: string;
            readonly correlationId?: string;
            readonly sender?: string;
            readonly receiver?: string;
            readonly mplId?: string;
            readonly messageType?: string;
            readonly applicationId?: string;
            /** @description Epoch ms UTC */
            readonly createdAfter?: string;
            /** @description Epoch ms UTC */
            readonly createdBefore?: string;
        };
        /** RetryMessagingMessagesRequest */
        readonly "com.sap.hci.api.RetryMessagingMessagesRequest": {
            readonly queueName: string;
            readonly jmsMessageId?: string;
            readonly JmsMessageId?: string;
            readonly messageId?: string;
            /** @description Array of ids or comma-separated string (use messageIds for string form). */
            readonly jmsMessageIds?: readonly string[];
            readonly messageIds?: string;
            readonly correlationId?: string;
            readonly sender?: string;
            readonly receiver?: string;
            readonly mplId?: string;
            readonly messageType?: string;
            readonly applicationId?: string;
            readonly createdAfter?: string;
            readonly createdBefore?: string;
        };
    };
    responses: {
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
        /** @description Filter items by property values. */
        readonly filter: string;
        /**
         * @description Queue name inside OData single-quoted literal.
         * @example QueueName1
         */
        readonly QueueNameQuoted: string;
        /** @description OData format selection when supported (e.g. `json`). */
        readonly QueryFormat: string;
        /** @description Filter by JMS Message ID (preferred query name). */
        readonly FilterJmsMessageId: string;
        /** @description Legacy alias — normalized server-side to **`jmsMessageId`**. */
        readonly FilterMessageIdLegacyAlias: string;
        readonly FilterCorrelationId: string;
        readonly FilterSender: string;
        readonly FilterReceiver: string;
        readonly FilterMplId: string;
        readonly FilterMessageType: string;
        readonly FilterApplicationId: string;
        /** @description Epoch milliseconds UTC (string or number in practice). */
        readonly FilterCreatedAfter: string;
        /** @description Epoch milliseconds UTC (string or number in practice). */
        readonly FilterCreatedBefore: string;
        /**
         * @description Optional row cap for this message feed request (**100** … **10 000**).
         *     When omitted, the server default from **`JMS_ODATA_PUBLIC_PAGE_SIZE`** applies.
         */
        readonly FilterPageSize: number;
        /**
         * @description When **`true`**, delete the queue and discard remaining messages.
         *     Default **`false`** enforces the empty-queue guard (**`409 QUEUE_NOT_EMPTY`** when messages remain).
         */
        readonly QueryForceDelete: "true" | "false";
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export interface operations {
    readonly moveMessagingMessages: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody: {
            readonly content: {
                readonly "application/json": components["schemas"]["com.sap.hci.api.MoveMessagingMessagesRequest"];
            };
        };
        readonly responses: {
            /** @description Success — move completed synchronously. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["com.sap.hci.api.MutationSuccess"];
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
}
