import React, {Component} from 'react';
import {Button, Card, Modal, Radio, Table} from 'antd';
import {connect} from "react-redux"
import {getRoleAsync, addRoleAsync,updateRoleAsync,deleteRoleAsync} from "../../redux/action-creators/role"
import dayjs from "dayjs";
import AddRoleForm from "./add-role-form"
import SetRoleForm from "./set-role-form"
const { confirm } = Modal;
@connect(state => ({role: state.role,authName:state.user.user.username}), {getRoleAsync, addRoleAsync,updateRoleAsync,deleteRoleAsync})
class Role extends Component {
  componentDidMount() {
    if (!this.props.role.length) this.props.getRoleAsync();
  }
  columns = [
    {
      title: '',
      dataIndex: '_id',
      render: (id) => <Radio value={id} key={id}/>
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      render: (role) => dayjs(role.authTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: '授权时间',
      render: (role) => role.createTime && dayjs(role.createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: '授权人',
      dataIndex: 'authName',
    }
  ];
  state = {
    value: null,
    isDisabled: true,
    addRoleVisible: false,
    setRoleVisible: false
  };
  onChange = e => {
    //console.log(e.target.value);
    this.setState({
      value: e.target.value,
      isDisabled: false
    });
  };
  /*add*/
  addRole = () => this.setState({addRoleVisible: true});
  handleAddRole = () => {
    const {form} = this.addRoleFormRef.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.addRoleAsync(values.name);
        this.handleCancel("add")();
      }
    });
  };
  /*cancel*/
  handleCancel = (type) => () => {
    const {form} = this[`${type}RoleFormRef`].props;
    form.resetFields();
    this.setState({
      [`${type}RoleVisible`]: false
    })
  };
  /*set*/
  setRole = () => this.setState({setRoleVisible: true});
  handleSetRole=()=>{
    const {value} = this.state;
    const {authName}=this.props;
    const {form} = this.setRoleFormRef.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
         await this.props.updateRoleAsync(value,authName,values.menus);
        this.handleCancel("set")();
      }
    });
  };
  /*delete*/
  showDeleteConfirm=()=>{
    confirm({
      title: '您确认要删除该角色?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk:async ()=> {
        const {value} = this.state;
        await this.props.deleteRoleAsync(value);
        this.setState({
          value:null,
          isDisabled: true,
        })
      },
    });
  };
  render() {
    const {isDisabled,value} = this.state;
    const {role} = this.props;
    //console.log(role);
    return <div>
      <Card title={<div><Button type="primary" onClick={this.addRole}>创建角色</Button>
        <Button disabled={isDisabled} onClick={this.setRole}>设置角色权限</Button>
        <Button disabled={isDisabled} onClick={this.showDeleteConfirm} type="dashed">删除角色</Button></div>}>
        <Radio.Group onChange={this.onChange} value={this.state.value} style={{width: "100%"}}>
          <Table
            columns={this.columns} dataSource={role} rowKey={"_id"} bordered pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["3", "6", "9", "12"],
            defaultPageSize: 3
          }}>
          </Table>
        </Radio.Group>
      </Card>
      <Modal
        title="创建角色"
        visible={this.state.addRoleVisible}
        onOk={this.handleAddRole}
        onCancel={this.handleCancel("add")}
      >
        <AddRoleForm wrappedComponentRef={formRef => this.addRoleFormRef = formRef}/>
      </Modal>
      <Modal
        title="设置角色权限"
        visible={this.state.setRoleVisible}
        onOk={this.handleSetRole}
        onCancel={this.handleCancel("set")}
      >
        <SetRoleForm wrappedComponentRef={formRef => this.setRoleFormRef = formRef} role={role} id={value}/>
      </Modal>
    </div>
  }
}

export default Role;