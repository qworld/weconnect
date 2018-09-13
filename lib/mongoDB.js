'use strict';

const mongoose = require('mongoose');
const logger = require('./log4js');

//initialize
const uri = 'mongodb://localhost/';
const options = { useNewUrlParser: true, dbName:'weconnect', poolSize:10, autoReconnect:true };

mongoose.connect(uri, options, function(error) {
    // Check error in initial connection. There is no 2nd param to the callback.
    if(error){
        logger.error("failed to connect to mongodb");
        logger.error(error);
      }
});

//export db connection
module.exports = mongoose;