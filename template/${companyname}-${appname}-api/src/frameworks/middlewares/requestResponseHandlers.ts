import parser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { NextFunction, Request, Response, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { Logger } from '../loggers/pino';

export const handleCors = (router: Router): void => {
  router.use(cors({ credentials: true, origin: true }));
};

export const handleBodyRequestParsing = (router: Router): void => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression = (router: Router): void => {
  router.use(compression());
};

export const createApiDocsHandler = (swaggerDoc: any): any => {
  return (router: Router): void => {
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  };
};

export const logRequest = (router: Router): void => {
  router.use((req: Request, res: Response, next: NextFunction): void => {
    Logger.debug('Incoming HTTP Request', null, req.method, req.path, req.query, req.params, req.body);
    next();
  });
};