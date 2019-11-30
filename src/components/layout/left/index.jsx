/*
  Left Slider:遍历展示一级&二级菜单
  withRouter是一个高阶组件,给非路由组件传递路由组件的三大属性
*/
import React, {Component, Fragment} from 'react';
import {Link, withRouter} from "react-router-dom"
import menus from "../../../config/menus"
import {Menu, Icon} from 'antd';
import {withTranslation} from 'react-i18next';
import {connect} from "react-redux";

const {SubMenu} = Menu;

@connect(state => ({menus: state.user.user.menus}))
@withRouter
@withTranslation()
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
    const {location: {pathname}, menus: authMenus} = this.props;
    /*根据权限，显示对应导航*/
    const newMenus = menus.reduce((prev, menu) => {
      //第一层菜单完全一致，直接返回
      if (authMenus.indexOf(menu.path)!==-1) return [...prev, menu];
      //第一层菜单无的话，判断第二层子菜单，若有：需要返回当前子菜单&其上层菜单
      if (menu.children) {
        const newMenu = {...menu};//主要为了不改变原数据，防止问题
        newMenu.children=newMenu.children.filter(cMenu=>authMenus.indexOf(cMenu.path)!==-1);
        return [...prev, newMenu];
      }
      return prev;
    }, []);


    const openKey = this.findOpenKey(newMenus, pathname);
    return <Fragment>
      <div className="logo"/>
      <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKey]} mode="inline">
        {this.createMenus(newMenus)}
      </Menu>
    </Fragment>
  }
}

export default Left;