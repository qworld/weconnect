const uri = 'mongodb://127.0.0.1:27017/weconnect';
const options = { dbName:'weconnect', poolSize:10, autoReconnect:true };
const mongoose = require('mongoose');

mongoose.connect(uri, options).then(
    () => {},
    err => {
        console.log("failed to connect to mongodb");
        console.error(err);
    }
);

//export db connection
module.exports = mongoose;