const router = require('koa-router')();
//const weconnect_core = require('weconnect_core');
const utils = require("../lib/util");

//const core = new weconnect_core( { "init_mode":"static", "appid":"wx90bbba88d31e8381", "secret":"63b3a9188d3dfb3acf5c63c28ec1b050" } );


router.prefix('/tokens');

router.get('/', async function (ctx, next) {
    ctx.body = 'this is a token response';
});

router.get('/get', async function (ctx, next) {
    //console.log('token');
    let token = await ctx.app.coreApi.getAccessToken(ctx.app.coreApi.appid, ctx.app.coreApi.secret);

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
    let menuMgr = await ctx.app.coreApi.getModule("menu");
    let res = await menuMgr.addMenu(menu);
    ctx.body = 'the result is : ' + JSON.stringify(res);
});

router.get('/getmenu', async function (ctx, next) {
    let menuMgr = await ctx.app.coreApi.getModule("menu");
    //menuMgr.getRequestUrl("head", "12345");
    let res = await menuMgr.getCurrentMenuInfo();
    ctx.body = 'the result is : ' + JSON.stringify(res);
});

router.get('/testxml', async function (ctx, next) {
    //let str = "<xml>  <ToUserName>< ![CDATA[toUser] ]></ToUserName>  <FromUserName>< ![CDATA[fromUser] ]></FromUserName>  <CreateTime>1348831860</CreateTime>  <MsgType>< ![CDATA[text] ]></MsgType>  <Content>< ![CDATA[this is a test] ]></Content>  <MsgId>1234567890123456</MsgId>  </xml>";
    //const parser = new DOMParser();
    //let doc = parser.parseFromString(str, "application/xml");
    //ctx.body = doc;

    // let msg = { "wxname": "walle" };
    // (1==1) ? (msg["id"] = "133") : "msg";
    // let count = 11;
    // count = count > 20 ? 20 : count;
    // ctx.body = count;

    let t = "" || "hello";
    ctx.body = t;
    //ctx.body = JSON.stringify(msg);
});

module.exports = router;