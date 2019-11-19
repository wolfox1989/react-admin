import React, {Component} from 'react';
import {Layout, Breadcrumb} from 'antd';

const {Content} = Layout;
class RoleContent extends Component {
  render() {
    return (
      <Content>
        <Breadcrumb>
          <Breadcrumb.Item>RoleContent~~~~</Breadcrumb.Item>
        </Breadcrumb>
        <div >RoleContent~~~</div>
      </Content>
    );
  }
}

export default RoleContent;