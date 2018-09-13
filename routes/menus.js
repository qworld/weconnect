const router = require('koa-router')();
const menuMgr = require('../models/menu');
const weconnect_core = require('../lib/core_service');

router.prefix('/menus');

router.get('/', function (ctx, next) {
    
    ctx.body = 'this is a menu response!';
});

router.get('/create', async function (ctx, next) {
    //let menus = JSON.parse( await menuMgr.get() );
    let menus = await menuMgr.get();
    let result = await weconnect_core.menu.addMenu(menus);
    await ctx.render('common_response', {
        title: 'create menus!',
        data: JSON.stringify(result)
    });
});

module.exports = router;