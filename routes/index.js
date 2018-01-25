const router = require('koa-router')();
const tokenMgr = require('../lib/tokenMgr');

router.get('/', async (ctx, next) => {
  var token = await tokenMgr.getAccessToken();
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    data: token
  })
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
});

module.exports = router;
