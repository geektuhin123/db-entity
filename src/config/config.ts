/**
 * Config Parser file
 * ===================
 *
 * This will parse the configuration parameters from Environment
 * or from the config.json file
 *
 */
const dotenv = require('dotenv');
const fernet = require('fernet');
const url = require('url');

const EnQuadSeparator = ' ';

// Environment Variable Processing
dotenv.config();

// Private Tenant License Information
let privateTenantLicense = null;
if (process.env.BOOTSTRAP_ON_PREMISE_WORKSPACE_LICENSE) {
  const secret = new fernet.Secret('VmFsUS12NnFUbC1JR2o5V3hfX0U5czEteWhhZy1EZVY=');
  const token = new fernet.Token({
    secret,
    token: process.env.BOOTSTRAP_ON_PREMISE_WORKSPACE_LICENSE,
    ttl: 0,
  });
  const { publicKey, privateKey, license_meta: licenseMeta } = JSON.parse(token.decode());
  privateTenantLicense = { publicKey, privateKey, licenseMeta };
}

const config = {
  general: {
    name: 'Turing API Server',
    appName: process.env.APP_NAME ? process.env.APP_NAME : 'Inforiver',
    version: '1.0',
    isDev: process.env.IS_DEV ? process.env.IS_DEV : 'Y',
    isTest: process.env.IS_TEST ? process.env.IS_TEST : false,
    logLevel: process.env.LOG_LEVEL || 'debug',
    enableSentry: process.env.ENABLE_SENTRY ? process.env.ENABLE_SENTRY : false,
    disableAudit: process.env.DISABLE_AUDIT ? process.env.DISABLE_AUDIT : false,
    validateReport: process.env.VALIDATE_REPORT ? process.env.VALIDATE_REPORT : 'SET',
    validateReportWaitTime: process.env.VALIDATE_REPORT_WAIT_TIME
      ? Number(process.env.VALIDATE_REPORT_WAIT_TIME)
      : 35000,
    privateTenant: process.env.ON_PREMISE ? Number(process.env.ON_PREMISE) : 1,
    appLogo: process.env.ADMIN_PORTAL_URL
      ? `${process.env.ADMIN_PORTAL_URL}public/img/inforiver_logo.png`
      : `https://addons.inforiver.com/public/img/inforiver_logo.png`,
    visualSupportedGuid:
      process.env.SUPPORTED_VISUAL_GUID || 'Enterprise2B7A5FD2992D434DAE0B149479307B7B',
    chartsVisualSupportedGuid: process.env.CHARTS_SUPPORTED_VISUAL_GUID || 'InforiverCharts',
    timeout: process.env.API_TIMEOUT ? Number(process.env.API_TIMEOUT) : 115000,
    pageLoadWaitTime: process.env.PAGE_LOAD_WAIT_TIME
      ? Number(process.env.PAGE_LOAD_WAIT_TIME)
      : 25 * 1000,
    splitCategoryLabelIdentifier: process.env.SPLIT_CATEGORY_LABEL_IDENTIFIER
      ? process.env.SPLIT_CATEGORY_LABEL_IDENTIFIER
      : EnQuadSeparator,
    defaultOrgUserPageSize: process.env.ORG_USER_DEFAULT_SIZE
      ? Number(process.env.ORG_USER_DEFAULT_SIZE)
      : 30,
    randomCasaBlanca: process.env.RANDOM_CASA_BLANCA === 'aye',
  },
  server: {
    host: process.env.HOST ? process.env.HOST : '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 12000,
    app_host: process.env.ADMIN_PORTAL_URL
      ? (url.parse(process.env.ADMIN_PORTAL_URL) as any).hostname
      : 'localhost',
    app_port: process.env.ADMIN_PORTAL_URL
      ? (url.parse(process.env.ADMIN_PORTAL_URL) as any).port || '443'
      : '12000',
    protocol: process.env.PROTOCOL ? process.env.PROTOCOL : 'https',
    adminPortalUrl: process.env.ADMIN_PORTAL_URL
      ? process.env.ADMIN_PORTAL_URL
      : 'https://localhost:8081/',
    secret: process.env.SECRET
      ? process.env.SECRET
      : '69aU74C-60f9guU=IlVt96Qf_9t8Jb1YyzrQ_fS5DklVx',
    encryptionKey: process.env.ENCRYPTION_KEY
      ? process.env.ENCRYPTION_KEY
      : 'XljW9N0lVwlDNs8BJhRu6o',
    salt: process.env.SALT ? process.env.SALT : 'C94arcUG3O9Ci0RHJUcQPJOwRUuEYMsgALC',
    extraSalt: process.env.EXTRA_SALT ? process.env.EXTRA_SALT : 'ZwqU6x5r20',
    shopUrl: process.env.SHOP_URL ? process.env.SHOP_URL : 'https://valqdev.wpengine.com/',
    shopSignature: process.env.SHOP_SIGNATURE
      ? process.env.SHOP_SIGNATURE
      : 'WRzUnUspBJoeeTzqgZYOJCSm-xhbg6h_LIhv8wGJqMa=',
  },
  ssl: {
    private: process.env.SSL_KEY ? process.env.SSL_KEY : null,
    public: process.env.SSL_CRT ? process.env.SSL_CRT : null,
  },
  bootstrap: {
    isOnPremise: !!(
      process.env.BOOTSTRAP_ON_PREMISE && process.env.BOOTSTRAP_ON_PREMISE === 'true'
    ),
    workspaceName: process.env.BOOTSTRAP_ON_PREMISE_WORKSPACE_NAME
      ? process.env.BOOTSTRAP_ON_PREMISE_WORKSPACE_NAME
      : '',
    workspaceAdmin: process.env.BOOTSTRAP_ON_PREMISE_WORKSPACE_ADMIN
      ? process.env.BOOTSTRAP_ON_PREMISE_WORKSPACE_ADMIN
      : '',
    workspaceLicense: process.env.BOOTSTRAP_ON_PREMISE_WORKSPACE_LICENSE
      ? process.env.BOOTSTRAP_ON_PREMISE_WORKSPACE_LICENSE
      : '',
    workspaceDomain: process.env.BOOTSTRAP_ON_PREMISE_WORKSPACE_DOMAIN
      ? process.env.BOOTSTRAP_ON_PREMISE_WORKSPACE_DOMAIN
      : '',
  },
  database: {
    type: process.env.DB_TYPE ? process.env.DB_TYPE : 'postgres',
    host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER ? process.env.DB_USER : 'turing',
    password: process.env.DB_PASS ? process.env.DB_PASS : 'turing',
    database: process.env.DB_NAME ? process.env.DB_NAME : 'turing',
    schema: process.env.DB_SCHEMA ? process.env.DB_SCHEMA : 'public',
    sslCert: process.env.SSL_CERT,
    options: {
      encrypt: !!(process.env.DB_ENCRYPT && process.env.DB_ENCRYPT === 'true'),
      packetSize: 32768,
    },
  },
  jobUsageDatabase: {
    name: process.env.JOB_USAGE_CONNECTION_NAME
      ? process.env.JOB_USAGE_CONNECTION_NAME
      : 'jobUsage',
    type: process.env.JOB_USAGE_DB_TYPE ? process.env.JOB_USAGE_DB_TYPE : 'postgres',
    host: process.env.JOB_USAGE_DB_HOST ? process.env.JOB_USAGE_DB_HOST : 'localhost',
    port: process.env.JOB_USAGE_DB_PORT ? Number(process.env.JOB_USAGE_DB_PORT) : 5432,
    username: process.env.JOB_USAGE_DB_USER ? process.env.JOB_USAGE_DB_USER : 'turing_job_usage',
    password: process.env.JOB_USAGE_DB_PASS ? process.env.JOB_USAGE_DB_PASS : 'turing_job_usage',
    database: process.env.JOB_USAGE_DB_NAME ? process.env.JOB_USAGE_DB_NAME : 'turing_job_usage',
    schema: process.env.JOB_USAGE_DB_SCHEMA ? process.env.JOB_USAGE_DB_SCHEMA : 'public',
    sslCert: process.env.SSL_CERT,
    options: {
      encrypt: !!(process.env.JOB_USAGE_DB_ENCRYPT && process.env.JOB_USAGE_DB_ENCRYPT === 'true'),
      packetSize: 32768,
    },
  },
  SMTP: {
    username: process.env.SMTP_USERNAME ? process.env.SMTP_USERNAME : '',
    password: process.env.SMTP_API_KEY ? process.env.SMTP_API_KEY : '',
    host: process.env.SMTP_HOST ? process.env.SMTP_HOST : 'smtp.sendgrid.net',
    port: process.env.SMTP_PORT ? process.env.SMTP_PORT : '2525',
    service: process.env.SMTP_SERVICE ? process.env.SMTP_SERVICE : 'SendGrid',
    allowEmails: process.env.SEND_EMAIL ? process.env.SEND_EMAIL : true,
    fromEmail: process.env.FROM_EMAIL_ADDRESS || 'no-reply@inforiver.com',
    messageIdPath: process.env.SMTP_MESSAGE_ID_PATH || 'smtp-id',
    eventPath: process.env.EVENT_PATH || 'event',
    emailPath: process.env.EMAIL_ADDRESS_PATH || 'email',
    enableDkim: process.env.ENABLE_DKIM
      ? ((Number(process.env.ENABLE_DKIM) !== 0) as any)
      : (false as any),
    domainName: process.env.DKIM_DOMAIN_NAME ? process.env.DKIM_DOMAIN_NAME : 'inforiver.com',
    keySelector: process.env.DKIM_KEY_SELECTOR ? process.env.DKIM_KEY_SELECTOR : 'email',
    dkimPrivateKey: process.env.DKIM_PRIVATE_KEY ? process.env.DKIM_PRIVATE_KEY : '',
    connectionTimeout: process.env.SMTP_CONNECTION_TIMEOUT
      ? Number(process.env.SMTP_CONNECTION_TIMEOUT)
      : 200 * 1000,
    tls: process.env.SMTP_TLS_ENABLED
      ? ((Number(process.env.SMTP_TLS_ENABLED) !== 0) as any)
      : (false as any),
  },
  license: {
    publicKey: privateTenantLicense
      ? privateTenantLicense.publicKey
      : process.env.LICENSE_PUBLIC_KEY || '7G2xI9wCQ+lJEyEs2mOmGvx2Ri5pYGAAqrhUX3JcgZA=',
    privateKey: privateTenantLicense
      ? privateTenantLicense.privateKey
      : process.env.LICENSE_PRIVATE_KEY ||
        'z5roWvyM4lrpb349e4SJKXTp7JAZPvbP7LbjwMO6k2bsbbEj3AJD6UkTISzaY6Ya/HZGLmlgYACquFRfclyBkA==',
    licenseMeta: privateTenantLicense ? privateTenantLicense.licenseMeta : null,
    buildType: process.env.BUILD_TYPE ? process.env.BUILD_TYPE : 'enterprise-lite',
    checkSchedulerJobLimit: process.env.CHECK_SCHEDULER_JOB_LIMIT
      ? process.env.CHECK_SCHEDULER_JOB_LIMIT
      : false,
    checkEmailLimit: process.env.CHECK_EMAIL_LIMIT ? Number(process.env.CHECK_EMAIL_LIMIT) : 0,
    jobUsage: {
      enable: process.env.GET_JOB_USAGE_REPORT ? Number(process.env.GET_JOB_USAGE_REPORT) : 0,
    },
    allowExternalEmails: process.env.ALLOW_EXTERNAL_EMAILS
      ? Number(process.env.ALLOW_EXTERNAL_EMAILS)
      : 0,
  },
  redis: {
    host: process.env.REDIS_HOST ? process.env.REDIS_HOST : '127.0.0.1',
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    password: process.env.REDIS_PASSWORD,
    prefix: process.env.REDIS_KEY_PREFIX,
    tls: process.env.REDIS_TLS_ENABLED
      ? ((Number(process.env.REDIS_TLS_ENABLED) !== 0) as any)
      : (true as any),
    disable: process.env.DISABLE_REDIS,
  },
  visual: {
    publicKey: privateTenantLicense
      ? privateTenantLicense.publicKey
      : process.env.VISUAL_PUBLIC_KEY || 'Pe95xPP1edGY6smSiBfWu5Yc2gjvV0no+3w+by3O3Tc=',
    privateKey: privateTenantLicense
      ? privateTenantLicense.privateKey
      : process.env.VISUAL_PRIVATE_KEY ||
        'lUI9yKp0NdKJKq3TcQb2BMWa1Ismhku0EpCM8EYiHSk973nE8/V50ZjqyZKIF9a7lhzaCO9XSej7fD5vLc7dNw==',
    allowGuest: !!(
      process.env.ALLOW_EXTERNAL_GUEST_USER && process.env.ALLOW_EXTERNAL_GUEST_USER === 'true'
    ),
  },
  azure: {
    blob: {
      connection_string: process.env.BLOB_CONNECTION_STRING,
      container_name: process.env.BLOB_CONTAINER_NAME,
      account_name: process.env.BLOB_ACCOUNT_NAME,
      account_key: process.env.BLOB_ACCOUNT_KEY,
      public_url: process.env.BLOB_PUBLIC_URL,
    },
  },
  audit: {
    enableAudit: process.env.ENABLE_AUDIT ? Number(process.env.ENABLE_AUDIT) : 0,
  },
};

export default config;
