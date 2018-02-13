const url = 'mongodb://127.0.0.1:27017/weconnect';
const options = { poolSize:10, ssl:false, autoReconnect:true };
const db = require('monk')(url, options);
if(!db){
    console.log("failed to connect to mongodb");
    console.error(err);
}

//export db connection
module.exports = db;