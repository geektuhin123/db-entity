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
  license: {
    publicKey: privateTenantLicense
      ? privateTenantLicense.publicKey
      : process.env.LICENSE_PUBLIC_KEY || '',
    privateKey: privateTenantLicense
      ? privateTenantLicense.privateKey
      : process.env.LICENSE_PRIVATE_KEY || '',
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
};

export default config;
