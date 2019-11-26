/*
Category:前端请求所有data

*/
import React, {Component} from 'react';
import {Card, Button, Table, Icon, Modal} from 'antd';
import {connect} from "react-redux"
import {
  getCategorySuccessAsync,
  addCategorySuccessAsync,
  updateCategorySuccessAsync,
  removeCategorySuccessAsync
} from "../../redux/action-creators/category"
import AddCategoryForm from "./add-category-form"
import UpdateCategoryForm from "./update-category-form"

const {confirm} = Modal;

@connect((state) => ({category: state.category}), {
  getCategorySuccessAsync,
  addCategorySuccessAsync,
  updateCategorySuccessAsync,
  removeCategorySuccessAsync
})
class Category extends Component {
  state = {
    addCategoryVisible: false,
    updateCategoryVisible: false,
    category: {}
  };

  componentDidMount() {
    if (!this.props.category.length) this.props.getCategorySuccessAsync()
  }

  columns = [
    {
      title: '品类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render: (category) => <div>
        <Button type="link" onClick={this.showUpdateModal(category)}>修改分类</Button>
        <Button type="link" onClick={this.showDeleteConfirm(category)}>删除分类</Button>
      </div>

    },
  ];
  /*Add*/
  showModal = () => {
    this.setState({
      addCategoryVisible: true,
    });
  };
  handleAddCategory = () => {
    const {form} = this.addCategoryFormRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      await this.props.addCategorySuccessAsync(values.categoryName);
      this.handleCancel("add")();
    });
  };
  /*update:利用闭包，记录每次render后每个Button对应的category*/
  showUpdateModal = (category) => () => {
    this.setState({
      updateCategoryVisible: true,
      category
    });
  };

  handleUpdateCategory = () => {
    const {form} = this.updateCategoryFormRef.props;
    const {_id} = this.state.category;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      await this.props.updateCategorySuccessAsync(_id, values.categoryName);
      this.handleCancel("update")();
    });
  };
  /*remove*/
  showDeleteConfirm = (category) => {
    return () => confirm({
      title: '您确认要删除当前分类吗?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        await this.props.removeCategorySuccessAsync(category._id)
      },
    });
  };


  handleCancel = name => () => {
    const {form} = this[`${name}CategoryFormRef`].props;
    form.resetFields();
    this.setState({
      [`${name}CategoryVisible`]: false,
    });
  };

  render() {
    const {name} = this.state.category;
    const {category} = this.props;
    return <div>
      <Card title="分类列表" extra={<Button type="primary" onClick={this.showModal}><Icon type="plus"/>分类列表</Button>}>
        <Table columns={this.columns} dataSource={category} rowKey={"_id"} bordered pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["3", "6", "9", "12"],
          defaultPageSize: 3
        }}
        />
      </Card>
      <Modal
        title="添加分类"
        visible={this.state.addCategoryVisible}
        onOk={this.handleAddCategory}
        onCancel={this.handleCancel("add")}
      >
        <AddCategoryForm wrappedComponentRef={formRef => this.addCategoryFormRef = formRef}/>
      </Modal>
      <Modal
        title="修改分类"
        visible={this.state.updateCategoryVisible}
        onOk={this.handleUpdateCategory}
        onCancel={this.handleCancel("update")}
      >
        <UpdateCategoryForm wrappedComponentRef={formRef => this.updateCategoryFormRef = formRef} categoryName={name}/>
      </Modal>
    </div>

  }
}

export default Category;