const router = require('koa-router')();
const tokenMgr = require('../models/token');

router.prefix('/tokens');

router.get('/', function (ctx, next) {
    ctx.body = 'this is a token response!';
});

router.get('/get', function (ctx, next) {
    var token = await accessTokensMgr.getAccessToken();
    await ctx.render('token', {
        title: 'get token!',
        data: JSON.stringify(token)
      })   
});

module.exports = router;