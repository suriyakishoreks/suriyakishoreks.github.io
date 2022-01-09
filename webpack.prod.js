const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   mode: "production",
   entry: {
      main: "./src/index.js"
   },
   output: {
      path: path.resolve(__dirname, 'build'),
      filename: "js/[name].[contenthash:8].js",
      assetModuleFilename: 'assets/[name].[contenthash:8][ext][query]',
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         },
         {
            test: /\.s[ac]ss$/,
            use: [
               {
                  loader: CssExtractPlugin.loader
               },
               {
                  loader: 'css-loader'
               },
               {
                  loader: 'sass-loader'
               }
            ]
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./public/index.html"
      }),
      new CopyWebpackPlugin({
         patterns: [
            {
               from: "public",
               filter: async (filePath) => {
                  if (filePath.endsWith("index.html")) {
                     return false;
                  }
                  return true;
               }
            }
         ]
      }),
      new CssExtractPlugin({
         filename: 'css/[name].[contenthash:8].css'

      }),
      new CleanWebpackPlugin(),
   ],
};