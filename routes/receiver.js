'use strict';

const router = require('koa-router')();
const crypto = require('crypto');

//在公众平台后台自行添加的token，使用时需要修改成与公众平台一致
const token = 'k3h#7*!hga3Bv<&wP8=R'; 

router.prefix('/receiver');

//save msg into db & log
//analyze msg and router them to different process 
//send reply, save into db & log

/**
 * 默认为微信官方的服务器验证
 */
router.get('/', async (ctx, next) => {
    let signature = ctx.query.signature;
    let timestamp = ctx.query.timestamp;
    let echostr = ctx.query.echostr;
    let nonce = ctx.query.nonce;
    ctx.response.type = "text/plain";
    if( verify(signature, timestamp, nonce) ){
        ctx.response.body = echostr;
    }
    else{
        ctx.body = "incorrect request, please try again";
    }
});

router.post('/', async (ctx, next) => {
    ctx.body = 'success'
    let reqType = ctx.request.type;
    console.log(reqType);
});

/**
 * 根据token和timestamp参数、nonce参数，校验请求是否来自微信官方
 * @param {string} signature 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数
 * @param {string} timestamp 时间戳
 * @param {string} nonce 随机数
 */
function verify(signature, timestamp, nonce){
    let tmpArr = Array(token, timestamp, nonce).sort().join("");
    let sha1 = crypto.createHash('sha1');
    sha1.update(tmpArr);
    tmpArr = sha1.digest('hex');
    return result = tmpArr == signature;
}

module.exports = router;