/**
 * Logger Configuration
 */
import * as appRoot from 'app-root-path';
import * as winston from 'winston';
import config from './config';

/**
 * Process each node of the object recursively
 * look for key in sensitiveKeyWords list
 * remove the key from the message
 * @param obj string : log message
 */
const iterateMessageObj = (obj) => {
  const sensitiveKeyWords = new Set(['password', 'token', 'accessToken', 'refreshToken', 'apiKey']);
  Object.keys(obj).forEach((key) => {
    if (sensitiveKeyWords.has(key)) {
      delete obj[key];
    }
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      obj[key] = iterateMessageObj(obj[key]);
    }
  });
  return obj;
};
/**
 * Remove Sensitive Information from Logger message string
 * @param message string : log message
 */
const logMessageCleanUp = (message: any) => {
  try {
    const firstIndex = message.indexOf('{');
    const lastIndex = message.lastIndexOf('}') + 1;
    if (lastIndex !== 0 || firstIndex !== -1) {
      const jsonObjString = message.substring(firstIndex, lastIndex);
      const jsonObj = JSON.parse(jsonObjString);
      const messageObj = JSON.stringify(iterateMessageObj(jsonObj));
      return `${message.slice(0, firstIndex)} ${messageObj} ${message.slice(lastIndex)}`;
    }
    return message;
  } catch {
    return message;
  }
};
/**
 * Logger Format template configuration
 * @param event any : Event Type
 */
const logFormat = (event: any) => {
  const { timestamp, level, message } = event;
  const messageObj = logMessageCleanUp(message);
  return `${timestamp} [${level}]${messageObj}`;
};

/**
 * Log Configuration
 */
const logConfig = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((event) => logFormat(event)),
);

/**
 * Logger Handler Options
 */
const options = {
  file: {
    format: logConfig,
    level: config.general.logLevel,
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    format: logConfig,
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

/**
 * Logger Initialization
 */
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

export default logger;
