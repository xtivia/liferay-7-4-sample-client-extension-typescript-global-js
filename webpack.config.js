/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

const path = require("path");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");

const DEVELOPMENT = process.env.NODE_ENV === "development";
const WEBPACK_SERVE = !!process.env.WEBPACK_SERVE;

module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    port: 3000,
  },
  devtool: DEVELOPMENT ? "source-map" : false,
  entry: {
    index: "./src/index.ts",
  },
  experiments: {
    outputModule: true,
  },
  mode: DEVELOPMENT ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: ["ts-loader"],
      },
    ],
  },
  optimization: {
    minimize: !DEVELOPMENT,
  },
  output: {
    clean: true,
    environment: {
      dynamicImport: true,
    },
    filename: WEBPACK_SERVE ? "[name].js" : "[name].[contenthash].js",
    iife: true,
    library: {
      type: "module",
    },
    path: path.resolve("build", "static"),
  },
  plugins: [
    new ESLintPlugin({
      files: "src/**/*.ts",
      overrideConfigFile: `eslint.config.mjs`,
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  resolve: {
    extensions: [".js", ".ts"],
  },
};
