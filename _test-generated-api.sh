#!/usr/bin/env bash
BOILERPLATE_DIRECTORY=$(pwd)

echo ""
echo "Starting boilerplate tests"
echo ""

pre_test() {
    export BOILERPLATE_ENV="TEST"
}

test() {
    echo ">> [TEST] Should create a new api that is ready to use (No Compile/Tests/Lint errors)"
    #Prepare
    npm install --silent --no-warnings

    #Act
    npm run generate -- TestCompany TestAPI false

    #Assert
    if [ ! -d "${BOILERPLATE_DIRECTORY}/generated/testcompany-testapi-api" ]; then
        echo "[ASSERT] Template was not generated."
        exit 1
    fi

    cd ${BOILERPLATE_DIRECTORY}/generated/testcompany-testapi-api
    npm install --silent --no-warnings
    npm run build-routes
    npm run compile
    npm run test
    npm run lint

    # TODO: add more test here for each user option
}

pos_test() {
    cd ${BOILERPLATE_DIRECTORY}

    # Delete the created API folder
    echo "Deleting the test folder"
    rm -rf "${BOILERPLATE_DIRECTORY}/generated"
}

pre_test && test && pos_test
