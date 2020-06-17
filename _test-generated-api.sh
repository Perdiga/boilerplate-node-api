#!/usr/bin/env bash
echo ""
echo "Starting boilerplate tests"
echo ""

export BOILERPLATE_ENV="TEST"

echo ">> [TEST] Should create a new api that is ready to use (No Compile/Tests/Lint errors)"
#Prepare
npm install --silent --no-warnings

#Act
npm run generate -- TestCompany TestAPI false

#Assert
if [ ! -d "$(pwd)/generated/testcompany-testapi-api" ] 
then 
    echo "[ASSERT] Template was not generated."
    exit 1
fi
 
cd $(pwd)/generated/testcompany-testapi-api
npm install --silent --no-warnings
npm run build-routes
npm run compile
npm run test
npm run lint

# TODO: add more test here for each user option 

# Delete the created API folder
if [ ! -d "$(pwd)/generated" ] 
then 
    # FIXME: This is not working, I don't know why 
    echo "Deleting the test folder"
    rm -rf "$(pwd)/generated"
fi
