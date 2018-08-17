'use strict';

const crypto = require('crypto');

module.exports.verify = async (ctx, token) => {
    const { signature, timestamp, nonce, echostr } = ctx.query;
    await next();
    let hash = crypto.createHash('sha1');
    const arr = [token, timestamp, nonce].sort();
    hash.update(arr.join(''));
    const shasum = hash.digest('hex');
    if(shasum == signature){
      return ctx.body = echostr;
    }
    ctx.status = 401; 
    ctx.body = 'Invalid signature, unauthorized access...';
}