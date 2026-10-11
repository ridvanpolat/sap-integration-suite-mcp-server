export type paths = {
    readonly "/Developers": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Gets information of a developer by the developer ID
         * @description This returns the information of a single developer when the developer ID is provided.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Show only the first n items */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Search items by search phrases */
                    readonly $search?: components["parameters"]["search"];
                    /** @description Filter items by property values */
                    readonly $filter?: components["parameters"]["filter"];
                    /** @description Include count of items */
                    readonly $count?: components["parameters"]["count"];
                    /** @description Order items by property values */
                    readonly $orderby?: "country" | "country desc" | "emailId" | "emailId desc" | "firstName" | "firstName desc" | "id" | "id desc" | "lastName" | "lastName desc" | "life_cycle" | "life_cycle desc";
                    /** @description Select properties to be returned */
                    readonly $select?: "country" | "emailId" | "firstName" | "id" | "lastName" | "life_cycle";
                    /** @description Expand related entities */
                    readonly $expand?: "*" | "applications";
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
                            /** Collection of Developer */
                            readonly d?: {
                                readonly results?: readonly components["schemas"]["apiportal.Developer"][];
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
    readonly "/Developers('{id}')": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Gets information of a developer by the developer ID
         * @description This returns the information of a single developer when the developer ID is provided.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /** @description Select properties to be returned */
                    readonly $select?: "country" | "emailId" | "firstName" | "id" | "lastName" | "life_cycle";
                    /** @description Expand related entities */
                    readonly $expand?: "*" | "applications";
                };
                readonly header?: never;
                readonly path: {
                    /** @description key: id */
                    readonly id: string;
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
                            readonly d?: components["schemas"]["apiportal.Developer"];
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
        readonly "odata.error": {
            readonly error?: components["schemas"]["odata.error.main"];
        };
        readonly "odata.error.main": {
            readonly code?: string;
            readonly message?: components["schemas"]["odata.error.message"];
            /** @description The contents of this object are service-defined */
            readonly innererror?: unknown;
        };
        readonly "odata.error.message": {
            readonly lang?: string;
            readonly value?: string;
        };
        /** Resource */
        readonly "apiportal.Resource": {
            readonly locale?: string;
            readonly long_text?: string | null;
            readonly medium_text?: string | null;
            readonly object_id?: string;
            readonly short_text?: string | null;
            readonly type?: string;
        };
        /** APIProxy */
        readonly "apiportal.APIProxy": {
            readonly FK_PROVIDERNAME?: string | null;
            readonly isPublished?: boolean | null;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string;
            readonly provider_name?: string | null;
            readonly service_code?: string | null;
            readonly state?: string | null;
            readonly status_code?: string | null;
            readonly version?: string | null;
            readonly title?: string | null;
            readonly description?: string | null;
            /** Related Collection(apiportal.APIProduct) */
            readonly apiProducts?: {
                readonly results?: readonly components["schemas"]["apiportal.APIProduct"][];
            };
            readonly apiProvider?: components["schemas"]["apiportal.APIProvider"];
            /** Related Collection(apiportal.FileResource) */
            readonly fileResources?: {
                readonly results?: readonly components["schemas"]["apiportal.FileResource"][];
            };
            /** Related Collection(apiportal.Policy) */
            readonly policies?: {
                readonly results?: readonly components["schemas"]["apiportal.Policy"][];
            };
            /** Related Collection(apiportal.APIProxyEndPoint) */
            readonly proxyEndPoints?: {
                readonly results?: readonly components["schemas"]["apiportal.APIProxyEndPoint"][];
            };
            /** Related Collection(apiportal.Resource) */
            readonly resources?: {
                readonly results?: readonly components["schemas"]["apiportal.Resource"][];
            };
            /** Related Collection(apiportal.APITargetEndPoint) */
            readonly targetEndPoints?: {
                readonly results?: readonly components["schemas"]["apiportal.APITargetEndPoint"][];
            };
        };
        /** Developer */
        readonly "apiportal.Developer": {
            readonly country?: string | null;
            readonly emailId?: string;
            readonly firstName?: string;
            readonly id?: string;
            readonly lastName?: string;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            /** Related Collection(apiportal.Application) */
            readonly applications?: {
                readonly results?: readonly components["schemas"]["apiportal.Application"][];
            };
        };
        /** EndPointProperty */
        readonly "apiportal.EndPointProperty": {
            readonly id?: string;
            readonly name?: string | null;
            readonly FK_PROXYENDPOINT_ID?: string | null;
            readonly FK_TARGETENDPOINT_ID?: string | null;
            readonly value?: string | null;
            readonly proxyEndPoint?: components["schemas"]["apiportal.APIProxyEndPoint"];
            readonly targetEndPoint?: components["schemas"]["apiportal.APITargetEndPoint"];
        };
        /** APITargetEndPoint */
        readonly "apiportal.APITargetEndPoint": {
            readonly FK_API_NAME?: string | null;
            readonly FK_DEFAULTFAULTRULE_ID?: string | null;
            readonly id?: string;
            readonly isDefault?: boolean | null;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string | null;
            readonly FK_POSTFLOW_ID?: string | null;
            readonly FK_PREFLOW_ID?: string | null;
            readonly provider_id?: string | null;
            readonly relativePath?: string | null;
            readonly url?: string | null;
            readonly apiProxy?: components["schemas"]["apiportal.APIProxy"];
            /** Related Collection(apiportal.ConditionalFlowRule) */
            readonly conditionalFlows?: {
                readonly results?: readonly components["schemas"]["apiportal.ConditionalFlowRule"][];
            };
            readonly defaultFaultRule?: components["schemas"]["apiportal.DefaultFaultRule"];
            /** Related Collection(apiportal.FaultRule) */
            readonly faultRules?: {
                readonly results?: readonly components["schemas"]["apiportal.FaultRule"][];
            };
            readonly postFlow?: components["schemas"]["apiportal.FlowRule"];
            readonly preFlow?: components["schemas"]["apiportal.FlowRule"];
            /** Related Collection(apiportal.EndPointProperty) */
            readonly properties?: {
                readonly results?: readonly components["schemas"]["apiportal.EndPointProperty"][];
            };
        };
        /** Certificate */
        readonly "apiportal.Certificate": {
            readonly certName?: string | null;
            readonly description?: string | null;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string;
            readonly storeName?: string;
            readonly password?: string | null;
            readonly storeType?: string | null;
            readonly expiryDate?: string | null;
            readonly issuerEmail?: string | null;
            readonly subjectEmail?: string | null;
            readonly signAlgName?: string | null;
            readonly isValid?: string | null;
            readonly validFrom?: string | null;
            readonly version?: string | null;
            /** Format: base64url */
            readonly content?: string | null;
            readonly certificateStore?: components["schemas"]["apiportal.CertificateStore"];
        };
        /** Step */
        readonly "apiportal.Step": {
            readonly condition?: string | null;
            readonly FK_DEFAULTFAULTRULE_ID?: string | null;
            readonly FK_FAULTRULE_ID?: string | null;
            readonly id?: string;
            readonly policy_name?: string | null;
            /** Format: int32 */
            readonly sequence?: number | null;
            readonly FK_STREAM_ID?: string | null;
            readonly defaultFaultRule?: components["schemas"]["apiportal.DefaultFaultRule"];
            readonly faultRule?: components["schemas"]["apiportal.FaultRule"];
            readonly stream?: components["schemas"]["apiportal.Stream"];
        };
        /** APIProxyEndPoint */
        readonly "apiportal.APIProxyEndPoint": {
            readonly FK_API_NAME?: string | null;
            readonly base_path?: string | null;
            readonly FK_DEFAULTFAULTRULE_ID?: string | null;
            readonly id?: string;
            readonly isDefault?: boolean | null;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string | null;
            readonly FK_POSTCLIENTFLOW_ID?: string | null;
            readonly FK_POSTFLOW_ID?: string | null;
            readonly FK_PREFLOW_ID?: string | null;
            readonly apiProxy?: components["schemas"]["apiportal.APIProxy"];
            /** Related Collection(apiportal.APIResource) */
            readonly apiResources?: {
                readonly results?: readonly components["schemas"]["apiportal.APIResource"][];
            };
            /** Related Collection(apiportal.ConditionalFlowRule) */
            readonly conditionalFlows?: {
                readonly results?: readonly components["schemas"]["apiportal.ConditionalFlowRule"][];
            };
            readonly defaultFaultRule?: components["schemas"]["apiportal.DefaultFaultRule"];
            /** Related Collection(apiportal.FaultRule) */
            readonly faultRules?: {
                readonly results?: readonly components["schemas"]["apiportal.FaultRule"][];
            };
            readonly postClientFlow?: components["schemas"]["apiportal.FlowRule"];
            readonly postFlow?: components["schemas"]["apiportal.FlowRule"];
            readonly preFlow?: components["schemas"]["apiportal.FlowRule"];
            /** Related Collection(apiportal.EndPointProperty) */
            readonly properties?: {
                readonly results?: readonly components["schemas"]["apiportal.EndPointProperty"][];
            };
            /** Related Collection(apiportal.RouteRule) */
            readonly routeRules?: {
                readonly results?: readonly components["schemas"]["apiportal.RouteRule"][];
            };
            /** Related Collection(apiportal.VirtualHost) */
            readonly virtualhosts?: {
                readonly results?: readonly components["schemas"]["apiportal.VirtualHost"][];
            };
        };
        /** RouteRule */
        readonly "apiportal.RouteRule": {
            readonly conditions?: string | null;
            readonly id?: string;
            readonly name?: string | null;
            readonly FK_PROXYENDPOINT_ID?: string | null;
            /** Format: int32 */
            readonly sequence?: number | null;
            readonly targetEndPointName?: string | null;
            readonly url?: string | null;
            /** Related Collection(apiportal.FaultRule) */
            readonly faultRules?: {
                readonly results?: readonly components["schemas"]["apiportal.FaultRule"][];
            };
            readonly proxyEndPoint?: components["schemas"]["apiportal.APIProxyEndPoint"];
        };
        /** DefaultFaultRule */
        readonly "apiportal.DefaultFaultRule": {
            readonly alwaysEnforce?: boolean | null;
            readonly id?: string;
            readonly name?: string | null;
            readonly FK_PROXYENDPOINT_ID?: string | null;
            readonly FK_TARGETENDPOINT_ID?: string | null;
            readonly proxyEndPoint?: components["schemas"]["apiportal.APIProxyEndPoint"];
            /** Related Collection(apiportal.Step) */
            readonly steps?: {
                readonly results?: readonly components["schemas"]["apiportal.Step"][];
            };
            readonly targetEndPoint?: components["schemas"]["apiportal.APITargetEndPoint"];
        };
        /** Stream */
        readonly "apiportal.Stream": {
            readonly FK_FLOW_ID?: string | null;
            readonly id?: string;
            readonly isRequest?: boolean | null;
            readonly flow?: components["schemas"]["apiportal.FlowRule"];
            /** Related Collection(apiportal.Step) */
            readonly steps?: {
                readonly results?: readonly components["schemas"]["apiportal.Step"][];
            };
        };
        /** APIResource */
        readonly "apiportal.APIResource": {
            readonly FK_PROXYENDPOINT_ID?: string | null;
            readonly canShowDelete?: boolean | null;
            readonly canShowGet?: boolean | null;
            readonly canShowPost?: boolean | null;
            readonly canShowPut?: boolean | null;
            readonly id?: string;
            readonly isDeleteChecked?: boolean | null;
            readonly isGetChecked?: boolean | null;
            readonly isPostChecked?: boolean | null;
            readonly isPutChecked?: boolean | null;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string | null;
            readonly proxyEndPointName?: string | null;
            readonly resource_path?: string | null;
            readonly title?: string | null;
            readonly description?: string | null;
            readonly apiProxyEndPoint?: components["schemas"]["apiportal.APIProxyEndPoint"];
            /** Related Collection(apiportal.Documentation) */
            readonly documentations?: {
                readonly results?: readonly components["schemas"]["apiportal.Documentation"][];
            };
            /** Related Collection(apiportal.Resource) */
            readonly resources?: {
                readonly results?: readonly components["schemas"]["apiportal.Resource"][];
            };
        };
        /** FaultRule */
        readonly "apiportal.FaultRule": {
            readonly condition?: string | null;
            readonly id?: string;
            readonly name?: string | null;
            readonly FK_PROXYENDPOINT_ID?: string | null;
            readonly FK_ROUTERULE_ID?: string | null;
            readonly FK_TARGETENDPOINT_ID?: string | null;
            readonly proxyEndPoint?: components["schemas"]["apiportal.APIProxyEndPoint"];
            readonly routeRule?: components["schemas"]["apiportal.RouteRule"];
            /** Related Collection(apiportal.Step) */
            readonly steps?: {
                readonly results?: readonly components["schemas"]["apiportal.Step"][];
            };
            readonly targetEndPoint?: components["schemas"]["apiportal.APITargetEndPoint"];
        };
        /** FileResource */
        readonly "apiportal.FileResource": {
            readonly content?: string | null;
            readonly id?: string;
            readonly name?: string | null;
            readonly scope?: string | null;
            readonly type?: string | null;
            /** Related Collection(apiportal.APIProxy) */
            readonly apiProxies?: {
                readonly results?: readonly components["schemas"]["apiportal.APIProxy"][];
            };
        };
        /** CertificateStore */
        readonly "apiportal.CertificateStore": {
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string;
            readonly storeType?: string | null;
            /** Related Collection(apiportal.Certificate) */
            readonly certificates?: {
                readonly results?: readonly components["schemas"]["apiportal.Certificate"][];
            };
        };
        /** KeyMapEntryValue */
        readonly "apiportal.KeyMapEntryValue": {
            readonly map_name?: string;
            readonly name?: string;
            readonly value?: string | null;
            readonly keyMapEntry?: components["schemas"]["apiportal.KeyMapEntry"];
        };
        /** APIProduct */
        readonly "apiportal.APIProduct": {
            readonly isPublished?: boolean | null;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string;
            /** Format: date-time */
            readonly published_at?: string | null;
            readonly published_by?: string | null;
            /** Format: int32 */
            readonly quotaCount?: number | null;
            /** Format: int32 */
            readonly quotaInterval?: number | null;
            readonly quotaTimeUnit?: string | null;
            readonly scope?: string | null;
            readonly status_code?: string | null;
            readonly version?: string | null;
            readonly title?: string | null;
            readonly description?: string | null;
            /** Related Collection(apiportal.APIProxy) */
            readonly apiProxies?: {
                readonly results?: readonly components["schemas"]["apiportal.APIProxy"][];
            };
            /** Related Collection(apiportal.APIResource) */
            readonly apiResources?: {
                readonly results?: readonly components["schemas"]["apiportal.APIResource"][];
            };
            /** Related Collection(apiportal.Application) */
            readonly applications?: {
                readonly results?: readonly components["schemas"]["apiportal.Application"][];
            };
            /** Related Collection(apiportal.Resource) */
            readonly resources?: {
                readonly results?: readonly components["schemas"]["apiportal.Resource"][];
            };
        };
        /** APIProvider */
        readonly "apiportal.APIProvider": {
            readonly isOnPremise?: boolean | null;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string;
            readonly sslInfo?: components["schemas"]["apiportal.SSLInfo"];
            readonly url?: string | null;
            readonly title?: string | null;
            readonly description?: string | null;
            readonly destType?: string | null;
            readonly host?: string | null;
            /** Format: int32 */
            readonly port?: number | null;
            readonly useSSL?: boolean | null;
            readonly trustAll?: boolean | null;
            readonly userName?: string | null;
            readonly password?: string | null;
            readonly authType?: string | null;
            readonly pathPrefix?: string | null;
            /** Format: int32 */
            readonly timeout?: number | null;
            readonly cockpit_url?: string | null;
            /** Related Collection(apiportal.APIProxy) */
            readonly apiProxies?: {
                readonly results?: readonly components["schemas"]["apiportal.APIProxy"][];
            };
            /** Related Collection(apiportal.Resource) */
            readonly resources?: {
                readonly results?: readonly components["schemas"]["apiportal.Resource"][];
            };
        };
        /** KeyMapEntry */
        readonly "apiportal.KeyMapEntry": {
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string;
            /** Related Collection(apiportal.KeyMapEntryValue) */
            readonly keyMapEntryValues?: {
                readonly results?: readonly components["schemas"]["apiportal.KeyMapEntryValue"][];
            };
        };
        /** FlowRule */
        readonly "apiportal.FlowRule": {
            readonly id?: string;
            readonly FK_REQUEST_ID?: string | null;
            readonly FK_RESPONSE_ID?: string | null;
            readonly request?: components["schemas"]["apiportal.Stream"];
            readonly response?: components["schemas"]["apiportal.Stream"];
        };
        /** ConditionalFlowRule */
        readonly "apiportal.ConditionalFlowRule": {
            readonly FK_APIRESOURCE_ID?: string | null;
            readonly conditions?: string | null;
            readonly id?: string;
            readonly name?: string | null;
            readonly FK_PROXYENDPOINT_ID?: string | null;
            readonly readOnly?: boolean | null;
            readonly FK_REQUEST_ID?: string | null;
            readonly FK_RESPONSE_ID?: string | null;
            /** Format: int32 */
            readonly sequence?: number | null;
            readonly FK_TARGETENDPOINT_ID?: string | null;
            readonly apiResource?: components["schemas"]["apiportal.APIResource"];
            readonly proxyEndPoint?: components["schemas"]["apiportal.APIProxyEndPoint"];
            readonly request?: components["schemas"]["apiportal.Stream"];
            readonly response?: components["schemas"]["apiportal.Stream"];
            readonly targetEndPoint?: components["schemas"]["apiportal.APITargetEndPoint"];
        };
        /** Policy */
        readonly "apiportal.Policy": {
            readonly FK_API_NAME?: string | null;
            readonly id?: string;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string | null;
            readonly policy_content?: string | null;
            readonly type?: string | null;
            readonly apiProxy?: components["schemas"]["apiportal.APIProxy"];
        };
        /** Documentation */
        readonly "apiportal.Documentation": {
            readonly FK_APIRESOURCE_ID?: string | null;
            readonly apiResourceName?: string | null;
            readonly content?: string | null;
            readonly id?: string;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly locale?: string;
            readonly mime_type?: string | null;
            readonly apiResource?: components["schemas"]["apiportal.APIResource"];
        };
        /** Application */
        readonly "apiportal.Application": {
            readonly callbackurl?: string | null;
            readonly FK_DEVELOPER_ID?: string | null;
            readonly id?: string;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly status_code?: string | null;
            /** Format: date-time */
            readonly valid_from?: string | null;
            /** Format: date-time */
            readonly valid_to?: string | null;
            readonly version?: string | null;
            readonly title?: string | null;
            readonly description?: string | null;
            readonly app_key?: string | null;
            readonly app_secret?: string | null;
            /** Related Collection(apiportal.APIProduct) */
            readonly apiProducts?: {
                readonly results?: readonly components["schemas"]["apiportal.APIProduct"][];
            };
            readonly developer?: components["schemas"]["apiportal.Developer"];
            /** Related Collection(apiportal.Resource) */
            readonly resources?: {
                readonly results?: readonly components["schemas"]["apiportal.Resource"][];
            };
        };
        /** VirtualHost */
        readonly "apiportal.VirtualHost": {
            readonly id?: string;
            readonly isDefault?: boolean | null;
            readonly isSSL?: boolean | null;
            readonly life_cycle?: components["schemas"]["apiportal.History"];
            readonly name?: string | null;
            readonly projectPath?: string | null;
            readonly virtual_host?: string | null;
            /** Format: int32 */
            readonly virtual_port?: number | null;
        };
        /** History */
        readonly "apiportal.History": {
            /** Format: date-time */
            readonly changed_at?: string | null;
            readonly changed_by?: string | null;
            /** Format: date-time */
            readonly created_at?: string | null;
            readonly created_by?: string | null;
        };
        /** SSLInfo */
        readonly "apiportal.SSLInfo": {
            readonly ciphers?: string | null;
            readonly clientAuthEnabled?: boolean | null;
            readonly enabled?: boolean | null;
            readonly ignoreValidationErrors?: boolean | null;
            readonly keyAlias?: string | null;
            readonly keyStore?: string | null;
            readonly protocols?: string | null;
            readonly trustStore?: string | null;
        };
    };
    responses: {
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
        /** @description Show only the first n items */
        readonly top: number;
        /** @description Skip the first n items */
        readonly skip: number;
        /** @description Include count of items */
        readonly count: boolean;
        /** @description Filter items by property values */
        readonly filter: string;
        /** @description Search items by search phrases */
        readonly search: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
