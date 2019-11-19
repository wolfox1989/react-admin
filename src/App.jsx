import React, { Component } from 'react';
//import {connect} from "react-redux"
import routers from "./config/routers";
import {BrowserRouter,Switch,Route} from "react-router-dom"
import "./index.less"


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {routers.map((item,index)=><Route {...item} key={index}/>)}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;