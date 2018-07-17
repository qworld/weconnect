const mongoose = require('mongoose');

//initialize
const uri = 'mongodb://localhost/';
const options = { dbName:'weconnect', poolSize:10, autoReconnect:true };

mongoose.connect(uri, options, function(error) {
    // Check error in initial connection. There is no 2nd param to the callback.
    if(error){
        console.log("failed to connect to mongodb");
        console.log(error);
      }
});

//export db connection
module.exports = mongoose;