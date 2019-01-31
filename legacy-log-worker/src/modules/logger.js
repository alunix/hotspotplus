/**
 * Created by payamyousefi on 6/29/16.
 */

var bunyan = require('bunyan');

module.exports.createLogger = function() {
  const name = process.env.APP_NAME || "logWorker";
  const path = process.env.LOG_DIR;
  return bunyan.createLogger({
    name: name,
    streams: [
      {
        level: process.env.LOG_LEVEL || 'debug',
        path: path + '/' + name + '-debug.log',
      },
      {
        level: 'error',
        path: path + '/' + name + '-error.log',
      },
    ],
  });
};