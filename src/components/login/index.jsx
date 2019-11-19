import React, {Component} from 'react';
import logo from "./logo.png"
import {Form, Icon, Input, Button, message} from 'antd';
import axios from "axios";
import "./index.less"

class Login extends Component {
  handleSubmit = e => {
    //console.log(this.props);
    const {validateFields, resetFields} = this.props.form;
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {//发送ajax请求
        axios.post("http://localhost:5000/api/login", values)
          .then(response => {
            if (response.data.status === 0) this.props.history.push("/");
            else {
              message.error(response.data.msg);
              resetFields("password")
            }
          }).catch(err => message.error('网络故障，请刷新再试')
        )
      }
    });
  };
  //校验规则
  validator = (rule, value, callback) => {
    const name = rule.field === "username" ? "用户名" : "密码";
    if (!value) callback(`请输入 ${name}!`);
    else if (!/\w/.test(value)) callback(`${name}只能包含字母、数字、下划线!`);
    else if (value.length < 4 || value.length > 12) callback(`${name}长度需在4-12位之间!`);
    else callback();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <div className="login-main">
          <h3>用户登录</h3>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {rules: [{validator: this.validator}]})(
                <Input prefix={<Icon type="user"/>} placeholder="Username" className="login-input"/>,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {rules: [{validator: this.validator}]})(
                <Input prefix={<Icon type="lock" className="login-input"/>}
                       type="password"
                       placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
