#! /bin/bash

cd /var/www/weconnect/
git clean -f
git pull bitbucket master
chown www-data:www-data -R /var/www/weconnect/
yarn install
#yarn run test
#yarn run prd