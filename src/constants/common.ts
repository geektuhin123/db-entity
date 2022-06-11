/* eslint-disable camelcase */
import config from '../config/config';

export interface IColumnMap {
  trend: number;
  unit: number;
  fullYear: number;
  parentTitle: number;
}

// Max file payload size set to 128MB
const MAX_PAYLOAD_SIZE = 128 * 1024 * 1024;
/**
 * Common Constant file
 */

const EXPIRY_TIME = {
  ACCESS_TOKEN_EXPIRY: 60 * 60 * 24,
  REFRESH_TOKEN_EXPIRY: 60 * 60 * 24 * 3,
  LONG_LIVE_TOKEN_EXPIRY: 60 * 60 * 24 * 365,
  RESET_TOKEN_EXPIRY: 60 * 60 * 24 * 7,
  EXTERNAL_TOKEN_EXPIRY: 60 * 5,
  USER_IMAGE_KEY_EXPIRY: 60 * 60 * 24 * 7,
  DB_CACHE_EXPIRY: 1000 * 60 * 60,
};

/**
 * Default IDS that can be used throughout
 */
const DEFAULT_ID = {
  BOT_USER_ID: '0',
  BOT_TENANT_ID: '0',
  BOT_CWS_ID: '0',
  BOT_VISUAL_ID: '0',
};

const DEFAULT_STORAGE_USER_DESTINATION_SETTING = {
  retentionDays: 100,
  retentionLimit: 10,
  storageAlias: 'Turing',
};

/*
 *Support Portal tenant
 */
const DEFAULT_SUPER_TENANT = '2';

/**
 * Default Context
 */
const DEFAULT_CTX = {
  credentials: {
    userId: DEFAULT_ID.BOT_USER_ID,
    tenants: [DEFAULT_ID.BOT_TENANT_ID],
    cws: DEFAULT_ID.BOT_CWS_ID,
    visualId: DEFAULT_ID.BOT_VISUAL_ID,
  },
  skipTenant: false,
};

/**
 * STATUS Codes constants that are used across the application
 */
const STATUS_CODE = {
  ACTIVE: 10,
  DISABLED: 20,
  ON_HOLD: 40,
  FORCE: 30,
  DUPLICATE: 50,
  RLS_JOB_WAITING: 60,
  ARCHIVE: 70,
  SKIPPED: 102,
  SUCCESS: 200,
  RUNNING: 210,
  PARTIAL_SUCCESS: 211,
  FAILED: 400,
  DELETED: 500,
  UNAUTHORIZED: 403,
  PBI_UNAUTHORIZED: 401,
  INVALID: 401,
  QUEUED: 100,
  NOT_FOUND: 404,
};

// RESERVED events - Not in use
// spamreport
// group_resubscribe
// group_unsubscribe
// unsubscribe
// reponse events
export const ALLOWED_SENDGRID_EVENTS = ['DEFERRED', 'DELIVERED', 'BOUNCE', 'DROPPED', 'DELIVERY'];

/**
 * STATUS Codes description that are used across the application
 */
const STATUS_CODE_DESCRIPTION = {};
STATUS_CODE_DESCRIPTION[STATUS_CODE.ACTIVE] = 'Active';
STATUS_CODE_DESCRIPTION[STATUS_CODE.DISABLED] = 'Disabled';
STATUS_CODE_DESCRIPTION[STATUS_CODE.FORCE] = 'Force';
STATUS_CODE_DESCRIPTION[STATUS_CODE.SUCCESS] = 'Success';
STATUS_CODE_DESCRIPTION[STATUS_CODE.RUNNING] = 'Running';
STATUS_CODE_DESCRIPTION[STATUS_CODE.PARTIAL_SUCCESS] = 'Partial Success';
STATUS_CODE_DESCRIPTION[STATUS_CODE.FAILED] = 'Failed';
STATUS_CODE_DESCRIPTION[STATUS_CODE.DELETED] = 'Deleted';

/**
 * Common Params that are used across the application
 */
const COMMON_PARAM = {
  QUERY_LIMIT: 100,
  EXTENDED_QUERY_LIMIT: 1000,
};

/**
 * Params for Microsoft Identity Platform
 */

const GET_USER_DETAILS_API = 'https://graph.microsoft.com/v1.0/me/';
const IMG_API = 'https://graph.microsoft.com/v1.0/me/photos/48x48/$value';

/**
 * User Details Temporary
 */
const USER_DETAILS = {
  createdBy: '1',
  updatedBy: '1',
};

const SUPPORT_TENANT = '2';

const AUTH_SCOPE = {
  ADD_USER_AUTH: 'ADD_USER_AUTH',
};

const PLATFORM_TYPE: Record<string, number> = {
  PowerBI: 1,
};

const USER_AUTHENTICATION_TYPE = {
  NATIVE: '1',
  OFFICE_365: '2',
  LINKEDIN: '3',
  GOOGLE: '4',
  TWITTER: '5',
};

const USER_ERROR_MSG = {
  USER_NOT_FOUND: 'User not found in our books',
  USER_NOT_IN_TENANT: 'User not found in this tenant',
  ACCESS_ALREADY_REQUESTED: 'You have already requested access to this workspace',
  INVALID_CURRENT_PASSWORD: 'Invalid current password',
  USER_ALREADY_MAPPED: 'User email is already mapped with another user',
};

