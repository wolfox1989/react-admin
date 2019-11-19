import React, {Component} from 'react';
import {Link,Route,Switch} from "react-router-dom"
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
        <Layout style={{minHeight: '100vh'}}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="home"/>
                <span><Link to="/">首页</Link></span>
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
                <Menu.Item key="2"><Icon type="bars" /><span><Link to="/category">分类管理</Link></span></Menu.Item>
                <Menu.Item key="3"><Icon type="tool" /><span><Link to="/product">商品管理</Link></span></Menu.Item>
              </SubMenu>
              <Menu.Item key="4">
                <Icon type="user"/>
                <span><Link to="/user">用户管理</Link></span>
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="safety-certificate" />
                <span><Link to="/role">权限管理</Link></span>
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
                <Menu.Item key="6"><Icon type="bar-chart" /><span><Link to="/charts/bar">柱状图</Link></span></Menu.Item>
                <Menu.Item key="7"><Icon type="line-chart" /><span><Link to="/charts/line">折线图</Link></span></Menu.Item>
                <Menu.Item key="8"><Icon type="pie-chart" /><span><Link to="/charts/pie" >饼状图</Link></span></Menu.Item>
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


    );
  }
}

export default Home