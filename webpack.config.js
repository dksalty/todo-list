import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const isProd = process.env.NODE_ENV === "production";

export default {
  mode: "development",

  entry: "./src/index.js",

  output: {
    filename: "main.js",
    path: path.resolve(process.cwd(), "dist"),
    clean: true,
    publicPath: isProd ? "./" : "/",
},
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