const WRITEBACK_ERRORS = {
  EMPTY_WRITEBACK: {
    type: 'EMPTY_WRITEBACK',
    message: 'There is no data to writeback',
  },
  COLUMN_MISMATCH: {
    type: 'COLUMN_MISMATCH',
    message:
      'Only the following rows and columns should be present in visual during this writeback. If you want to add or remove rows, columns or column groups, please drop or alter your writeback table accordingly',
  },
  COLUMN_MISMATCH_UPDATE_EXISTING: {
    type: 'COLUMN_MISMATCH_UPDATE_EXISTING',
    message: (dimensions: string[]) =>
      `Cannot update existing version with change in dimension(s). Please have only ${dimensions.join(
        ', ',
      )} or drop / alter your writeback table accordingly and writeback as new version`,
  },
  COLUMN_MISMATCH_NO_DELTA_TO_DELTA: {
    type: 'COLUMN_MISMATCH_NO_DELTA_TO_DELTA',
    message:
      'You are switching from a no delta to delta writeback preference which has a different table schema. Please drop the writeback table or configure a new table',
  },
  COLUMN_MISMATCH_DELTA_TO_NO_DELTA: {
    type: 'COLUMN_MISMATCH_DELTA_TO_NO_DELTA',
    message:
      'You are switching from a delta to no delta writeback preference which has a different table schema. Please drop the following columns or configure a new table',
  },
  QUERY_ERROR: {
    type: 'QUERY_ERROR',
    message: 'Error exporting to database',
  },
  MISSING_EXPORT_PARAMS: {
    type: 'MISSING_EXPORT_PARAMS',
    message: 'Missing export params',
  },
  ONEDRIVE_FAILED: {
    type: 'ONEDRIVE_FAILED',
    message: 'Error exporting to onedrive',
  },
  SHAREPOINT_FAILED: {
    type: 'SHAREPOINT_FAILED',
    message: 'Error exporting to sharepoint',
  },
  EXTERNAL_URL_FAILED: {
    type: 'EXTERNAL_URL_FAILED',
    message: 'Error exporting to external url',
  },
};

const USER_ROLES = {
  WORKSPACE_ADMIN: '1',
  WORKSPACE_USER: '2',
  BILLING_ADMIN: '3',
  SUBSCRIPTION_USER: '4',
  VISUAL_USER: '5',
};

const USER_ROLES_SHORTCODE = {
  1: 'workspaceAdmin',
  2: 'workspaceUser',
  3: 'billingAdmin',
  4: 'subscriptionUser',
  5: 'visualUser',
};

const LOGIN_SCOPE = {
  MEMBER_CONSOLE: '2',
  CUSTOM_VISUAL: '3',
  SUBSCRIPTION_USER_AUTHORIZE: '4',
};

const ADMIN_PORTAL_URL = `${config.server.adminPortalUrl}#/`;

const ADMIN_SIGNUP_URL = (token: string, email: string, type: string) =>
  `${ADMIN_PORTAL_URL}login?token=${token}&email=${email}&type=${type}`;

const EMAIL_TEMPLATE = {
  INVITATIONS: {
    SUBJECT: (workspace: string) => `You have been added to Scheduler workspace - ${workspace}`,
  },
  FORGOT_PASSWORD: {
    SUBJECT: 'Turing Password Reset',
  },
  NEW_ADMIN: {
    SUBJECT: `Your Turing workspace has been created successfully `,
  },
};

const COLUMN_MAP: IColumnMap = {
  trend: 10,
  unit: 20,
  fullYear: 30,
  parentTitle: 40,
};

const EXPORT_FORMAT_TYPE: any = {
  ROW: 'flat',
  COLUMN: 'tree',
};

const TREND = {
  INCREASING: 'Increasing',
  DECREASING: 'Decreasing',
};

const SCENARIO_ACCESS = {
  SCENARIOREAD: 'V001',
  SCENARIOWRITE: 'V002',
};

// Subscription user login (RLS)
const { app_port, app_host } = config.server;
const app_protocol = config.server.protocol;
const SUBSCRIPTION_USER_LOGIN_URL = `${app_protocol}://${app_host}:${app_port}/v1/auth/login/o365/consent/`;
const RESUBSCRIBE_EMAIL_URL = (nonce: string, cws: string) => {
  return `${app_protocol}://${app_host}:${app_port}/v1/user/subscription/email/resubscribe/?email=${nonce}&cws=${cws}`;
};
const SUBSCRIPTION_REFRESH_DATASET_CONSENT = `${app_protocol}://${app_host}:${app_port}/v1/auth/login/o365/refresh-dataset/consent/`;

const { adminPortalUrl } = config.server;
const AUTH_SUCCESS_TEMPLATE = (workspace: string, nonce?: string) =>
  `${adminPortalUrl}#/authentication-successful?workspace=${workspace}${
    nonce ? `&nonce=${nonce}` : ''
  }`;
const STORAGE_AUTH_SUCCESS_TEMPLATE = (storage: string, nonce?: string) =>
  `${adminPortalUrl}#/authentication-successful?storage=${storage}${
    nonce ? `&nonce=${nonce}` : ''
  }`;
const AUTH_ERROR_TEMPLATE = (email: string, errorMessage: any) =>
  `${adminPortalUrl}#/authentication-failure?email=${email}&error=${errorMessage}`;
const TENANT_SELECTION_TEMPLATE = (intermediateNonce: string, nonce: string, cws?: string) =>
  `${adminPortalUrl}#/oauth-tenant-selection?intermediateNonce=${intermediateNonce}&nonce=${nonce}${
    cws ? `&cws=${cws}` : ''
  }`;
const REQUEST_ACCESS_TEMPLATE = (nonce: string, email: string) =>
  `${adminPortalUrl}#/request-access-template?nonce=${nonce}&email=${email}`;
