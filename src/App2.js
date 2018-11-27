import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Select, Button, Input, Form, Row, Col, Message } from 'antd'
import './index.css';


class App2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      originvalue: '',
      test: 1,
    }
  }
  changevalue(e) {
    this.setState({
      originvalue: e.target.value
    })
  }
  componentDidMount() {
    console.log('---->', _.join(['Hello', 'webpack'], ' '));
    console.log('---->', join(['Hello', 'webpack'], ' '));
    this.setState({
      test: this.state.test + 1,
    })
  }

  render() {
    //测试全局变量
    if (__DEV__) {
      console.log('kkkk', __DEV__)
    }
    const a = (...args) => console.log(args)
    return (
      <div>
        <p>this is aaaa input</p>
        <input onChange={(e) => this.changevalue(e)}></input>
        <p className='inputvalue'>{this.state.originvalue}</p>
        <span>{this.state.originvalue.length}</span>
      </div>
    )
  }
}

export default App2;

// 问题： 在react中使用ant design样式不起作用？ 在根组件要引入样式 import 'antd/dist/antd.css';但是不引入直接用就在babelrc文件中加入"plugins": [
        // ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
        // ]

// 按需加载ant组件，可以提高打包编译的速度和浏览器下载资源的速度
/* 最开始写法：  import Button from 'antd/lib/button';
　　            import 'antd/lib/button/style';  
   插件：babel-plugin-import
   在babelrc文件下：
        "plugins": [
        "transform-runtime",
       按需加载 ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
      ]
      

      "plugins": [
        ["babel-plugin-imports-transform", {
            "next": {
                "transform": "next/lib/${member-lowercase}",
                "preventFullImport": true,
                "style": "next/lib/${member-lowercase}/index.scss"
            },
            "lodash": {
                "transform": "lodash/${member}",
                "preventFullImport": true
            }
        }]
    ] 
*/