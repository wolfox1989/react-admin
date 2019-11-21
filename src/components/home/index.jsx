/*
Home
*/
import React, {Component} from 'react';
import {BrowserRouter,Link,Route,Switch} from "react-router-dom"
import {Layout, Menu, Icon} from 'antd';
import homeRouters from "../../config/home-routers";

const {Header, Footer, Sider} = Layout;
const {SubMenu} = Menu;
class Home extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({collapsed});
  };
  render() {
    return (
      <BrowserRouter>
        <Layout style={{minHeight: '100vh'}}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Link to="/"><Icon type="home"/><span>首页</span></Link>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                  <Icon type="appstore" />
                  <span>商品</span>
                </span>
                }
              >
                <Menu.Item key="2"><Link to="/category"><Icon type="bars" /><span>分类管理</span></Link></Menu.Item>
                <Menu.Item key="3"><Link to="/product"><Icon type="tool" /><span>商品管理</span></Link></Menu.Item>
              </SubMenu>
              <Menu.Item key="4">
                <Link to="/user"><Icon type="user"/><span>用户管理</span></Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/role"><Icon type="safety-certificate" /><span>权限管理</span></Link>
              </Menu.Item>
              <SubMenu
                key="sub2"
                title={
                  <span>
                  <Icon type="area-chart" />
                  <span>图形图表</span>
                </span>
                }
              >
                <Menu.Item key="6"><Link to="/charts/bar"><Icon type="bar-chart" /><span>柱状图</span></Link></Menu.Item>
                <Menu.Item key="7"><Link to="/charts/line"><Icon type="line-chart" /><span>折线图</span></Link></Menu.Item>
                <Menu.Item key="8"><Link to="/charts/pie" ><Icon type="pie-chart" /><span>饼状图</span></Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{background: '#fff', padding: 0}}/>
            <Switch>
              {homeRouters.map((item,index)=><Route {...item} key={index}/>)}
            </Switch>
            <Footer style={{textAlign: 'center'}}> Wolfox Design ©2019 Created by Wolfox</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Home