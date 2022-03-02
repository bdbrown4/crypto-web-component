const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: "none",
  entry: "./src/components/crypto-web-component.ts",
  output: {
    path: __dirname + '/dist',
    filename: "crypto-web-component.js"
  },
  devServer: {
    static: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: ['raw-loader', {
          loader:'sass-loader',
          options: { 
            sassOptions:{
              includePaths: [path.resolve(__dirname, 'node_modules')]
            }
          }
        }
      ]
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
            ]
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  plugins:[
    // needed to ignore the process check in the redux lib
    new webpack.DefinePlugin({
        process: {env: {}}
    })
  ]
}