'use strict';

// operations of wechat's token
const querystring = require('querystring');
const mongoose = require('../lib/mongoDB');

const tokenUri = "https://api.weixin.qq.com/cgi-bin/token?";
const prj_appid = 'wx90bbba88d31e8381';
const prj_secret = '63b3a9188d3dfb3acf5c63c28ec1b050';

//define Schema for access token
const accessTokenSchema = mongoose.Schema({
    appid: {type:String, required:true, min:5},
    token: {type:String, required:true, min:10},
    expires_in_ms: {type:Number, required:true},
    expires_time_ms: {type:Number, required:true},
    request_time: {type:String, required:true},
    expires_time: {type:String, required:true}
});

//create model from Schema
var AccessToken = mongoose.model('access_token', accessTokenSchema);

//take charge of access token's actions
var accessTokensMgr = {
    //form url for get token 
    requestUrl: tokenUri + querystring.stringify({
        grant_type: 'client_credential',
        //property appid and secret cannot be accessed with keyword 'this', because of json format
        appid: prj_appid, 
        secret: prj_secret
    }),

    // get access token and save it into db
    async getAccessToken(){
        let access_token = await this._getTokenFromCache();
        if(access_token === null || access_token.expireTime <= Date.now()){
            access_token = await this._getTokenFromAPI();
            console.log(access_token);
            await this._saveToken(access_token);
        }
        return access_token;
    },

    // private method, get token from db when token isn't expired
    async _getTokenFromCache(){
        let token = null;
        AccessToken.find( {appid: serviceConfigs.service_01.appid} ).lean().exec(function(err, docs){
            if(err){
                console.log("error: failed in finding docs");
            }
            if(docs.length > 0){
                console.log("get token from db successfully");
                token = docs;
            }
        });
        return token;
    },

    // private method, get token from wechat API
    async _getTokenFromAPI(){
    //wechat's api will return data in JSON like {"access_token":"ACCESS_TOKEN","expires_in":7200}
    let accessToken = await utils.request.getJSON(this.requestUrl);

    if(!accessToken){
        console.log("error: failed in getting token from wechat's api");
        return null;
    }

    //减掉60秒，用以避免各类原因造成的误差, reduce 60s for error range
    let requestTime = Date.now();
    let expiresTime = requestTime + (accessToken.expires_in - 60) * 1000;
    //add new data to JSON
    accessToken.appid = serviceConfigs.service_01.appid;
    //accessToken.expires_in_ms = expires_in;
    accessToken.expires_time_ms = expiresTime;
    accessToken.request_time = (new Date(requestTime)).toLocaleString("zh-cn", {hour12: false});
    accessToken.expires_time = (new Date(expiresTime)).toLocaleString("zh-cn", {hour12: false});
    return accessToken;
    },

    // private method, save token into db
    async _saveToken(token){
        if(!token){
            console.error("empty token");
            return false;
        }
        console.log("token is: " + JSON.stringify(token));
    
        let newToken = new AccessToken({
            appid:token.appid, 
            token: token.access_token, 
            expires_in_ms: token.expires_in, 
            expires_time_ms: token.expires_time_ms,
            request_time: token.request_time,
            expires_time: token.expires_time
        });
    
        newToken.save(function(err, doc){
            if(err){
                console.log(err);
                return false;
            }
            console.log("saving token into db " + doc);
            return true;
        });    
    }
}

module.exports = accessTokensMgr;