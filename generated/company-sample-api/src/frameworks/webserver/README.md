
## Express

O objetivo desta pasta é agrupar os arquivos do framework utilizado para a criação do server. 
Nesta API estamos utilizando o [Express.JS](https://expressjs.com/). 

---
## Server

Basicamente o arquivo `server.ts` é responsável por interceptar uma requisição HTTP e redirecioná-la para a rota correta. 

Nele também realizamos algumas configurações básicas do ambiente, bem como inicializamos alguns middlewares responsáveis por tratamento de erro, geração automática do swagger etc.

[Como usar os middlewares](../middlewares/README.md)

## Routes 

As Rotas são objetos de configuração que tem como responsabilidade, validar a requisição e então chamar um controlador. 

Esse arquivo é gerado automaticamente, bastando apenas o desenvolvedor colocar as anotações corretas do endpoint no controlador

Exemplo:
  ```javascript
    @Get('/user/{userId}')
    public async getUser(userId: string): Promise<User> {
      ...
    }
  ```

## Swagger

O Swagger é arquivo padrão para documentação de APIs. 

Esse arquivo é gerado automaticamente, bastando apenas o desenvolvedor colocar as anotações corretas do endpoint no controlador

Exemplo:
  ```javascript
    // Define a rota no swagger
    @Get('/user/{userId}') 
    // Define os tipos de erros na documentação
    @Response<ValidationError>('400', 'Bad Request') 
    @Response<BusinessError>('422', 'Business Error')
    @Response<NotFoundError>('404', 'Not Found Error')
    // Define a assinatura e o retorno na documentação
    public async getUser(userId: string): Promise<User> { 
      ...
    }
  ```
