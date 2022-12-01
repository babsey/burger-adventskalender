const { defineConfig } = require("@vue/cli-service");
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
      title: "Burger Adventskalender 2022",
    },
  },
  pwa: {
    name: "Burger Adventskalender 2022",
    themeColor: "#000000",
    workboxOptions: {
      skipWaiting: true,
    },
  },
});