const UNAUTHORIZE_ACCESS_TEMPLATE = `${adminPortalUrl}#/unauthorized`;
const PURCHASE_TEMPLATE = (email: string) => `${adminPortalUrl}#/promo?email=${email}`;
const ACCESS_ALREADY_REQUESTED_TEMPLATE = `${adminPortalUrl}#/access-already-requested`;
const TENANT_DISABLE_TEMPLATE = `${adminPortalUrl}#/tenant-disable`;
const SUBSRIPTION_USER_AUTH_SUCCESS_TEMPLATE = (user: string) =>
  `${adminPortalUrl}#/rls/authentication-success?user=${user}`;
const SUBSRIPTION_USER_AUTH_FAILURE_TEMPLATE = (email: string, errorMessage: any) =>
  `${adminPortalUrl}#/rls/authentication-failure?email=${email}&error=${errorMessage}`;
const USER_EMAIL_UNSUBSCRIBE_SUCCESS = (email: string) =>
  `${adminPortalUrl}#/email-unsubscribe-success?email=${email}`;
const USER_EMAIL_UNSUBSCRIBE_FAILED = (errorMessage: string) =>
  `${adminPortalUrl}#/email-unsubscribe-failed?error=${errorMessage}`;
const VISUAL_AUTH_SUCCESS_TEMPLATE = (user: string, nonce?: string) =>
  `${adminPortalUrl}#/authentication-successful?user=${user}${nonce ? `&nonce=${nonce}` : ''}`;
const VISUAL_AUTH_FAILURE_TEMPLATE = (error: string) =>
  `${adminPortalUrl}#/authentication-failure?error=${error}`;
const VISUAL_DOMAIN_FAILURE_TEMPLATE = (
  error: string,
  email: string = '',
  visualDomain: string = '',
) =>
  `${adminPortalUrl}#/domain-failure?error=${error}${email ? `&email=${email}` : ''}${
    visualDomain ? `&visualDomain=${visualDomain}` : ''
  }`;

const USER_EMAIL_RESUBSCRIBE_SUCCESS = (email: string) =>
  `${adminPortalUrl}#/email-resubscribe-success?email=${email}`;
const USER_EMAIL_RESUBSCRIBE_FAILED = (errorMessage: string) =>
  `${adminPortalUrl}#/email-resubscribe-failed?error=${errorMessage}`;

const LICENSE_HANDLE = {
  PRICING: 'pricing',
  ACCOUNT: 'my-account',
};

const SORT = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const USER_GROUP_ROLES = {
  ADMIN: '7',
  MEMBER: '8',
};

const GRAPH_RESOURCE = 'https://graph.microsoft.com';
const POWERBI_REST_API_RESOURCE = 'https://analysis.windows.net/powerbi/api';
const LOGIN_URL = 'https://login.microsoftonline.com/';
const POWERBI_GET_GROUPS_API = 'https://api.powerbi.com/v1.0/myorg/groups';
const POWERBI_GET_GROUPS_API_VERIFY = 'https://api.powerbi.com/v1.0/myorg/groups?$top=1';
const POWERBI_GET_REPORTS_IN_MY_WORKSPACE = 'https://api.powerbi.com/v1.0/myorg/reports';
const ONE_DRIVE_GET_ITEMS = 'https://graph.microsoft.com/v1.0/me/drive/root/children';
const MS_TEAMS_GET_JOINED_TEAMS = 'https://graph.microsoft.com/v1.0/me/joinedTeams';
const SHARE_POINT_REST_API_RESOURCE = 'https://visualbis.sharepoint.com';
const LINKEDIN_LOGIN_URL = 'https://www.linkedin.com/';
const GOOGLE_LOGIN_URL = 'https://oauth2.googleapis.com/';
const TWITTER_REQUEST_TOKEN_URL = 'https://api.twitter.com/oauth/request_token';
const TWITTER_LOGIN_URL = 'https://api.twitter.com/oauth/authorize';
const TWITTER_ACCESSS_TOKEN_URL = 'https://api.twitter.com/oauth/access_token';
const TWITTER_USER_DETAILS_URL = 'https://api.twitter.com/1.1/account/verify_credentials.json';
/**
 * queue channel to handle subscription create and update operations.
 */
const ORCHESTRATOR_SUBSCRIPTION_EVENT_QUEUE = 'turing:subscription-event:orchestrator';

const ORCHESTRATOR_EMAIL_EVENT_QUEUE = 'turing:email-event:orchestrator';

const ORCHESTRATOR_EMAIL_NOTIFICATION_QUEUE_NAME = 'turing:email-notification:orchestrator';

/**
 * All constants related to comment service
 */
const ORCHESTRATOR_COMMENT_EVENT_QUEUE_NAME = 'turing:comment-event:orchestrator';
const ORCHESTRATOR_VISUAL_EVENT_QUEUE_NAME = 'turing:visual-event:orchestrator';

/**
 * All constants related to writeback service
 */
const WORKER_WRITEBACK_EVENT_QUEUE_NAME = 'turing:writeback-event:worker';
/**
 * All constants related to automation service
 */
const ALLOWED_AUTOMATION_JOBS = {
  expiredTenant: {
    eventName: 'turing:common-del-inactive-tenant:daily:orchestrator',
  },
  softDeletes: {
    eventName: 'turing:common-purge-soft-deletes:daily:orchestrator',
  },
};

const COMMENT_ACTION = {
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
};

const COMMENT_MESSAGES = {
  COMMENT_NOTIFICATION_JOB_FAILED: 'commentNotificationQueue: Failed to notify comment users.',
  COMMENT_NOTIFICATION_JOB_SUCCESS:
    'commentNotificationQueue: Successfully sent comment notification.',
};

