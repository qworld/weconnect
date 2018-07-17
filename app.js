const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const index = require('./routes/index');
const tokens = require('./routes/tokens');
const users = require('./routes/users');
const webhook = require('./routes/webhook');
const menus = require('./routes/menus');
const verify = require('./routes/verify');

//register global variables
global.AppRoot = __dirname; //root path of this project
global.ApiPrefix = "https://api.weixin.qq.com/cgi-bin/";

// error handler
onerror(app);

// middlewares
app.use(logger());
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
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
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(tokens.routes(), tokens.allowedMethods());
app.use(webhook.routes(), webhook.allowedMethods());
app.use(menus.routes(), menus.allowedMethods());
app.use(verify.routes(), verify.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

module.exports = app;
