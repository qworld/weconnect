'use strict';

// operations of wechat's token
const querystring = require('querystring');
const r2 = require('r2');
const mongoose = require('../lib/mongoDB');

const tokenUri = "https://api.weixin.qq.com/cgi-bin/token?";
const prj_appid = 'wx90bbba88d31e8381';
const prj_secret = '63b3a9188d3dfb3acf5c63c28ec1b050';

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
        let token = collection.findOne({appid:'wx90bbba88d31e8381'}).then( function(doc){
            return resolve(doc);
        } );
        return token;
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
        accessToken.appid = prj_appid;
        accessToken.request_time = requestTime;
        accessToken.expire_time = expireTime;
        return accessToken;
    },

    // private method, save token into db
    async _saveToken(token){
        if(!token){
            console.error("empty token");
        }
        //ensure only one record stored in collection
        //update the record everytime if needed
        const recordsNum = collection.count();
        if(recordsNum == 1) {
            return collection.findOneAndUpdate({appid:appid}, {
                token: token.access_token, 
                request_time: token.request_time,
                expires_in: token.expires_in,
                expire_time: token.expire_time
            });
        }
        //if records more than 1 or zero, remove all records, 
        //then insert 1 new record
        collection.remove(); 
        collection.insert( {
            appid:token.appid, 
            token: token.access_token, 
            request_time: token.request_time, 
            expires_in: token.expires_in,
            expire_time: token.expire_time
        } );
    }
}

module.exports = accessTokensMgr;
