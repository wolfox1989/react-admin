/*
Category:前端请求所有data

*/
import React, {Component} from 'react';
import {Card, Button, Table, Icon} from 'antd';
import {connect} from "react-redux"
import {getCategorySuccessAsync} from "../../redux/action-creators/category"

@connect((state) => ({category: state.category}), {getCategorySuccessAsync})
class Category extends Component {
  componentDidMount() {
    getCategorySuccessAsync()
  }

  columns = [
    {
      title: '品类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render: () => <div>
        <Button type="link">修改分类</Button>
        <Button type="link">删除分类</Button>
      </div>

    },
  ];

  render() {
    const {category} = this.props;
    return <div>
      <Card title="分类列表" extra={<Button type="primary"><Icon type="plus"/>分类列表</Button>}>
        <Table
          columns={this.columns}
          dataSource={category}
          bordered
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["3", "6", "9", "12"],
            defaultPageSize: 3
          }}
        />
      </Card>
    </div>
  }
}


export default Category;