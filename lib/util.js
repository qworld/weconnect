const fs = require("fs");

// 工具类，用于校验
var validator = {
    // 获得对象类型字符串
    _getTypeStr(obj){
        return Object.prototype.toString.call(obj).slice(8, -1);
    },

    //是否字符串
    isString(obj){
        //return this._getTypeStr(obj) === 'String';
        return typeof obj === 'string';
    },

    //是否数字
    isNumber(obj){
        return this._getTypeStr(obj) === 'Number'; 
    },

    //是否对象
    isObj(obj){
        return this._getTypeStr(obj) === 'Object';
    },

    //是否数组
    isArray(obj){
        return this._getTypeStr(obj) === 'Array';
    },

    //是否时间
    isDate(obj){
        return this._getTypeStr(obj) === 'Date';
    },

    //是否boolean
    isBoolean(obj){
        return this._getTypeStr(obj) === 'Boolean';
    },

    //是否函数
    isFunction(obj){
        return this._getTypeStr(obj) === 'Function';
    },

    //是否为null
    isNull(obj){
        return this._getTypeStr(obj) === 'Null';
    },

    //是否undefined
    isUndefined(obj){
        return this._getTypeStr(obj) === 'Undefined';
    }

}

class file{
    //read file, support async/await
    static async read(filePath){
        return new Promise( function(resolve, reject){
            fs.readFile(filePath, 'utf8', function(err, data){
                if(err){
                    reject(err);
                }
                resolve(data);
            });
        } );
    }

    //overwrite file, support async/await
    static async write(filePath, data){
        return new Promise(function(resolve, reject){
            fs.writeFile(filePath, data, 'utf8', function(err){
                if(err){
                    reject(err);
                }
                return resolve();
            });
        });
    }
}


module.exports.validator = validator;
module.exports.file = file;