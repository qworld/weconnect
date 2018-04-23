const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
//const mongoose = require('./mongoDB');
const index = require('./routes/index');
const tokens = require('./routes/tokens');
const users = require('./routes/users');
const webhook = require('./routes/webhook');
const menus = require('./routes/menus');

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


const mongoose = require('mongoose');
const uri = 'mongodb://localhost/weconnect';
const options = { dbName:'weconnect', poolSize:10, autoReconnect:true };

mongoose.connect(uri, options, function(error) {
    // Check error in initial connection. There is no 2nd param to the callback.
    if(error){
      console.log("failed to connect to mongodb");
      console.log(error);
    }
});
//console.log( mongoose.connection );

/*
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/weconnect';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});
*/

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(tokens.routes(), tokens.allowedMethods());
app.use(webhook.routes(), webhook.allowedMethods());
app.use(menus.routes(), menus.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
