import Login from "../containers/login"
import Home from "../components/home"
import Category from "../containers/category"
import User from "../containers/user"
import Product from "../components/product"
import Bar from "../components/charts/bar"
import Line from "../components/charts/line"
import Role from "../containers/role"
import Pie from "../components/charts/pie"
import ProductForm from "../components/product/productForm";
import ProductDetail from "../components/product/detail";
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
  {
    path: "/product/add",
    component: ProductForm,
    exact: true
  },
  {
    path: "/product/update/:id",
    component: ProductForm,
    exact: true
  },
  {
    path: "/product/:id",
    component: ProductDetail,
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