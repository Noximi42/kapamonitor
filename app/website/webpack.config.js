const glob = require("glob");
const pathLib = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

var htmlPages = glob.sync("./src/*.html").map((path) => {
  var chunk = path.replace(".html", "").replace("./src/", "");

  return new HtmlWebpackPlugin({
    template: path,
    filename: `pages/${chunk}.html`,
    chunks: [chunk, "vendor"],
    inject: true,
  });
});

module.exports = {
  entry: {
    index: "./src/js/index.js",
  },
  output: {
    filename: "js/[name]/[name].js",
    chunkFilename: "js/[name].js",
    path: pathLib.resolve(__dirname, "dist"),
  },
  watch: true,
  //   devServer: {
  //     contentBase: pathLib.resolve(__dirname, 'dist', 'pages'),
  //     compress: true,
  //     port: 1313
  //   },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
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
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendor",
    },
  },
  plugins: [].concat(htmlPages),
};
