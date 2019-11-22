/*
  BasicLayout
*/
import React, {Component} from 'react';
import Left from "./left"
import AllHead from "./head"
import {Layout} from 'antd';
const {Content, Footer, Sider} = Layout;
class BasicLayout extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = collapsed => {
    this.setState({collapsed});
  };
  render() {
    //console.log(this.props);
    //console.log(this.props.children);
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Left/>
        </Sider>
        <Layout>
          <AllHead/>
          <Content>
            {this.props.children}
          </Content>
          <Footer style={{textAlign: 'center'}}> Wolfox Design ©2019 Created by Wolfox</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;