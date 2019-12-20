const timeout = require("@uswitch/koa-timeout");

module.exports = delay => timeout.default(delay);
