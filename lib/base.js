'use strict';

class xApi{
    get menu(){
        let menu = new require('menu');
        menu.token = 'this.token';
        return menu;
    }
}