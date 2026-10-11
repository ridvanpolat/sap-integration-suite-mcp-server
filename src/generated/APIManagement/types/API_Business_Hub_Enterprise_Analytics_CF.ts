export type paths = {
    readonly "/Results('{TimeZone}')/Set": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Provide a TimeZone, for example 'UTC', to see results specific to given TimeZone */
                readonly TimeZone: string;
            };
            readonly cookie?: never;
        };
        /**
         * Gets information on API usage and Performance Metrics.
         * @description Provides detailed information on API Usage, Performance and API errors. Few of important details published are Response Time, Request Size, Error Count, Call Count, and so on.
         */
        readonly get: {
            readonly parameters: {
                readonly query?: {
                    /**
                     * @description Show only the first n items, see [Paging - Top](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptiontop)
                     * @example 50
                     */
                    readonly $top?: components["parameters"]["top"];
                    /** @description Skip the first n items, see [Paging - Skip](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionskip) */
                    readonly $skip?: components["parameters"]["skip"];
                    /** @description Search items by search phrases, see [Searching](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionsearch) */
                    readonly $search?: components["parameters"]["search"];
                    /** @description Aggregation and Filtering behavior is triggered using the query option $apply, see [$apply](http://docs.oasis-open.org/odata/odata-data-aggregation-ext/v4.0/cs01/odata-data-aggregation-ext-v4.0-cs01.html#_Toc378326289) */
                    readonly $apply?: string;
                    /** @description Filter items by property values, see [Filtering](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionfilter) */
                    readonly $filter?: string;
                    /** @description Include count of items, see [Count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) */
                    readonly $count?: components["parameters"]["count"];
                    /** @description Order items by property values, see [Sorting](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionorderby) */
                    readonly $orderby?: readonly ("ID" | "ID desc" | "ApiProxy" | "ApiProxy desc" | "ProxyBasepath" | "ProxyBasepath desc" | "RequestUrl" | "RequestUrl desc" | "RequestMethod" | "RequestMethod desc" | "ResponseCode" | "ResponseCode desc" | "DeveloperName" | "DeveloperName desc" | "ApplicationName" | "ApplicationName desc" | "ProductName" | "ProductName desc" | "CacheHit" | "CacheHit desc" | "TargetHost" | "TargetHost desc" | "TargetUrl" | "TargetUrl desc" | "PlatformName" | "PlatformName desc" | "AgentsName" | "AgentsName desc" | "DeviceType" | "DeviceType desc" | "OsFamilyName" | "OsFamilyName desc" | "CreatedTime" | "CreatedTime desc" | "PolicyResponseTime" | "PolicyResponseTime desc" | "ResponseTime" | "ResponseTime desc" | "TargetResponseTime" | "TargetResponseTime desc" | "RequestSize" | "RequestSize desc" | "RequestProcessingLatency" | "RequestProcessingLatency desc" | "ResponseProcessingLatency" | "ResponseProcessingLatency desc" | "TargetError" | "TargetError desc" | "Errors" | "Errors desc" | "PolicyError" | "PolicyError desc" | "CallCount" | "CallCount desc" | "Year" | "Year desc" | "Month" | "Month desc" | "Day" | "Day desc" | "Week" | "Week desc" | "Hour" | "Hour desc" | "Minute" | "Minute desc")[];
                    /** @description Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect) */
                    readonly $select?: readonly ("ID" | "ApiProxy" | "ProxyBasepath" | "RequestUrl" | "RequestMethod" | "ResponseCode" | "DeveloperName" | "ApplicationName" | "ProductName" | "CacheHit" | "TargetHost" | "TargetUrl" | "PlatformName" | "AgentsName" | "DeviceType" | "OsFamilyName" | "CreatedTime" | "PolicyResponseTime" | "ResponseTime" | "TargetResponseTime" | "RequestSize" | "RequestProcessingLatency" | "ResponseProcessingLatency" | "TargetError" | "Errors" | "PolicyError" | "CallCount" | "Year" | "Month" | "Day" | "Week" | "Hour" | "Minute")[];
                };
                readonly header?: never;
                readonly path: {
                    /** @description Provide a TimeZone, for example 'UTC', to see results specific to given TimeZone */
                    readonly TimeZone: string;
                };
                readonly cookie?: never;
            };
            readonly requestBody?: never;
            readonly responses: {
                /** @description Retrieved API usage and performance data */
                readonly 200: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": {
                            readonly value?: readonly components["schemas"]["AnalyticsService.ResultsType"][];
                        };
                    };
                };
                /** @description Request may not be compatible with OData V4 Conventions */
                readonly 400: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["error"];
                    };
                };
                /** @description Provide valid Bearer token to get Authorized */
                readonly 401: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["error"];
                    };
                };
                /** @description Error while processing the Request */
                readonly 500: {
                    headers: {
                        readonly [name: string]: unknown;
                    };
                    content: {
                        readonly "application/json": components["schemas"]["error"];
                    };
                };
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
        readonly error: {
            readonly error: {
                readonly code: string;
                readonly message: string;
                readonly target?: string;
                readonly details?: readonly {
                    readonly code: string;
                    readonly message: string;
                    readonly target?: string;
                }[];
                /** @description The structure of this object is service-specific */
                readonly innererror?: Record<string, never>;
            };
        };
        /** ResultsParameters */
        readonly "AnalyticsService.ResultsParameters": {
            readonly TimeZone?: string;
            readonly Set?: readonly components["schemas"]["AnalyticsService.ResultsType"][];
        };
        /** ResultsType */
        readonly "AnalyticsService.ResultsType": {
            readonly ID?: string;
            readonly ApiProxy?: string | null;
            readonly ProxyBasepath?: string | null;
            readonly RequestUrl?: string | null;
            readonly RequestMethod?: string | null;
            /** Format: int32 */
            readonly ResponseCode?: number | null;
            readonly DeveloperName?: string | null;
            readonly ApplicationName?: string | null;
            readonly ProductName?: string | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly CacheHit?: (number | string) | null;
            readonly TargetHost?: string | null;
            readonly TargetUrl?: string | null;
            readonly PlatformName?: string | null;
            readonly AgentsName?: string | null;
            readonly DeviceType?: string | null;
            readonly OsFamilyName?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04Z
             */
            readonly CreatedTime?: string | null;
            /**
             * Format: double
             * @example 3.14
             */
            readonly PolicyResponseTime?: (number | string) | null;
            /**
             * Format: double
             * @example 3.14
             */
            readonly ResponseTime?: (number | string) | null;
            /**
             * Format: double
             * @example 3.14
             */
            readonly TargetResponseTime?: (number | string) | null;
            /**
             * Format: double
             * @example 3.14
             */
            readonly RequestSize?: (number | string) | null;
            /**
             * Format: double
             * @example 3.14
             */
            readonly RequestProcessingLatency?: (number | string) | null;
            /**
             * Format: double
             * @example 3.14
             */
            readonly ResponseProcessingLatency?: (number | string) | null;
            /**
             * Format: double
             * @example 3.14
             */
            readonly TargetError?: (number | string) | null;
            /**
             * Format: double
             * @example 3.14
             */
            readonly Errors?: (number | string) | null;
            /**
             * Format: double
             * @example 3.14
             */
            readonly PolicyError?: (number | string) | null;
            /**
             * Format: int64
             * @example 42
             */
            readonly CallCount?: (number | string) | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04Z
             */
            readonly Year?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04Z
             */
            readonly Month?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04Z
             */
            readonly Day?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04Z
             */
            readonly Week?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04Z
             */
            readonly Hour?: string | null;
            /**
             * Format: date-time
             * @example 2017-04-13T15:51:04Z
             */
            readonly Minute?: string | null;
            readonly Parameters?: components["schemas"]["AnalyticsService.ResultsParameters"] | null;
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
    };
    parameters: {
        /**
         * @description Show only the first n items, see [Paging - Top](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptiontop)
         * @example 50
         */
        readonly top: number;
        /** @description Skip the first n items, see [Paging - Skip](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionskip) */
        readonly skip: number;
        /** @description Include count of items, see [Count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) */
        readonly count: boolean;
        /** @description Search items by search phrases, see [Searching](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionsearch) */
        readonly search: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
