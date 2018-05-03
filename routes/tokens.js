const router = require('koa-router')();
const weconnect_api = require('/Users/quan/Dev/nodejs/weconnect_core');
//const weApi = require('co-wechat-api');
//const mongoose = require('mongoose');

router.prefix('/tokens');

router.get('/', async function (ctx, next) {
    let msg = await weconnect_api.utils.getErrMsgByCode(40016);
    ctx.body = 'this is a token response: ' + msg;
});

router.get('/get', async function (ctx, next) {
    //console.log('token');
    let token = await weconnect_api.accessToken.getAccessToken();

    await ctx.render('common_response', {
        title: 'get token!',
        data: JSON.stringify(token)
      })   
});

module.exports = router;