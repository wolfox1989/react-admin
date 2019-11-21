import React, { Component } from 'react';
import routers from "./config/routers";
import {BrowserRouter,Switch,Route} from "react-router-dom"
import "./index.less"
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/*需要判断是否登录，没有登录去登录页面*/}
        <Switch>
          {routers.map((item,index)=><Route {...item} key={index}/>)}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;