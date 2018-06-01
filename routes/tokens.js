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

function abx(data){
    console.log("daaa");
    yzx(data);
    return "data is omit";
}

function yzx(data){
    console.log("yzx");
    if(data){
        console.log("data appears");
    } else{
        console.log("data disappears");
    }
    return "this is yzx";
}

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
    //let msg = await core.fileCache.get("appid_123");
    let msg = abx();
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
    let res = await menuMgr.getCurrentMenuInfo();
    ctx.body = 'the result is : ' + JSON.stringify(res);
});

router.get('/testxml', async function (ctx, next) {
    let str = "<xml>  <ToUserName>< ![CDATA[toUser] ]></ToUserName>  <FromUserName>< ![CDATA[fromUser] ]></FromUserName>  <CreateTime>1348831860</CreateTime>  <MsgType>< ![CDATA[text] ]></MsgType>  <Content>< ![CDATA[this is a test] ]></Content>  <MsgId>1234567890123456</MsgId>  </xml>";
    const parser = new DOMParser();
    let doc = parser.parseFromString(str, "application/xml");

    ctx.body = doc;
});

module.exports = router;