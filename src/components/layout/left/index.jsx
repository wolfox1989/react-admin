/*
  Left Slider:遍历展示一级&二级菜单
  withRouter是一个高阶组件,给非路由组件传递路由组件的三大属性
*/
import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom"
import menus from "../../../config/menus"
import {Menu, Icon} from 'antd';
import {withTranslation} from 'react-i18next';
const {SubMenu} = Menu;

@withTranslation()
@withRouter
class Left extends Component {
  createMenus = menus => {
    const {t} = this.props;
    return menus.map(menu => {
      if (menu.children) {
        return <SubMenu key={menu.path}
                        title={<span><Icon type={menu.icon}/><span>{t('layout.left.' + menu.title)}</span></span>}>
          {menu.children.map(cmenu => this.createCMenus(cmenu))}
        </SubMenu>
      }
      return this.createCMenus(menu)
    })
  };
  createCMenus = menu => {
    const {t} = this.props;
    return <Menu.Item key={menu.path}><Link to={menu.path}><Icon
      type={menu.icon}/><span>{t('layout.left.' + menu.title)}</span></Link></Menu.Item>
  };
  findOpenKey = (menus, pathname) => {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (menu.children && menu.children.find(secondMenu => secondMenu.path === pathname)) return menu.path;
    }
  };
  render() {
    const {pathname} = this.props.location;
    const openKey = this.findOpenKey(menus, pathname);
    return <div>
      <div className="logo"/>
      <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKey]} mode="inline">
        {this.createMenus(menus)}
      </Menu>
    </div>
  }
}

export default Left;