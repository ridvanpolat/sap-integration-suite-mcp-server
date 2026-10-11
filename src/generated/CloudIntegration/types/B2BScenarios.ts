export type paths = {
    readonly "/OrphanedInterchanges": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all orphaned interchanges.
         * @description Retrieve a list of all orphaned interchanges available in the system. This endpoint supports filtering, ordering, and selecting specific properties.
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
                     *      For any Id filter use only the 'eq' operator.<br>
                     *     Example: ```LastErrorDetails/ErrorCategory eq 'MESSAGE_DECRYPTION'``` returns the number of interchange documents with error category 'MESSAGE_DECRYPTION'
                     */
                    readonly $filter?: string;
                    /** @description Order items by property values. */
                    readonly $orderby?: readonly ("Date" | "Date desc")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "AdapterType" | "Date")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("BusinessDocumentProtocolHeaders" | "BusinessDocumentProcessingEvent" | "BusinessDocumentPayloads" | "ErrorDetails")[];
                };
                readonly header?: never;
                readonly path?: never;
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved orphaned interchange collections. */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.OrphanedInterchange"][];
                            };
                        };
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
    readonly "/OrphanedInterchanges('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get unassigned interchange document by Guid.
         * @description You can use the following request to get unassigned interchange document by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "AdapterType" | "Date")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("BusinessDocumentProtocolHeaders" | "BusinessDocumentProcessingEvent" | "BusinessDocumentPayloads" | "ErrorDetails")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description The unique identifier of the orphaned interchange. */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Get unassigned interchange document */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.OrphanedInterchange"][];
                            };
                        };
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
    readonly "/OrphanedInterchanges/$count": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of all unassigned interchange documents.
         * @description You can use the following request to get number of all unassigned interchange documents.
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
                /** @description Number of retrieved unassigned interchange documents */
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
    readonly "/OrphanedInterchanges('{Id}')/ErrorDetails": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get unassigned interchange document's error detail by Guid.
         * @description You can use the following request to get unassigned interchange document's error detail by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the unassigned interchange document */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved error detail */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.ErrorDetail"][];
                            };
                        };
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
    readonly "/OrphanedInterchanges('{Id}')/BusinessDocumentProcessingEvent": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get unassigned interchange document's processing event by Guid.
         * @description You can use the following request to get unassigned interchange document's processing event by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "EventType" | "Date" | "MonitoringType" | "MonitoringId")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("BusinessDocument" | "FunctionalAcknowledgement" | "BusinessDocumentPayload" | "ErrorDetails" | "BusinessDocumentNotes")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the unassigned interchange document */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved unassigned interchange document's processing event */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.BusinessDocumentProcessingEvent"][];
                            };
                        };
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
    readonly "/OrphanedInterchanges('{Id}')/BusinessDocumentPayloads": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get unassigned interchange document's payload by Guid.
         * @description You can use the following request to get unassigned interchange document's payload by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "PayloadId" | "PayloadContainerContentType" | "PayloadContentType" | "ArchivingRelevant")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("BusinessDocument" | "BusinessDocumentProcessingEvent")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the unassigned interchange document */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved unassigned interchange document's processing event */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.BusinessDocumentPayload"][];
                            };
                        };
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
    readonly "/OrphanedInterchanges('{Id}')/BusinessDocumentProtocolHeaders": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get unassigned interchange document's protocol headers by Guid.
         * @description You can use the following request to get unassigned interchange document's protocol headers by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Name" | "Value")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("BusinessDocument" | "OrphanedInterchange")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the unassigned interchange document */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved unassigned interchange document's protocol headers */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.BusinessDocumentProtocolHeader"][];
                            };
                        };
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
    readonly "/BusinessDocuments": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all interchange documents.
         * @description Retrieve a list of all inter-enterprise business documents available in the system. This endpoint supports filtering, ordering, and selecting specific properties.
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
                     *     Example: ```Status eq 'FAILED'``` returns document with status 'FAILED'.<br>
                     *     IntegrationFlowName is deprecated. In queries filtering for IntegrationFlowName, this will be substituted automatically by IntegrationFlow/Id
                     */
                    readonly $filter?: string;
                    /**
                     * @description Order items by property values.<br>
                     *     IntegrationFlowName is deprecated.
                     */
                    readonly $orderby?: readonly ("DocumentCreationTime" | "DocumentCreationTime desc")[];
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "SenderMessageType")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("BusinessDocumentRelations" | "BusinessDocumentProcessingEvents")[];
                };
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
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.BusinessDocument"][];
                            };
                        };
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
    readonly "/BusinessDocuments('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get interchange document by message Guid.
         * @description You can use the following request to get interchange document by message Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "SenderMessageType" | "SenderGroupControlNumber" | "SenderDocumentStandard" | "SenderInterchangeControlNumber" | "SenderMessageNumber" | "SenderTradingPartnerName" | "SenderSystemId" | "SenderAdapterType" | "SenderCommunicationPartnerName" | "ReceiverMessageType" | "ReceiverGroupControlNumber" | "ReceiverDocumentStandard" | "ReceiverInterchangeControlNumber" | "ReceiverMessageNumber" | "ReceiverSystemId" | "ReceiverAdapterType" | "ReceiverTradingPartnerName" | "ReceiverCommunicationPartnerName" | "AgreedSenderIdentiferAtSenderSide" | "AgreedSenderIdentiferQualifierAtSenderSide" | "AgreedReceiverIdentiferAtSenderSide" | "AgreedReceiverIdentiferQualifierAtSenderSide" | "AgreedSenderIdentiferAtReceiverSide" | "AgreedSenderIdentiferQualifierAtReceiverSide" | "AgreedReceiverIdentiferAtReceiverSide" | "AgreedReceiverIdentiferQualifierAtReceiverSide" | "Bulk" | "TransactionDocumentType" | "ProcessingStatus" | "ReceiverFunctionalAckStatus" | "ReceiverTechnicalAckStatus" | "OverallStatus" | "StartedAt" | "EndedAt" | "DocumentCreationTime" | "TechnicalAckDueTime" | "FunctionalAckDueTime" | "ResendAllowed" | "RetryAllowed" | "AgreementTypeName" | "TransactionTypeName" | "ArchivingStatus" | "InterchangeName" | "InterchangeDirection" | "TransactionActivityType")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("BusinessDocumentRelations" | "BusinessDocumentProcessingEvents" | "BusinessDocumentPayloads" | "SenderTechnicalAcknowledgement" | "ReceiverTechnicalAcknowledgement" | "SenderFunctionalAcknowledgement" | "ReceiverFunctionalAcknowledgement" | "LastErrorDetails" | "CustomObjects" | "BusinessDocumentExtFields" | "BusinessDocumentNotes" | "BusinessDocumentProtocolHeaders")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the interchange document */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved interchange document */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: components["schemas"]["com.sap.hci.api.BusinessDocument"];
                        };
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
    readonly "/BusinessDocuments/$count": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of all interchange documents.
         * @description You can use the following request to get number of all interchange documents.
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
                /** @description Number of retrieved interchange documents */
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
    readonly "/BusinessDocuments('{Id}')/SenderTechnicalAcknowledgement": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get interchange document's sender technical acknowledgement by Guid.
         * @description You can use the following request to get interchange document's sender technical acknowledgement by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Type" | "Direction" | "PayloadId" | "Status" | "PayloadContainerContentType" | "PayloadContentType")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("BusinessDocumentProcessingEvent" | "BusinessDocument" | "FunctionalAcknowledgement")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the interchange document */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved sender technical acknowledgement */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.TechnicalAcknowledgement"][];
                            };
                        };
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
    readonly "/BusinessDocuments('{Id}')/SenderFunctionalAcknowledgement": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get interchange document's sender functional acknowledgement by Guid.
         * @description You can use the following request to get interchange document's sender functional acknowledgement by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "PayloadId" | "PayloadContainerContentType" | "PayloadContentType" | "DocumentId" | "MessageType" | "DocumentStandard" | "Direction" | "Status" | "TransmissionStatus" | "TransmissionErrorInformation" | "TransmissionHttpCode")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("BusinessDocumentProcessingEvent" | "BusinessDocument" | "FunctionalAcknowledgement")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the interchange document */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved sender technical acknowledgement */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.FunctionalAcknowledgement"][];
                            };
                        };
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
    readonly "/BusinessDocuments('{Id}')/ReceiverTechnicalAcknowledgement": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get interchange document's receiver technical acknowledgement by Guid.
         * @description You can use the following request to get interchange document's receiver technical acknowledgement by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Type" | "Direction" | "PayloadId" | "Status" | "PayloadContainerContentType" | "PayloadContentType")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("BusinessDocumentProcessingEvent" | "BusinessDocument" | "FunctionalAcknowledgement")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the interchange document */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved receiver technical acknowledgement */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.TechnicalAcknowledgement"][];
                            };
                        };
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
    readonly "/BusinessDocuments('{Id}')/ReceiverFunctionalAcknowledgement": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get interchange document's receiver functional acknowledgement by Guid.
         * @description You can use the following request to get interchange document's receiver functional acknowledgement by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "PayloadId" | "PayloadContainerContentType" | "PayloadContentType" | "DocumentId" | "MessageType" | "DocumentStandard" | "Direction" | "Status" | "TransmissionStatus" | "TransmissionErrorInformation" | "TransmissionHttpCode")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("BusinessDocumentProcessingEvent" | "BusinessDocument" | "FunctionalAcknowledgement")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the interchange document */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved sender technical acknowledgement */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.FunctionalAcknowledgement"][];
                            };
                        };
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
    readonly "/BusinessDocuments('{Id}')/BusinessDocumentProcessingEvents": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get interchange document's processing event by Guid.
         * @description You can use the following request to get interchange document's processing event by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "EventType" | "Date" | "MonitoringType" | "MonitoringId")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("BusinessDocument" | "FunctionalAcknowledgement" | "BusinessDocumentPayload" | "ErrorDetails" | "BusinessDocumentNotes")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the message for which the processing event is written */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved interchange document's processing event */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.BusinessDocumentProcessingEvent"][];
                            };
                        };
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
    readonly "/BusinessDocuments('{Id}')/BusinessDocumentPayloads": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get interchange document's Payloads by Guid.
         * @description You can use the following request to get interchange document's payloads by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the message for which the interchange document is written */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved interchange document's payload */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.BusinessDocumentPayload"][];
                            };
                        };
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
    readonly "/BusinessDocumentPayloads('{Id}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get interchange document's payload by payload ID.
         * @description You can use the following request to get payload value by payload ID.
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
                /** @description Value of Payloads */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": string;
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
    readonly "/BusinessDocuments('{Id}')/BusinessDocumentNotes": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get interchange document's notes by Guid.
         * @description You can use the following request to get interchange document's notes by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the interchange document */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved interchange document notes */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.BusinessDocumentNote"][];
                            };
                        };
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
    readonly "/BusinessDocuments('{Id}')/CustomObjects": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get interchange document's custom search attributes by Guid.
         * @description You can use the following request to get interchange document's custom search attributes by Guid.</b>
         *      The B2B Scenarios tab under the Monitor section allows you to monitor the interchanges that are created during a B2B transaction.</b>
         *      The interchanges are displayed in a list with a list of filters using which helps you find a specific interchange easily. </b>
         *     These search filters are provided in a standard format.</b>
         *      There could be scenarios where you need to search for an interchange using a filter that is not provided in general.</b>
         *      In such cases, the Configuration Manager allows you to create and use custom search attributes.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "SearchFieldValue1" | "SearchFieldValue2" | "SearchFieldValue3" | "SearchFieldValue4" | "SearchFieldValue5" | "SearchFieldValue6" | "SearchFieldValue7" | "SearchFieldValue8" | "SearchFieldValue9" | "SearchFieldValue10")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the interchange document */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved interchange document's custom search attributes */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.CustomObjects"][];
                            };
                        };
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
    readonly "/BusinessDocuments('{Id}')/BusinessDocumentExtFields": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get interchange document's extension fields by Guid.
         * @description You can use the following request to get interchange document's extension fields by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the message for which the interchange document is written */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved business document extended fields */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.BusinessDocumentExtFields"][];
                            };
                        };
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
    readonly "/BusinessDocuments('{Id}')/LastErrorDetails": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get interchange document's error detail by Guid.
         * @description You can use the following request to get interchange document's error detail by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the interchange document */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved error detail */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.ErrorDetail"][];
                            };
                        };
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
    readonly "/BusinessDocuments('{Id}')/BusinessDocumentProtocolHeaders": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get interchange document's protocol headers by Guid.
         * @description You can use the following request to get interchange document's protocol headers by Guid.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned. */
                    readonly $select?: readonly ("Id" | "Name" | "Value")[];
                    /** @description Expand related entities. */
                    readonly $expand?: readonly ("BusinessDocument" | "OrphanedInterchange")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Guid of the interchange document */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved interchange document's protocol headers */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.BusinessDocumentProtocolHeader"][];
                            };
                        };
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
    readonly "/TechnicalAcknowledgements('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get technical acknowledgement by technical acknowledgement ID.
         * @description You can use the following request to get technical acknowledgement by technical acknowledgement ID.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Technical acknowledgement ID */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved technical acknowledgement */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.TechnicalAcknowledgement"][];
                            };
                        };
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
    readonly "/TechnicalAcknowledgements('{Id}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get technical acknowledgement by technical acknowledgement ID.
         * @description You can use the following request to get technical acknowledgement by technical acknowledgement ID.
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
                /** @description Value of Technical Acknowledgement */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": string;
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
    readonly "/FunctionalAcknowledgements('{Id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get functional acknowledgement by functional acknowledgement ID.
         * @description You can use the following request to get functional acknowledgement by functional acknowledgement ID.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: never;
                readonly header?: never;
                readonly path: {
                    /** @description Functional acknowledgement ID */
                    readonly Id: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved functional acknowledgement */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.FunctionalAcknowledgement"][];
                            };
                        };
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
    readonly "/FunctionalAcknowledgements('{Id}')/$value": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get functional acknowledgement value by functional acknowledgement ID.
         * @description You can use the following request to get functional acknowledgement value by functional acknowledgement ID.
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
                /** @description Value of functional acknowledgement */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": string;
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
    readonly "/activateB2BArchivingConfiguration": {
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
                /**
                 * @description Access forbidden - you did not have the required permissions to activate the archiving in this tenant.<br>
                 *
                 *     In API sandbox any write access is refused
                 */
                readonly 403: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["odata.error"];
                    };
                };
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
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/B2BArchivingConfigurations('{TenantName}')": {
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
    readonly "/B2BArchivingKeyPerformanceIndicators": {
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
                     *     For any Id filter use only the 'eq' operator.
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
                                readonly results?: readonly components["schemas"]["com.sap.hci.api.B2BArchivingKeyPerformanceIndicators"][];
                            };
                        };
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
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        /** OrphanedInterchange */
        readonly "com.sap.hci.api.OrphanedInterchange": {
            readonly Id?: string | null;
            readonly AdapterType?: string | null;
            readonly Date?: string | null;
            readonly ProcessingStatus?: string | null;
        };
        /** BusinessDocument */
        readonly "com.sap.hci.api.BusinessDocument": {
            readonly Id?: string | null;
            readonly SenderMessageType?: string | null;
            readonly SenderGroupControlNumber?: string | null;
            readonly SenderDocumentStandard?: string | null;
            readonly SenderInterchangeControlNumber?: string | null;
            readonly SenderMessageNumber?: string | null;
            readonly SenderTradingPartnerName?: string | null;
            readonly SenderSystemId?: string | null;
            readonly SenderAdapterType?: string | null;
            readonly SenderCommunicationPartnerName?: string | null;
            readonly ReceiverMessageType?: string | null;
            readonly ReceiverGroupControlNumber?: string | null;
            readonly ReceiverDocumentStandard?: string | null;
            readonly ReceiverInterchangeControlNumber?: string | null;
            readonly ReceiverMessageNumber?: string | null;
            readonly ReceiverSystemId?: string | null;
            readonly ReceiverAdapterType?: string | null;
            readonly ReceiverTradingPartnerName?: string | null;
            readonly ReceiverCommunicationPartnerName?: string | null;
            readonly AgreedSenderIdentiferAtSenderSide?: string | null;
            readonly AgreedSenderIdentiferQualifierAtSenderSide?: string | null;
            readonly AgreedReceiverIdentiferAtSenderSide?: string | null;
            readonly AgreedReceiverIdentiferQualifierAtSenderSide?: string | null;
            readonly AgreedSenderIdentiferAtReceiverSide?: string | null;
            readonly AgreedSenderIdentiferQualifierAtReceiverSide?: string | null;
            readonly AgreedReceiverIdentiferAtReceiverSide?: string | null;
            readonly AgreedReceiverIdentiferQualifierAtReceiverSide?: string | null;
            readonly Bulk?: string | null;
            readonly TransactionDocumentType?: string | null;
            readonly ProcessingStatus?: string | null;
            readonly ReceiverFunctionalAckStatus?: string | null;
            readonly ReceiverTechnicalAckStatus?: string | null;
            readonly OverallStatus?: string | null;
            readonly StartedAt?: string | null;
            readonly EndedAt?: string | null;
            readonly DocumentCreationTime?: string | null;
            readonly TechnicalAckDueTime?: string | null;
            readonly FunctionalAckDueTime?: string | null;
            readonly ResendAllowed?: string | null;
            readonly RetryAllowed?: string | null;
            readonly AgreementTypeName?: string | null;
            readonly TransactionTypeName?: string | null;
            readonly ArchivingStatus?: string | null;
            readonly InterchangeName?: string | null;
            readonly InterchangeDirection?: string | null;
            readonly TransactionActivityType?: string | null;
        };
        /** ErrorDetail */
        readonly "com.sap.hci.api.ErrorDetail": {
            readonly Id?: string | null;
            readonly ErrorInformation?: string | null;
            readonly ErrorCategory?: string | null;
            readonly IsTransientError?: string | null;
        };
        /** TechnicalAcknowledgement */
        readonly "com.sap.hci.api.TechnicalAcknowledgement": {
            readonly Id?: string | null;
            readonly Type?: string | null;
            readonly Direction?: string | null;
            readonly PayloadId?: string | null;
            readonly Status?: string | null;
            readonly PayloadContainerContentType?: string | null;
            readonly PayloadContentType?: string | null;
        };
        /** TechnicalAcknowledgement */
        readonly "com.sap.hci.api.FunctionalAcknowledgement": {
            readonly Id?: string | null;
            readonly PayloadId?: string | null;
            readonly PayloadContainerContentType?: string | null;
            readonly PayloadContentType?: string | null;
            readonly DocumentId?: string | null;
            readonly MessageType?: string | null;
            readonly DocumentStandard?: string | null;
            readonly Direction?: string | null;
            readonly Status?: string | null;
            readonly TransmissionStatus?: string | null;
            readonly TransmissionErrorInformation?: string | null;
            readonly TransmissionHttpCode?: number | null;
        };
        /** BusinessDocumentProcessingEvent */
        readonly "com.sap.hci.api.BusinessDocumentProcessingEvent": {
            readonly Id?: string | null;
            readonly EventType?: string | null;
            readonly Date?: string | null;
            readonly MonitoringType?: string | null;
            readonly MonitoringId?: string | null;
        };
        /** BusinessDocumentProtocolHeaders */
        readonly "com.sap.hci.api.BusinessDocumentProtocolHeader": {
            readonly Id?: string | null;
            readonly Name?: string | null;
            readonly Value?: string | null;
        };
        /** BusinessDocumentPayload */
        readonly "com.sap.hci.api.BusinessDocumentPayload": {
            readonly Id?: string | null;
            readonly ProcessingState?: string | null;
            readonly Direction?: string | null;
            readonly PayloadId?: string | null;
            readonly PayloadContainerContentType?: string | null;
            readonly PayloadContentType?: string | null;
            readonly ArchivingRelevant?: string | null;
        };
        /** BusinessDocumentNote */
        readonly "com.sap.hci.api.BusinessDocumentNote": {
            readonly Id?: string | null;
            readonly UserId?: string | null;
            readonly CreateTimeStamp?: string | null;
            readonly Text?: string | null;
            readonly Type?: string | null;
        };
        /** CustomObjects */
        readonly "com.sap.hci.api.CustomObjects": {
            readonly Id?: string | null;
            readonly SearchFieldValue1?: string | null;
            readonly SearchFieldValue2?: string | null;
            readonly SearchFieldValue3?: string | null;
            readonly SearchFieldValue4?: string | null;
            readonly SearchFieldValue5?: string | null;
            readonly SearchFieldValue6?: string | null;
            readonly SearchFieldValue7?: string | null;
            readonly SearchFieldValue8?: string | null;
            readonly SearchFieldValue9?: string | null;
            readonly SearchFieldValue10?: string | null;
        };
        /** BusinessDocumentExtFields */
        readonly "com.sap.hci.api.BusinessDocumentExtFields": {
            readonly Id?: string | null;
        };
        /** B2BArchivingKeyPerformanceIndicators */
        readonly "com.sap.hci.api.B2BArchivingKeyPerformanceIndicators": {
            readonly RunStart?: string | null;
            readonly RunDurationInMinutes?: string | null;
            readonly DataCollectionDurationInMinutes?: string | null;
            readonly DataCompressionDurationInMinutes?: string | null;
            readonly DataUploadDurationInMinutes?: string | null;
            readonly DocumentsToBeArchived?: string | null;
            readonly DocumentsArchived?: string | null;
            readonly DocumentsArchivingFailed?: string | null;
            readonly DocumentsArchivedUntilDate?: string | null;
            readonly DateOfOldestDocumentToBeArchivedAfterRun?: string | null;
            readonly DataUploadedInMb?: string | null;
            readonly RunStatus?: string | null;
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
        /** @description Bad Request. Wrong format or structure of the provided request body. */
        readonly 400: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["odata.error"];
            };
        };
        /** @description Unauthorized. Authorization information is missing or invalid. */
        readonly 401: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["odata.error"];
            };
        };
        /**
         * @description Access forbidden - you did not have the required permissions to access the resource.<br>
         *
         *     In API sandbox any write access is refused.
         */
        readonly 403: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["odata.error"];
            };
        };
        /** @description Not found */
        readonly 404: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["odata.error"];
            };
        };
        /** @description Internal server error. The requested operation led to an error during execution. */
        readonly 500: {
            headers: {
                readonly [name: string]: unknown;
            };
            content: {
                readonly "application/json": components["schemas"]["odata.error"];
            };
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
