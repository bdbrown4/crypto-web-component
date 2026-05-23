const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/crypto-web-component.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'crypto-web-component.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // Only transpile files in the bundle; skip full project type-check.
          // Run `tsc --noEmit` separately for a full type check.
          transpileOnly: true,
        },
      },
    ],
  },
};