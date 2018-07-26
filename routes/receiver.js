'use strict';

const router = require('koa-router')();

//save msg into db & log
//analyze msg and router them to different process 
//send reply, save into db & log

router.get('/', async (ctx, next) => {
    ctx.body = 'success'
});

router.post('/', async (ctx, next) => {
    ctx.body = 'success'
    let reqType = ctx.request.type;
    
});
