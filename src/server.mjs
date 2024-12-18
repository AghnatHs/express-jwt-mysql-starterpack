import app from "./app.mjs";
import AppConfig from "./configs/app.config.mjs";

AppConfig.Server.env === 'development' ? console.log(AppConfig) : console.log();
app.listen(AppConfig.Server.port, () => {
  console.log(
    `Server successfully running at port ${AppConfig.Server.port} [${Date()}] `
  );
});
