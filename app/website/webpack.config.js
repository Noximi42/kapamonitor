const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/js/app.js",
    index: "./src/js/index.js"
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
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
                    name: "[name].[ext]",
                    outputPath: "assets/",
                    publicPath: "assets/"
                }
            }
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [require("precss"), require("autoprefixer")];
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    //new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
    new HtmlWebpackPlugin({
        template: './src/pages/index.html',
        filename: 'index.html',
      }),
  ]
};
