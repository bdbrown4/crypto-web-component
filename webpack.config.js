const path = require('path');
module.exports = {
 "mode": "none",
 "entry": "./crypto-web-component.ts",
 "output": {
   "path": __dirname + '/dist',
   "filename": "crypto-web-component.js"
 },
devServer: {
   static: path.join(__dirname, 'dist')
 },
 "module": {
   "rules": [
     {
      "test": /\.(s(a|c)ss)$/,
      "use": ['style-loader','css-loader', 'sass-loader']
     },
     {
       "test": /\.html$/i,
       "loader": "html-loader",
     },
     {
       "test": /\.js$/,
       "exclude": /node_modules/,
       "use": {
         "loader": "babel-loader",
         "options": {
           "presets": [
             "@babel/preset-env",
           ]
         }
       }
     },
     // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
     { "test": /\.tsx?$/, "loader": "ts-loader" }
   ]
 }
}