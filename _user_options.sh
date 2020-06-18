#!/usr/bin/env bash

if [ "${BOILERPLATE_ENV}" == "PROD" ]
then
    source ./_defaults.sh
else
    source ./_defaults.sh
    source ./_defaults-test.sh
fi

FRIENDLY_COMPANY_NAME=$1
FRIENDLY_APPLICATION_NAME=$2
SHOULD_USE_SONAR=$3

# -------------- Application variables
if [ -z "${FRIENDLY_COMPANY_NAME}" ]
then
    echo
    read -p "[Application] What is the name of the company? (Default: \"${DEFAULT_FRIENDLY_COMPANY_NAME}\"): " FRIENDLY_COMPANY_NAME
fi

export FRIENDLY_COMPANY_NAME="${FRIENDLY_COMPANY_NAME:-$DEFAULT_FRIENDLY_COMPANY_NAME}"

if [ -z "${FRIENDLY_APPLICATION_NAME}" ]
then
    echo
    read -p "[Aplicação] What is the name of the API? (Default: \"${DEFAULT_FRIENDLY_APP_NAME}\"): " FRIENDLY_APPLICATION_NAME
fi

export FRIENDLY_APPLICATION_NAME="${FRIENDLY_APPLICATION_NAME:-$DEFAULT_FRIENDLY_APP_NAME}"

# -------------- SonarQube variables
if [ -z "${SHOULD_USE_SONAR}" ]
then
    echo
    read -p "[Aplicação] Do you want to use SonarQube in this project? (Default: \"${DEFAULT_SHOULD_USE_SONAR}\"): " SHOULD_USE_SONAR
fi

export SHOULD_USE_SONAR="${SHOULD_USE_SONAR:-$DEFAULT_SHOULD_USE_SONAR}"

if [ "${SHOULD_USE_SONAR}" == 'true' ]
then
    echo
    read -p "[SonarQube] What is the SonarQube url? (Default: \"${DEFAULT_FRIENDLY_SONARQUBE_URL}\"): " FRIENDLY_SONARQUBE_URL
  
    echo
    read -p "[SonarQube] What is the SonarQube port? (Default: \"${DEFAULT_FRIENDLY_SONARQUBE_PORT}\"): " FRIENDLY_SONARQUBE_PORT
    export SHOULD_USE_SONAR=true
else
    export SHOULD_USE_SONAR=false
fi
export FRIENDLY_SONARQUBE_URL="${FRIENDLY_SONARQUBE_URL:-$DEFAULT_FRIENDLY_SONARQUBE_URL}"
export FRIENDLY_SONARQUBE_PORT="${FRIENDLY_SONARQUBE_PORT:-$DEFAULT_FRIENDLY_SONARQUBE_PORT}"


