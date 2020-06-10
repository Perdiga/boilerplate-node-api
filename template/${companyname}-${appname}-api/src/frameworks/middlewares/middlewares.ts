import * as RequestResponse from './requestResponseHandlers';
import { ERROR_HANDLER_FACTORY, ErrorHandlerFactory } from './errorHandler';

/**
 * Get all request/response middlewares
 */
class MiddlewaresRegistry {

  public getRequestResponseMiddlewares(swaggerDoc: any): any[] {
    return [
      RequestResponse.handleCors,
      RequestResponse.handleBodyRequestParsing,
      RequestResponse.handleCompression,
      RequestResponse.createApiDocsHandler(swaggerDoc),
      RequestResponse.logRequest
    ];
  }

  public getErrorHandlerMiddlewareFactory(): ErrorHandlerFactory {
    return ERROR_HANDLER_FACTORY;
  }
}

// tslint:disable-next-line:variable-name
export const Middlewares = new MiddlewaresRegistry();
