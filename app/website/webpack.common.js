const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/js/app.js",
    index: "./src/js/index.js"
  },
  module: {
    rules: [
    {
        test: /\.html$/,
        use: ['html-loader']
    },
      {
        test: /\.(png|svg|jpg|gif|mp4)$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    name: "[name].[hash].[ext]",
                    outputPath: "assets/",
                }
            }
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
  ]
};