const VISUAL_SCOPES = {
  VISUAL_WRITE: 1,
  VISUAL_READ: 2,
};

const COMMENT_NOTIFICATION_TYPE = {
  IMMEDIATE: 1,
  DIGEST: 2,
};

const COMMENT_DESTINATION_TYPE = {
  EMAIL: 1,
  MS_TEAMS: 2,
};

const COMMENT_REDIS_EVENT = {
  VISUAL_CREATE: 'visual_create',
  VISUAL_UPDATE: 'visual_update',
  COMMENT_CREATE: 'comment_create',
  COMMENT_UPDATE: 'comment_update',
  THREAD_ASSIGNEE_ADDED: 'thread_assignee_added',
  THREAD_STATUS_ADDED: 'thread_status_added',
};

const ASSET_TRACKING_EVENT = 'asset_tracking';

const COMMENT_ACCESS_TYPE = {
  INTERNAL: 1,
  RESTRICTED: 2,
  PUBLIC: 3,
};

const FROM_EMAIL = 'no-reply@inforiver.com';

const SIGNALS = {
  SIGINT: 2,
  SIGTERM: 3,
};

/**
 * Subscription types
 */
const SUBSCRIPTION_TYPES = {
  OS: 1,
  RLS: 2,
  SUPERSET_POC: 3,
  REPORT_LAYOUT: 4,
  OTS: 5,
};

const SHARE_POINT_DRIVES = 'SHARE_POINT_DRIVES';
const SHARE_POINT_DRIVE_CHILDREN = 'SHARE_POINT_DRIVE_CHILDREN';
const SHARE_POINT_DRIVE_ITEM_CHILDREN = 'SHARE_POINT_DRIVE_ITEM_CHILDREN';

const MY_WORKSPACE_ID = 'My Workspace';
const MY_SHARED_WORKSPACE_ID = 'My Workspace(shared)';

const GET_LINKEDIN_USER_DETAILS_API = `https://api.linkedin.com/v2/me?projection=(id, localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))`;
const GET_LINKEDIN_USER_EMAIL_API = `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))`;

const SUBSCRIPTION_EMAIL_TYPE = {
  SUBSCRIBERS: 1,
  FAILURE_NOTIFIERS: 2,
};
const DATASET_REFRESH_SCOPES = ['Dataset.ReadWrite.All'];

const O365_USER_SCOPES = ['Dataset.Read.All', 'Report.Read.All', 'Workspace.Read.All'];

const SCHEDULER_SCOPE = '2';
const WORKSPACE_SCOPE = '1';

const MILESTONE_0 = { id: 'M-00', desc: 'Start Job' };
const MILESTONE_001 = { id: 'M-001', desc: 'Refresh Dataset' };
const MILESTONE_002 = { id: 'M-002', desc: 'Validation' };
const MILESTONE_1 = { id: 'M-01', desc: 'Load Report' };
const MILESTONE_2 = { id: 'M-02', desc: 'Collect Visual Data' };
const MILESTONE_3 = { id: 'M-03', desc: 'Generate Attachment' };
const MILESTONE_4 = { id: 'M-04', desc: 'Deliver to Destinations' };

const MILESTONES = [
  MILESTONE_0,
  MILESTONE_001,
  MILESTONE_002,
  MILESTONE_1,
  MILESTONE_2,
  MILESTONE_3,
  MILESTONE_4,
];

const APPLICATION_ENTITY = {
  SCHEDLER: 1,
  WRITEBACK: 2,
};

const SEND_TEST_EMAIL_IDENTIFIER = `Send Test Email`;

const WRITEBACK_COLUMN_PREFIX = 'ir';

// domain to allow guest user to login into visual
const GUEST_USER_ALLOWED_DOMAIN = 'lumel.com';

// PUPPETEER_ARGS for initializing puppeteer
// PUPPETEER running on docker was failing - had to introduce the flag.
// https://stackoverflow.com/questions/59087200/google-chrome-failed-to-move-to-new-namespace
const PUPPETEER_ARGS = [
  '--disable-infobars',
  'allow-modals',
  '--disable-dev-shm-usage',
  '--no-sandbox',
  '--disable-features=IsolateOrigins,site-per-process',
];

const REPORT_VALIDATION_WAIT_TIME = 60 * 1000;

const SIGNED_MSG_EXPIRY_TIME_IN_SECS = 30 * 60;

const SMALL_SAFETY_TIME = 2 * 1000;

const SCHEDULER_JOB_TYPE = {
  SCHEDULED: 1,
  ON_DEMAND: 2,
  TEST: 3,
  OTS: 4,
};

const INFORIVER = 'inforiver';

const SCHEDULE_EMAIL_LIMIT = {
  OS: 100,
  RLS: 10,
  TEST: 5,
  FAILURE: 10,
};

const IR_CHANGE_DESCRIPTION = {
  CREATED_IN_VISUAL: 'Created in Visual',
  ASSIGNED_DATA: 'Assigned Data',
  EDITED_IN_VISUAL: 'Edited in Visual',
  AGGREGATION_APPLIED_IN_VISUAL: 'Aggregation applied in Visual',
  VISUAL_CALCULATION_OR_ASSIGNED_DATA: 'Visual Calculation or Assigned Data',
  VISUAL_CALCULATION_APPLIED: 'Visual Calculation Applied',
  DELETED: 'Deleted',
};

