const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  // watch: true,
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [require("precss"), require("autoprefixer")];
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/pages/index.html',
        filename: 'index.html',
      }),
  ]
});
