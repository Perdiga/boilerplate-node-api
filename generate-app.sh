#!/usr/bin/env bash

USER_COMPANY_NAME=$1
USER_APP_NAME=$2
USER_USE_SONARQUBE_NAME=$3

ORIGINAL_DIR=$(pwd ./../..)

# Add execution permissions to sh files
chmod +x _defaults.sh
chmod +x _defaults-test.sh
chmod +x _user_options.sh
chmod +x _test-generated-api.sh

# Load variables into enviroment 
echo "BOILERPLATE_ENV: ${BOILERPLATE_ENV}"
if [ "${BOILERPLATE_ENV}" == "TEST" ]
then
    source ./_defaults.sh
    source ./_defaults-test.sh
else
    source ./_defaults.sh    
fi

# Ask to user some questions that will be used to generate the API
source ./_user_options.sh "${USER_COMPANY_NAME}" "${USER_APP_NAME}" "${USER_USE_SONARQUBE_NAME}" 

# Generate the template
npm install 
npm run generate:new-api

# Move the generated API to parend folder
if [ "${BOILERPLATE_ENV}" != "TEST" ]
then
    ls generated | xargs -I{} mv generated/{} ../
fi

echo ""
echo "Application generated."
echo ""
