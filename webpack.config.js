const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.txt$/,
        use: [
          {
            loader: "html-loader",
            options: { minimise: true },
          },
        ],
      },

      {
        test: /\.(fbx)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/models",
            },
          },
        ],
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["raw-loader"],
      },
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  devServer: {
    static: path.join(__dirname, "assets"),
    compress: true,
    port: 4000,
  },
};
