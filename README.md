# Boilerplate NodeJS

Provide a boilerplate for creating APIs/Microservices using express and typescript and clean architecture.

The API created by this boilerplate is functional and contains an endpoint as an example. 
Please read the API [documentation](template/$%7Bcompanyname%7D-$%7Bappname%7D-api/README.md) to get more information about the API.

---

## Using the boilerplate

To create a new API using this boilerplate, use the following commands:

1. Clone this repository 
```bash
    git clone <this repository>
```
2. Make the `generate-app.sh` executable
```bash
    chmod +x generate-app.sh
```
3. Execute `npm run generate` to generate a new API
```bash
    npm run generate
```

> You can specify some arguments instead of answering the bash questions.

1. First argument: Company name
2. Second argument: API name
3. Third argument: Should use SonarQube ?

```bash
    npm run generate -- "Company Name" "API Name" false
```

Done! Now you can find a new folder called `${companyname}-${appname}-api` on your workspace.

---

## Testing the boilerplate

To test if the template will be generated correctly, use the following command:

```bash
    npm run test
```

This command will generate a new API, and it will try to build routes, compile, execute the tests, lint and other tests

You can build new tests by editing the `_test-generated-api` file.

Also, there is a hook on `pre-push` where it will trigger this test command before pushing the code to git.

---

## Cleaning the new API

To help you in the first new lines, the new microservice will have an example on how to implement an endpoint using the clean architecture.
After you learn how to code using this boilerplate, you should remove this example from the API.

The following files should be removed:

1. `core\domain\entities\UserEntity`
2. `core\domain\usecases\GetUserUseCase`
3. `core\domain\usecases\service\UserService`
4. `entrypoints\controllers\UserController`
5. `entrypoints\controllers\models\UserResponse`
6. `providers\network\UserSampleNetworkProvider`