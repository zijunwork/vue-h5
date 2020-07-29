/*
 * @Overview:   Vue配置优化
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/7 20:24
 * @Mark:       1、 配置路径别名
 *              2、 配置全局样式
 *              3、 针对请求数优化
 *              4、 CDN优化,后续可根据项目需要添加
 *              5、 代码分割优化
 *              6、 生产去除console
 *              7、 配置打包分析工具
 *              8、 配置前端gzip压缩
 *              9、 Iconfont与SvgIcon组件共存兼容
 */

const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const resolve = dir => path.join(__dirname, dir);
const PORT = process.env.PORT || 8088;
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const IS_NOT_DEV = process.env.NODE_ENV !== "development";
const cdn = {
  css: [],
  js: [
    "https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js",
    "https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js",
    "https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js",
    "https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js"
  ]
};
const externals = {
  vue: "Vue",
  vuex: "Vuex",
  "vue-router": "VueRouter",
  axios: "axios"
};

module.exports = {
  publicPath: IS_PROD ? "/" : "/",
  outputDir: process.env.OUTPUT_DIR || "dist",
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== "production",
  parallel: require("os").cpus().length > 1,
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  },
  chainWebpack: config => {
    const TYPES = ["vue-modules", "vue", "normal-modules", "normal"];
    const ADD_STYLE_SOURCE = rule => {
      rule
        .use("style-resource")
        .loader("style-resources-loader")
        .options({
          patterns: [resolve("src/styles/global/index.less")]
        });
    };

    TYPES.forEach(type =>
      ADD_STYLE_SOURCE(config.module.rule("less").oneOf(type))
    );

    config.plugins.delete("preload");
    config.plugins.delete("prefetch");

    config.resolve.alias
      .set("@", resolve("src"))
      .set("views", resolve("src/views"))
      .set("components", resolve("src/components"))
      .set("api", resolve("src/api"))
      .set("utils", resolve("src/utils"))
      .set("assets", resolve("src/assets"))
      .set("store", resolve("src/store"))
      .set("styles", resolve("src/styles"));

    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons"))
      .end();
    const svgRule = config.module.rule("icons");
    svgRule.uses.clear();
    svgRule.include.add(resolve("src/assets/icons"));
    svgRule
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });

    if (IS_NOT_DEV) {
      config.optimization.splitChunks({
        cacheGroups: {
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor",
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]js[\\/]/,
            name: "common",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          }
        }
      });
      config.optimization.runtimeChunk("single");
      config.optimization.minimize(true);
      config
        .plugin("compression")
        .use(CompressionWebpackPlugin)
        .tap(() => [
          {
            algorithm: "gzip",
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
          }
        ]);
    }

    if (IS_PROD) {
      config.plugin("html").tap(args => {
        args[0].cdn = cdn;
        args[0].minify.minifyCSS = true;
        return args;
      });
      config.plugin("analyzer").use(BundleAnalyzerPlugin);
    }
  },
  configureWebpack: config => {
    if (IS_PROD) {
      config.externals = externals;
      config.optimization.minimizer.map(arg => {
        const OPTION = arg.options.terserOptions.compress;
        OPTION.drop_console = true;
        OPTION.pure_funcs = ["console.*"];
        arg.extractComments = false;
      });
    }
  },
  devServer: {
    host: require("./src/utils/get-ip"),
    port: PORT,
    open: true,
    https: false,
    compress: false,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
