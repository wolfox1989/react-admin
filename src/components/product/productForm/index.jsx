/*
add/update product
*/
import React, {Component} from 'react';
import {Card, Icon, Form, Input, Select, InputNumber, Button, message} from 'antd';
import {getCategorySuccessAsync} from "../../../redux/action-creators/category"
import {connect} from "react-redux";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import {addProduct, updateProduct, getProduct} from "../../../api/index"

const {Option} = Select;

@connect(state => ({category: state.category}), {getCategorySuccessAsync})
@Form.create()
class ProductForm extends Component {
  state = {
    product: null
  };

  componentDidMount() {
    if (!this.props.category.length) this.props.getCategorySuccessAsync();
    //不正常打开，比如复制网址再新窗口打开，就不会带上location.state的数据，只能发请求获取
    if (!this.props.location.state) getProduct(this.props.match.params.id).then(res => {
      this.setState({product: res})
    });
  }

  /*提交：add/update*/
  handleSubmit = e => {
    const {location: {state, pathname}} = this.props;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const submitData = {
          categoryId: values.categoryId,
          name: values.name,
          price: values.price,
          desc: values.desc,
          detail: values.detail.toHTML()// or values.content.toHTML()
        };
        if (pathname.startsWith("/product/update/")) {
          const productId = state ? state._id : this.state.product._id;
          await updateProduct({productId:productId, ...submitData});
          message.success("更新商品成功");
        } else {
          await addProduct(submitData);
          message.success("添加商品成功");
        }
        this.props.history.push("/product")
      }
    });
  };
  /*返回*/
  handelClick = () => {
    this.props.history.goBack("/product")
  };

  render() {
    const {form: {getFieldDecorator}, location: {state, pathname}} = this.props;
    //console.log(state);
    let isUpdate = null;
    if (pathname.startsWith("/product/update/")) {
      isUpdate = state || this.state.product;
    }
    return (
      <Card title={<div><Icon type="arrow-left" onClick={this.handelClick}/> &nbsp;&nbsp;添加商品</div>}>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item label="商品名称">
            {getFieldDecorator('name', {
              rules: [{required: true, message: '输入内容不能为空'}],
              initialValue: isUpdate ? isUpdate.name : ''
            })(<Input placeholder='请输入商品名称' style={{width: 400}}/>)}
          </Form.Item>
          <Form.Item label="商品描述">
            {getFieldDecorator('desc', {
              rules: [{required: true, message: '输入内容不能为空'}],
              initialValue: isUpdate ? isUpdate.desc : ''
            })(<Input placeholder='请输入商品描述' style={{width: 400}}/>)}
          </Form.Item>
          <Form.Item label="商品分类">
            {getFieldDecorator('categoryId', {
              rules: [{required: true, message: '输入内容不能为空'}],
              initialValue: isUpdate ? isUpdate.categoryId : ""
            })(<Select style={{width: 400}}>
              {
                this.props.category.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
              }
            </Select>)}
          </Form.Item>
          <Form.Item label="商品价格">
            {getFieldDecorator('price', {
              rules: [{required: true, message: '输入内容不能为空'}],
              initialValue: isUpdate ? isUpdate.price : ''
            })(<InputNumber
              formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />)}
          </Form.Item>
          <Form.Item label="商品描述">{getFieldDecorator('detail', {
            validateTrigger: 'onBlur',
            rules: [{
              required: true, validator: (_, value, callback) => {
                if (!value || value.isEmpty()) callback('请输入正文内容');
                else callback()
              }
            }],
            initialValue: isUpdate ? BraftEditor.createEditorState(isUpdate.detail) : ''
          })(<BraftEditor className="my-editor" placeholder="请输入正文内容"/>)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default ProductForm;