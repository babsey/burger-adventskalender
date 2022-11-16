const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/burger-adventskalender", // process.env.BASE_URL,
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
});
