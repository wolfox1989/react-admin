import React, {Component} from 'react';
import {Form, Input, Select} from 'antd';

const {Option} = Select;

@Form.create()

class AddUserForm extends Component {
  render() {
    const {role} = this.props;
    const {form: {getFieldDecorator}} = this.props;
    return <Form layout="vertical">
      <Form.Item label="用户名">
        {getFieldDecorator('username', {
          rules: [{required: true, message: '请输入用户名'}],
        })(<Input placeholder='请输入用户名'/>)}
      </Form.Item>
      <Form.Item label="密码">
        {getFieldDecorator('password', {
          rules: [{required: true, message: '请输入密码'}],
        })(<Input placeholder='请输入密码'/>)}
      </Form.Item>
      <Form.Item label="手机号">
        {getFieldDecorator('phone', {
          rules: [{required: true, message: '请输入手机号'}],
        })(<Input placeholder='请输入手机号'/>)}
      </Form.Item>
      <Form.Item label="邮箱">
        {getFieldDecorator('email', {
          rules: [{required: true, message: '请输入邮箱'}],
        })(<Input placeholder='请输入邮箱'/>)}
      </Form.Item>
      <Form.Item label="角色">
        {getFieldDecorator('roleId', {
          rules: [{required: true, message: '必须选择角色'}],
        })(<Select placeholder="请选择角色">
          {role.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)}
        </Select>)}
      </Form.Item>
    </Form>

  }
}

export default AddUserForm