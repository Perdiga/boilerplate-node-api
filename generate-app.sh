#!/usr/bin/env bash

USER_APP_NAME=$1
ORIGINAL_DIR=$(pwd ./../..)

echo ${USER_APP_NAME}
echo ${ORIGINAL_DIR}

chmod +x _defaults.sh
chmod +x _generate-new-api-structure.sh 
npm install
./_generate-new-api-structure.sh "${USER_APP_NAME}"
ls generated | xargs -I{} mv generated/{} ../

echo ""
echo "Aplicação gerada com sucesso."
echo ""
