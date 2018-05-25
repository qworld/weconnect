const router = require('koa-router')();
const weconnect_core = require('/Users/quan/Dev/nodejs/weconnect_core');
const utils = require("../lib/util");
//const weApi = require('co-wechat-api');
//const mongoose = require('mongoose');

const core = new weconnect_core( { "init_mode":"static", "appid":"wx90bbba88d31e8381", "secret":"63b3a9188d3dfb3acf5c63c28ec1b050" } );

router.prefix('/tokens');
/*
class z{
    constructor(id,st){
        this.id = id;
        this.st = st;
    }

    getToken(){
        return this.id + this.st;
    }
};

class m extends z{
    constructor(id, st){
        super(id,st);
    }

    get_token(){
        return super.getToken();
    }
    
    get menu(){
        let menu = require('../lib/apis');
        menu.token = 'abc....*';
        return menu;
    }
}
*/

router.get('/', async function (ctx, next) {
    let msg = await core.utils.validator.isObj({"a":133});
    ctx.body = 'this is a token response: ' + msg;
});

router.get('/get', async function (ctx, next) {
    //console.log('token');
    let token = await core.getAccessToken(core.appid, core.secret);

    await ctx.render('common_response', {
        title: 'get token!',
        data: JSON.stringify(token)
      })   
});

router.get('/testcache', async function (ctx, next) {
    let msg = await core.fileCache.get("appid_123");
    ctx.body = 'the path is : ' + JSON.stringify(msg);
});

router.get('/testmenu', async function (ctx, next) {
    //let menu = require("../configs/menu_list.json");

    let menu = await utils.file.read(global.AppRoot + "/configs/menu_list.json");
    //let res = core.menu.addGeneralMenu(menu);
    let menuMgr = core.menu;
    let res = await menuMgr.addMenu(menu);
    ctx.body = 'the result is : ' + JSON.stringify(res);
});

router.get('/getmenu', async function (ctx, next) {
    let menuMgr = core.menu;
    //menuMgr.getRequestUrl("head", "12345"); 
    let res = await menuMgr.getMenu();
    ctx.body = 'the result is : ' + JSON.stringify(res);
});

module.exports = router;