/**
 * Contract for holding the applications configurations
 */
export interface Options {
  applicationName?: string;
  environmentName?: string;
}

/**
 * Contains the runtime configurations for the client application
 */
export class Configurations {

  private options: Options = {};

  public setup(configs: Options): void {
    this.options = configs || this.options;
  }

  public get(): Options {
    return this.options;
  }
}

/**
 * Singleton instance for the runtime configurations
 */
// tslint:disable-next-line:variable-name
export const AppConfigurations = new Configurations();