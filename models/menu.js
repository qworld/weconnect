// operations of menu
const querystring = require("querystring");
const fs = require("fs");
const r2 = require('r2');
const tokenMgr = require('../models/token');
const requestUrl = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=';
//const monk = require('../lib/data_monk');

//const collection = monk.get('menu');

exports.createMenu = async function(){
    let menu_list = fs.readFileSync(AppRoot + '/configs/menu_list.json');
    let token = await tokenMgr.getAccessToken();
    let url = requestUrl + token.token;
    console.log('url is: ' + url);
    //console.log('token is already get, ' + JSON.stringify(token) );
    if(token){
        const result = await r2.post(url, menu_list).json;
        if(result.errcode > 0){
            console.log('create menu failed! errmsg is:' + result.errmsg);
            return false;
        }
        return true;
    }
    
    return false;
};

