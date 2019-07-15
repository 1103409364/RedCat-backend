### 简要介绍
* 项目：RedCat-backend
* 类型：博客
* 主要技术： Node.js、Express、MongoDB、jwt authentication
* Node.js 版本：v10.15.3
* MongoDB 版本：v4.0.8
* 项目前端：[链接](https://github.com/1103409364/RedCat)
### 提供接口
* 注册
* 登录
* 退出登录
* 邮箱验证激活
* 发表、修改、搜索、删除文章等接口
* 获取 bing 每日壁纸

### 运行方式
下载安装  MongoDB，然后数据库新建文件夹，路径名称不限，例如：在 C盘根目录新建 mongoDB 文件夹
```
$ mongod --dbpath C:\mongoDB\
$ yarn
$ yarn start
```