const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
  mode:"development",
  entry:"./src/index.js",
  output:{
      filename:"main.js",
      path:path.resolve(__dirname,"dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/del.html', // 指向你的源HTML檔案
    }),
  ],
  devServer:{
    static:"./dist"
},
  module:{
    rules: [
      {   //這個物件是說明css模組載入的規則
        test:/\.css$/i,
        //注意，有順序之分 先style後css
        use:["style-loader","css-loader"]
    },{
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },
    ]
  }

}