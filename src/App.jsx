import React, {Component} from 'react';
import {noAuthRoutes,authRoutes} from "./config/routers";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import "./index.less"
import BasicLayout from "./components/layout";

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;