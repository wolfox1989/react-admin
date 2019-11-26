import React, {Component} from 'react';
import {Card, Icon,Descriptions} from "antd";
import {getProduct}from "../../../api/index"
import {connect} from "react-redux";
import {getCategorySuccessAsync} from "../../../redux/action-creators/category";

@connect(state=>({category:state.category}),{getCategorySuccessAsync})
class ProductDetail extends Component {
  state={
    product:{}
  };
  componentDidMount() {
    if(!this.props.category.length) this.props.getCategorySuccessAsync();
    if (!this.props.location.state) getProduct(this.props.match.params.id).then(res=>this.setState({product:res}))
  }

  /*返回*/
  handelClick = () => {
    this.props.history.goBack("/product")
  };

  render() {
    const {location:{state,pathname}}=this.props;
    let product={};
    if(pathname.startsWith("/product/")) product=state||this.state.product;
    const {name,desc,price,categoryId,status,detail}=product;
    const category =this.props.category.find(category => category._id === categoryId);
    const categoryName = category && category.name;
    return (
      <Card title={<div><Icon type="arrow-left" onClick={this.handelClick}/> &nbsp;&nbsp;商品详情</div>}>
       <Descriptions bordered>
        <Descriptions.Item label="商品名称">{name}</Descriptions.Item>
        <Descriptions.Item label="商品描述">{desc}</Descriptions.Item>
        <Descriptions.Item label="商品价格">￥{price}</Descriptions.Item>
        <Descriptions.Item label="商品分类">{categoryName}</Descriptions.Item>
        <Descriptions.Item label="商品状态" span={2}>
          {status === 1 ? "下架" : "上架"}
        </Descriptions.Item>
        <Descriptions.Item label="商品详情">
          <div dangerouslySetInnerHTML={{__html: detail}}/>
        </Descriptions.Item>
      </Descriptions>
      </Card>
    );
  }
}

export default ProductDetail;