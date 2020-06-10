# archetype-node-api

Este é um projeto base para criação de aplicações Express.

---

## Stack de Tecnologia

| Tecnologia | Papel | 
| --- | --- |
| **[Typescript](https://www.typescriptlang.org/)** | TypeScript é uma linguagem orientada a objetos de código-fonte aberto. É um superconjunto tipado de JavaScript que é compilado para JavaScript simples. |
| **[express](https://expressjs.com/)** | Estrutura de API REST, responsável por rotear e analisar solicitações e respostas HTTP | 
| **[tsoa](https://github.com/lukeautry/tsoa)** | Framework responsável por registrar automaticamente rotas ** Express ** e gerar a documentação ** Swagger ** para todos os controladores REST no aplicativo utilizando anotações nos controllers| 
| **[InversifyJS](https://github.com/inversify/InversifyJS)** | O InversifyJS é um contêiner leve de inversão de controle (IoC) para aplicativos TypeScript e JavaScript. Um contêiner de IoC usa um construtor de classe para identificar e injetar suas dependências. O InversifyJS possui uma API amigável e incentiva o uso das melhores práticas de OOP e IoC. |
| **[Jest](https://jestjs.io/)** | Biblioteca responsável pelos testes unitários |
| **[tsLint](https://palantir.github.io/tslint/)** | Ferramenta de análise de código-fonte typescript que sinaliza erros de programação, bugs, erros estilísticos e construções suspeitas. |
| **[Swagger](https://swagger.io/)** | Estrutura de software que ajuda os desenvolvedores a projetar, criar, documentar e consumir serviços RESTful |
| **[SonarQube](https://www.sonarqube.org/)** | Software de inspeção contínua da qualidade do código, para executar revisões automáticas com análise estática do código para detectar bugs, códigos problemáticos e vulnerabilidades  |
| **[Husky](https://github.com/typicode/husky#readme)** | Framework para garantir a qualidade nos `commits` e nos `push` |
| **[express-actuator](https://github.com/rcruzper/express-actuator#readme/)** | Middleware que cria automaticamente alguns endpoints para monitorar a aplicação |

---

## Configurando o VSCode

É recomendado a instalação das seguintes extensões, para que facilite a aplicação correta dos padrões de código:

- [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)

---

## Executando localmente

1. Instale as dependências do projeto, executando o comando abaixo no terminal:

   ```bash
   npm install
   ```

2. Inicie a aplicação:

   ```bash
   npm run start
   ```

3. A Aplicação subirá um swagger com a documentação em:

   ```
   http://localhost:3000/api-docs/
   ```

O comando `start` é um atalho que executa outros dois scripts: 

1. `npm run build-routes` - Automaticamente gera as rotas do Express e a documentação Swagger para todos os controladores;
2. `npm run dev` - Inicia o [tsc compiler](https://www.typescriptlang.org/docs/handbook/compiler-options.html) em modo watch,
assim você pode verificar as mudanças sem a necessidade de reiniciar a aplicação.

Em tempo de desenvolvimento, se você ja executou o primeiro comando e não alterou nenhum controlador, você pode reiniciar a aplicação 
rodando apenas `npm run dev`

---

## Executando via Docker

Essa é a maneira mais rápida e fácil de executar o aplicativo localmente. Requer apenas que você
tenha um mecanismo docker instalado em sua máquina. A desvantagem é que ele não fornecerá a
você é uma maneira simples e padrão de depurar o aplicativo usando seu IDE.

1. Crie uma imagem docker executando o seguinte comando:

   ```bash
   npm install
   docker build -t ${companyname}-${appname}-api:latest .
   ```

2. Execute um novo container com a imagem criada:

   ```bash
   docker run -p 3000:3000 ${companyname}-${appname}-api:latest
   ```

---

## Executando em modo de depuração (Debug)

Na estrutura do projeto, existe um arquivo chamado `.vscode/launch.json` que configura automaticamente o depurador do VSCode. 
Para iniciar a depuração, clique na aba de "Debug" e em seguida em "Start and Debug" na parte superior da janela.

Antes de iniciar a depuração é necessário executar o script que gera as rotas do express (`npm run build-routes`).

---

## Garantindo a qualidade do código, testes unitários e cobertura de testes

Antes de abrir uma requisição de merge, certifique que seu código esteja nos padrões de qualidade definidas para este projeto.

1. Execute os testes unitários e verifique a cobertura de testes rodando o seguinte comando:

   ```bash
   npm run test:ci
   ```

   Este comando irá executar todos os testes unitários e exibirá um relatório de cobertura. 
   Uma versão HTML deste relatório será salva em `./coverage/lcov-report/index.html`. 
   Valide se nenhum ponto do seu código ficou descoberto .
   Certifique que seu código tenha no mínimo **90%** de cobertura.
   
2. Execute a análise de lint, rodando o seguinte comando:

   ```bash
   npm run lint:fix
   ```

   Este comando irá analisar e corrigir possíveis erros de lint, como, por exemplo indentação, falta de ponto e virgula.
   Erros críticos serão exibidos no final. Corrija todos os erros e rode novamente se necessário

---

## Executando os testes unitários em modo de depuração (Debug)

Você pode executar os testes unitários em modo de depuração para corrigir erros mais complexos.
Existe uma configuração disponível no arquivo `.vscode/launch.json`.

Para executar os testes em modo de depuração, abra a aba de "Debug" e clique em "Debug Tests" na parte superior da janela

Antes de iniciar a depuração é necessário executar o script que gera as rotas do express (`npm run build-routes`).

---

## Executando o Sonarqube e enviando os resultados para um serviço sonarqube
Para executar a análise do sonarqube e enviá-la para o servidor, execute os seguintes passos

1. Certifique-se que o arquivo analyse.js esteja atualizado com o caminho para o servidor e a versão do projeto corretas.

2. Execute a análise do sonarqube, executando o seguinte comando:

   ```bash
   npm run sonar
   ```

   Este comando irá executar todos os testes unitários certificando que todos estão passando e em seguida executará o sonar 
   e enviará o resultado para o servidor configurado.

---

## Rastreabilidade de código e monitoramento 

Este projeto utiliza um middleware chamado `express-actuator` que prove 3 endpoints para rastreabilidade de código e monitoramento. São eles:

| Endpoint | Descrição | 
| --- | --- |
| **/management/info** | Retorna as informações do último commit |
| **/management/health** | Retorna o status da aplicação |
| **/management/metrics** | Retorna as metricas da aplicação |

Para mais informações, consulte o github do middleware.

---

## Arquitetura e Padrões

Este projeto segue os princípios e a estrutura de projeto definidas pelo Robert C. Martin (Uncle Bob) em seu livro "Clean Architecture"

Robert C. Martin, mais conhecido como Uncle Bob, propôs um estilo de arquitetura chamado Clean Architecture (Arquitetura Limpa), onde as diferentes partes do sistema, possuem um baixo grau de dependência, ou seja, fraco acoplamento, resultando em uma fácil manutenibilidade e testabilidade.

Esse estilo foi derivado de outras idéias arquiteturais existentes, dentre elas a Arquitetura Cebola e Arquitetura Hexagonal que em sua essência, compartilhavam idéias similares.
As premissas do Clean Architecture são:

* Independência de Framework: A arquitetura não deve depender de algum Framework específico, ou seja, somente devem ser utilizados como ferramentas.
* Testabilidade: As regras de negócio podem ser testadas de maneira independente, e não devem depender de nenhum outro elemento.
* Independência de Interface de usuário: A interface do usuário ou Front-end deve ser independente e não deve interferir no funcionamento do sistema.
* Independência de banco de dados: A arquitetura não está atrelada a um banco de dados específico, com isso, podemos trocar o banco de dados com facilidade e sem afetar as regras de negócio do sistema.
* Independência de agentes externos: A regra de negócio do nosso sistema não deve depender de nenhum elemento externo.

Um sistema bem estruturado possui baixo acoplamento e alta coesão, portanto, uma das soluções encontradas é a divisão do sistema em camadas, conforme imagem abaixo:

![Layers](./docs/layers.png)

As dependências de cada parte, segue da camada externa para a camada interna. O inverso não pode ocorrer, ou seja, um caso de uso pode conhecer a entidade que necessita manipular, porém, uma entidade não conhece seus casos de uso.

Com isso garantimos alta flexibilidade e testabilidade alem de conseguri subistituir quelquer ferramenta(framework) facilmente.

---

## Estrutura do Projeto

```
 └ src 
   └ core
     └ domain                       → Camada de domínio **(Enterprise core business layer)**
     └ usecases                     → Camada de serviços da aplicação **(Application Business Rules)**
   └ providers                      → Camada de adptadores de entrada para a aplicação **(Interface Adapters)**
     └ ...                          → Provedores de entrada para a aplicação. Ex: APIs externas, acesso ao repositório, segurança etc.
   └ entrypoints                    → Camada de adptadores de saida da aplicação **(Interface Adapters)**
     └ controllers                  → Handlers das rotas da API
   └ framework                      → Camada de frameworks, ferramentas, drivers **(Frameworks & Drivers)**
     └ configuration                → Configurações gerais da aplicação
     └ inversionOfcontroll          → Contêiner de inversão de controle (IoC) para aplicativos TypeScript e JavaScript
     └ middlewares                  → Middlewares para simplificar a criação de APIs RESTful
     └ webserver                    → Configurações do Express.js (server, routes, plugins, etc.)
     └ ...                          → Outros frameworks como, axios para acesso a APIs extenas, pino para log, etc.
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

