# Logger

Biblioteca para exibir logs em JSON criada em cima da biblioteca [Pino Logger](https://github.com/pinojs/pino)

---

### Como usar

1. Importe a biblioteca e utilize o `Logger` para logar o que for necessário:

   ```javascript
   import { Logger } from 'frameworks/logger';

   try {
     // (...)
   } catch (err) {
     Logger.error('Aconteceu algo errado', err);
   }
   ```

   Este log irá produzir um output similar ao abaixo:

   ```bash
   {"level":20,"time":1583257057027,"pid":19,"hostname":"yourappname-api-d986c964b-sslmk","name":"yourappname-api","msg":"Aconteceu algo errado", "trace": "Uncaught Error: at method (mycode.ts:5:27)","v":1}
   ```

--- 

### Metodos disponíveis 

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

### Modo Avançado

Esse framework for criado em cima da biblioteca [Pino Logger](https://github.com/pinojs/pino).
Para utilização de recursos avançados por favor olhe a documentação disponivel no site deles

[Voltar para o inicio](../../../../README.md)