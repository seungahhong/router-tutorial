const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

module.exports = {
  // entry file
  devtool: 'source-map',
  entry: ['babel-polyfill', './index.ts'],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname + '/dist'),
  },
  devServer: {
    port: 9000,
    hot: true,
    // historyApiFallback: true,
    historyApiFallback: true,
    allowedHosts: 'all',
  },
  resolve: {
    extensions: ['*', '.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'router-tutorial',
      filename: 'index.html', // output으로 출력할 파일은 index.html 이다.
      template: path.resolve(__dirname, 'public', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
    }),
    new OptimizeCSSAssetsPlugin({}),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, 'public/subhtml'),
          from: '**/*.html',
          to: 'link/',
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new HtmlMinimizerPlugin()],
  },
};
