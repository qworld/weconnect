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
    let token = await core.accessToken.getAccessToken();

    await ctx.render('common_response', {
        title: 'get token!',
        data: JSON.stringify(token)
      })   
});

router.get('/testcache', async function (ctx, next) {
    /*
    let msg = await core.fileCache.add("appid_123", {
        "token":"this is a new example, set access token here", 
        "expires_in":7200,
        "expires_time_ms":88888888, 
        "request_time":"2018/03/01 12:15:00", 
        "expires_time":"2018/03/01 14:00:00"
    }, 7200);
    ctx.body = 'the path is : ' + msg;
    */
    let msg = await core.fileCache.get("appid_123");
    ctx.body = 'the path is : ' + JSON.stringify(msg);
});

module.exports = router;