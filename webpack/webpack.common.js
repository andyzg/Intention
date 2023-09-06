const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
    entry: {
      sidepanel: path.join(srcDir, 'sidepanel.tsx'),
      options: path.join(srcDir, 'options.tsx'),
      background: path.join(srcDir, 'background.ts'),
      content_script: path.join(srcDir, 'content_script.tsx'),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
              return chunk.name !== 'background';
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
              test: /\.css$/,
              use: ["style-loader", "css-loader"],
              exclude: /\.module\.css$/,
            },
            {
              test: /\.css$/,
              use: [
                "style-loader",
                {
                  loader: "css-loader",
                  options: {
                    importLoaders: 1,
                    modules: true,
                  },
                },
              ],
              include: /\.module\.css$/,
            },
        ],
    },
    resolve: {
      modules: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../node_modules'),
      ],
      extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
      new CopyPlugin({
          patterns: [{ from: ".", to: "../", context: "public" }],
          options: {},
      }),
      new MiniCssExtractPlugin()
    ],
};
