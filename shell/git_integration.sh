#! /bin/bash

cd /var/www/weconnect/
git clean -f
git pull bitbucket master
yarn install
#yarn run test
#yarn run prd