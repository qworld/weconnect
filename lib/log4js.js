'use strict';

const log4js = require('log4js');
log4js.configure('./config/config_log4js.json');

module.exports = log4js.getLogger("default");