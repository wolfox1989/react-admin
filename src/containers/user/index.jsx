import React, {Component} from 'react';
import {Layout, Breadcrumb} from 'antd';

const {Content} = Layout;
class User extends Component {
  render() {
    return (
      <Content>
        <Breadcrumb>
          <Breadcrumb.Item>UserContent~~~~</Breadcrumb.Item>
        </Breadcrumb>
        <div >UserContent~~~</div>
      </Content>
    );
  }
}

export default User;