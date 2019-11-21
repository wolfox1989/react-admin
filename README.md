# react-admin
## create-react-app
## github
## antd
## redux react-redux redux-thunk redux-devtools-extension
## react-router-dom
## axios
```
封装axios 
baseURL、timeout…… 
请求拦截器  带上token（store.getState().user.token获取）
响应拦截器  response&status，处理响应数据，使得请求模块接受到的response对象=response.data.data，
            对象有token & user response.user也是个对象，里面有username、menus、createTime等用户信息
           处理错误异常     
```

封装请求登录模块
```
经过拦截器简化的请求模块，请求数据作为参数，暴露出去方便复用请求登录
```
## redux & react redux
用户数据存储在redux 
action-creators getUserSuccessAsync
connect(null,{getUserSuccessAsync})(Login)
reducers action.data-->action.data/response
store combineReducers currentState--> {user:action.data/response}
## localStorage
localStorage 需要以key，value方式存储，且需要为json
{"key","value"} value发送登录请求成功，经过拦截器处理过的response
## login页面
判断条件？
若未登录，跳转到登录页面；已经登录。跳转到主页
login需要从Route提取出来
