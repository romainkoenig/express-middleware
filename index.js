'use strict';

const childLogger = require('./src/middleware/childLogger');
const errorHandler = require('./src/middleware/errorHandler');
const httpAccessLogger = require('./src/middleware/httpAccessLogger');
const jwtToken = require('./src/middleware/jwtToken');
const requestId = require('./src/middleware/requestId');
const sslRedirect = require('./src/middleware/sslRedirect');

module.exports = {
  childLogger,
  errorHandler,
  httpAccessLogger,
  jwtToken,
  requestId,
  sslRedirect
};

// // //
