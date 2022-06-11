// Job event Milestone Codes and their corresponding error messages
// TODO: We need to change constant msgs with format specifiers for language translations
const ERROR_CODES = {
  'M-00': 'Unable to start the job. Job setup failed',
  'M-01': 'Unable to load the Power BI report successfully.',
  'M-001': 'Unable to refresh Power BI report dataset.',
  'M-002': 'Job pre-validation failed.',
  'M-02':
    'Failed to collect Inforiver visual data. Either the report embedding has failed or the report does not have correct Inforiver visuals.',
  'M-03': 'Unable to generate the attachments successfully.',
  'M-04': 'Unable to deliver the reports to the configured destination.',
  'I-01': 'Unable to load the Power BI report successfully.',
  'I-02': 'Unable to connect to the email servers successfully.',
  'I-03':
    'Warning: Some recipients have not provided consent to the App. The Job will skip the users who have not provided consent. To resend the consent email, please check the options on the User Consent Details tab of the schedule.',
  'I-04': 'Warning: All the recipients of this schedule are yet to provide consent to the App.',
  'I-05':
    'Warning: Some recipients have not provided consent to the App or Power BI report access validation failed. The Job will skip the users who have not provided consent. To resend the consent email, please check the options on the User Consent Details tab of the schedule.',
  'I-06': 'Warning: Power BI report access validation failed for some recipients.',
  'I-07': 'Warning: Power BI report access validation failed for all the recipients.',
  'I-08': 'Unable to collect valid recipients for this schedule.',
  'I-09': 'Unexpected error occurred while processing the job.',
  'I-10': 'One or more jobs did not succeed. Please check email tab.',
  'I-11': 'Failed to refresh Power BI report dataset.',
  'J-01': 'The job took longer than expected to complete.',
  'J-02': 'The job has failed due to an unexpected error.',
  'J-03':
    'License expired or Maximum job limit for the workspace reached. Please contact admin to renew/upgrade the license.',
  'J-04': 'License expired for the workspace. Please contact admin to renew the license.',
};

export default ERROR_CODES;
