import React, {Component} from 'react';
import {Layout, Breadcrumb} from 'antd';

const {Content} = Layout;
class HomeContent extends Component {
  render() {
    return (
      <Content>
        <Breadcrumb>
          <Breadcrumb.Item>首页~~~~</Breadcrumb.Item>
        </Breadcrumb>
        <div >欢迎回来~~~</div>
      </Content>
    );
  }
}

export default HomeContent;