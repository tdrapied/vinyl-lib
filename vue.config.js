const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "Vinylib",
    themeColor: "#7688e8",
    msTileColor: "#7688e8",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      background_color: "#7688e8",
    },
    iconPaths: {
      faviconSVG: null,
    },
    workboxOptions: {
      exclude: [".htaccess"],
    },
  },
});
