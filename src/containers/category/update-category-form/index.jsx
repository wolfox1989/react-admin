import React, {Component} from 'react';
import {Form, Input} from 'antd';


@Form.create()
class UpdateCategoryForm extends Component {
  render() {
    const {form,categoryName} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Form layout="vertical">
        <Form.Item label="修改名称">
          {getFieldDecorator('categoryName', {
            initialValue:categoryName,
            rules: [{required: true, message: '请输入分类名称'}],
          })(<Input />)}
        </Form.Item>
      </Form>
    );
  }
}

export default UpdateCategoryForm