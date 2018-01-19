const url = 'mongodb://localhost:27017/weconnect';
const options = { poolSize:10, ssl:false, autoReconnect:true };
const db = require('monk')(url, options, (err)=>{
    console.log("failed to connect to mongodb");
    console.error(err);
});

//export db connection
module.exports = db;