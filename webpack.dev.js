const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   mode: "development",
   entry: {
      main: "./src/index.js"
   },
   output: {
      filename: "[name].js",
      path: path.resolve(__dirname, 'devBuild')
   },
   devServer: {
      static: {
         directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3001,
      open: true,
      hot: true,
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
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./public/index.html"
      }),
      new CssExtractPlugin({
         filename: '[name].css'
      }),
   ],
};