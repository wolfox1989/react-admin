import HomeContent from "../components/content/home-content"
import CategoryContent from "../components/content/category-content"
import UserContent from "../components/content/user-content"
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

]