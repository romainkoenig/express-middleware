'use strict';

module.exports = function () {
  function errorHandler(err, req, res, next) {
    if (!err) return next();

    if (is4XX(err)) {
      return handle4XX(err, req, res);
    }

    if (is5XX(err)) {
      return handle5XX(err, req, res);
    }

    return next();
  }

  return errorHandler;
};

function is4XX(error) {
  if (error.status >= 400 &&
      error.status < 500) {
    return true;
  }
  return false;
}

function is5XX(error) {
  if (error.status >= 500 &&
      error.status < 600) { // forward compatibility ~_~
    return true;
  }
  return false;
}

function handle4XX(err, req, res) {
  const logger = req.logger || console;

  let statusCode;
  let payload;

  if (err.status === 400 ||
      err.name === 'ValidationError') {
    payload = {};
    if (err.details) {
      err.details.forEach(detail => {
        payload[detail.context.key] = detail.message;
      });
    } else {
      payload = {
        detail: err.message
      };
    }
    statusCode = 400;
  }

  if (err.status === 401 ||
      err.name === 'UnauthorizedError') {
    payload = {
      detail: err.message
    };
    statusCode = 401;
  }

  if (err.status === 403 ||
      err.name === 'ForbiddenError') {
    payload = {
      detail: err.message
    };
    statusCode = 403;
  }

  if (!statusCode) {
    return res.status(400).send(err.message || 'Bad Request');
  }

  return res.status(statusCode).json(payload);
}

function handle5XX(err, req, res) {
  const logger = req.logger || console;

  logger.error(err);

  let errorText = 'Internal Server Error';

  if (process.env.NODE_ENV !== 'production') {
    errorText = err.stack || err.message;
  }

  return res.status(err.status || 500).send(errorText);
}
