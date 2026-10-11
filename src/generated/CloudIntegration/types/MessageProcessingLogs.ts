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
         * @description Get all message processing logs.<br>
         *
         *     In API sandbox the available integration flows provide the following log information:
         *     * '__Integration Flow with Message Store entries - COMPLETED PROCESSING__': Attachments and message store entries
         *     * '__Integration Flow with Adapter Data - FAILED PROCESSING__': Message processing log error information, attachments, custom header properties and adapter data
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
         * @description You can use the following request to get message processing log by message Guid.<br>
         *
         *     In API sandbox the integration flows provide the following log information:
         *     * '__Integration Flow with message store entries COMPLETED PROCESSING__': Attachments and message store entries
         *     * '__Integration Flow with Adapter Data - FAILED PROCESSING__': Message processing log error information, attachments, custom header properties and adapter data
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
         * @description You can use the following request to get number of all message processing logs.
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
         * @description You can use the following request to get the adapter attributes of the message processing log with the specified message Guid.<br>
         *
         *     In API sandbox only the deployed integration flow '__Integration Flow with Adapter Data - FAILED PROCESSING__' provides the required adapter data
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
         * @description You can use the following request to get the attachments of the message processing log with the specified message Guid.<br>
         *
         *     In API sandbox the following integration flows provide the required message processing log attachments:
         *     * '__Integration Flow with message store entries COMPLETED PROCESSING__'
         *     * '__Integration Flow with Adapter Data FAILED PROCESSING__'
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
         * Get custom header properties of message processing log by message Guid.
         * @description You can use the following request to get custom header properties of message processing log with the specified message Guid.<br>
         *
         *     In API sandbox only the deployed integration flow '__Integration Flow with Adapter Data - FAILED PROCESSING__' provides the required custom header properties
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
         * @description You can use the following request to get error information for the message with the specified message Guid.<br>
         *     In API sandbox only the deployed integration flow '__Integration Flow with Adapter Data - FAILED PROCESSING__' provides the required error information
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
         * @description You can use the following request to get error information text for the message with the specified message Guid.<br>
         *
         *     In API sandbox only the deployed integration flow '__Integration Flow with Adapter Data - FAILED PROCESSING__' provides the required error information
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
    readonly "/IdMapFromIds('{Source ID}')/ToIds": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all target Ids for the given source Id.
         * @description You can use the following request to get all target Ids for the given source Id, which are stored in the Id mapper.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Source Id, which is stored in the Id mapper */
                    readonly "Source ID": string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved target Ids */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.IdMapToId"][];
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
    readonly "/IdMapToIds('{Target ID}')/FromId2s": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get source Ids for a given target Id
         * @description You can use the following request to get all source Ids for the given target Id, which are stored in the Id mapper.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Target Id, which is stored in the Id mapper */
                    readonly "Target ID": string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved source Ids */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.IdMapFromId2"][];
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
    readonly "/IdempotentRepositoryEntries": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get Idempotent Repository entries by id.
         * @deprecated
         * @description This path is deprecated. Please use the __/GenericIdempotentRepositoryEntries__ path.<br>
         *
         *     You can use the following request to get entries from Idempotent Repository with the same id.
         */
        readonly get: {
            readonly parameters: {
                readonly query: {
                    /** @description Entry ID of Idempotent Repository - for SFTP adapter &lt;source directory&gt;/&lt;file name&gt; and for XI adapter the XI message ID needs to be entered. */
                    readonly id: string;
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved Idempotent Repository entries */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.IdempotentRepositoryEntry"][];
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
    readonly "/IdempotentRepositoryEntries(HexSource='{HexSource}',HexEntry='{HexEntry}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get Idempotent Repository entry.
         * @deprecated
         * @description This path is deprecated. Please use the __/GenericIdempotentRepositoryEntries__ path.<br>
         *
         *     You can use the following request to get entry from Idempotent Repository by hex encoded source and entry values.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Hex encoded processor, which is either &lt;user@host&gt; for SFTP adapter or a generated ID for XI adapter. */
                    readonly HexSource: string;
                    /** @description Hex encoded entry ID, which is either &lt;source directory&gt;/&lt;file name&gt; for SFTP adapter or XI message ID for XI adapter. */
                    readonly HexEntry: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved Idempotent Repository entry */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.IdempotentRepositoryEntry"];
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - parameter values are not provided in the expected hex encoded format. */
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
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete Idempotent Repository entry.
         * @deprecated
         * @description This path is deprecated. Please use the __/GenericIdempotentRepositoryEntries__ path.<br>
         *
         *     You can use the following request to delete entry from Idempotent Repository.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete entries from the Idempotent Repository.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Hex encoded processor, which is either &lt;user@host&gt; for SFTP adapter or a generated ID for XI adapter. */
                    readonly HexSource: string;
                    /** @description Hex encoded Entry ID, which is either &lt;source directory&gt;/&lt;file name&gt; for SFTP adapter or XI message ID for XI adapter. */
                    readonly HexEntry: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success or entry does not exist. */
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
                /** @description Internal server error - parameter values are not provided in the expected hex encoded format. */
                readonly 500: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/GenericIdempotentRepositoryEntries": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get Idempotent Repository entries by id.
         * @description You can use the following request to get entries from Idempotent Repository with the same id.
         */
        readonly get: {
            readonly parameters: {
                readonly query: {
                    /** @description Entry ID of Idempotent Repository - for SFTP adapter &lt;source directory&gt;/&lt;file name&gt; and for XI adapter the XI message ID needs to be entered. */
                    readonly id: string;
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved Idempotent Repository entries */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.GenericIdempotentRepositoryEntry"][];
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
    readonly "/GenericIdempotentRepositoryEntries(HexVendor='{HexVendor}',HexSource='{HexSource}',HexEntry='{HexEntry}',HexComponent='{HexComponent}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get Idempotent Repository entry.
         * @description You can use the following request to get entry from Idempotent Repository by hex encoded vendor, source, entry and component values.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Hex encoded value of the vendor (e.g. adapter provider) - example value: 'SAP'. */
                    readonly HexVendor: string;
                    /** @description Hex encoded processor, which is either &lt;user@host&gt; for SFTP adapter or a generated ID for XI adapter. */
                    readonly HexSource: string;
                    /** @description Hex encoded entry ID, which is either &lt;source directory&gt;/&lt;file name&gt; for SFTP adapter or XI message ID for XI adapter. */
                    readonly HexEntry: string;
                    /** @description Hex encoded value of the component field, e.g. the adapter type/name. */
                    readonly HexComponent: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved Idempotent Repository entry */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["com.sap.hci.api.GenericIdempotentRepositoryEntry"];
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description Internal server error - parameter values are not provided in the expected hex encoded format. */
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
        readonly put?: never;
        readonly post?: never;
        /**
         * Delete Idempotent Repository entry.
         * @description You can use the following request to delete entry from Idempotent Repository.<br>
         *     In API sandbox only read APIs could be tested. You need to configure an API endpoint for your account, where you have the required write permissions to delete entries from the Idempotent Repository.
         */
        readonly delete: {
            readonly parameters: {
                readonly query?: never;
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling') */
                    readonly "X-CSRF-Token": string;
                };
                readonly path: {
                    /** @description Hex encoded value of the vendor - for example the adapter provider. */
                    readonly HexVendor: string;
                    /** @description Hex encoded processor, which is either &lt;user@host&gt; for SFTP adapter or a generated ID for XI adapter. */
                    readonly HexSource: string;
                    /** @description Hex encoded Entry ID, which is either &lt;source directory&gt;/&lt;file name&gt; for SFTP adapter or XI message ID for XI adapter. */
                    readonly HexEntry: string;
                    /** @description Hex encoded value of the component field, e.g. the adapter type/name. */
                    readonly HexComponent: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Success or entry does not exist. */
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
                /** @description Internal server error - parameter values are not provided in the expected hex encoded format. */
                readonly 500: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
            };
        };
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/activateExternalLogging": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Activate external logging
         * @description This API is only present in the <b>Cloud Foundry environment.</b>
         *      You can use the following request to acitvate external logging on your tenant.<br>If no response body is returned, there's an authentication issue. Make sure the request is authorized and that your user has the ActivateExternalLogging role.<br>For more information, see SAP Help Portal documentation at [External Logging](https://help.sap.com/docs/integration-suite/sap-integration-suite/external-logging-cloud-foundry-environment).
         */
        readonly post: {
            readonly parameters: {
                readonly query: {
                    /** @description Set the default external log level for new or existing integration flows that have no individual external log level configured. */
                    readonly defaultLogLevel: readonly ("NONE" | "INFO" | "ERROR")[];
                };
                readonly header: {
                    /** @description CSRF token that is valid for the current session (see resource 'CSRF Token Handling'). */
                    readonly "X-CSRF-Token": string;
                };
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description ExternalLogging successfully enabled */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": Record<string, never>;
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description An error occurred during configuration validation or activation of external logging. <br>For information on more possible error situations and response bodies, see SAP Help Portal documentation at [Possible Errors During External Logging Activation](https://help.sap.com/docs/integration-suite/sap-integration-suite/possible-errors-during-external-logging-activation). */
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
    readonly "/deactivateExternalLogging": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Deactivate external logging
         * @description This API is only present in the <b>Cloud Foundry environment.</b>
         *      You can use the following request to deacitvate external logging on your tenant.<br>If no response body is returned, there's an authentication issue. Make sure the request is authorized and that your user has the ActivateExternalLogging role.<br>For more information, see SAP Help Portal documentation at [External Logging](https://help.sap.com/docs/integration-suite/sap-integration-suite/external-logging-cloud-foundry-environment).
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description ExternalLogging successfully deactivated */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": Record<string, never>;
                    };
                };
                readonly 400: components["responses"]["400"];
                readonly 401: components["responses"]["401"];
                readonly 403: components["responses"]["403"];
                readonly 404: components["responses"]["404"];
                readonly 429: components["responses"]["429"];
                /** @description An error occurred during deactivation of external logging.<br>For information on more possible error situations and response bodies, see SAP Help Portal documentation at [Possible Errors During External Logging Activation](https://help.sap.com/docs/integration-suite/sap-integration-suite/possible-errors-during-external-logging-activation). */
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
    readonly "/ExternalLoggingActivationStatus('{TenantName}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get external logging status for a tenant
         * @description This API is only present in the <b>Cloud Foundry environment.</b>
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Tenant name */
                    readonly TenantName: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved value for external logging configuration of this tenant */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": Record<string, never>;
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
    readonly "/activateArchivingConfiguration": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Enable archiving
         * @description This API is only present in the <b>Cloud Foundry environment.</b>
         *      You can use the following request to acitvate the archiving functionality in your tenant.
         */
        readonly post: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Archiving was enabled */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": Record<string, never>;
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
    readonly "/ArchivingConfigurations('{TenantName}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get archiving configuration for a tenant
         * @description This API is only present in the <b>Cloud Foundry environment.</b>
         *      You can use the following request to acitvate the archiving functionality in your tenant.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Tenant name */
                    readonly TenantName: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved value for archiving configuration of this tenant */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": Record<string, never>;
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
    readonly "/ArchivingKeyPerformanceIndicators": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get Key Performance Indicators of the archiving run
         * @description This API is only present in the <b>Cloud Foundry environment.</b>
         *      You can use the following request to get the Key Performance Indicators (KPIs) of the archiving runs.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Filter items by property values.<br>
                     *     For any Id filter use only the 'eq' operator.<br>
                     *     Example: ```MplsToBeArchived eq 5000```
                     */
                    readonly $filter?: string;
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved archiving key performance indicators */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.ArchivingKeyPerformanceIndicators"][];
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
        /** IdMapToId */
        readonly "com.sap.hci.api.IdMapToId": {
            readonly ToId?: string;
            /** @example string */
            readonly FromId_?: string | null;
            /** @example string */
            readonly Mapper?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ExpirationTime?: string | null;
            /** @example string */
            readonly Qualifier?: string | null;
            /** @example string */
            readonly Context?: string | null;
        };
        /** IdMapFromId2 */
        readonly "com.sap.hci.api.IdMapFromId2": {
            readonly FromId?: string;
            /** @example string */
            readonly ToId2?: string | null;
            /** @example string */
            readonly Mapper?: string | null;
            /** @example /Date(1492098664000)/ */
            readonly ExpirationTime?: string | null;
            /** @example string */
            readonly Qualifier?: string | null;
            /** @example string */
            readonly Context?: string | null;
        };
        /** IdempotentRepositoryEntry */
        readonly "com.sap.hci.api.IdempotentRepositoryEntry": {
            /** @example 7573657240686F7374 */
            readonly HexSource?: string | null;
            /** @example 496e707574466f6c6465722f66696c652e786d6c */
            readonly HexEntry?: string | null;
            /** @example user@host */
            readonly Source?: string | null;
            /** @example InputFolder/file.xml */
            readonly Entry?: string | null;
            /** @example SFTP or XI */
            readonly Component?: string | null;
            /**
             * Format: int64
             * @example 1550564603
             */
            readonly CreationTime?: (number | string) | null;
            /**
             * Format: int64
             * @example 1550564603
             */
            readonly ExpirationTime?: (number | string) | null;
        };
        /** GenericIdempotentRepositoryEntry */
        readonly "com.sap.hci.api.GenericIdempotentRepositoryEntry": {
            /** @example 7573657240686F7374 */
            readonly HexVendor?: string | null;
            /** @example 7573657240686F7374 */
            readonly HexSource?: string | null;
            /** @example 496e707574466f6c6465722f66696c652e786d6c */
            readonly HexEntry?: string | null;
            /** @example 7573657240686F7374 */
            readonly HexComponent?: string | null;
            /** @example user@host */
            readonly Source?: string | null;
            /** @example InputFolder/file.xml */
            readonly Entry?: string | null;
            /** @example SFTP or XI */
            readonly Component?: string | null;
            /** @example SAP */
            readonly Vendor?: string | null;
            /**
             * Format: int64
             * @example 1550564603
             */
            readonly CreationTime?: (number | string) | null;
            /**
             * Format: int64
             * @example 1550564603
             */
            readonly ExpirationTime?: (number | string) | null;
        };
        /** ArchivingKeyPerfomranceIndicators */
        readonly "com.sap.hci.api.ArchivingKeyPerformanceIndicators": {
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly RunStart?: string | null;
            /**
             * Format: int32
             * @example 34
             */
            readonly RunDurationInMinutes?: (number | string) | null;
            /**
             * Format: int32
             * @example 1
             */
            readonly DataCollectionDurationInMinutes?: (number | string) | null;
            /**
             * Format: int32
             * @example 1
             */
            readonly DataCompressionDurationInMinutes?: (number | string) | null;
            /**
             * Format: int32
             * @example 1
             */
            readonly DataUploadDurationInMinutes?: (number | string) | null;
            /**
             * Format: int32
             * @example 2000
             */
            readonly MplsToBeArchived?: (number | string) | null;
            /**
             * Format: int32
             * @example 2000
             */
            readonly MplsArchived?: (number | string) | null;
            /**
             * Format: int32
             * @example 0
             */
            readonly MplsArchivingFailed?: (number | string) | null;
            /**
             * Format: int32
             * @example 2000
             */
            readonly MplsArchivedUntilDate?: (number | string) | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04
             */
            readonly DateOfOldestMplToBeArchivedAfterRun?: string | null;
            /**
             * Format: int64
             * @example 15
             */
            readonly DataUploadedInMb?: (number | string) | null;
            /** @example COMPLETED */
            readonly RunStatus?: string | null;
            /** @example  */
            readonly RunFailedPhase?: string | null;
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
