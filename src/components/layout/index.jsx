/*
  BasicLayout
    验证登录在公共的父组件做
*/
import React, {Component} from 'react';
import Left from "./left"
import HeaderMain from "./head"
import {Layout} from 'antd';
import withCheckLogin from "../../containers/with-check-login"
import {authRoutes} from "../../config/routers";
import {Switch, Route} from "react-router-dom"
import {connect} from "react-redux"
import ThemePicker from "./theme-picker";
const {Content, Footer, Sider, Header} = Layout;

@withCheckLogin
@connect(state => ({menus: state.user.user.menus}))

class BasicLayout extends Component {
  state = {collapsed: false};
  onCollapse = collapsed => this.setState({collapsed});

  render() {
    const {menus} = this.props;
    /*权限限制*/
    const userAuthRoutes = authRoutes.filter(route => !route.path || route.path.startsWith("/product") || menus.find(menu => route.path === menu));
    return <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Left/>
      </Sider>
      <Layout>
        <Header style={{background: '#fff', padding: 0}}><HeaderMain/></Header>
        <Content style={{margin: "40px 16px 0 16px"}}>
          <div style={{padding: 24, background: "#fff", minHeight: 360}}>
            <Switch>
              {userAuthRoutes.map((item, index) => <Route {...item} key={index}/>)}
            </Switch>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}> Wolfox Design ©2019 Created by Wolfox</Footer>
      </Layout>
      <ThemePicker/>
    </Layout>
  }
}

export default BasicLayout;