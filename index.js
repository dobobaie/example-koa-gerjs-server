// eslint-disable-next-line
let logger = type => event => console[type === "info" ? "log" : type](event);
const perror = (type, error) => {
  logger("error")(
    Object.assign(error, {
      event: type,
      message: error.message
    })
  );
  process.exit(1);
};
process.on("uncaughtException", error => perror("uncaughtException", error));
process.on("unhandledRejection", error => perror("unhandledRejection", error));

const { name, version } = require("./package.json");
const config = require("./app/config")(process.env);

const modelsAPI = require("./models/models");
const gerJs = require("@gerjs/koa")({
  swagger: {
    title: "Example Koa GerJs Server Swagger",
    description: "In this Swagger document, you can retrieve each route available",
    servers_url: [ `http://${config.server_ip}:${config.server_port}/` ]
  },
  exportTo: __dirname + '/doc',
  autoRefresh: true
})(modelsAPI());

const lib = {};

const app = {
  packageInfo: {
    name,
    version
  },
  config,
  gerJs,
  lib,
  logger
};

const modules = {};
modules.server = require("./server")(app);

if (!module.parent) {
  modules.server.listen(config.server_port, () => {
    logger("info")({ event: `Server listening at ${config.server_port}` });
  });
}

module.exports = { app, modules };
