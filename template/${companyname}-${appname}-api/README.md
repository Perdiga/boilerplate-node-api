# ${companyname}-${appname}-api

This is a basic project for creating Express applications.

---

## Stack de Tecnologia

| Technology | Role | 
| --- | --- |
| **[Typescript](https://www.typescriptlang.org/)** | 	TypeScript is an open source object-oriented language. It is a typed superset of JavaScript that is compiled for simple JavaScript. |
| **[express](https://expressjs.com/)** | REST API structure, responsible for routing and analyzing HTTP requests and responses. | 
| **[tsoa](https://github.com/lukeautry/tsoa)** | Framework responsible for automatically registering ** Express ** routes and generating ** Swagger ** documentation for all REST controllers in the application using annotations in the controllers. | 
| **[InversifyJS](https://github.com/inversify/InversifyJS)** | InversifyJS is a lightweight inversion of control (IoC) container for TypeScript and JavaScript applications. An IoC container uses a class constructor to identify and inject its dependencies. InversifyJS has a friendly API and encourages the use of OOP and IoC best practices. |
| **[Jest](https://jestjs.io/)** | Library responsible for unit tests. |
| **[tsLint](https://palantir.github.io/tslint/)** | Typescript source code analysis tool that help find programming errors, bugs, stylistic errors and suspicious constructions. |
| **[Swagger](https://swagger.io/)** | Software framework that helps developers to design, create, document and consume RESTful services. |
| **[SonarQube](https://www.sonarqube.org/)** | Continuous code quality inspection software. Perform automatic reviews with static code analysis to detect bugs, problematic codes and vulnerabilities |
| **[Husky](https://github.com/typicode/husky#readme)** | Framework to crete git hooks. It is used to guarantee quality in `commits` and `push` |
| **[express-actuator](https://github.com/rcruzper/express-actuator#readme/)** | Middleware that automatically creates some endpoints to monitor the application |

---

## Configuring VSCode

É recomendado a instalação das seguintes extensões, para que facilite a aplicação correta dos padrões de código:

It is recommended to install the following extensions, to help with the application code standards:

- [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)

---

Running locally

1. Install the project's dependencies by running the command below on the terminal:

   ```bash
   npm install
   ```

2. Launch the application:

   ```bash
   npm run start
   ```

3. The Express application will start and it will create a swagger page with the documentation at:

   ```
   http://localhost:3000/api-docs/

   ```
The command `start` is a shortcut that runs two other scripts:

1. `npm run build-routes` - Automatically generates Express routes and Swagger documentation for all controllers;
2. `npm run dev`- Starts the tsc compiler in watch mode, so you can check the changes without having to restart the application.

At development time, if you have already executed the first command and have not changed any controller, you can restart the application by running just `npm run dev`

---

## Running thru Docker

This is the fastest and easiest way to run the application locally. It only requires that you have a docker mechanism installed on your machine. The downside is that it will not provide you with a simple and standard way to debug the application using your IDE.

1. Create a docker image by running the following command:

   ```bash
   npm install
   docker build -t ${companyname}-${appname}-api:latest .
   ```

2. Run a new container with the created image:

   ```bash
   docker run -p 3000:3000 ${companyname}-${appname}-api:latest
   ```

---

## Running in debug mode 

In this project structure, there is a file called `.vscode/launch.json` that automatically configures the VSCode debugger. To start debugging, click on the "Debug" tab and then "Start and Debug" at the top of the window.

Before starting debugging it is necessary to run the script that generates express routes: `npm run build-routes`.

---

## Ensuring code quality, unit tests and test coverage

Before opening a merge request, make sure your code meets the quality standards defined for this project.

1. Run the unit tests and check the test coverage by running the following command:

   ```bash
   npm run test:ci
   ```

   This command will run all tests and display a coverage report.
   An HTML version of this report will be saved to `./coverage/lcov-report/index.html.`
   Make sure that all you code has code coverage.
   
2. Run the lint analysis by running the following command:

   ```bash
   npm run lint:fix
   ```

   This command will analyze and correct possible lint errors, such as indentation, lack of semicolons. Critical errors will be displayed at the end. 
   Correct all errors and run again if necessary.

---

## Running unit tests in debug mode

You can run unit tests in debug mode to fix more complex errors. There is a configuration available in the file `.vscode/launch.json.`

To run the tests in debug mode, open the "Debug" tab and click "Debug Tests" at the top of the window

Before starting debugging it is necessary to run the script that generates express route: `npm run build-routes`.

---

## Running Sonarqube and sending the results to a sonarqube service

Para executar a análise do sonarqube e enviá-la para o servidor, execute os seguintes passos

1. Make sure the `analyze.js` file is updated with the correct server path and project version.

2. Run the sonarqube analysis by running the following command:

   ```bash
   npm run sonar
   ```

  This command will execute all tests, colect the lcoc file and send to configured sonarqube server.

---

## Code traceability and monitoring

This project uses a middleware called `express-actuator` that provides 3 endpoints for code traceability and monitoring. Are they:

| Endpoint | Role | 
| --- | --- |
| **/management/info** | Returns information from the last commit |
| **/management/health** | Returns the application status |
| **/management/metrics** | Returns the metrics of the application |

For more information, consult the [github page](https://github.com/rcruzper/express-actuator).

---

## Automated versioning 

This project uses `npm-version` to increase the project version.
On your CI/CD pipeline, you can use the following commands to increase the project version, and create a git tag. 

To increse the major version use:
``` bash
npm run version:major

```


To increse the minor version use:
``` bash
npm run version:minor

```


To increse the patch version use:
``` bash
npm run version:patch

```

Before updating the version, a command to compile the project will be triggered with a couple of commands to check test cases and lint.

---

## Architecture and Standards
This project follows the principles and project structure defined by Robert C. Martin (Uncle Bob) in his book "Clean Architecture"

Robert C. Martin, better known as Uncle Bob, proposed an architecture style called Clean Architecture, where the different parts of the system have a low degree of dependence, that is, poor coupling, resulting in easy maintenance and testability.

This style was derived from other existing architectural ideas, among them the Onion Architecture and Hexagonal Architecture, which in essence, shared similar ideas. Clean Architecture's premises are:

* Framework Independence: The architecture should not depend on any specific Framework, that is, they should only be used as tools.
* Testability: Business rules can be tested independently, and should not depend on any other elements.
* Independence of User Interface: The user interface or Front-end must be independent and must not interfere with the functioning of the system.
* Database independence: The architecture is not tied to a specific database, so we can change the database easily and without affecting the system's business rules.
* Independence from external agents: The business rule of our system must not depend on any external elements.

A well-structured system has low coupling and high cohesion, so one of the solutions found is to divide the system into layers, as shown in the image below:

![Layers](./docs/layers.png)

The dependencies of each part follow from the outer layer to the inner layer. The reverse cannot occur, that is, a use case may know the entity it needs to handle, however, an entity does not know its use cases.

With this we guarantee high flexibility and testability in addition to being able to easily replace any tool (framework).

---

## Project Structure

```
 └ src 
   └ core
     └ domain                       → Enterprise core business layer → e.g.: Entities
     └ usecases                     → Application Business Rules layer → e.g.: Use Cases
   └ providers                      → Interface Adapters layer (For Providers) → e.g.: External APIs, Database Access, Security APIs
   └ entrypoints                    → Interface Adapters layer (For Handlets) -> e.g.: Controllers
     └ controllers                  → API route handlers
   └ framework                      → Frameworks & Drivers layer → e.g.: webserver framework, middlewares, logging framewoks
     └ configuration                → General configurations
     └ inversionOfcontroll          → IoC framework (InversifyJS)
     └ middlewares                  → Middlewares to help with APIs
     └ webserver                    → Webserver framework (Express.js)
     └ ...                          → Other frameworks 
```

---

### Core (Enterprise core business + Application Business Rules)
A pasta **core** é responsável por duas camadas da arquitetura clean. 
A camada **Enterprise core business layer** representada pela subpasta **domain** e camada **Application Business Rules** representada pela subpasta **usecases**.

A camada de **Enterprise core business layer** é responsável por conter as entidades da aplicação com as lógicas críticas de negócio.
Essa camada é a mais interna na arquitetura o que faz com que seja protegida contra lógicas externas.

Exemplo: 
> Para um cliente receber um empréstimo, ele deve atender a alguns requisitos de pontuação de crédito.

Assim temos que a entidade de crédito tem uma regra crítica que gere se um cliente pode ter um emprestimo ou não
``` javascript
// Entidade de Crédito
export class CreditScore {
  ruleA:number;
  ruleB:number;
  ruleC:number;

  constructor (ruleA: number, ruleB: number, ruleC: number) {
    this.ruleA = ruleA;
    this.ruleB = ruleB;
    this.ruleC = ruleC;
  }

  //Lógica crítica de negócio para conceder crédito
  public canGetLoan(): boolean {
    if(this.ruleA >= 2 && this.ruleB > 10 && this.ruleC < 100)
      return true
    else
      return false
  }
}
```

A camada de **Application Business Rules** é responsável por ter as regras específicas do aplicativo.
Essas regras, chamamos de **use cases**, que é uma sequência de atividades para atingir um objetivo específico da aplicação. 

Cada use case deve ter somente uma responsabilidade de negócio.
É uma classe que deve ter um método que será chamado por um controlador.
Pode ter um construtor para definir suas dependências ou seu contexto de execução.
Um caso de uso pode interagir na mesma camada, como, por exemplo com interfaces de repositórios, ou na camada de domínio.

Exemplo:
> Caso de uso para validar se o cliente pode obter uma concessão de crédito

Assim temos um caso de uso que tem uma sequência de atividades para retornar os valores que serão utilizados para calcular se o cliente pode ter uma concessão de crédito.

``` javascript
@injectable()
export class ClientLoanValidatorUseCase {

  constructor (
    @inject(AppInterfaces.CreditService) private creditService: CreditService
  ) { }

  public async checkLoan(userId: number): Promise<boolean> {
    // Retorna valor para a ruleA de um serviço externo ou banco de dados ou outro
    const ruleA:number = this.creditService.getRuleAbyUser(userId)
    // Retorna valor para a ruleB de um serviço externo ou banco de dados ou outro
    const ruleB:number = this.creditService.getRuleBbyUser(userId)
    // Retorna valor para a ruleC de um serviço externo ou banco de dados ou outro
    const ruleC:number = this.creditService.getRuleCbyUser(userId)

    //Cria uma instância da entidade de crédito
    const creditScore = new CreditScore(ruleA,ruleB,ruleC)

    // Chama a lógica crítica de negócio para validação de concessão de crédito
    return creditScore.canGetLoan();
  }
}
```

Dentro da pasta de uses cases também podemos ter outras pastas com definições de interfaces que o caso de uso espera que suas camadas mais exteriores implementem.

Exemplo:
> Para validadar se o cliente pode receber o crédito, o caso de uso precisa que alguém implemente o código que retorna o valor para cada uma das regras.
> Assim precisamos criar uma interface. 

``` javascript
export interface CreditService {
  getRuleAbyUser(userId: number): number;
  getRuleBbyUser(userId: number): number;
  getRuleCbyUser(userId: number): number;
}

```

---

### Providers & Entrypoints (Interface Adapters)
As pastas **providers** e **entrypoints** fazem parte da camada **(Interface Adapters)** da arquitetura clean. 

A pasta **providers** é responsável por implementar métodos que interagem com o mundo exterior para retornar algum dado.
Podemos ter provedores que acessam banco de dados, APIs, arquivos de sistema, entre outros.

Exemplo:
> Para retornar o valor da regra A precisamos acessar uma API externa.

``` javascript
@injectable()
export class CreditNetworkProvider implements CreditService {

  constructor (
    @inject(AppInterfaces.Network) private network: Network
  ) { }

  // Chama uma API que retorna o valor para a regra A
  public async getRuleAByUser(userId: number): Promise<number> {
    const url = `any_url`;

    const response: Network.HttpResponse = await this.network.get(url);
    return response.value
  }

  // Chama uma API que retorna o valor para a regra B
  public async getRuleBByUser(userId: number): Promise<number> {
    const url = `any_url`;

    const response: Network.HttpResponse = await this.network.get(url);
    return response.value
  }

  // Chama uma API que retorna o valor para a regra C
  public async getRuleCByUser(userId: number): Promise<number> {
    const url = `any_url`;

    const response: Network.HttpResponse = await this.network.get(url);
    return response.value
  }
}
```

A pasta **entrypoints** é responsável por implementar os controladores.

Os controladores são os pontos de entrada para o contexto da aplicação.
Eles pegam os dados de entrada e os reembalam de uma forma conveniente para os casos de uso e entidades. 
Em seguida, eles pegam a saída dos casos de uso e entidades e a reembalam em um formato conveniente para exibição na GUI ou salvamento em um banco de dados.

Sendo assim eles têm 3 responsabilidades principais: 

1. Extrair os parâmetros da requisição;
2. Chamar um caso de uso;
3. Retornar uma resposta HTTP;

Exemplo:
> É preciso expor um endpoint na API que retorne se um usuário pode receber um crédito ou não

``` javascript
@Route('/')
@Tags('Credit')
@injectable()
export class CreditController extends Controller {
  constructor (
    @inject(ClientLoanValidatorUseCase) private clientLoanValidatorUseCase: ClientLoanValidatorUseCase) {
    super();
  }

  @Get('/credit/valid/loan/{userId}')
  @Response<BusinessError>('422', 'Business Error')
  @Response<NotFoundError>('404', 'Not Found Error')
  public async checkLoan(userId: number): Promise<boolean> {
    const result:number  = await this.clientLoanValidatorUseCase.checkLoan(userId);

    return newCheckLoanResponse(result);
  }
}
```

---

### Frameworks (Frameworks & Drivers)
A pasta **frameworks** faz parte da camada **(Frameworks & Drivers)** da arquitetura clean. 

Nesta pasta é que todos os frameworks como criação do webserver, conexão com banco de dados, conexão com outras APIs, entre outras devem estar.
A ideia desta camada é que podemos trocar qualquer framework por um melhor sem que impacte nas nossas regras de negócio e na nossa aplicação 

---

## Plano de execução

Utilizando os exemplos acima, seria possível dizer que o plano de execução seria similar ao apresentado abaixo.

![Plano de Execução](./docs/flow.png)

---

