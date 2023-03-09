/*
 * @Description: 
 * @Author:  
 * @Date: 2022-05-10 10:10:03
 * @LastEditTime: 2022-05-23 14:35:53
 * @LastEditors:  
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {createHashHistory} from 'history'
import App from './App';

// 设置默认语言为中文
import {ConfigProvider} from 'antd' 
import zhCN from 'antd/es/locale/zh_CN'
const antdConfig = {
  locale: zhCN
}

let history = createHashHistory()
React.$goto = function(url) {
  history.push(url)
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider {...antdConfig}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </ConfigProvider>
);
