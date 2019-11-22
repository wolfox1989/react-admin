/*
  Left Slider:遍历展示
  withRouter是一个高阶组件,给非路由组件传递路由组件的三大属性
*/
import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom"
import menus from "../../../config/menus"
import {Menu, Icon} from 'antd';

const {SubMenu} = Menu;

@withRouter
class Left extends Component {
  state = {
    menus: []
  };
  createMenus = menus => {
    return menus.map(menu => {
      if (menu.children) {
        return <SubMenu key={menu.path} title={<span><Icon type={menu.icon}/><span>{menu.title}</span></span>}>
          {menu.children.map(cmenu => this.createCMenus(cmenu))}
        </SubMenu>
      }
      return this.createCMenus(menu)
    })
  };
  createCMenus = menu => <Menu.Item key={menu.path}><Link to={menu.path}><Icon
    type={menu.icon}/><span>{menu.title}</span></Link></Menu.Item>;
  findOpenKey = (menus, pathname) => {
    for (let i = 0; i < menus.length; i++) {
      const menu=menus[i];
      if(menu.children && menu.children.find(secondMenu => secondMenu.path === pathname)) return menu.path;
    }
  };

  componentDidMount() {
    this.setState({
      menus: this.createMenus(menus)
    })
  }

  render() {
    const {pathname} = this.props.location;
    const openKey = this.findOpenKey(menus, pathname);
    return <div>
      <div className="slider-logo">后台系统</div>
      <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKey]} mode="inline">
        {this.state.menus}
      </Menu>
    </div>
  }
}

export default Left;