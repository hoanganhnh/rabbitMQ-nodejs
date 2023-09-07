#!/bin/bash
set -e

RED='\033[0;31m'
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
DIR=$(dirname "$SCRIPT_DIR")
WORK_DIR=$(printf '%s\n' $(dirname "$DIR") | sed -e 's/[\/&]/\\&/g')

sed -i "s/.*DOCKER_UID=.*/DOCKER_UID=$(id -u)/" $DIR/environment/.env
sed -i "s/.*DOCKER_GID=.*/DOCKER_GID=$(id -g)/" $DIR/environment/.env
sed -i "s/.*WORK_DIR=.*/WORK_DIR=$WORK_DIR/" $DIR/environment/.env
cat $DIR/environment/.env
printf "\n\n${RED}.env has been updated, run bin/start.sh to apply the updates\n"