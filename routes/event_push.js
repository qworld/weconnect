'use strict';

/**
 * handle with events that pushed from wechat
 */

const weconnect_core = require('../lib/core_service');


/**
 * user subscribe
 * set tag "new user"
 * get user info & save into db
 * @param {object} msg 
 */
const subscribe = async (msg) => {
    let openId = msg.FromUserName;
    let userInfo = await weconnect_core.user.getUserInfo(openId);
}

/**
 * user unsubscribe
 * update db
 * @param {object} msg 
 */
const unsubscribe = async (msg) => {
    //
}

const subscribeByScanQR = async (msg) => {
    let openId = msg.FromUserName;
    let userInfo = await weconnect_core.user.getUserInfo(openId);
}

const scan = async (msg) => {}

const location = async (msg) => {}

const menuClick = async (msg) => {}

const view = async (msg) => {}


/**
 * deal with push event by type
 * @param {object} msg the event message pushed by wechat
 */
module.exports.handlePushEvent = async (msg) => {
    // uppercase to avoid mismatch
    let event = msg.Event.trim().toUpperCase();
    let eventKey = msg.EventKey ? msg.EventKey : '';
    switch (event) {
        case "SUBSCRIBE":
            eventKey ? await subscribeByScanQR(msg) : await subscribe(msg);
            break;
        case "UNSUBSCRIBE":
            await unsubscribe(msg);
            break;
        case "SCAN":
            await scan(msg);
            break;
        case "LOCATION":
            await location(msg);
            break;
        case "CLICK":
            await menuClick(msg);
            break;
        case "VIEW":
            await view(msg);
            break;
        default:
            break;
    }
}