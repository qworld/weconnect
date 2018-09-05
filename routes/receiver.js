'use strict';

/**
 * 此页面接收并处理微信服务器推送的消息。
 * 微信服务器推送的消息格式为xml。
 * 回复消息时不通过在response里返回xml格式数据来实现，而是通过客服消息接口向用户回复消息。
 * 这种方式也是微信官方建议的，提高代码复用率。
 */

const crypto = require('crypto');
const router = require('koa-router')();
const log4js = require('log4js');
const getRawBody = require('raw-body');

log4js.configure('./config/config_log4js.json');
const logger = log4js.getLogger("default");

//在公众平台后台自行添加的token，使用时需要修改成与公众平台一致
const token = 'k3h#7*!hga3Bv<&wP8=R'; 

router.prefix('/receiver');

//save msg into db & log
//analyze msg and router them to different process 
//send reply, save into db & log

/**
 * 默认GET方式为微信官方的服务器验证
 */
router.get('/', async (ctx, next) => {
    const { signature, timestamp, nonce, echostr } = ctx.query;
    ctx.response.type = "text/plain";
    if( await checkSignature(signature, timestamp, nonce, token) ){
        return ctx.body = echostr;
    }
    ctx.status = 401;
    ctx.body = "Invalid request, unauthorized access...";
});


router.get('/test', async (ctx, next) => {
    // const path = require('path');
    // let info = path.basename('verify copy.js', '.js');
    let menu = ctx.app.coreApi.menu;
    let data = await menu.getMenu();
    console.log(JSON.stringify(data));
});

router.post('/', async (ctx, next) => {
    const { signature, timestamp, nonce } = ctx.query;
    //ctx.response.type = "text/xml";
    //校验请求是否来自微信服务器
    if( await checkSignature(signature, timestamp, nonce, token) ){
        // 取原始数据
        const xml = await getRawBody(ctx.req, {
            length: ctx.request.length,
            limit: '1mb',
            encoding: ctx.request.charset || 'utf-8'
        });
        
        //logger.info(xml);
        //let jsonMsg = await ctx.app.coreApi.message.xmlToJson(xml);
        const msg = await ctx.app.coreApi.getModule('message');
        let jsonMsg = await msg.xmlToJson(xml);
        //logger.info(jsonMsg);
        await parseMsg(ctx, jsonMsg);
        ctx.body = 'success';
    } else {
        ctx.status = 401;
        ctx.body = "Invalid request, unauthorized access...";
    }
});

/**
 * 根据token和timestamp参数、nonce参数，校验请求是否来自微信官方
 * @param {string} signature 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数
 * @param {string} timestamp 时间戳
 * @param {string} nonce 随机数
 * @param {string} token 全局access_token,调用接口凭证
 */
const checkSignature = async function(signature, timestamp, nonce, token){
    let data = Array(token, timestamp, nonce).sort().join("");
    const hash = crypto.createHash('sha1');
    hash.update(data, 'utf8');
    let sign = hash.digest('hex');
    return (sign == signature);
}

/**
 * 解析
 * @param {*} msg 
 */
async function parseMsg(ctx, msg){
    logger.info(msg);
    let type = msg.MsgType;
    let openId = msg.FromUserName;

    switch(type){
        case "text":
        case "image":
        case "voice":
        case "video":
        case "shortvideo":
        case "location":
        case "link":
            const message = await ctx.app.coreApi.getModule('message');
            await message.sendText(openId, "请稍后，马上回复你哈...");
            break;
        default:
            break;
    }

}

module.exports = router;