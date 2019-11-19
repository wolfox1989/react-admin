import HomeContent from "../components/content/home-content"
import CategoryContent from "../components/content/category-content"
import UserContent from "../components/content/user-content"
import ProductContent from "../components/content/product-content"
import BarContent from "../components/content/bar-content"
import LineContent from "../components/content/line-content"
import RoleContent from "../components/content/role-content"
import PieContent from "../components/content/pie-content"
export default [
  {
    path:"/",
    component:HomeContent,
    exact:true
  },
  {
    path:"/category",
    component:CategoryContent,
    exact:true
  },
  {
    path:"/user",
    component:UserContent,
    exact:true
  },
  {
    path:"/product",
    component:ProductContent,
    exact:true
  },
  {
    path:"/role",
    component:RoleContent,
    exact:true
  },
  {
    path:"/charts/bar",
    component:BarContent,
    exact:true
  },
  {
    path:"/charts/pie",
    component:PieContent,
    exact:true
  },
  {
    path:"/charts/line",
    component:LineContent,
    exact:true
  },

]