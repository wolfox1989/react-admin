import React, {Component} from 'react';
import {Layout, Breadcrumb} from 'antd';

const {Content} = Layout;
class BarContent extends Component {
  render() {
    return (
      <Content>
        <Breadcrumb>
          <Breadcrumb.Item>BarContent~~~~</Breadcrumb.Item>
        </Breadcrumb>
        <div >BarContent~~~</div>
      </Content>
    );
  }
}

export default BarContent;