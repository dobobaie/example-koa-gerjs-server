const qs = require("qs");

module.exports = () => async (ctx, next) => {
  ctx.queries = qs.parse(ctx.querystring);
  await next();
};
