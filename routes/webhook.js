const router = require('koa-router')();

router.prefix('/integration');

router.get('/', function (ctx, next) {
  ctx.body = 'coming soon'
});

router.get('/x2nzp6hw', function (ctx, next) {
  //ctx.body = 'request accepted';
  
  return ctx.render('webhook', {
    title: 'webhook',
    message: 'request accepted'
  });
  
});

module.exports = router;
