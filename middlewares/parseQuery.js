const qs = require("qs");

module.exports = () => async (ctx, next) => {
  ctx.qs = qs.parse(ctx.querystring); // to remove
  ctx.query = qs.parse(ctx.querystring); // bug doesn't works
  await next();
};
