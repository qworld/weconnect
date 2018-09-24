'use strict';

// operations of menu
const util = require('util');
const fs = require("fs");
const mongoose = require('../lib/mongoDB');

const config_path = global.AppRoot + "/config/menu_list.json";

//const schema = mongoose.Schema;
const menu_schema = new mongoose.Schema({
    appid: { type:String, required:true },
    menu: { type: String, required:true },
    last_update: { type: Date, default: Date.now }
});

const menu_model = mongoose.model('Menu', menu_schema);

module.exports.get = async () => {
    let menu_config = await util.promisify(fs.readFile)(config_path, 'utf8');
    return menu_config;
}

let m = new menu_model();

module.exports.create = async (doc) => {
    return await menu_model.create(doc);
}
