const router = require('koa-router')();
const menuMgr = require('../models/menu');
//const weconnect_api = require('weconnect_api');

router.prefix('/menus');

router.get('/', function (ctx, next) {
    
    ctx.body = 'this is a menu response!';
});

router.get('/create', async function (ctx, next) {
    let result = await menuMgr.createMenu();
    await ctx.render('common_response', {
        title: 'create menus!',
        data: result
      }) 
});

module.exports = router;