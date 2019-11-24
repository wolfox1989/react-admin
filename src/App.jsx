/*
Suspense用于懒加载，等内部元素加载完成才显示，没加载完成就显示fallback的值
*/
import React, {Component,Suspense } from 'react';
import {noAuthRoutes,authRoutes} from "./config/routers";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import "./index.less"
import BasicLayout from "./components/layout";
import { Spin } from 'antd';

class App extends Component {
  render() {
    return (
      <Suspense fallback={<Spin size="large" className="lazy-loading"/>}>
        <BrowserRouter>
          <Switch>
            {noAuthRoutes.map((item, index) => <Route {...item} key={index}/>)}
            <BasicLayout>
              <Switch>
                {authRoutes.map((item, index) => <Route {...item} key={index}/>)}
              </Switch>
            </BasicLayout>
          </Switch>
        </BrowserRouter>
      </Suspense>
    );
  }
}

export default App;

