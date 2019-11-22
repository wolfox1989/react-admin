import Login from "../containers/login"
import Home from "../components/home"
import Category from "../components/category"
import User from "../components/user"
import Product from "../components/product"
import Bar from "../components/bar"
import Line from "../components/line"
import Role from "../components/role"
import Pie from "../components/pie"
import NotMatch from "../components/not-match"


//需要权限验证
const authRoutes = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/category",
    component: Category,
    exact: true
  },
  {
    path: "/user",
    component: User,
    exact: true
  },
  {
    path: "/product",
    component: Product,
    exact: true
  },
  {
    path: "/role",
    component: Role,
    exact: true
  },
  {
    path: "/charts/bar",
    component: Bar,
    exact: true
  },
  {
    path: "/charts/pie",
    component: Pie,
    exact: true
  },
  {
    path: "/charts/line",
    component: Line,
    exact: true
  },
  {//放在最后
    component: NotMatch
  }
];
//不需要权限验证
const noAuthRoutes = [
  {
    path: "/login",
    component: Login,
    exact: true
  },

];
export {
  authRoutes,
  noAuthRoutes
}