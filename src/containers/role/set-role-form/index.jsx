import React, {Component} from 'react';
import {Form, Input, Tree} from 'antd';
import menus from "../../../config/menus";

const {TreeNode} = Tree;


@Form.create()
class SetRoleForm extends Component {
  treeData = [
    {
      title: '平台权限',
      key: '0',
      children: menus.map(menu => {
        if (menu.children) {
          return {
            title: menu.title,
            key: menu.path,
            children: menu.children.map(secondMenu => ({
              title: secondMenu.title,
              key: secondMenu.path,
            }))
          }
        }
        return {
          title: menu.title,
          key: menu.path
        }
      })

    }
  ];
 /* state = {
    checkedKeys:[],
  };*/


  onCheck = checkedKeys => this.setState({checkedKeys});

  renderTreeNodes = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.key} {...item} />;
  });


  render() {
    const {form: {getFieldDecorator}, id, role} = this.props;
    const roleName = role.find(item => item._id === id).name;
    return <Form layout="vertical">
      <Form.Item label="角色名称">
        {getFieldDecorator('name', {
          rules: [{required: true}],
          initialValue: roleName
        })(<Input disabled/>)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('menus',{
          trigger:"onCheck",
          valuePropName:"checkedKeys"
        })(<Tree
          checkable
          defaultExpandAll
          // onCheck={this.onCheck} //Form 接管
          // checkedKeys={this.state.checkedKeys}
        >
          {this.renderTreeNodes(this.treeData)}
        </Tree>)}
      </Form.Item>
    </Form>

  }
}
export default SetRoleForm