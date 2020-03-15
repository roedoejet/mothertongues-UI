// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
declare var require: any;
const packageJson = require("../../package.json");

export const environment = {
  appName: "mothertongues-UI",
  envName: "DEV",
  production: false,
  versions: {
    app: packageJson.version
  }
};
