import { NextFunction, Request, Response, Router } from 'express';
import { Logger } from '../loggers/pino';
import { AppConfigurations } from '../configurations/appConfigs';

/**
 * Contains the information regarding an expected error that may be thrown by the application
 */
class ExpectedErrorInfo {

  httpStatusCode: number;
  errorType: any;
  transform: (err: any) => any;

  constructor (httpStatusCode: string | number, errorType: any, transformer: (err: any) => any) {
    this.httpStatusCode = Number(httpStatusCode);
    this.errorType = errorType;
    this.transform = transformer;
  }
}

/**
 * Knows how to create an Express error handler instance
 */
export class ErrorHandlerFactory {

  expectedErrors: ExpectedErrorInfo[] = [];
  handler: any;

  /**
   * Sets a given error type as expected, so it can be friendly sent
   * to the response payload. Errors not registered as expected will
   * be deliverer as internal server errors (HTTP 500).
   */
  registerExpectedError(httpStatusCode: string | number, errorType: any, transformer?: (err: any) => any): void {
    this.expectedErrors.push(new ExpectedErrorInfo(
      httpStatusCode,
      errorType,
      transformer || ((err: any): any => err)
    ));
  }

  /**
   * Creates an Express error handler instance and binds it to this.handler field
   */
  constructor () {
    this.handler = (router: Router): void => {
      router.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
        const info = getExpectedErrorInfo(err, this.expectedErrors);
        if (info) {
          handleExpectedError(err, res, info);
        } else {
          handleUnexpectedError(err, res);
        }
      });
    };
  }
}

/**
 * If an expected error is caught, sends its message to the
 * response payload and sets the error status to the HTTP header.
 */
function handleExpectedError(err: any, res: Response, info: ExpectedErrorInfo): void {
  Logger.error(err.message, err);
  res
    .type('application/json')
    .status(info.httpStatusCode)
    .send(
      JSON.stringify(info.transform(err))
    );
}

/**
 * If an unexpected error is caught, sends a message to the
 * response payload and sets the status to 500
 */
function handleUnexpectedError(err: Error, res: Response): void {
  const status = 500;
  let message = 'Internal Server Error';
  Logger.error(err.message, err);
  if (AppConfigurations.get().environmentName !== 'prod') {
    message = `${err.name} - ${err.message} - ${err.stack}`;
  }
  res
    .type('application/json')
    .status(status)
    .send({ message });
}

/**
 * If the error is an expected application error, return the ExpectedErrorInfo
 * registered for it. Otherwise returns null.
 */
function getExpectedErrorInfo(error: any, expectedErrors: ExpectedErrorInfo[]): ExpectedErrorInfo | null {
  for (const info of expectedErrors) {
    if (error instanceof info.errorType) {
      return info;
    }
  }
  return null;
}

/**
 * Singleton instance for the error handler factory
 */
export const ERROR_HANDLER_FACTORY = new ErrorHandlerFactory();