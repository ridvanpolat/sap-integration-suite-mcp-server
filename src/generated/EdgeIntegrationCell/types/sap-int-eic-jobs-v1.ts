export type paths = {
    readonly "/Jobs": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get all jobs
         * @description You can use the following request to get all scheduled background jobs with their current state and last execution information. Several filter operations and other options (for example expand, orderby) are supported. Examples:
         *     - ```GET /Jobs```
         *     - ```GET /Jobs?$count=true```
         *     - ```GET /Jobs?$filter=LastExecutionState eq 'FAILED'```
         *     - ```GET /Jobs?$expand=Schedule```
         *     - ```GET /Jobs?$orderby=NextExecutionTime asc```
         */
        readonly get: operations["listJobs"];
        readonly put?: never;
        /**
         * Create a new job
         * @description You can use the following request to create a new background job with a given schedule and parameters. Example:
         *     - ```POST /Jobs```
         */
        readonly post: operations["createJob"];
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Jobs/$count": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get number of jobs. Supports filter option.
         * @description You can use the following request to retrieve the number of jobs. The filter option is taken into account if applied. Examples:
         *     - ```GET /Jobs/$count```
         *     - ```GET /Jobs/$count?$filter=LastExecutionState eq 'FAILED'```
         *     - ```GET /Jobs/$count?$filter=IsSystemJob eq true```
         */
        readonly get: operations["countJobs"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/Jobs/{jobId}": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get a single job by its identifier.
         * @description You can use the following request to get a specific job by its id. The id is the URL-encoded job name. Examples:
         *     - ```GET /Jobs/CleanupTraceEntries```
         *     - ```GET /Jobs/Crun%20Frun%20Data%20Transfer```
         *     - ```GET /Jobs/MyCustomCleanup?$expand=Schedule```
         */
        readonly get: operations["getJob"];
        /**
         * Reconfigure an existing job.
         * @description You can use the following request to fully replace the schedule and parameters of an existing job. This operation does not retain any stored values for parameters and schedule configuration (full replacement semantics). `Name` and `ActionId` cannot be changed. Providing `Parameters` is optional. All parameters omitted in the request are initialized with their default values if available. Omitting parameters without any default value results in HTTP 400. The `Schedule` configuration is mandatory and replaces the stored one, so a complete schedule definition must be provided with all required fields including `@odata.type` (which may differ from the former one). Omitting required schedule fields results in HTTP 400. Example:
         *     - ```PUT /Jobs/MyCustomCleanup```
         */
        readonly put: operations["updateJob"];
        readonly post?: never;
        /**
         * Delete an existing job.
         * @description You can use the following request to delete a job. System jobs (`IsSystemJob = true`) cannot be deleted. If the job is currently executing, deletion is rejected with HTTP 409. Example:
         *     - ```DELETE /Jobs/MyCustomCleanup```
         */
        readonly delete: operations["deleteJob"];
        readonly options?: never;
        readonly head?: never;
        /**
         * Update fields of an existing job.
         * @description You can use the following request for minor updates to the schedule or parameters of an existing job. Only the fields provided in the request body are updated while all others are left unchanged (merge semantics). `Name` and `ActionId` cannot be changed. Updating schedule fields requires providing the schedule's `@odata.type`. Attempting to change fields `@odata.type`, `DateScheduleType` or `TimeScheduleType` via PATCH requests is rejected with HTTP 400 (this can be achieved by replacing the complete schedule via PUT). Example:
         *     - ```PATCH /Jobs/MyCustomCleanup```
         */
        readonly patch: operations["updateJob_2"];
        readonly trace?: never;
    };
    readonly "/Jobs/{jobId}/Schedule": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get the schedule configuration for a job.
         * @description You can use the following request to retrieve the schedule configuration of a specific job. The response type depends on the schedule subtype (e.g. `JobScheduleDailyOnTime`, `JobScheduleWeeklyRepeatInInterval`). Examples:
         *     - ```GET /Jobs/CleanupTraceEntries/Schedule```
         *     - ```GET /Jobs/MyCustomCleanup/Schedule```
         */
        readonly get: operations["getJobSchedule"];
        /**
         * Reconfigure a job's schedule.
         * @description You can use the following request to replace the schedule of an existing job with a new one. This operation does not retain any stored schedule configuration values (full replacement semantics). Therefore, a complete schedule object must be provided with all required fields including `@odata.type` (which may differ from the former schedule). Omitting required schedule fields results in HTTP 400. Examples:
         *     - ```PUT /Jobs/MyCustomCleanup/Schedule```
         */
        readonly put: operations["updateJobSchedule"];
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        /**
         * Update fields of a job's schedule configuration.
         * @description You can use the following request for minor updates to an existing job's schedule. Only the fields provided in the request body are updated while all others are left unchanged (merge semantics). Updating schedule fields requires providing the schedule's `@odata.type`. Attempting to change fields `@odata.type`, `DateScheduleType` or `TimeScheduleType` via PATCH requests is rejected with HTTP 400 (this can be achieved by replacing the complete schedule via PUT). Examples:
         *     - ```PATCH /Jobs/MyCustomCleanup/Schedule```
         */
        readonly patch: operations["updateJobSchedule_2"];
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
         * @description You can use the following request to get the CSRF token which is required for write access via POST, PATCH and DELETE operations. Copy the received X-CSRF-Token from the response header.
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
                /** @description The header provides the CSRF token. */
                readonly 200: {
                    headers: {
                        /** @description CSRF token that can be used for all modifying requests. */
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
        /**
         * ActionId
         * @enum {string}
         */
        readonly "com.sap.eic.api.ActionId": "CleanupDiagnostics" | "CleanupDataStoreEntries" | "EdgeUpdateExpiringRefreshTokens" | "CleanupMonitoringData" | "ConsolidateMPLAggregationData" | "CleanupTraceEntries" | "UpdateMplStatus" | "CALMDataTransferCommand";
        /**
         * JobExecutionState
         * @enum {string}
         */
        readonly "com.sap.eic.api.JobExecutionState": "COMPLETED" | "FAILED" | "NOT_YET_EXECUTED" | "SKIPPED" | "RETRY";
        /**
         * DateScheduleType
         * @enum {string}
         */
        readonly "com.sap.eic.api.DateScheduleType": "DAILY" | "WEEKLY" | "MONTHLY" | "ON_DATE";
        /**
         * TimeScheduleType
         * @enum {string}
         */
        readonly "com.sap.eic.api.TimeScheduleType": "ON_TIME" | "REPEAT_IN_INTERVAL";
        /**
         * Weekday
         * @enum {string}
         */
        readonly "com.sap.eic.api.Weekday": "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";
        /**
         * JobParameter
         * @description Abstract base type for job parameters. Use the concrete subtypes `JobParameterInteger`, `JobParameterString`, `JobParameterDuration`, or `JobParameterDate` with the appropriate `@odata.type` discriminator.
         */
        readonly "com.sap.eic.api.JobParameter": {
            /** @description OData type discriminator. Example: `#com.sap.eic.api.JobParameterInteger` */
            readonly "@odata.type"?: string;
            /** @description Parameter name. */
            readonly Name: string;
        };
        /**
         * JobParameterInteger
         * @description Parameter with numeric value.
         */
        readonly "com.sap.eic.api.JobParameterInteger": components["schemas"]["com.sap.eic.api.JobParameter"] & {
            /** Format: int32 */
            readonly Value?: number;
        };
        /**
         * JobParameterString
         * @description Parameter with textual value.
         */
        readonly "com.sap.eic.api.JobParameterString": components["schemas"]["com.sap.eic.api.JobParameter"] & {
            readonly Value?: string;
        };
        /**
         * JobParameterDuration
         * @description Parameter with duration value in ISO 8601 format. Only basic duration definitions with a single time unit are supported, for example: ```PT2H```
         */
        readonly "com.sap.eic.api.JobParameterDuration": components["schemas"]["com.sap.eic.api.JobParameter"] & {
            /** @description Duration in ISO 8601 format. Example: `PT30M` */
            readonly Value?: string;
        };
        /**
         * JobParameterDate
         * @description Parameter with date/time value in ISO 8601 format.
         */
        readonly "com.sap.eic.api.JobParameterDate": components["schemas"]["com.sap.eic.api.JobParameter"] & {
            /**
             * Format: date-time
             * @description Date/time in ISO 8601 format. Example: `2026-03-01T02:00:00Z`
             */
            readonly Value?: string;
        };
        /** Job */
        readonly "com.sap.eic.api.Job": {
            /** @description URL-encoded job name, used for addressing single entities. Example: `Crun%20Frun%20Data%20Transfer` */
            readonly Id: string;
            /** @description Job name as shown in the UI. Example: `Crun Frun Data Transfer` */
            readonly Name: string;
            readonly ActionId: components["schemas"]["com.sap.eic.api.ActionId"];
            readonly LastExecutionState?: components["schemas"]["com.sap.eic.api.JobExecutionState"];
            /**
             * Format: date-time
             * @description Timestamp of the last execution.
             * @example 2026-03-01T02:00:00Z
             */
            readonly LastExecutionTime?: string;
            /**
             * Format: date-time
             * @description Timestamp of the next scheduled execution.
             * @example 2026-03-02T02:00:00Z
             */
            readonly NextExecutionTime?: string;
            /** @description User who last changed the job configuration. */
            readonly LastChangedBy?: string;
            /**
             * Format: date-time
             * @description Timestamp when the job configuration was last changed.
             * @example 2026-01-15T10:30:00Z
             */
            readonly LastChangedOn?: string;
            /** @description Indicates whether this is a system job. System jobs cannot be deleted. */
            readonly IsSystemJob: boolean;
            /** @description Current parameter values configured for this job instance. */
            readonly Parameters: readonly components["schemas"]["com.sap.eic.api.JobParameter"][];
            readonly Schedule?: components["schemas"]["com.sap.eic.api.JobSchedule"];
        };
        /**
         * JobCreateRequest
         * @example {
         *       "Name": "MyCustomCleanup",
         *       "ActionId": "CleanupTraceEntries",
         *       "Parameters": [
         *         {
         *           "@odata.type": "#com.sap.eic.api.JobParameterInteger",
         *           "Name": "olderThanOrEqualMinutes",
         *           "Value": 60
         *         }
         *       ],
         *       "Schedule": {
         *         "@odata.type": "#com.sap.eic.api.JobScheduleDailyOnTime",
         *         "DateScheduleType": "DAILY",
         *         "TimeScheduleType": "ON_TIME",
         *         "OnHour": 3,
         *         "OnMinute": 0,
         *         "TimeZoneId": "UTC"
         *       }
         *     }
         */
        readonly "com.sap.eic.api.JobCreateRequest": {
            /** @description Unique job name. Must not already exist. */
            readonly Name: string;
            readonly ActionId: components["schemas"]["com.sap.eic.api.ActionId"];
            /** @description Optional parameter values. If omitted, defaults defined by the action are used. */
            readonly Parameters?: readonly components["schemas"]["com.sap.eic.api.JobParameter"][];
            readonly Schedule: components["schemas"]["com.sap.eic.api.JobSchedule"];
        };
        /**
         * JobPatchRequest
         * @description Updatable fields of a job. `Name` and `ActionId` cannot be changed. Only the provided parameters and schedule properties are updated; all others retain their current values.
         * @example {
         *       "Parameters": [
         *         {
         *           "@odata.type": "#com.sap.eic.api.JobParameterInteger",
         *           "Name": "olderThanOrEqualMinutes",
         *           "Value": 120
         *         }
         *       ],
         *       "Schedule": {
         *         "@odata.type": "#com.sap.eic.api.JobScheduleWeeklyOnTime",
         *         "OnHour": 9,
         *         "OnMinute": 30
         *       }
         *     }
         */
        readonly "com.sap.eic.api.JobPatchRequest": {
            /** @description Parameters to update. Only the provided parameters are updated; omitted parameters retain their current values. */
            readonly Parameters?: readonly components["schemas"]["com.sap.eic.api.JobParameter"][];
            readonly Schedule?: components["schemas"]["com.sap.eic.api.JobSchedulePatchRequest"];
        };
        /**
         * JobUpdateRequest
         * @description Updatable fields of a job. `Name` and `ActionId` cannot be changed. All provided parameters are updated; omitted parameters are reset to their default values. Complete schedule definition comprising all required fields.
         * @example {
         *       "Parameters": [
         *         {
         *           "@odata.type": "#com.sap.eic.api.JobParameterInteger",
         *           "Name": "olderThanOrEqualMinutes",
         *           "Value": 120
         *         }
         *       ],
         *       "Schedule": {
         *         "@odata.type": "#com.sap.eic.api.JobScheduleWeeklyOnTime",
         *         "DateScheduleType": "WEEKLY",
         *         "TimeScheduleType": "ON_TIME",
         *         "OnHour": 4,
         *         "OnMinute": 30,
         *         "TimeZoneId": "UTC",
         *         "Weekdays": [
         *           "MON",
         *           "FRI"
         *         ]
         *       }
         *     }
         */
        readonly "com.sap.eic.api.JobUpdateRequest": {
            /** @description Parameters to update. All provided parameters are updated; omitted parameters are reset to their default values */
            readonly Parameters?: readonly components["schemas"]["com.sap.eic.api.JobParameter"][];
            readonly Schedule: components["schemas"]["com.sap.eic.api.JobSchedule"];
        };
        /**
         * JobSchedule
         * @description Abstract base type for job schedules. Use `@odata.type` to identify the concrete subtype:
         *     - `#com.sap.eic.api.JobScheduleDailyOnTime`
         *     - `#com.sap.eic.api.JobScheduleDailyRepeatInInterval`
         *     - `#com.sap.eic.api.JobScheduleWeeklyOnTime`
         *     - `#com.sap.eic.api.JobScheduleWeeklyRepeatInInterval`
         *     - `#com.sap.eic.api.JobScheduleMonthlyOnTime`
         *     - `#com.sap.eic.api.JobScheduleMonthlyRepeatInInterval`
         *     - `#com.sap.eic.api.JobScheduleOnDateOnTime`
         *     - `#com.sap.eic.api.JobScheduleOnDateRepeatInInterval`
         * @example {
         *       "@odata.type": "#com.sap.eic.api.JobScheduleWeeklyOnTime",
         *       "DateScheduleType": "WEEKLY",
         *       "Weekdays": [
         *         "MON",
         *         "FRI"
         *       ],
         *       "TimeScheduleType": "ON_TIME",
         *       "OnHour": 4,
         *       "OnMinute": 30,
         *       "TimeZoneId": "UTC"
         *     }
         */
        readonly "com.sap.eic.api.JobSchedule": {
            /** @description OData type discriminator identifying the concrete schedule subtype. */
            readonly "@odata.type": string;
            readonly DateScheduleType: components["schemas"]["com.sap.eic.api.DateScheduleType"];
            readonly TimeScheduleType: components["schemas"]["com.sap.eic.api.TimeScheduleType"];
            /**
             * Format: int32
             * @description Hour at which to run (0-23). Applicable for `ON_TIME` schedules.
             */
            readonly OnHour?: number;
            /**
             * Format: int32
             * @description Minute at which to run (0-59). Applicable for `ON_TIME` schedules.
             */
            readonly OnMinute?: number;
            /**
             * Format: int32
             * @description Repeat interval in minutes. Applicable for `REPEAT_IN_INTERVAL` schedules.
             */
            readonly RepeatEveryMinutes?: number;
            /**
             * Format: int32
             * @description Repeat interval in hours. Applicable for `REPEAT_IN_INTERVAL` schedules.
             */
            readonly RepeatEveryHours?: number;
            /**
             * Format: int32
             * @description Start hour of the repeat window (0-23). Applicable for `REPEAT_IN_INTERVAL` schedules.
             */
            readonly RepeatFromHour?: number;
            /**
             * Format: int32
             * @description End hour of the repeat window (0-24). Applicable for `REPEAT_IN_INTERVAL` schedules.
             */
            readonly RepeatToHour?: number;
            /** @description Time zone identifier. Example: `UTC`, `UTC+1` */
            readonly TimeZoneId?: string;
            /** @description Days of the week on which to run. Applicable for `WEEKLY` schedules. */
            readonly Weekdays?: readonly components["schemas"]["com.sap.eic.api.Weekday"][];
            /**
             * Format: int32
             * @description Day of the month on which to run (1-31). Applicable for `MONTHLY` schedules.
             */
            readonly OnDayOfMonth?: number;
            /**
             * Format: int32
             * @description Day of the specific date. Applicable for `ON_DATE` schedules.
             */
            readonly OnDay?: number;
            /**
             * Format: int32
             * @description Month of the specific date (1-12). Applicable for `ON_DATE` schedules.
             */
            readonly OnMonth?: number;
            /**
             * Format: int32
             * @description Year of the specific date. Applicable for `ON_DATE` schedules.
             */
            readonly OnYear?: number;
        };
        /**
         * JobSchedulePatchRequest
         * @description Updatable fields of a job schedule. `@odata.type` is required to determine the concrete schedule subtype. Fields `@odata.type`, `TimeScheduleType`, and `DateScheduleType` cannot be changed.
         * @example {
         *       "@odata.type": "#com.sap.eic.api.JobScheduleWeeklyOnTime",
         *       "OnHour": 5,
         *       "OnMinute": 45
         *     }
         */
        readonly "com.sap.eic.api.JobSchedulePatchRequest": {
            /** @description OData type discriminator identifying the concrete schedule subtype. */
            readonly "@odata.type": string;
            /**
             * Format: int32
             * @description Hour at which to run (0-23). Applicable for `ON_TIME` schedules.
             */
            readonly OnHour?: number;
            /**
             * Format: int32
             * @description Minute at which to run (0-59). Applicable for `ON_TIME` schedules.
             */
            readonly OnMinute?: number;
            /**
             * Format: int32
             * @description Repeat interval in minutes. Applicable for `REPEAT_IN_INTERVAL` schedules.
             */
            readonly RepeatEveryMinutes?: number;
            /**
             * Format: int32
             * @description Repeat interval in hours. Applicable for `REPEAT_IN_INTERVAL` schedules.
             */
            readonly RepeatEveryHours?: number;
            /**
             * Format: int32
             * @description Start hour of the repeat window (0-23). Applicable for `REPEAT_IN_INTERVAL` schedules.
             */
            readonly RepeatFromHour?: number;
            /**
             * Format: int32
             * @description End hour of the repeat window (0-24). Applicable for `REPEAT_IN_INTERVAL` schedules.
             */
            readonly RepeatToHour?: number;
            /** @description Time zone identifier. Example: `UTC`, `UTC+1` */
            readonly TimeZoneId?: string;
            /** @description Days of the week on which to run. Applicable for `WEEKLY` schedules. */
            readonly Weekdays?: readonly components["schemas"]["com.sap.eic.api.Weekday"][];
            /**
             * Format: int32
             * @description Day of the month on which to run (1-31). Applicable for `MONTHLY` schedules.
             */
            readonly OnDayOfMonth?: number;
            /**
             * Format: int32
             * @description Day of the specific date. Applicable for `ON_DATE` schedules.
             */
            readonly OnDay?: number;
            /**
             * Format: int32
             * @description Month of the specific date (1-12). Applicable for `ON_DATE` schedules.
             */
            readonly OnMonth?: number;
            /**
             * Format: int32
             * @description Year of the specific date. Applicable for `ON_DATE` schedules.
             */
            readonly OnYear?: number;
        };
        readonly "odata.error": {
            readonly error: {
                readonly code?: string;
                readonly message?: string;
                readonly target?: string;
                readonly details?: readonly {
                    readonly code?: string;
                    readonly target?: string;
                    readonly message?: string;
                }[];
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
        /** @description Forbidden. The required permissions to access the resource are missing, or the operation is not allowed (e.g. deleting a system job). */
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
        /** @description Conflict. The request could not be completed due to a conflict (e.g. a job with the same name already exists, or the job is currently executing). */
        readonly 409: {
            headers: {
                readonly [name: string]: unknown;
            };
            content?: never;
        };
        /** @description Too many requests. Server's rate limit exceeded. */
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
                readonly "text/plain": components["schemas"]["odata.error"];
            };
        };
    };
    parameters: {
        /** @description Job identifier. This is the URL-encoded job name (e.g. `Crun%20Frun%20Data%20Transfer` for `Crun Frun Data Transfer`). Example: ```CleanupTraceEntries``` */
        readonly JobId: string;
        /** @description Show only the first n items. */
        readonly top: number;
        /** @description Skip the first n items. */
        readonly skip: number;
        /** @description Include number of items in the response. */
        readonly count: boolean;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export interface operations {
    readonly listJobs: {
        readonly parameters: {
            readonly query?: {
                /** @description Filter jobs by property values. Example: ```$filter=LastExecutionState eq 'FAILED'``` */
                readonly $filter?: string;
                /** @description Expand related entities. */
                readonly $expand?: readonly "Schedule"[];
                /** @description Select properties to be returned. */
                readonly $select?: readonly ("Id" | "Name" | "ActionId" | "LastExecutionState" | "LastExecutionTime" | "NextExecutionTime" | "LastChangedBy" | "LastChangedOn" | "IsSystemJob" | "Parameters")[];
                /** @description Order items by property values. Example: ```$orderby=NextExecutionTime asc``` */
                readonly $orderby?: string;
                /** @description Show only the first n items. */
                readonly $top?: components["parameters"]["top"];
                /** @description Skip the first n items. */
                readonly $skip?: components["parameters"]["skip"];
                /** @description Include number of items in the response. */
                readonly $count?: components["parameters"]["count"];
            };
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Retrieved jobs. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: {
                            readonly results?: readonly components["schemas"]["com.sap.eic.api.Job"][];
                        };
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly createJob: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /** @description Job to create. `Name`, `ActionId` and `Schedule` are required. `Parameters` is optional; if omitted, default values are used. */
        readonly requestBody: {
            readonly content: {
                readonly "application/json": components["schemas"]["com.sap.eic.api.JobCreateRequest"];
            };
        };
        readonly responses: {
            /** @description Job created successfully. */
            readonly 201: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.eic.api.Job"];
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 409: components["responses"]["409"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly countJobs: {
        readonly parameters: {
            readonly query?: {
                /** @description Filter jobs by property values. */
                readonly $filter?: string;
            };
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Number of retrieved jobs. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "text/plain": number;
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly getJob: {
        readonly parameters: {
            readonly query?: {
                /** @description Select properties to be returned. */
                readonly $select?: readonly ("Id" | "Name" | "ActionId" | "LastExecutionState" | "LastExecutionTime" | "NextExecutionTime" | "LastChangedBy" | "LastChangedOn" | "IsSystemJob" | "Parameters")[];
                /** @description Expand related entities. */
                readonly $expand?: readonly "Schedule"[];
            };
            readonly header?: never;
            readonly path: {
                /** @description Job identifier. This is the URL-encoded job name (e.g. `Crun%20Frun%20Data%20Transfer` for `Crun Frun Data Transfer`). Example: ```CleanupTraceEntries``` */
                readonly jobId: components["parameters"]["JobId"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Retrieved job. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.eic.api.Job"];
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly updateJob: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Job identifier. This is the URL-encoded job name (e.g. `Crun%20Frun%20Data%20Transfer` for `Crun Frun Data Transfer`). Example: ```CleanupTraceEntries``` */
                readonly jobId: components["parameters"]["JobId"];
            };
            readonly cookie?: never;
        };
        /** @description Complete `Schedule` object to replace the current schedule including `@odata.type` to identify the concrete schedule subtype. `Parameters` is optional and default values apply for all parameters omitted in the request (if available). */
        readonly requestBody: {
            readonly content: {
                readonly "application/json": components["schemas"]["com.sap.eic.api.JobUpdateRequest"];
            };
        };
        readonly responses: {
            /** @description Job updated successfully. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.eic.api.Job"];
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly deleteJob: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Job identifier. This is the URL-encoded job name (e.g. `Crun%20Frun%20Data%20Transfer` for `Crun Frun Data Transfer`). Example: ```CleanupTraceEntries``` */
                readonly jobId: components["parameters"]["JobId"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Job deleted successfully. */
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
            readonly 409: components["responses"]["409"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly updateJob_2: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Job identifier. This is the URL-encoded job name (e.g. `Crun%20Frun%20Data%20Transfer` for `Crun Frun Data Transfer`). Example: ```CleanupTraceEntries``` */
                readonly jobId: components["parameters"]["JobId"];
            };
            readonly cookie?: never;
        };
        /** @description Fields to update. Only `Parameters` and `Schedule` can be changed and at least one of them should be provided. */
        readonly requestBody: {
            readonly content: {
                readonly "application/json": components["schemas"]["com.sap.eic.api.JobPatchRequest"];
            };
        };
        readonly responses: {
            /** @description Job updated successfully. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.eic.api.Job"];
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly getJobSchedule: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Job identifier. This is the URL-encoded job name (e.g. `Crun%20Frun%20Data%20Transfer` for `Crun Frun Data Transfer`). Example: ```CleanupTraceEntries``` */
                readonly jobId: components["parameters"]["JobId"];
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Retrieved job schedule. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.eic.api.JobSchedule"];
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly updateJobSchedule: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Job identifier. This is the URL-encoded job name (e.g. `Crun%20Frun%20Data%20Transfer` for `Crun Frun Data Transfer`). Example: ```CleanupTraceEntries``` */
                readonly jobId: components["parameters"]["JobId"];
            };
            readonly cookie?: never;
        };
        /** @description Complete schedule object to replace the current schedule. `@odata.type` is required to identify the concrete schedule subtype. */
        readonly requestBody: {
            readonly content: {
                readonly "application/json": components["schemas"]["com.sap.eic.api.JobSchedule"];
            };
        };
        readonly responses: {
            /** @description Job schedule updated successfully. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.eic.api.JobSchedule"];
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
    readonly updateJobSchedule_2: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Job identifier. This is the URL-encoded job name (e.g. `Crun%20Frun%20Data%20Transfer` for `Crun Frun Data Transfer`). Example: ```CleanupTraceEntries``` */
                readonly jobId: components["parameters"]["JobId"];
            };
            readonly cookie?: never;
        };
        /** @description Fields to update. `@odata.type` is required to determine the concrete subtype and cannot be changed. */
        readonly requestBody: {
            readonly content: {
                readonly "application/json": components["schemas"]["com.sap.eic.api.JobSchedulePatchRequest"];
            };
        };
        readonly responses: {
            /** @description Job schedule updated successfully. */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly d?: components["schemas"]["com.sap.eic.api.JobSchedule"];
                    };
                };
            };
            readonly 400: components["responses"]["400"];
            readonly 401: components["responses"]["401"];
            readonly 403: components["responses"]["403"];
            readonly 404: components["responses"]["404"];
            readonly 429: components["responses"]["429"];
            readonly 500: components["responses"]["500"];
            readonly default: components["responses"]["error"];
        };
    };
}
