import React, {Component} from 'react';
import {Layout, Breadcrumb} from 'antd';

const {Content} = Layout;
class Line extends Component {
  render() {
    return (
      <Content>
        <Breadcrumb>
          <Breadcrumb.Item>LineContent~~~~</Breadcrumb.Item>
        </Breadcrumb>
        <div >LineContent~~~</div>
      </Content>
    );
  }
}

export default Line;