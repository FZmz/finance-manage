const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({

  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://1.116.64.64:5004/",
        changeOrigin: true,
      },
    },
  },

  configureWebpack: {
    resolve: {
      alias: {},
      fallback: {
        //其他的如果不启用可以用 keyname :false，例如：crypto:false,
        crypto: require.resolve("util"),
      },
    },
    plugins: [new NodePolyfillPlugin()],
  },
});
