import Home from "../components/home"
import Login from "../containers/login"
import NotMatch from "../components/not-match"

export default [
  {
    path:"/",
    component:Home,
    exact:true
  },
  {
    path:"/login",
    component:Login,
    exact:true
  },
  {//放在最后
    component:NotMatch
  }




]