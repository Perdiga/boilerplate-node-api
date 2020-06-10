import APP from './app';
import { Logger } from '../../loggers/pino';

const PORT = Number(process.env.PORT) || 3000;

/**
 * Starts the application
 */
(function start(): void {

  // Starts up the application
  APP.listen(PORT, (): void => {
    Logger.info(`App listening on http://localhost:${PORT}`);
  });
})();
