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
      path: path.resolve(__dirname, 'devBuild'),
      filename: "js/[name].js",
      assetModuleFilename: 'assets/[name].[ext][query]',
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
      new CssExtractPlugin({
         filename: 'css/[name].css'
      }),
   ],
};