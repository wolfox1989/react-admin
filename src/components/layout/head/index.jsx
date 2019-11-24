/*
Header:
  fullscreen
  i18n
  logout
  switch title
  current time
*/
import React, {Component} from 'react';
import {Button, Icon, Modal} from "antd"
import "./index.less"
import screenfull from "screenfull";
import dayjs from "dayjs";
import {connect} from "react-redux"
import i18n from "../../../i18n"
import {removeItem} from "../../../utils/localStorage"
import {removeUserSuccess} from "../../../redux/action-creators/user"
import {withRouter} from "react-router-dom"
import {withTranslation} from 'react-i18next';
import menus from "../../../config/menus"

const {confirm} = Modal;

@withTranslation()
@withRouter
@connect((state) => ({username: state.user.user.username}), {removeUserSuccess})
class HeaderMain extends Component {
  state = {
    isScreenFull: false,
    date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    isEnglish: false
  };
  /*fullscreen*/
  handelScreen = () => screenfull.toggle();
  changeScreen = () => this.setState({isScreenFull: !this.state.isScreenFull});

  componentDidMount() {
    screenfull.on('change', this.changeScreen);
    this.timer = setInterval(() => {
      dayjs().format("YYYY-MM-DD HH:mm:ss")
    }, 1000)
  }

  componentWillUnmount() {
    screenfull.off('change', this.changeScreen);
    clearInterval(this.timer)
  }

  /*i18n*/
  changeLanguage = () => {
    const {isEnglish} = this.state;
    //console.log(i18n.language);
    //console.log(i18n.changeLanguage);
    i18n.changeLanguage(isEnglish ? "en" : "zh");
    this.setState({
      isEnglish: !isEnglish
    })
  };

  /*logout*/
  showConfirm = () => {
    confirm({
      title: "你确定要退出码?",
      onOk: () => {
        removeItem("user");
        this.props.removeUserSuccess();
        this.props.history.replace("/login")
      },
    })
  };
  /*switch title*/
  findTitle = (menus) => {
    const {pathname} = this.props.location;
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (menu.path && menu.path === pathname) return menu.title;
      if (menu.children) {
        const secondMenu = menu.children.find(secondMenu => secondMenu.path === pathname);
        if (secondMenu) return secondMenu.title;
      }
    }
  };

  render() {
    const {t} = this.props;
    const {isScreenFull, date, isEnglish} = this.state;
    const {username} = this.props;
    return <div className="header-main">
      <div className="header-main-top">
        <Button size="small" onClick={this.handelScreen}><Icon type={isScreenFull ? 'fullscreen' : "fullscreen-exit"}/></Button> &nbsp;
        <Button size="small" onClick={this.changeLanguage}>{isEnglish ? "English" : "Chinese"}</Button> &nbsp;
        <span>{t('layout.head.welcome')}，{username}</span>
        <Button type="link" onClick={this.showConfirm}>{t('layout.head.logout')}</Button>
      </div>
      <div className="header-main-bottom">
        <h3>{t('layout.left.' + this.findTitle(menus))}</h3>
        <span>{date}</span>
      </div>
    </div>;
  }
}

export default HeaderMain;