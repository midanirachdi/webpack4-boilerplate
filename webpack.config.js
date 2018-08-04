const path = require("path"),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      CleanWebpackPlugin = require("clean-webpack-plugin"),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  entry: "./src/js/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js" // serves a bundle from memory (not minified + has devServer code too)
    // publicPath : '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["env"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader" ]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]", // keep the old name + extension instead of the hash
              outputPath: "img/" //copy here
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/"
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[id].css"
    }),
    new Dotenv()
  ],
  devServer: {
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  performance: {
    hints: false
  }
};
