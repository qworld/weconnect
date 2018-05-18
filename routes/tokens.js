const router = require('koa-router')();
const weconnect_core = require('/Users/quan/Dev/nodejs/weconnect_core');
//const weApi = require('co-wechat-api');
//const mongoose = require('mongoose');

const core = new weconnect_core( { "init_mode":"static", "appid":"wx90bbba88d31e8381", "secret":"63b3a9188d3dfb3acf5c63c28ec1b050" } );

router.prefix('/tokens');

router.get('/', async function (ctx, next) {
    let msg = await core.utils.validator.isObj({"a":133});
    ctx.body = 'this is a token response: ' + msg;
});

router.get('/get', async function (ctx, next) {
    //console.log('token');
    let token = await core.accessToken.getAccessToken(core.appid, core.secret);

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
    const obj = require('/Users/quan/Dev/nodejs/weconnect_core');
    console.log("this is a " + typeof obj);
    for(var key in obj){
        console("obj's key is " + key);
    }
});

module.exports = router;