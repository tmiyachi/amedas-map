const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: 'images/[name][ext]',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sc|c|sa|)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // 生成先のフォルダを空にする
    new CleanWebpackPlugin(),
    // cssファイルをjsファイルにバンドルせず処理するプラグイン
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // webpackで生成したjsとcssを読み込んだhtmlを作成
    new HtmlWebpackPlugin({
      title: 'Application Name',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  // target: ['web', 'es5'], // for ES5
};
