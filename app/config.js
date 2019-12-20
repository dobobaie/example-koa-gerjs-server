module.exports = env => {
  const config = {
    env: env.ENV || env.NODE_ENV,
    server_ip: env.SERVER_IP,
    server_port: env.SERVER_PORT,
    locale: env.LOCALE,
    available_locales: ["fr", "en"],
    auth_token: env.AUTH_TOKEN
  };

  if (
    !(
      config.server_ip &&
      config.server_port &&
      config.locale &&
      config.available_locales.indexOf(config.locale) !== -1 &&
      config.auth_token
    )
  ) {
    throw new Error("wrong_or_missing_configuration");
  }
  return config;
};
