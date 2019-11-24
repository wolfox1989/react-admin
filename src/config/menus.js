export default [
  {
    path:"/",
    title:"home",
    icon:"home"
  },
  {
    title:"products",
    icon:"appstore",
    path:"/products",
    children:[
      {
        path:"/category",
        title:"category",
        icon:"bars"
      },
      {
        path:"/product",
        title:"product",
        icon:"tool"
      },
    ]
  },
  {
    path:"/user",
    title:"user",
    icon:"user"
  },
  {
    path:"/role",
    title:"role",
    icon:"safety-certificate"
  },
  {
    title:"charts",
    icon:"area-chart",
    path:"/charts",
    children:[
      {
        path:"/charts/bar",
        title:"bar",
        icon:"bar-chart"
      },
      {
        path:"/charts/line",
        title:"line",
        icon:"line-chart"
      },
      {
        path:"/charts/pie",
        title:"pie",
        icon:"pie-chart"
      },
    ]
  },
]