import React, {Component} from 'react';
import {Layout, Breadcrumb} from 'antd';

const {Content} = Layout;
class Pie extends Component {
  render() {
    return (
      <Content>
        <Breadcrumb>
          <Breadcrumb.Item>PieContent~~~~</Breadcrumb.Item>
        </Breadcrumb>
        <div >PieContent~~~</div>
      </Content>
    );
  }
}

export default Pie;