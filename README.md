# Boilerplate NodeJS

Prove um template para criação de apis/microserviços utilizando express e typescript com conceitos da arquitetura limpa (Clean Architecture).

---

## Criando um novo microserviço

Para criar um novo microserviço utilizando este archetype execute os seguintes comandos

```bash
git clone <this repository>
cd <your workspace path>
chmod +x generate-app.sh
./generate-app.sh "Nome da Empresa" "Nome da API" "Deseja utilizar o sonarqube? (true/false)"
```
> Todos os parâmetros passados para o script `./generate-app.sh` são opcionais na linha de comando. Caso não informe algum deles o script fará perguntas para obter esses dados.

Pronto! Agora você pode procurar a pasta `${Nome da Empresa}-{Nome da API}-api` no seu workspace.
Essa aplicação criada é funcional e contém um endpoint de exemplo. Para mais detalhes, consulte a [documentação](template/$%7Bcompanyname%7D-$%7Bappname%7D-api/README.md) da api.

---

## Limpando sua nova API

Para ajuda-lo nas primeiras linhas de código, este novo microserviço contém um exemplo de endpoint utilizando o conceito da arquitetura clean. 
Ao iniciar sua nova API você deverá utilizar ele para aprender, e depois remove-los da aplicação. 

Os arquivos que devem ser removidos são:

1. `core\domain\entities\UserEntity`
2. `core\domain\usecases\GetUserUseCase`
3. `core\domain\usecases\service\UserService`
4. `entrypoints\controllers\UserController`
5. `entrypoints\controllers\models\UserResponse`
6. `providers\network\UserSampleNetworkProvider`
