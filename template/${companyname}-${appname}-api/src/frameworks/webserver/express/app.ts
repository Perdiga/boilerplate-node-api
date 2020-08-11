import 'reflect-metadata';
import express from 'express';
import actuador, { Options } from 'express-actuator';
import { RegisterRoutes } from './routes';
import swaggerDocs from './swagger.json';
import { AppConfigurations } from '../../configurations/appConfigs';
import { Middlewares } from '../../middlewares/middlewares';
import { BusinessError, ValidationError, InternalError, NotFoundError } from '../../../core/domain/entities/base/errors';
import { ValidateError as TsoaValidationError } from 'tsoa';

const APP_NAME = '${companyname}-${appname}-api';
const ENVIRONMENT = process.env.ENVIRONMENT_NAME || 'dev';
const EXPRESS_ACTUATOR_OPTIONS: Options = {
  basePath: '/management',
  infoGitMode: (ENVIRONMENT === 'dev' ? 'full' : 'simple')
};
const APP = express();

// Basic configs for the library
AppConfigurations.setup({
  applicationName: APP_NAME,
  environmentName: ENVIRONMENT
});

// Configures the expected errors to be handled by the middleware
const errorHandlerFactory = Middlewares.getErrorHandlerMiddlewareFactory();
errorHandlerFactory.registerExpectedError(400, ValidationError);
errorHandlerFactory.registerExpectedError(400, TsoaValidationError, tsoaValidationErrorTransformer);
errorHandlerFactory.registerExpectedError(422, BusinessError);
errorHandlerFactory.registerExpectedError(500, InternalError);
errorHandlerFactory.registerExpectedError(404, NotFoundError);

// Register the middlewares and routes
registerMiddlewares(Middlewares.getRequestResponseMiddlewares(swaggerDocs));
RegisterRoutes(APP);
registerMiddlewares([errorHandlerFactory.handler]);

/**
 * Registers all the given middlewares like cors, error handlers, docs/swagger, etc.
 * @param {function} middlewares The list of middlewares
 */
function registerMiddlewares(middlewares: ((router: any) => void)[]): void {
  for (const middleware of middlewares) {
    middleware(APP);
  }
}

/**
 * Converts a TsoaValidationError into a ValidationError, so the
 * app can have a uniform 400/BadRequest response contract.
 */
function tsoaValidationErrorTransformer(err: TsoaValidationError): ValidationError {
  const fields = Object.keys(err.fields);
  return new ValidationError(fields);
}

/**
 * Starts up the express-actuator on '/management/info'
 */
APP.use(actuador(EXPRESS_ACTUATOR_OPTIONS));

export default APP;