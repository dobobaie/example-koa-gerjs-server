module.exports = ({ logger }) => async (ctx, next) => {
  await next();
  logger(`info`)({
    date: new Date(),
    event: `${ctx.request.method.toUpperCase()} ${ctx.request.url}`,
    payload: ctx.payload,
    request_id: ctx.get("X-Request-Id"),
    response_time: ctx.get("X-Response-Time"),
    params: ctx.params,
    headers: ctx.headers,
    body: ctx.body,
    status: ctx.status,
    auth: ctx.auth || null
  });
};
