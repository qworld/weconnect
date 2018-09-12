'use strict';

// operations of menu
const util = require('util');
const querystring = require("querystring");
const fs = require("fs");

const config_path = global.AppRoot + "/config/menu_list.json";

module.exports.get = async () => {
    let menu_config = await util.promisify(fs.readFile)(config_path);
    return menu_config;
}