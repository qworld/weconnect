#! /bin/bash

git clean -f
git pull origin master
yarn install
yarn run test
yarn run prd