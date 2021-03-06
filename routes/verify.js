/**
 * 用于第一次开通公众平台接口验证
 * 在公众平台后台提交验证的URL为：xxx.xxx.xxx/verify/，具体域名根据实际情况填写
 * 官方验证说明：开发者通过检验signature对请求进行校验。若确认此次GET请求来自微信服务器，请原样返回echostr参数内容，则接入生效，成为开发者成功，否则接入失败。
 * 加密/校验流程如下：将token、timestamp、nonce三个参数进行字典序排序； 2）将三个参数字符串拼接成一个字符串进行sha1加密； 3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
 * 文档地址：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319
 **/

'use strict';

const router = require('koa-router')();
const crypto = require('crypto');
//在公众平台后台自行添加的token，使用时需要修改成与公众平台一致
const token = 'k3h#7*!hga3Bv<&wP8=R'; 

router.prefix('/verify');

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