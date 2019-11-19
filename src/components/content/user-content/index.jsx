import React, {Component} from 'react';
import {Layout, Breadcrumb} from 'antd';

const {Content} = Layout;
class UserContent extends Component {
  render() {
    return (
      <Content>
        <Breadcrumb>
          <Breadcrumb.Item>CategoryContent~~~~</Breadcrumb.Item>
        </Breadcrumb>
        <div >CategoryContent~~~</div>
      </Content>
    );
  }
}

export default UserContent;