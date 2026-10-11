export type paths = {
    readonly "/MessageProcessingLogs": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all message processing logs.
         * @description You can use the following request to get all message processing logs.
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
                     *     For any Id filter use only the 'eq' operator.<br>
                     *     Example: ```Status eq 'FAILED'``` returns message processing logs with status 'FAILED'.<br>
                     *     IntegrationFlowName is deprecated. In queries filtering for IntegrationFlowName, this will be substituted automatically by IntegrationFlow/Id
                     */
                    readonly $filter?: string;
                    /**
                     * @description Order items by property values.<br>
                     *     IntegrationFlowName is deprecated.
                     */
                    readonly $orderby?: readonly ("LogEnd" | "LogEnd desc" | "LogStart" | "LogStart desc" | "Status,LogEnd desc" | "ApplicationMessageId")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("MessageGuid" | "CorrelationId" | "ApplicationMessageId" | "PredecessorMessageGuid" | "ApplicationMessageType" | "IntegrationFlowName" | "IntegrationArtifact" | "Status" | "CustomStatus" | "LogLevel" | "LogStart" | "LogEnd" | "Sender" | "Receiver" | "AlternateWebLink" | "ArchivingStatus" | "ArchivingSenderChannelMessages" | "ArchivingReceiverChannelMessages" | "ArchivingLogAttachments" | "ArchivingPersistedMessages")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved message processing logs */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.MessageProcessingLog"][];
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
    readonly "/MessageProcessingLogs('{MessageGuid}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get message processing log by message Guid.
         * @description You can use the following request to get a message processing log by message Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("CorrelationId" | "ApplicationMessageId" | "PredecessorMessageGuid" | "ApplicationMessageType" | "IntegrationFlowName" | "IntegrationArtifact" | "Status" | "CustomStatus" | "LogLevel" | "LogStart" | "LogEnd" | "Sender" | "Receiver" | "AlternateWebLink" | "ArchivingStatus" | "ArchivingSenderChannelMessages" | "ArchivingReceiverChannelMessages" | "ArchivingLogAttachments" | "ArchivingPersistedMessages")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("AdapterAttributes" | "CustomHeaderProperties")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the message for which the message processing log is written */
                    readonly MessageGuid: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved message processing log */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.MessageProcessingLog"];
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
    readonly "/MessageProcessingLogs/$count": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of all message processing logs.
         * @description You can use the following request to get the number of all message processing logs.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Filter items by property values.<br>
                     *      For any Id filter use only the 'eq' operator.<br>
                     *     Example: ```Status eq 'FAILED'``` returns the number of message processing logs with status 'FAILED'<br>
                     *     IntegrationFlowName is deprecated. In queries filtering for IntegrationFlowName, this will be substituted automatically by IntegrationFlow/Id.
                     */
                    readonly $filter?: string;
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Number of retrieved message processing logs */
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
    readonly "/MessageProcessingLogs('{MessageGuid}')/AdapterAttributes": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get adapter attributes of message processing log by message Guid.
         * @description You can use the following request to get the adapter attributes of the message processing log with the specified message Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "AdapterId" | "AdapterMessageId" | "Name" | "Value")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the message for which the message processing log is written */
                    readonly MessageGuid: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved message processing log adapter attributes */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.MessageProcessingLogAdapterAttribute"][];
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
    readonly "/MessageProcessingLogs('{MessageGuid}')/Attachments": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get attachments of message processing log by message Guid.
         * @description You can use the following request to get the attachments of the message processing log with the specified message Guid.
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
                /** @description Retrieved message processing log attachments */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.MessageProcessingLogAttachment"][];
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
    readonly "/MessageProcessingLogs('{MessageGuid}')/CustomHeaderProperties": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all custom header properties of a specific message processing log
         * @description You can use the following request to get custom header properties of the message processing log with the specified message Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items. */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items. */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Filter items by property values */
                    readonly $filter?: string;
                    /** @description Order items by property values */
                    readonly $orderby?: readonly ("Name" | "Name desc" | "Name,Value" | "Value desc")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Name" | "Value")[];
                };
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
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.MessageProcessingLogCustomHeaderProperty"][];
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
    readonly "/MessageProcessingLogs('{MessageGuid}')/ErrorInformation": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get error information of message processing log by message Guid.
         * @description You can use the following request to get error information for the message with the specified message Guid.
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
                /** @description Retrieved entity */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.MessageProcessingLogErrorInformation"];
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
    readonly "/MessageProcessingLogs('{MessageGuid}')/ErrorInformation/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get error information text of message processing log by message Guid.
         * @description You can use the following request to get error information text for the message with the specified message Guid.
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
                /** @description Retrieved error information text */
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
             * @example 2017-04-13T15:51:04
             */
            readonly TimeStamp?: string | null;
            readonly HasAttachments?: boolean | null;
            readonly Attachments?: readonly components["schemas"]["com.sap.hci.api.MessageStoreEntryAttachment"][];
            readonly Properties?: readonly components["schemas"]["com.sap.hci.api.MessageStoreEntryProperty"][];
        };
        /** MessageProcessingLog */
        readonly "com.sap.hci.api.MessageProcessingLog": {
            readonly MessageGuid?: string | null;
            readonly CorrelationId?: string | null;
            readonly ApplicationMessageId?: string | null;
            readonly PredecessorMessageGuid?: string | null;
            readonly ApplicationMessageType?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly LogStart?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly LogEnd?: string | null;
            readonly Sender?: string | null;
            readonly Receiver?: string | null;
            readonly IntegrationFlowName?: string | null;
            readonly Status?: string | null;
            readonly AlternateWebLink?: string | null;
            readonly IntegrationArtifact?: components["schemas"]["com.sap.hci.api.IntegrationArtifact"];
            readonly LogLevel?: string | null;
            readonly CustomStatus?: string | null;
            readonly ArchivingStatus?: string | null;
            readonly ArchivingSenderChannelMessages?: string | null;
            readonly ArchivingReceiverChannelMessages?: string | null;
            readonly ArchivingLogAttachments?: string | null;
            readonly ArchivingPersistedMessages?: string | null;
            readonly TransactionId?: string | null;
            readonly PreviousComponentName?: string | null;
            readonly LocalComponentName?: string | null;
            readonly OriginComponentName?: string | null;
            readonly CustomHeaderProperties?: readonly components["schemas"]["com.sap.hci.api.MessageProcessingLogCustomHeaderProperty"][];
            readonly MessageStoreEntries?: readonly components["schemas"]["com.sap.hci.api.MessageStoreEntry"][];
            readonly ErrorInformation?: components["schemas"]["com.sap.hci.api.MessageProcessingLogErrorInformation"];
            readonly AdapterAttributes?: readonly components["schemas"]["com.sap.hci.api.MessageProcessingLogAdapterAttribute"][];
            readonly Attachments?: readonly components["schemas"]["com.sap.hci.api.MessageProcessingLogAttachment"][];
            readonly Runs?: readonly components["schemas"]["com.sap.hci.api.MessageProcessingLogRun"][];
        };
        /** MessageStoreEntryProperty */
        readonly "com.sap.hci.api.MessageStoreEntryProperty": {
            readonly MessageId?: string | null;
            readonly Name?: string | null;
            readonly Value?: string | null;
        };
        /** MessageProcessingLogErrorInformation */
        readonly "com.sap.hci.api.MessageProcessingLogErrorInformation": {
            readonly MessageGuid?: string | null;
            readonly Type?: string | null;
            readonly LastErrorModelStepId?: string | null;
        };
        /** MessageProcessingLogAttachment */
        readonly "com.sap.hci.api.MessageProcessingLogAttachment": {
            readonly Id?: string | null;
            readonly MessageGuid?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly TimeStamp?: string | null;
            readonly Name?: string | null;
            readonly ContentType?: string | null;
            /** Format: int64 */
            readonly PayloadSize?: number | null;
        };
        /** MessageProcessingLogRun */
        readonly "com.sap.hci.api.MessageProcessingLogRun": {
            readonly Id?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly RunStart?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly RunStop?: string | null;
            readonly LogLevel?: string | null;
            readonly OverallState?: string | null;
            readonly ProcessId?: string | null;
            readonly RunSteps?: readonly components["schemas"]["com.sap.hci.api.MessageProcessingLogRunStep"][];
        };
        /** MessageProcessingLogRunStep */
        readonly "com.sap.hci.api.MessageProcessingLogRunStep": {
            readonly RunId?: string | null;
            /** Format: int64 */
            readonly ChildCount?: number | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly StepStart?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly StepStop?: string | null;
            readonly StepId?: string | null;
            readonly ModelStepId?: string | null;
            readonly BranchId?: string | null;
            readonly Status?: string | null;
            readonly Error?: string | null;
            readonly Activity?: string | null;
            readonly RunStepProperties?: readonly components["schemas"]["com.sap.hci.api.MessageProcessingLogRunStepProperty"][];
            readonly TraceMessages?: readonly components["schemas"]["com.sap.hci.api.TraceMessage"][];
        };
        /** MessageProcessingLogRunStepProperty */
        readonly "com.sap.hci.api.MessageProcessingLogRunStepProperty": {
            readonly RunId?: string | null;
            /** Format: int64 */
            readonly ChildCount?: number | null;
            readonly Name?: string | null;
            readonly Value?: string | null;
        };
        /** TraceMessage */
        readonly "com.sap.hci.api.TraceMessage": {
            /** Format: int64 */
            readonly TraceId?: number | null;
            readonly MplId?: string | null;
            readonly ModelStepId?: string | null;
            /** Format: int64 */
            readonly PayloadSize?: number | null;
            readonly MimeType?: string | null;
            readonly Properties?: readonly components["schemas"]["com.sap.hci.api.TraceMessageProperty"][];
            readonly ExchangeProperties?: readonly components["schemas"]["com.sap.hci.api.TraceMessageExchangeProperty"][];
        };
        /** TraceMessageProperty */
        readonly "com.sap.hci.api.TraceMessageProperty": {
            /** Format: int64 */
            readonly TraceId?: number | null;
            readonly Name?: string | null;
            readonly Value?: string | null;
        };
        /** TraceMessageExchangeProperty */
        readonly "com.sap.hci.api.TraceMessageExchangeProperty": {
            /** Format: int64 */
            readonly TraceId?: number | null;
            readonly Name?: string | null;
            readonly Value?: string | null;
        };
        /** MessageProcessingLogCustomHeaderProperty */
        readonly "com.sap.hci.api.MessageProcessingLogCustomHeaderProperty": {
            readonly Id?: string | null;
            readonly Name?: string | null;
            readonly Value?: string | null;
            readonly Log?: components["schemas"]["com.sap.hci.api.MessageProcessingLog"];
        };
        /** MessageProcessingLogAdapterAttribute */
        readonly "com.sap.hci.api.MessageProcessingLogAdapterAttribute": {
            readonly Id?: string | null;
            readonly AdapterId?: string | null;
            readonly AdapterMessageId?: string | null;
            readonly Name?: string | null;
            readonly Value?: string | null;
            readonly MessageProcessingLog?: components["schemas"]["com.sap.hci.api.MessageProcessingLog"];
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
        /** IntegrationArtifact */
        readonly "com.sap.hci.api.IntegrationArtifact": {
            readonly Id?: string | null;
            readonly Name?: string | null;
            readonly Type?: string | null;
            readonly PackageId?: string | null;
            readonly PackageName?: string | null;
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
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
