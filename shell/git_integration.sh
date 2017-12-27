#! /bin/bash

sys_log="/var/log/node_git/node_git.log"

function log_info(){
  local date=`date`
  local para=$1
  echo "log info:$date $1" >> $sys_log
}

cd /var/www/weconnect/
git clean -f
git pull bitbucket master
log_info "git pull done"
chown www-data:www-data -R /var/www/weconnect/
log_info "change dir owner done"
yarn install
#yarn run test
#yarn run prd