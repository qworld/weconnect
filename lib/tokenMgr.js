// operations of wechat's token
const r2 = require('r2');
const monk = require('../lib/data_monk');

const collection = monk.get('access_token');
const tokenUri = "https://api.weixin.qq.com/cgi-bin/token?";

var accessTokensMgr = {
    appid: 'wx90bbba88d31e8381',
    secret: '63b3a9188d3dfb3acf5c63c28ec1b050',

    requestUrl: tokenUri + querystring.stringfy({
        grant_type: 'client_credential',
        appid: this.appid,
        secret: this.secret
    }),

    async getAccessToken(){
        var token = this._getTokenFromCache();
        if(!token || token.expireTime <= date.now()){
            token = this._getTokenFromAPI();
            this._saveToken(token);
        }
        return token;
    },

    _getTokenFromCache(){
        collection.index('_id last');
    },

    _saveToken(token){
        if(!token){
            console.error("empty token");
        }
        collection.insert( {
            appid:token.appid, 
            token: token.access_token, 
            request_time: token.request_time, 
            expires_in: token.expires_in,
            expire_time: token.expire_time
        } )
    },

    _getTokenFromAPI(){
        let requestTime = Date.now();
        //wechat's api will return data like {"access_token":"ACCESS_TOKEN","expires_in":7200}
        var {accessToken} = r2.get(this.requestUrl).json;
        //减掉60秒，用以避免各类原因造成的误差, reduce 60s for error range
        let expireTime = requestTime + (accessToken.expires_in - 60) * 1000;
        accessToken.appid = this.appid;
        accessToken.request_time = requestTime;
        accessToken.expire_time = expireTime;
        return accessToken;
    }
}

module.exports = accessTokensMgr;
/*
exports.get = function(ctx, err){

};
*/