import React, {Component} from 'react';
import {Form, Input} from 'antd';

@Form.create()
class UpdateUserForm extends Component {
  render() {
    const {form: {getFieldDecorator}} = this.props;
    return <Form layout="vertical">
      <Form.Item label="密码">
        {getFieldDecorator('password', {
          rules: [{required: true, message: '请输入密码'}, {min: 4, message: '最小不能小于4位'}],
        })(<Input.Password placeholder='请输入密码'/>)}
      </Form.Item>
      <Form.Item label="确认密码">
        {getFieldDecorator('rePassword', {
          rules: [{required: true, message: '请确认密码'}, { min: 4, message: '最小不能小于4位'}],
        })(<Input.Password placeholder='请确认密码'/>)}
      </Form.Item>
    </Form>
  }
}

export default UpdateUserForm;