const IR_CHANGE_CODE = {
  [IR_CHANGE_DESCRIPTION.CREATED_IN_VISUAL]: 'IR000',
  [IR_CHANGE_DESCRIPTION.ASSIGNED_DATA]: 'IR001',
  [IR_CHANGE_DESCRIPTION.EDITED_IN_VISUAL]: 'IR100',
  [IR_CHANGE_DESCRIPTION.AGGREGATION_APPLIED_IN_VISUAL]: 'IR101',
  [IR_CHANGE_DESCRIPTION.VISUAL_CALCULATION_OR_ASSIGNED_DATA]: 'IR102',
  [IR_CHANGE_DESCRIPTION.VISUAL_CALCULATION_APPLIED]: 'IR103',
  [IR_CHANGE_DESCRIPTION.DELETED]: 'IR500',
};

const EVENT_ACTION = {
  'M-02-PDF': 'GetPDFData',
  'M-02-EXCEL': 'GetExcelData',
  'M-03-PDF': 'GeneratePDF',
  'M-03-EXCEL': 'GenerateExcel',
  'M-02-BOOKMARK': 'AppliedBookmark',
  'M-02-Combined': 'GetCombinedPDFData',
  'M-03-Combined': 'GenerateCombinedPDF',
};

const SUBSCRIPTION_SET_KEY = 'subscription_email';
const COMMENT_MENTION_SET_KEY = 'comment_mention';
const ORG_USER_SET_KEY = 'user_org';
const COMMENT_ORG_USER_MENTION_SET_KEY = 'comment_user_mention_org';

const COMMENT_REPLY_TYPE = {
  ASSIGNEE: 'assignee',
  STATUS: 'status',
};

/**
 * COMMENT custom thread STATUS Codes
 */
const COMMENT_THREAD_STATUS_CODE = {
  '10': 'Open',
  '20': 'Resolved',
};

const INFORIVER_ENTERPRISE_FEATURES = {
  SCHEDULER: 'scheduler',
  COMMENTS: 'comments',
  WRITEBACK: 'writeback',
};

const JSON_COLUMNS = [
  'settings',
  'jobMeta',
  'reportAdditionalSetting',
  'writebackMeta',
  'licenseMeta',
  'commentMeta',
  'errorMeta',
  'meta',
  'featureMeta',
  'visualMeta',
  'schedule',
  'userTokenMeta',
  'usersAllowed',
  'writebackAllowedUsers',
  'themeMeta',
  'assetMeta',
  'valueMeta',
  'columnMeta',
];
const WB_DESTINATION = {
  SQLSERVER: {
    DISPLAY_NAME: 'SQL Server',
    TYPE: 'mssql',
    TYPE_ID: 8,
    LIMIT: 75,
    ORM_PARAM_TYPE: 'mssql',
    DRIVER: 'mssql',
  },
  MYSQL: {
    DISPLAY_NAME: 'MySQL',
    TYPE: 'mysql',
    TYPE_ID: 9,
    LIMIT: 5000,
    ORM_PARAM_TYPE: 'mysql',
    DRIVER: 'mysql',
  },
  AZURESQL: {
    DISPLAY_NAME: 'Azure SQL',
    TYPE: 'azuresql',
    TYPE_ID: 10,
    LIMIT: 75,
    ORM_PARAM_TYPE: 'mssql',
    DRIVER: 'mssql',
  },
  POSTGRES: {
    DISPLAY_NAME: 'PostgreSQL',
    TYPE: 'postgres',
    TYPE_ID: 11,
    LIMIT: 5000,
    ORM_PARAM_TYPE: 'postgres',
    DRIVER: 'pg',
  },
  ORACLE: {
    DISPLAY_NAME: 'ORACLE',
    TYPE: 'oracle',
    TYPE_ID: 12,
    LIMIT: 5000,
    ORM_PARAM_TYPE: 'oracle',
    DRIVER: 'oracledb',
  },

  SNOWFLAKE: {
    DISPLAY_NAME: 'Snowflake',
    TYPE: 'snowflake',
    TYPE_ID: 13,
    ORM_PARAM_TYPE: 'snowflake',
    // snowflake doesn't have any driver but is similar to postgres
    DRIVER: 'postgres',
  },
  BIGQUERY: {
    DISPLAY_NAME: 'BigQuery',
    TYPE: 'bigquery',
    TYPE_ID: 14,
  },
  SHAREPOINT: {
    DISPLAY_NAME: 'SharePoint',
    TYPE: 'SharePoint',
    TYPE_ID: 4,
  },
  ONEDRIVE: {
    DISPLAY_NAME: 'OneDrive',
    TYPE: 'OneDrive',
    TYPE_ID: 2,
  },
  EXTERNAL_URL: {
    DISPLAY_NAME: 'URL',
    TYPE: 'ExternalURL',
    TYPE_ID: 5,
  },
  HANA: {
    DISPLAY_NAME: 'SAP HANA',
    LIMIT: 5000,
    DB_TYPE: 'hana',
    TYPE_ID: 15,
    TYPE: 'hana',
    DRIVER: 'postgres',
  },
};

