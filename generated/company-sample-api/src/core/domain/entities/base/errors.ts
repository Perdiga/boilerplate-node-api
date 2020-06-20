/**
 * Represents an expected error
 */
export class ExpectedError {

  code: string;
  message: string;

  constructor (code: string, message: string) {
    this.code = code;
    this.message = message;
  }
}

/**
 * Represents a business error
 */
export class BusinessError extends ExpectedError {

  constructor (message: string) {
    super('BUSINESS_ERROR', message);
  }
}

/**
 * Represents a business error
 */
export class NotFoundError extends ExpectedError {

  constructor (message: string) {
    super('NOT_FOUND_ERROR', message);
  }
}

/**
 * Represents a business error
 */
export class InternalError extends ExpectedError {

  constructor (message?: string) {
    if (!message) {
      message = 'Internal error.';
    }
    super('INTERNAL_ERROR', message);
  }
}

/**
 * Represents a validation error
 */
export class ValidationError extends ExpectedError {

  fields: string[];

  constructor (fields: string[], message?: string) {
    super('VALIDATION_ERROR', message || 'One or more fields are invalid');
    this.fields = fields;
  }
}