const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const wrapStr = str => `"${str}"`;

module.exports = (env) => {
  // console.log('NODE_ENV: ', env.production);

  return {
    mode: 'development',
    entry: {
      main: "./src/index.js",
      another: "./src/App2.js",
    },
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, './dist'), //path:destination of all output files in the localhost
      filename: "[name].js",
      publicPath: '/dist',//publicPath:输出解析文件的目录，url 相对于 HTML页面,没有publicpath热替换会失败。
    },
    module: {//loader 将各种类型的文件转换成js可以处理的类型，以供后续打包处理。
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: require.resolve('babel-loader')
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: '../../index.html',
        chunks:['main', 'vendors~main', 'vendors~another~main'],
        template: path.resolve(__dirname , './assets/index.html')
    }),
    
      // new HtmlWebpackPlugin({
      //   name: 'webpack',  //可以在 template:'./index.tpl' 中以<%= htmlWebpackPlugin.options.name %> 的形式用name这个变量
      //   // template: './index.tpl',
      //   filename: '../index.html'
      // }),
      new webpack.DefinePlugin({  // 配置全局变量，一般变量都大写
        __DEV__: wrapStr('development'),
      }),
      new webpack.ProvidePlugin({  // shimming 配置之后不用再去文件里面import就可以直接用
        _: 'lodash',
        join: ['lodash', 'join']  // 直接引入需要的具体的方法比上面全部引入要体积小
      })
      // new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {  // 为什么加了splitChunks 页面不显示内容
      splitChunks: {
        chunks: 'all'
      }
    },
    devServer: {
      hot: true,
      inline: true,
      port: 9000
    }
  }

}