const WB_CONNECTION_MAP = {
  mssql: [
    'connectionId',
    'connectionName',
    'databaseType',
    'url',
    'host',
    'port',
    'url',
    'username',
    'password',
    'schema',
    'database',
    'options',
  ],
  mysql: [
    'connectionId',
    'connectionName',
    'databaseType',
    'host',
    'url',
    'port',
    'url',
    'username',
    'password',
    'database',
    'options',
  ],
  azuresql: [
    'connectionId',
    'connectionName',
    'databaseType',
    'host',
    'url',
    'port',
    'url',
    'username',
    'password',
    'schema',
    'database',
    'options',
  ],
  postgres: [
    'connectionId',
    'connectionName',
    'databaseType',
    'host',
    'url',
    'port',
    'url',
    'username',
    'password',
    'schema',
    'database',
    'options',
  ],
  oracle: [
    'connectionId',
    'connectionName',
    'databaseType',
    'host',
    'url',
    'port',
    'url',
    'username',
    'password',
    'database',
    'options',
  ],
  snowflake: [
    'connectionId',
    'connectionName',
    'databaseType',
    'url',
    'account',
    'username',
    'password',
    'schema',
    'url',
    'database',
    'warehouse',
    'role',
    'options',
  ],
  bigquery: [
    'connectionId',
    'connectionName',
    'databaseType',
    'url',
    'projectId',
    'datasetId',
    'email',
    'url',
    'privateKey',
  ],
  hana: [
    'connectionId',
    'connectionName',
    'databaseType',
    'host',
    'url',
    'port',
    'username',
    'password',
    'schema',
    'url',
    'database',
    'options',
  ],
};

const WB_WEBHOOK = {
  TYPE: 'Webhook',
};

const WB_TYPE = {
  NO_DELTA: 'noDelta',
  DELTA_ON_CELL_DATA: 'deltaOnCellData',
};
const WB_VERSION_TYPE = {
  CREATE_NEW: 'createNew',
  UPDATE_EXISTING: 'updateExisting',
};

const WB_FILTER = {
  NONE: 'none',
  COMMENTS_ONLY: 'commentsOnly',
  CALCULATED_ROWS: 'calculatedRows',
  CUSTOM_FILTER: 'customFilter',
};

const WB_DATA_TYPES = {
  TIME_STAMP: 'timestamp',
  BIG_INT: 'bigInteger',
  TEXT: 'text',
  FLOAT: 'float',
  INT: 'integer',
};

const WB_CONNECTION_OWNER = {
  ADMIN: 1,
  USER: 2,
};

const WB_ENVIRONMENT = {
  SERVICE: 'Service',
  DESKTOP: 'Desktop',
  REPORT_SERVER: 'Report Server',
};

const FEEDBACKURL = 'https://community.inforiver.com/question/ideas/';

const TENANT_CUSTOM_ASSET_TYPE = {
  IMAGES: 1,
  ICONS: 2,
  FONTS: 3,
};

const TENANT_CUSTOM_ASSET_TYPE_DESCRIPTION = {};
TENANT_CUSTOM_ASSET_TYPE_DESCRIPTION[TENANT_CUSTOM_ASSET_TYPE.IMAGES] = 'images';
TENANT_CUSTOM_ASSET_TYPE_DESCRIPTION[TENANT_CUSTOM_ASSET_TYPE.ICONS] = 'icons';
TENANT_CUSTOM_ASSET_TYPE_DESCRIPTION[TENANT_CUSTOM_ASSET_TYPE.FONTS] = 'fonts';

const WB_SOURCE_VALUES = {
  NATIVE: 'Native',
  VISUAL_MEASURE: 'Visual Measure',
  CALCULATED_ROW: 'Calculated Row',
  STATIC_ROW: 'Static Row',
  HEADERS: 'Headers',
  COMMENTS: 'Comments',
  NOTES: 'Notes',
};

const PROPERTY_ENABLED_DATA_FLOW = 'enableDataflowTracking';
const PROPERTY_GROUPS_IN_ORG_LIST = 'enableGroupsInOrgList';
const PROPERTY_SINGLE_SENDER_IDENTITY = 'enableSingleSenderIdentity';
const PROPERTY_ENABLE_USER_CONNECTION_CONFIGURATION = 'enableUserConnectionConfiguration';
const PROPERTY_FROM_EMAIL_ADDRESS = 'fromEmailAddress';

const ALLOWED_TENANT_SETTING = {
  GENERAL_SETTINGS: {
    name: 'General Settings',
    jobRetry: 10,
    jobTimeout: 60,
    visualGuid: '2B7A5FD2992D434DAE0B149479307B7B',
    archiveThreshold: 90,
    showPageConfig: true,
    enableGroupsInOrgList: false,
    enableDataflowTracking: false,
    enableSingleSenderIdentity: true,
    enableUserConnectionConfiguration: true,
  },
  EMAIL_SETTINGS: {
    name: 'EMAIL_SETTINGS',
    defaultDestination: {
      subscriptionEmails: [
        {
          emailAddress: 'admin@inforiver.com',
        },
      ],
    },
    fromEmailAddress: 'no-reply@inforiver.com',
    dkim: {
      domainName: 'inforiver.com',
      keySelector: 'email',
      privateKey: '',
    },
  },
  CUSTOM_CALENDAR: {
    name: 'Custom Calendar',
  },
  SERVICE_PRINCIPAL: {
    name: 'Service Principal',
    clientId: '',
    clientSecret: '',
    tenantId: '',
  },
  RETENTION_POLICIES: {
    name: 'Retention Policies',
    expiredTenantRetentionDays: 180,
  },
};

const ALLOWED_DB_TYPES = ['postgres', 'mssql'];
const STORED_PROCEDURES = {
  mssql: {
    DELETE_INACTIVE_TENANTS: `EXEC [${config.database.schema}].[sp_del_inactive_tenants] @NoOfDays = @0, @TenantId = @1`,
    RETENTION_OF_SOFT_DELETES: `EXEC [${config.database.schema}].[sp_retention_soft_deletes] @NoOfDays = @0`,
  },
  postgres: {
    DELETE_INACTIVE_TENANTS: `CALL ${config.database.schema}.sp_del_inactive_tenants($1, $2)`,
    RETENTION_OF_SOFT_DELETES: `CALL ${config.database.schema}.sp_retention_soft_deletes($1)`,
  },
};

