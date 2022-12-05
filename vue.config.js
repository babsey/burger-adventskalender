const { defineConfig } = require("@vue/cli-service");
const title = require("./public/data.json").title;

module.exports = defineConfig({
  publicPath: "/burger-adventskalender", // process.env.BASE_URL,
  productionSourceMap: false,
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  pages: {
    index: {
      entry: "src/main.ts", // entry for the page
      title,
    },
  },
  pwa: {
    name: title,
    themeColor: "#000000",
    workboxOptions: {
      skipWaiting: true,
    },
  },
});
