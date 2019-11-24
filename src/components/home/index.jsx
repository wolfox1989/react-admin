/*
  Home
*/
import React, {Component} from 'react';
import withCheckLogin from "../../containers/with-check-login"
import "./index.less"

@withCheckLogin
class Home extends Component {
  render() {
    return (
      <div className="homepage">
      WELCOME
      </div>
    );
  }
}

export default Home;