import { AppConfigurations } from '../../../configurations/appConfigs';
import pino from 'pino';
import Logger from '../logger';

/**
 * Pino implementation for the Logger contract
 */
export class LoggerPino implements Logger {

  private handler?: pino.Logger;

  info(msg: string, ...args: any): void {
    this.getHandler().info(msg);
  }

  debug(msg: string, ...args: any): void {
    this.getHandler().debug(msg, args);
  }

  warn(msg: string, err?: Error, ...args: any): void {
    if (err) {
      this.getHandler().warn({ err }, msg, args);
    } else {
      this.getHandler().warn(msg, args);
    }
  }

  error(msg: string, err?: Error, ...args: any): void {
    if (err) {
      this.getHandler().error({ err }, msg, args);
    } else {
      this.getHandler().error(msg, args);
    }
  }

  private getHandler(): pino.Logger {
    if (!this.handler) {
      this.handler = pino({
        name: AppConfigurations.get().applicationName,
        level: 'debug'
      });
    }
    return this.handler;
  }
}
