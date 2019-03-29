'use strict';

const mongoose = require('mongoose');
const logger = require('./log4js');

//initialize
const uri = 'mongodb://weconnect:18612187926WZ@localhost:39079/';
const options = {
    useNewUrlParser: true,
    dbName: 'weconnect',
    poolSize: 10,
    family: 4,
    keepAlive: true,
    keepAliveInitialDelay: 300000
};

mongoose.connect(uri, options).then(
    () => {
        logger.info("connect to mongodb successfully");
    },
    (err) => {
        logger.error("failed to connect to mongodb");
        logger.error(err);
    }
);

//export db connection
module.exports = mongoose;