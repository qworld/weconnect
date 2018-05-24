'use strict';

const addGeneralMenu = async function(){
    console.log("this is in apis, aid =" + this.token );
    //module.parent.get_token();
};
const getGeneralMenu = async function(){};
const delGeneralMenu = async function(){};
const addPersonalizedMenu = async function(){};
const getPersonalizedMenu = async function(){};
const delPersonalizedMenu = async function(){};

module.exports.addGeneralMenu = addGeneralMenu;
module.exports.getGeneralMenu = getGeneralMenu;