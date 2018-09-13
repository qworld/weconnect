'use strict';

// operations of menu
const util = require('util');
const fs = require("fs");
const mongoose = require('../lib/mongoDB');

const config_path = global.AppRoot + "/config/menu_list.json";

const schema = mongoose.Schema;
const model_menu = new schema({
    appid: { type:String, required:true }
});

module.exports.get = async () => {
    let menu_config = await util.promisify(fs.readFile)(config_path, 'utf8');
    return menu_config;
}