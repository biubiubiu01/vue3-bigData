const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = process.env.VUE_APP_BASE_NAME || "Vue Data Admin";

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 8999,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    before:
      process.env.NODE_ENV == "development"
        ? require("./mock/mock-server.js")
        : "",
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
        "@UI": resolve("UI"),
      },
    },
  },
  chainWebpack(config) {
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk("single");
    });
  },
};