const JOB_USAGE_FEATURE = {
  SCHEDULER: 1,
  WRITEBACK: 2,
  COMMENT: 3,
  TENANT: 4,
};

const CUSTOM_COLUMN_TYPE = {
  TEXT: 1,
  SINGLE_SELECT: 2,
  MULTI_SELECT: 3,
  DATE: 4,
  COMMENTS: 5,
  NUMBER: 6,
  PERSON: 7,
  TIME: 8,
  LAST_UPDATED_BY: 9,
  LAST_UPDATED_AT: 10,
};

const RESERVED_COLUMN_NAMES = ['IR_WRITEBACK_TIMESTAMP', 'IR_ID'];

const IR_META_COLUMNS = [
  'IR_CHANGE_DESCRIPTION',
  'IR_ID',
  'IR_WRITEBACK_VERSION',
  'IR_COMMENTS',
  'IR_DELTA_VALUE',
  'IR_CHANGE_TYPE',
  'IR_WRITEBACK_USER',
  'IR_WRITEBACK_TIMESTAMP',
  'VALUE_COLUMN_NAME',
  'VALUE',
  'LAST_UPDATED',
  'SOURCE',
  'IR_NOTES',
  'IR_CELL_META',
  'VALUE_TEXT',
];

const IR_CAMELCASE_META_COLUMNS = [
  'IrChangeDescription',
  'IrId',
  'IrWritebackVersion',
  'IrComments',
  'IrDeltaValue',
  'IrChangeType',
  'IrWritebackUser',
  'IrWritebackTimestamp',
  'ValueColumnName',
  'Value',
  'LastUpdated',
  'Source',
  'Ir_notes',
  'IrCellMeta',
  'ValueText',
];

const INCOMING_META_COLUMNS = [
  'Value Column Name',
  'Value',
  'Last Updated',
  'Source',
  'ir_notes',
  '_cellMeta',
];

// audit service queue
const AUDIT_QUEUE = 'turing:audit:worker';

const CUSTOM_COLUMN_REDIS_EVENT = {
  COLUMN_CREATE: 'column_create',
  COLUMN_UPDATE: 'column_update',
  COLUMN_DELETE: 'column_delete',
  VALUE_CREATE: 'value_create',
  VALUE_UPDATE: 'value_update',
  VALUE_DELETE: 'value_delete',
  COLUMN_RESET: 'column_reset',
};
const WRITEBACK_REDIS_EVENT = {
  EXPORT_DATA: 'export_data',
  CREATE_COLLAB: 'create_collab',
  UPDATE_COLLAB: 'update_collab',
  CREATE_COLLAB_SERIES: 'create_collab_series',
  EDIT_COLLAB_SERIES: 'edit_collab_series',
  DELETE_COLLAB_SERIES: 'delete_collab_series',
  UPSERT_COLLAB_DATA: 'upsert_collab_data',
};

const VISUAL_MODE = {
  READ: 1,
  EDIT: 2,
};

const WB_MODE = {
  EXPORT: 1,
  COLLAB: 2,
};

const AUDIT_VALUE_COLUMN_TYPE = {
  CUSTOM_COLUMN: 1,
  CUSTOM_COLUMN_VALUE: 2,
};

