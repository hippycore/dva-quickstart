const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
module.exports = function(webpackConfig) {

  webpackConfig.plugins.push(
    /*
    new BundleAnalyzerPlugin({
      openAnalyzer: true,
    }),
    */
  );

  webpackConfig.plugins.push(
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
  );

  const styleRules = webpackConfig.module.rules.filter(
    rule => rule.test && rule.test.toString() == /\.less$/
  );

  styleRules.forEach(rule => {
    rule.use[rule.use.indexOf("less-loader")] = {
      loader: "less-loader",
      options: {
        javascriptEnabled: true,
        modifyVars: {
            'blue-6': '#000',
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'body-background': 'red',
        }
      }
    };
  });

  return webpackConfig;
};
