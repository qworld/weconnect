const router = require('koa-router')();

router.prefix('/tokens');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a token response!';
});

router.get('/get', function (ctx, next) {
  ctx.body = 'this is a users/bar response';
});

module.exports = router;