export {
  AUDIT_VALUE_COLUMN_TYPE,
  PROPERTY_ENABLE_USER_CONNECTION_CONFIGURATION,
  RESERVED_COLUMN_NAMES,
  IR_META_COLUMNS,
  INCOMING_META_COLUMNS,
  IR_CAMELCASE_META_COLUMNS,
  JOB_USAGE_FEATURE,
  PROPERTY_FROM_EMAIL_ADDRESS,
  PROPERTY_SINGLE_SENDER_IDENTITY,
  PROPERTY_GROUPS_IN_ORG_LIST,
  PROPERTY_ENABLED_DATA_FLOW,
  ALLOWED_TENANT_SETTING,
  ALLOWED_DB_TYPES,
  STORED_PROCEDURES,
  JSON_COLUMNS,
  COMMENT_MENTION_SET_KEY,
  COMMENT_ORG_USER_MENTION_SET_KEY,
  ORG_USER_SET_KEY,
  SUBSCRIPTION_SET_KEY,
  EVENT_ACTION,
  INFORIVER,
  SMALL_SAFETY_TIME,
  REPORT_VALIDATION_WAIT_TIME,
  MILESTONE_0,
  MILESTONE_001,
  MILESTONE_1,
  MILESTONE_2,
  MILESTONE_3,
  MILESTONE_4,
  MILESTONES,
  DATASET_REFRESH_SCOPES,
  O365_USER_SCOPES,
  SHARE_POINT_DRIVES,
  SHARE_POINT_DRIVE_CHILDREN,
  SHARE_POINT_DRIVE_ITEM_CHILDREN,
  ONE_DRIVE_GET_ITEMS,
  MY_SHARED_WORKSPACE_ID,
  MY_WORKSPACE_ID,
  STATUS_CODE,
  STATUS_CODE_DESCRIPTION,
  COMMON_PARAM,
  IMG_API,
  EXPIRY_TIME,
  USER_DETAILS,
  GET_USER_DETAILS_API,
  DEFAULT_CTX,
  MAX_PAYLOAD_SIZE,
  PLATFORM_TYPE,
  USER_AUTHENTICATION_TYPE,
  USER_ROLES,
  EMAIL_TEMPLATE,
  USER_ERROR_MSG,
  SCENARIO_ACCESS,
  ADMIN_PORTAL_URL,
  ADMIN_SIGNUP_URL,
  DEFAULT_SUPER_TENANT,
  AUTH_SUCCESS_TEMPLATE,
  AUTH_ERROR_TEMPLATE,
  TENANT_SELECTION_TEMPLATE,
  REQUEST_ACCESS_TEMPLATE,
  PURCHASE_TEMPLATE,
  SUBSRIPTION_USER_AUTH_SUCCESS_TEMPLATE,
  USER_EMAIL_UNSUBSCRIBE_SUCCESS,
  USER_EMAIL_UNSUBSCRIBE_FAILED,
  VISUAL_AUTH_SUCCESS_TEMPLATE,
  USER_EMAIL_RESUBSCRIBE_SUCCESS,
  USER_EMAIL_RESUBSCRIBE_FAILED,
  TENANT_DISABLE_TEMPLATE,
  LICENSE_HANDLE,
  ACCESS_ALREADY_REQUESTED_TEMPLATE,
  UNAUTHORIZE_ACCESS_TEMPLATE,
  SUPPORT_TENANT,
  AUTH_SCOPE,
  EXPORT_FORMAT_TYPE,
  TREND,
  SORT,
  LOGIN_SCOPE,
  USER_GROUP_ROLES,
  COLUMN_MAP,
  POWERBI_REST_API_RESOURCE,
  GRAPH_RESOURCE,
  LOGIN_URL,
  POWERBI_GET_GROUPS_API,
  POWERBI_GET_GROUPS_API_VERIFY,
  ORCHESTRATOR_SUBSCRIPTION_EVENT_QUEUE,
  ORCHESTRATOR_EMAIL_EVENT_QUEUE,
  ORCHESTRATOR_COMMENT_EVENT_QUEUE_NAME,
  ORCHESTRATOR_VISUAL_EVENT_QUEUE_NAME,
  ALLOWED_AUTOMATION_JOBS,
  SIGNALS,
  COMMENT_ACTION,
  VISUAL_SCOPES,
  COMMENT_NOTIFICATION_TYPE,
  SUBSCRIPTION_TYPES,
  SUBSCRIPTION_USER_LOGIN_URL,
  COMMENT_MESSAGES,
  COMMENT_DESTINATION_TYPE,
  FROM_EMAIL,
  POWERBI_GET_REPORTS_IN_MY_WORKSPACE,
  DEFAULT_STORAGE_USER_DESTINATION_SETTING,
  MS_TEAMS_GET_JOINED_TEAMS,
  SHARE_POINT_REST_API_RESOURCE,
  COMMENT_REDIS_EVENT,
  ORCHESTRATOR_EMAIL_NOTIFICATION_QUEUE_NAME,
  SUBSCRIPTION_REFRESH_DATASET_CONSENT,
  USER_ROLES_SHORTCODE,
  RESUBSCRIBE_EMAIL_URL,
  VISUAL_AUTH_FAILURE_TEMPLATE,
  LINKEDIN_LOGIN_URL,
  GET_LINKEDIN_USER_DETAILS_API,
  GET_LINKEDIN_USER_EMAIL_API,
  SUBSCRIPTION_EMAIL_TYPE,
  GOOGLE_LOGIN_URL,
  COMMENT_ACCESS_TYPE,
  STORAGE_AUTH_SUCCESS_TEMPLATE,
  WRITEBACK_ERRORS,
  APPLICATION_ENTITY,
  SEND_TEST_EMAIL_IDENTIFIER,
  WRITEBACK_COLUMN_PREFIX,
  SUBSRIPTION_USER_AUTH_FAILURE_TEMPLATE,
  GUEST_USER_ALLOWED_DOMAIN,
  PUPPETEER_ARGS,
  SIGNED_MSG_EXPIRY_TIME_IN_SECS,
  SCHEDULER_JOB_TYPE,
  SCHEDULE_EMAIL_LIMIT,
  IR_CHANGE_CODE,
  IR_CHANGE_DESCRIPTION,
  VISUAL_DOMAIN_FAILURE_TEMPLATE,
  TWITTER_REQUEST_TOKEN_URL,
  TWITTER_LOGIN_URL,
  TWITTER_ACCESSS_TOKEN_URL,
  TWITTER_USER_DETAILS_URL,
  COMMENT_REPLY_TYPE,
  COMMENT_THREAD_STATUS_CODE,
  INFORIVER_ENTERPRISE_FEATURES,
  FEEDBACKURL,
  WB_TYPE,
  WB_VERSION_TYPE,
  WB_DATA_TYPES,
  WB_CONNECTION_OWNER,
  WB_DESTINATION,
  WB_CONNECTION_MAP,
  ASSET_TRACKING_EVENT,
  WB_ENVIRONMENT,
  TENANT_CUSTOM_ASSET_TYPE,
  WB_SOURCE_VALUES,
  TENANT_CUSTOM_ASSET_TYPE_DESCRIPTION,
  WB_WEBHOOK,
  CUSTOM_COLUMN_TYPE,
  WORKER_WRITEBACK_EVENT_QUEUE_NAME,
  WRITEBACK_REDIS_EVENT,
  VISUAL_MODE,
  WB_MODE,
  WB_FILTER,
  SCHEDULER_SCOPE,
  WORKSPACE_SCOPE,
  AUDIT_QUEUE,
  CUSTOM_COLUMN_REDIS_EVENT,
};
