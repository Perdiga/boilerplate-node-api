# Middlewares

Esta pasta contem middlewares para simplificar a criação de APIs RESTful utilizando os frameworks TSOA e Express.JS

Estes middlewares adicionam automaticamente alguns comportamentos automáticos na API. Segue uma lista deles:

| Middleware | Descrição | 
| --- | --- | 
| `handleCors` | Lida com os headers relacionados ao CORS recebido na requisição HTTP |
| `handleBodyRequestParsing` | "Parseia" o corpo de uma requisição http para um JSON |
| `handleErrors` | Lida com os erros e exceções lançadas pela aplicação de modo amigavel |
| `handleCompression` | Comprime a resposta http utilizando o GZIP |
| `apiDocsHandler` | Prove uma rota para o Swagger UI na rota `/api-docs/` |
| `logRequest` | Imprime os logs de cada requisição http recebida |

Para utilizar esse middlewares na aplicação, é necessário adicionar as seguintes linha de código em um código global.
Neste projeto elas estão no arquivo que configura o server (/src/frameworks/webserver/express).

[Express.JS ](../../webserver/express/README.md)

### Uso

```javascript
import { RegisterRoutes } from './routes'; // (auto-gerado pelo TSOA)
import swaggerDocs from './swagger.json'; // (auto-gerado pelo TSOA)

import express from 'express';

// Inicia o express
this.app = express();

// Registra todos as requisições/respostas do middlewares
const reqRespHandlers = Middlewares.getRequestResponseMiddlewares(swaggerDocs);
for (const middleware of reqRespHandlers) {
   middleware(this.app);
}

// Registra a rota no aplicativo
RegisterRoutes(this.app);

// Registra as exceções esperadas para que o middleware de erro vincule com o express
const errorHandlerFactory = Middlewares.getErrorHandlerMiddlewareFactory();
errorHandlerFactory.registerExpectedError('400', MyValidationError);
errorHandlerFactory.registerExpectedError('422', MyBusinessError);
errorHandlerFactory.handler(this.app)
```
