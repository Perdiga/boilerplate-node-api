# Logger

Library to display JSON logs created on top of the [Pino Logger](https://github.com/pinojs/pino) library.

---

## How to use

1. Import the library and use Logger to log as needed:
   ```javascript
   import { Logger } from 'frameworks/logger';

   try {
     // (...)
   } catch (err) {
     Logger.error('Something went wrong!', err);
   }
   ```
   
   This log will produce an output similar to the one below:

   ```bash
   {"level":20,"time":1583257057027,"pid":19,"hostname":"yourappname-api-d986c964b-sslmk","name":"yourappname-api","msg":"Something went wrong!", "trace": "Uncaught Error: at method (mycode.ts:5:27)","v":1}
   ```

--- 

## Available methods

```javascript
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
```

---

## Advanced Mode

This framework was created on top of the [Pino Logger](https://github.com/pinojs/pino) library . To use advanced features please look at the documentation available on their website.
