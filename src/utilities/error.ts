/* eslint-disable max-classes-per-file */
import * as Boom from '@hapi/boom';
import * as Sentry from '@sentry/node';
import { COMMON_TOAST_CODES } from '../constants/toastMessages';

/**
 * Custom Entity Not Found Error Class
 */
class EntityNotFound extends Error {
  public meta?: any;

  constructor(m: string, meta?: any) {
    super(m);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, EntityNotFound.prototype);
    this.message = m || 'Entity that you requested was not found in our books';
    this.meta = meta;
  }

  errorMessage() {
    return this.message;
  }
}

/**
 * Custom Entity Already Exists Error Class
 */
class EntityAlreadyExists extends Error {
  public meta?: any;

  constructor(m: string, meta?: any) {
    super(m);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, EntityAlreadyExists.prototype);
    this.message = m || 'Entity that you are trying to create already exists in our books';
    this.meta = meta;
  }

  errorMessage() {
    return this.message;
  }
}

class ValidationError extends Error {
  public meta?: any;

  constructor(m: string, meta?: any) {
    super(m);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ValidationError.prototype);
    this.message = m || 'Validation Error';
    this.meta = meta;
  }

  errorMessage() {
    return this.message;
  }
}

class ExternalIntegrationError extends Error {
  public meta?: any;

  constructor(m: string, meta?: any) {
    super(m);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ValidationError.prototype);
    this.message = m || 'External Integration Error';
    this.meta = meta;
  }

  errorMessage() {
    return this.message;
  }
}

const badImplementation = (error: any) => {
  Sentry.captureException(error);
  const customError = Boom.badImplementation(error);
  customError.reformat();
  customError.output.payload.message = COMMON_TOAST_CODES.T_01;
  customError.output.payload.meta = { error: error.reason || error.code || error.message };
  return customError;
};

const badRequest = (error: any) => {
  const customError = Boom.badRequest(error);
  customError.reformat();
  customError.output.payload.meta = error.meta;
  return customError;
};

const notFound = (error: any) => {
  const customError = Boom.notFound(error);
  customError.reformat();
  customError.output.payload.message = COMMON_TOAST_CODES.T_03;
  customError.output.payload.meta = error.meta;
  return customError;
};

const unauthorized = (error: any) => {
  const customError = Boom.unauthorized(error);
  customError.reformat();
  customError.output.payload.meta = error.meta;
  return customError;
};

const paymentRequired = (error: any) => {
  const customError = Boom.paymentRequired(error);
  customError.reformat();
  customError.output.payload.meta = error.meta;
  return customError;
};

const forbidden = (error?: any) => {
  const customError = Boom.forbidden(error);
  customError.reformat();
  if (error) {
    customError.output.payload.meta = error.meta;
  }
  return customError;
};

const notAcceptable = (error: any) => {
  const customError = Boom.notAcceptable(error);
  customError.reformat();
  customError.output.payload.meta = error.meta;
  return customError;
};
export {
  EntityNotFound,
  ValidationError,
  EntityAlreadyExists,
  ExternalIntegrationError,
  badImplementation,
  badRequest,
  notFound,
  unauthorized,
  paymentRequired,
  forbidden,
  notAcceptable,
};
