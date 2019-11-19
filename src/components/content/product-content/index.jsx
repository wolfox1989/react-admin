import React, {Component} from 'react';
import {Layout, Breadcrumb} from 'antd';

const {Content} = Layout;
class ProductContent extends Component {
  render() {
    return (
      <Content>
        <Breadcrumb>
          <Breadcrumb.Item>ProductContent~~~~</Breadcrumb.Item>
        </Breadcrumb>
        <div >ProductContent~~~</div>
      </Content>
    );
  }
}

export default ProductContent;