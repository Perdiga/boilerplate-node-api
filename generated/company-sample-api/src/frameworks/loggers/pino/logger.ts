/**
 * Contract for logging implementations
 */
export default interface Logger {

    /**
     * Logs an INFO message
     * @param msg The message to be printed out
     * @param args The list of arguments to be added to the log entry
     */
    info(msg: string, ...args: any): void;

    /**
     * Logs a DEBUG message
     * @param msg The message to be printed out
     * @param args The list of arguments to be added to the log entry
     */
    debug(msg: string, ...args: any): void;

    /**
     * Logs a WARNING message
     * @param msg The message to be printed out
     * @param err The error cause
     * @param args The list of arguments to be added to the log entry
     */
    warn(msg: string, err?: Error, ...args: any): void;

    /**
     * Logs an ERROR message
     * @param msg The message to be printed out
     * @param err The error cause
     * @param args The list of arguments to be added to the log entry
     */
    error(msg: string, err?: Error, ...args: any): void;
  }
