const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const commonConfig = {
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
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
         },
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./public/index.html"
      }),
      new CssExtractPlugin({
         filename: 'css/[name].[contenthash:8].css'
      }),
   ],
};

const developmentConfig = {
   mode: "development",
   // devtool: 'source-map',
   devServer: {
      static: {
         directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3001,
      open: true,
      hot: true,
   },
};

const productionConfig = {
   mode: "production",
   plugins: [
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
      new CleanWebpackPlugin(),
   ],
};

module.exports = (env, args) => {
   switch (args.mode) {
      case 'development':
         return merge(commonConfig, developmentConfig);
      case 'production':
         return merge(commonConfig, productionConfig);
      default:
         throw new Error('No matching configuration was found!');
   }
}