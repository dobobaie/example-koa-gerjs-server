/* eslint-disable no-underscore-dangle */
const Koa = require("koa");
const convert = require("koa-convert");
const koaBody = require("koa-better-body");
const cors = require("koa-cors");
const boom = require("boom");
const router = require("koa-router")();

const errors = require("./app/errors");

const jsonContentTypeMiddleware = require("./middlewares/jsonContentType");
const responseTimeMiddleware = require("./middlewares/responseTime");
const requestIdMiddleware = require("./middlewares/requestId");
const requestIpMiddleware = require("./middlewares/requestIp");
const errorsMiddleware = require("./middlewares/errors");
const loggerMiddleware = require("./middlewares/logger");
const timeoutMiddleware = require("./middlewares/timeout");
const parseQueryMiddleware = require("./middlewares/parseQuery");

module.exports = ({ packageInfo, gerJs, logger }) => {
  const app = new Koa();
  
  app.use(errorsMiddleware({ errors, logger }));
  app.use(convert(cors()));
  app.use(convert(koaBody()));
  app.use(parseQueryMiddleware());
  app.use(responseTimeMiddleware());
  app.use(requestIdMiddleware());
  app.use(requestIpMiddleware());
  app.use(loggerMiddleware({ logger }));
  app.use(timeoutMiddleware(10000));
  app.use(jsonContentTypeMiddleware());
  app.use(gerJs.middleware(router));

  app.use(
    router
      .put("/users/:id", ctx => {
        console.log(ctx.params, ctx.query, ctx.request.fields);
        ctx.body = Object.assign({}, ctx.params, ctx.query, ctx.request.fields);
      })
      .post("/users", ctx => {
        console.log(ctx.params, ctx.query, ctx.request.fields);
        ctx.body = Object.assign({}, ctx.params, ctx.query, ctx.request.fields);
      })
      .get("/users", ctx => {
        console.log(ctx.params, ctx.query, ctx.request.fields);
        ctx.body = Object.assign({}, ctx.params, ctx.query, ctx.request.fields);
      })
      .get("/", ctx => {
        console.log(ctx.params, ctx.query, ctx.request.fields);
      })
      .get("/swagger", gerJs.expose())
      .get("*", ctx => ctx.throw(boom.notFound()))
      .routes()
  );

  app.use(
    router.allowedMethods({
      throw: true,
      notImplemented: () => boom.notImplemented(),
      methodNotAllowed: () => boom.methodNotAllowed()
    })
  );

  return app;
};



