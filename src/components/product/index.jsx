import React, {Component} from 'react';
import {Button, Card, Icon, Table, Select, Input, message} from "antd";
import {getProductList} from "../../api"
import {connect} from "react-redux"
import {delProduct, updateProductStatus, searchProduct} from "../../api/index"

const {Option} = Select;

@connect(state => ({category: state.category}), null)
class Product extends Component {
  state = {
    products: [],
    total: 0,
    pageSize: 3, //记录当前页，搜索条数
    current:1,   //记录当前页
    searchType: "productName",
    searchValue: "",
  };
  isSearch=false;
  currentSearchValue="";
  getProductList = async (pageNum, pageSize) => {
    const {searchType}=this.state;
    let result;
    if(this.isSearch) {
      result = await searchProduct({searchType,searchValue:this.currentSearchValue,pageNum,pageSize});
    }
    else {
      result = await getProductList(pageNum, pageSize);
    }
    this.setState({
      products: result.list,
      total: result.total,
      current:pageNum,
      pageSize
    })
  };
  /*search：
  */
  handelSearchSelect = value => this.setState({
    searchType: value
  });

  handelSearchInput = event => {
    //搜索框没有内容，或者内容被删空，重新请求数据
    if(!event.target.value) {
      const {pageSize}=this.state;
      this.isSearch=false;
      this.getProductList(1, pageSize)
    }
    this.setState({
      searchValue: event.target.value.trim()
    });
  };
  handelSearch =() => {
    const {pageSize,searchValue}=this.state;
    this.isSearch=true;//点击搜索按钮，才标记为搜索
    this.currentSearchValue=searchValue;//点击搜索按钮，记录点击搜索的值
    this.getProductList(1,pageSize);//第一次搜索，跳到第一页；后续搜索就再当前页
  };

  componentDidMount() {
    this.getProductList(1, 3)
  }

  handelClick = () => {
    this.props.history.push("/product/add")
  };

  columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '状态',
      render: (product) => <div>
        <Button type="primary" onClick={this.handelStatus(product)}>{product.status === 1 ? "上架" : "下架"}</Button>
        {product.status === 1 ? "已下架" : "已下架"}
      </div>
    },
    {
      title: '操作',
      render: (product) => <div>
        <Button type="link" onClick={this.showDetail(product)}>详情</Button>
        <Button type="link" onClick={this.updateProduct(product)}>修改</Button>
        <Button type="link" onClick={this.delProduct(product)}>删除</Button>
      </div>
    },
  ];
  /*update status*/
  handelStatus = product => () => {
    //update 后台数据
    updateProductStatus(product._id, 3 - product.status);
    //update 前台数据，没必要向后台请求
    this.setState({
      products: this.state.products.map(item => {
        if (item._id === product._id) return {...item, status: 3 - item.status};
        return item
      })
    })

  };
  /*detail*/
  showDetail = product => () => this.props.history.push("/product/" + product._id, product);

  /*update*/
  //push传参，组件可以通过location.state获取第二个参数
  updateProduct = product => () => this.props.history.push("/product/update/" + product._id, product);

  /*delete*/
  delProduct = product => async () => {
    await delProduct(product._id);
    message.success("删除商品成功");
    //删除最后一个，切换page时
    const {pageSize, current, total} = this.state;
    if ((total - 1) % pageSize === 0) this.setState({
      current: current - 1 > 0 ? current - 1 : 1
    });
    if(this.state.searchValue) {//搜索框有内容，仍执行搜索操作
     this.handelSearch()
    }else{//没有搜索内容，执行请求数据
      await this.getProductList(this.state.current, this.state.pageSize);
    }

  };



  render() {
    const {products, total,pageSize,current} = this.state;
    return (
      <div>
        <Card title={<div>
          <Select defaultValue="productName" onChange={this.handelSearchSelect}>
            <Option value="productName">根据商品名称</Option>
            <Option value="productDesc">根据商品描述</Option>
          </Select>
          <Input placeholder="关键字" style={{width: 250}} onChange={this.handelSearchInput}/>
          <Button type="primary" onClick={this.handelSearch}>搜索</Button>
        </div>} extra={<Button type="primary" onClick={this.handelClick}><Icon type="plus"/>添加商品</Button>}>
          <Table columns={this.columns} dataSource={products} rowKey={"_id"} bordered pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            total,
            pageSizeOptions: ["3", "6", "9", "12"],
            pageSize,
            current,
            onChange: this.getProductList,//换页请求数据
            onShowSizeChange: this.getProductList,//换pageNum请求数据
          }}
          />
        </Card>
      </div>
    );
  }
}

export default Product;