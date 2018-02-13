// operations of wechat's token
const querystring = require('querystring');
const r2 = require('r2');
const monk = require('../lib/data_monk');

const collection = monk.get('access_token');
const tokenUri = "https://api.weixin.qq.com/cgi-bin/token?";
const appid = 'wx90bbba88d31e8381';
const secret = '63b3a9188d3dfb3acf5c63c28ec1b050';

//take charge of access token's actions
var accessTokensMgr = {
    //form url for get token 
    requestUrl: tokenUri + querystring.stringify({
        grant_type: 'client_credential',
        //property appid and secret cannot be accessed with keyword 'this', because of json format
        appid: appid, 
        secret: secret
    }),

    // get access token and save it into db
    async getAccessToken(){
        let access_token = this._getTokenFromCache();
        if(!access_token.expireTime || access_token.expireTime <= Date.now()){
            access_token = await this._getTokenFromAPI();
            console.log(access_token);
            await this._saveToken(access_token);
        }
        return access_token;
    },

    // private method, get token from db when token isn't expired
    async _getTokenFromCache(){
        collection.index('_id last');
    },

    // private method, get token from wechat API
    async _getTokenFromAPI(){
        let requestTime = Date.now();
        //wechat's api will return data like {"access_token":"ACCESS_TOKEN","expires_in":7200}
        var accessToken = await r2.get(this.requestUrl).json;
        console.log(accessToken);
        //console.log(this.requestUrl);
        //减掉60秒，用以避免各类原因造成的误差, reduce 60s for error range
        let expireTime = requestTime + (accessToken.expires_in - 60) * 1000;
        accessToken.appid = appid;
        accessToken.request_time = requestTime;
        accessToken.expire_time = expireTime;
        return accessToken;
    },

    // private method, save token into db
    async _saveToken(token){
        if(!token){
            console.error("empty token");
        }
        //console.log(JSON.stringify(token));
        collection.insert( {
            appid:token.appid, 
            token: token.access_token, 
            request_time: token.request_time, 
            expires_in: token.expires_in,
            expire_time: token.expire_time
        } )
    }    
}

module.exports = accessTokensMgr;
/*
exports.get = function(ctx, err){

};
*/