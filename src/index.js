import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, IndexRoute } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import App2 from './App2';

const render = () => {
    ReactDOM.render(
        <App2/>,
        document.getElementById('root')
    );
};

render();

if (module.hot) {  // 监听App文件发生改变
    module.hot.accept('./App2',()=> {
        render();
    });
}