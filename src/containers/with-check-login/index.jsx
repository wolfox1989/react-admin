/*
验证登录：
  connect 高阶组件包裹最外层，是组件通过此方式获取state
CheckLogin 包着 需要被包裹的组件
*/
import React, {Component} from 'react';
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"

const withCheckLogin = (WrappedComponent) => {
  return connect((state) => ({token: state.user.token}), null)(class extends Component {
    static displayName = `CheckLogin(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    render() {
      const {location, token, ...rest} = this.props;
      if (location.pathname === "/login") {
        if (token) {
          return <Redirect to="/"/>//login&token 去home
        }
      } else {
        if (!token) return <Redirect to="/login"/>//非login&无token，去login
      }
      return <WrappedComponent {...rest} location={location}/>//传递原本的props
    }
  })

};
export default withCheckLogin;
