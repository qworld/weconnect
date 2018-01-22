import { isNullOrUndefined } from 'util';

const monk = require('../lib/data_monk');

const collection = monk.get('access_token');
//token is json format. {appid, access_token, request_time, expires_in_sec, expired_time }
exports.addToken = function(token){
    if(!token){
        console.error("empty token");
    }
    collection.insert( {
        appid:token.appid, 
        token: token.access_token, 
        request_time: token.request_time, 
        expires_in_sec: token.expires_in_sec,
        expires_in_sec: token.expired_time
    } )
}
