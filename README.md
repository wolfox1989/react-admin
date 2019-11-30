# React 后台管理项目
## 1、初始化项目
1. 创建项目

- create-react-app xxx

2. git 管理

- 本地管理
  - git add ./
  - git commit -m 'xxx'
  - git push origin xxx 
    第一次push之后，本地分支跟踪远程分支 git branch -u 远程跟踪分支名（origin/xxx） ,之后直接git push 
- 分支管理
  - git checkout xxx 切换分支
  - git checkout -b xxx 新建并切换分支
  - git branch 查看分支
- 远程仓库管理
  - git remote add origin xxx 关联仓库
  - git clone xxx 克隆仓库
  - git fetch origin aaa:bbb 拉取远程仓库 aaa 分支到本地 bbb 分支上
- 解决:git 不能保存用户名和密码
  - git config --global credential.helper store
- 配置 SSH
  - 打开 git bash。
  - 使用 cd ~/.ssh 可以查看是否已配置 SSH（如果有配置就直接跳到最后一步）。
  - 执行生成公钥和私钥的命令 ssh-keygen -t rsa 并按回车 3 下（为什么按三下，是因为有提示你是否需要设置密码，如果设置了每次使用 Git 都会用到密码，一般都是直接不写为空，直接回车就好了）。会在一个文件夹里面生成一个私钥 id_rsa 和一个公钥 id_rsa.pub。（可执行 start ~命令，生成的公私钥在 .ssh 的文件夹里面）。
  - 复制公钥 id_rsa.pub 到 github 上配置 SSH。

## 2、项目初始化配置

1. 初始化 antd 配置

- 按需加载
- 自定义主题
  - 具体配置参照 antd 官网

2. 初始化 redux 配置

- 完成 4 个基本模块编写
- 满足多人协同开发需求

3. 初始化路由配置

- 定义 routes.js 配置文件
- 在 App.jsx 中遍历生成路由
  - 所有路由 1 对 1 严格匹配
  - 路径匹配不上返回 404 组件

## 3、完成 Login 组件

1. 完成静态组件
2. 完成动态组件

- 表单校验
  - Form.create()(Login) 高阶组件: 给 Login 组件传递 form 属性 （复用 form）
  - form 对象上面有很多操作表单的方法
    - getFieldDecorator 用于做表单校验
      - getFieldDecorator('key', { rules: [ {required: true, message: ''}, {} ] })(<Input />)
      - getFieldDecorator('key', { rules: [ {validator: this.validator} ] })(<Input />)
    - resetFields 用于重置表单项
    - validateFields 用于校验并收集表单数据
- 登录功能
  - Form 绑定 onSubmit 事件，Button 设置 htmlType 属性
    - onSubmit 事件禁止默认行为
  - validateFields 校验并收集表单数据
  - 校验成功，发送请求，请求登录 axios

## 4、封装 axios 拦截器

1. 创建 axios 实例

- 初始化公共的配置
- 执行流程：
  - 请求拦截器回调
  - 发送请求
  - 响应拦截器回调
  - 最后绑定的 then/catch 回调

2. 设置请求拦截器

- 配置变化的请求信息
  - post / content-type
  - token

3. 设置响应拦截器

- 处理 成功 / 失败

## 5、redux 开发流程

1. 先定义 action-creators

- 定义同步/异步
  - 如果要发送请求，就定义异步
  - 如果不要发送请求，就定义同步

2. 定义 action-types

3. 定义 reducer

4. 通过 connect 高阶组件给 UI 组件传递 redux 数据

5. 组件在使用传递过来的 redux 数据

* 注意我们需要的数据在经过各方面处理之后的状态

## 6、登录验证高阶组件

1. 需求：需要进行登录验证，才能访问 home 组件
2. 分析：所有组件都要进行登录验证，所以统一封装一个高阶组件去复用代码
3. 思路：

- 如果用户在/login this.props.location.path
  - 如果用户登录过，去 / redux 中 user 中 token
  - 如果用户没有登录过，不动
- 如果用户在非 /login
  - 如果用户登录过，不动
  - 如果用户没有登录过，/login

4. 所有组件都要包装 withCheckLogin 组件（这里存在问题，要包好多次）
    给组件的公共的父组件做登录检查，这样子组件不用一个个验证；
    因为是先渲染父组件，再渲染子组件；

## 7、验证 token

1. 需求：用户可能在本地 localStorage 中伪造 token
2. 解决：不用刻意向服务器发送请求验证 token，只需要正常发送请求，一旦在 home 组件发送请求都要 token。一旦 token 出错服务器会返回一个 401 的错误状态码
3. 思路：

- 统一在响应拦截器中错误回调函数判断状态码是否是 401
  - 如果是，就要清空本地数据（localStorage、redux）
    - redux 数据因为不是组件不能使用 connect 方法，只能通过 store.dispatch 更新
  - 最后跳转到 /login 重新登录
    - 因为不是组件获取不到路由组件的三大属性，从而不能 history.push。此时需要修改路由的配置
    - 通过对 react-router-dom 中 BrowserRouter 的源代码查看，BrowserRouter 就是由 react-router 中 Router + 传入 history 属性组成的
    - 所以需要将 react-router-dom 中 BrowserRouter 改成 react-router 中 Router + 传入 history 属性，此时就能得到 history 属性
    - 将 history 定义成模块去复用，从而拦截器函数中可以使用了

## 8、完成 BasicLayout 静态组件

- 具体代码参照 antd 中 Menu 组件配置
- BasicLayout 内部 有Slider Header Content Footer，其中Content是需要变化的，其他基本都是固定的
- BasicLayout 放在App组件内，Route组件放在BasicLayout内的Switch组件内
- BasicLayout要显示Content 采用this.props.children 拿到所有子节点

## 9、LeftNav 功能

- 需求：刷新网页时，要选中当前网址对应的菜单
  - 需要通过 pathname 得到当前地址（因为组件不是路由组件，所以通过 withRouter 传递三大属性）
  - 将菜单遍历的 key 设置为 menu.path
  - 给最外层 Menu 设置 defaultSelectedKeys={[pathname]}
- 需求：刷新网页时，要展开当前网址对应的一级菜单
  - 需要通过 pathname 得到当前地址（因为组件不是路由组件，所以通过 withRouter 传递三大属性）
  - 将菜单遍历的 key 设置为 menu.path
  - 因为 pathname 和二级菜单的 path 一致，说明是选中了二级菜单，但是要展开的是一级菜单。所以通过遍历查找得到一级菜单的 path
  - 给最外层 Menu 设置 defaultOpenKeys={[openKey]}
  
## 注意点
组件内要获取redux管理的状态数据 用connect高阶组件;
其他 要获取redux管理的状态数据 引入store，store.getState()

Redirect 在组件内render内部使用
组件非render内，只能用this.props.history；
    (push传参，组件可以通过location.state获取第二个参数)
非组件，需要react封装的history 

高阶组件的包裹组件，注意将props给传递下去；
否则被包裹组件会失去原本的props；
别人定义好的比如connect已经做好这方面。

