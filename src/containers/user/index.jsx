import React, {Component} from 'react';
import {Button, Card, Modal, Table, message} from 'antd';
import {connect} from "react-redux"
import dayjs from "dayjs";
import {getRoleAsync} from "../../redux/action-creators/role"
import {getUsers, addUser, deleteUser, updateUser} from "../../api/index"
import AddUserForm from "./add-user-form"
import UpdateUserForm from "./update-user-form";

@connect(state => ({role: state.role}), {getRoleAsync})
class User extends Component {
  state = {
    users: [],
    addUserVisible: false,
    updateUserVisible: false,
    username: ""
  };
  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '注册时间',
      render: (user) => user.createTime && dayjs(user.createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: '所属角色',
      dataIndex: 'roleId',
      render: (roleId) => {
        const role = this.props.role.find(item => item._id === roleId);
        return role && role.name
      }
    },
    {
      title: '操作',
      render: (user) => <div>
        <Button type="link" onClick={this.updateUser(user)}>修改密码</Button>&nbsp;&nbsp;&nbsp;
        <Button type="link" onClick={this.deleteUser(user)}>删除</Button>
      </div>
    }
  ];


  componentDidMount() {
    if (!this.props.role.length) this.props.getRoleAsync();
    getUsers().then(res => this.setState({users: res}));
  }

  /*static getDerivedStateFromProps(nextProps, prevState) {

  }*/

  /*add*/
  addUser = () => this.setState({addUserVisible: true});
  handleAddUser = () => {
    const {form} = this.addUserFormRef.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        const result = await addUser(values);
        message.success("添加用户成功");
        this.setState({
          users: [...this.state.users, result]
        });
        this.handleCancel("add")();
      }
    });
  };
  handleCancel = (type) => () => {
    const {form} = this[`${type}UserFormRef`].props;
    form.resetFields();
    this.setState({
      [`${type}UserVisible`]: false
    })
  };
  /*update*/
  updateUser = user => () => this.setState({updateUserVisible: true, username: user.username});
  handleUpdateUser = () => {
    const {username} = this.state;
    const {form} = this.updateUserFormRef.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        const {password, rePassword} = values;
        if (password !== rePassword) {
          return form.setFields({
            rePassword: {
              value: rePassword,
              errors: [new Error('两次输入密码不一致，请重新输入')],
            },
          });
        }
        await updateUser(username, values.password);
        message.success("修改密码成功");
        this.setState({
          users: this.state.users.map(item => {
            if (item.username === username) return {...item, password: values.password};
            return item;
          })
        });
        this.handleCancel("update")();
      }
    });

  };
  /*delete*/
  deleteUser = user => () => Modal.confirm({
    title: `确认要删除${user.username}吗`,
    okText: "确认",
    cancelText: "取消",
    onOk: async () => {
      await deleteUser(user.username);
      message.success("删除用户成功");
      this.setState({
        users: this.state.users.filter(item => item.username !== user.username)
      });
    }
  });


  render() {
    return <div>
      <Card title={<div><Button type="primary" onClick={this.addUser}>创建用户</Button>
      </div>}>
        <Table
          columns={this.columns} dataSource={this.state.users} rowKey={"username"} bordered pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["3", "6", "9", "12"],
          defaultPageSize: 3
        }}>
        </Table>

      </Card>
      <Modal
        title="创建用户"
        visible={this.state.addUserVisible}
        onOk={this.handleAddUser}
        onCancel={this.handleCancel("add")}
      >
        <AddUserForm wrappedComponentRef={formRef => this.addUserFormRef = formRef} role={this.props.role}/>
      </Modal>
      <Modal
        title="修改密码"
        visible={this.state.updateUserVisible}
        onOk={this.handleUpdateUser}
        onCancel={this.handleCancel("update")}
      >
        <UpdateUserForm wrappedComponentRef={formRef => this.updateUserFormRef = formRef}/>
      </Modal>

    </div>
  }
}

export default User;