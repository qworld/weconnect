'use strict';

const logger = require('./lib/log4js');

const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
//const koa_logger = require('koa-logger');

//register global variables
global.AppRoot = __dirname; //root path of this project
global.ApiPrefix = "https://api.weixin.qq.com/cgi-bin/";

//const weconnect_core = require('../weconnect_core/');
const weconnect_core = require('./lib/core_service');

const index = require('./routes/index');
const tokens = require('./routes/tokens');
const users = require('./routes/users');
const webhook = require('./routes/webhook');
const menus = require('./routes/menus');
const receiver = require('./routes/receiver');


//const core = new weconnect_core("wx90bbba88d31e8381", "63b3a9188d3dfb3acf5c63c28ec1b050");
app.coreApi = weconnect_core;


// error handler
onerror(app);

// middlewares
//app.use(koa_logger());
app.use(bodyparser({
  enableTypes:['json', 'form', 'text'],
  formLimit: '512kb'
}));



app.use(json());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'njk',
  map: {njk: 'nunjucks'}
}));


// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  // x-response-time
  ctx.set('X-Response-Time', `${ms}ms`);
  let msg = `${ctx.method} ${ctx.url} - ${ms}ms`;
  //console.log(msg);
  logger.info(msg);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(tokens.routes(), tokens.allowedMethods());
app.use(webhook.routes(), webhook.allowedMethods());
app.use(receiver.routes(), receiver.allowedMethods());
app.use(menus.routes(), menus.allowedMethods());
app.use(users.routes(), users.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
  //console.error('server error', err, ctx);
  logger.error('server error', err, ctx);
});

app.on('unhandledRejection', (reason, p) => {
  //console.log('Unhandled Rejection at:', p, 'reason:', reason);
  logger.fatal('Unhandled Rejection at:', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

module.exports = app;