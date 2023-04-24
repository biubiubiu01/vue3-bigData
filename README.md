<p align="center">
  <a href="https://github.com/biubiubiu01/vue3-bigData/">
    <img src="https://images.gitee.com/uploads/images/2020/0906/151518_824b889d_7647779.png" alt="Logo" width="250">
   <h3 align="center"> vue3-bigData</h3>
  </a>
</p>

  <p align="center">
    <a href="https://github.com/biubiubiu01/vue3-bigData"><strong>探索本项目的文档 »</strong></a>
    <br />
    <br />
    <a href="https://gist006.gitee.io/vue3-bigdata">在线预览</a>
    ·
    <a href="https://github.com/biubiubiu01/vue3-bigData/issues">提出Bug</a>
    ·
    <a href="https://github.com/biubiubiu01/vue3-bigData/issues">提出新特性</a>
  </p>
  




## 简介

[vue3-bigData](https://gist006.gitee.io/vue3-bigdata)是一个可视化系统，基于[vue3.0](https://github.com/vuejs/vue-next) 和 [echarts](https://github.com/apache/incubator-echarts)实现，使用vue的最新的技术栈，包括各种可视化图表。

> vue3-basic-admin后台管理系统(强烈推荐！),地址：[vue3-basic-admin](https://github.com/biubiubiu01/vue3-basic-admin)

> vue-antd-admin后台管理系统，有兴趣可以看看：[vue-antd-admin](https://github.com/biubiubiu01/vue-antd-admin)

> react-antd-admin后台管理系统,地址：[reacct-antd-admin](https://github.com/biubiubiu01/react-antd-admin)

## 前序准备
你需要了解 [vue3.0](https://github.com/vuejs/vue-next)的新特性和Api方法后才开始熟悉本项目，大部分数据采用[Mock.js](https://github.com/nuysoft/Mock) 进行模拟，[axios](https://github.com/axios/axios)请求数据，最大还原了请求后台接口数据，由于[element-ui](https://github.com/ElemeFE/element) 还未支持vue3.0（不过好像在憋大招）,所以这里自己手写了几个项目中遇到的UI组件，正在持续更新中...

同时，这里我还写了个[vue3.0](https://github.com/vuejs/vue-next) 新特性方法的文章，包含vue2.0常用的各种方法在vue3.0中的使用。

- [vue3.0,你想知道的这里都有](https://juejin.im/post/6870392360946106382)


![输入图片说明](https://images.gitee.com/uploads/images/2020/0906/163002_d44d3025_7647779.png "home.png")
![输入图片说明](https://images.gitee.com/uploads/images/2020/0906/202415_e50ed59c_7647779.png "微信图片_20200906201805.png")

## 功能

```
- 柱状图
- 饼图
- 词云图
- 漏斗图
- 水球图
- 折线图
- 仪表盘
- 雷达图
- 矩形树图
- 关系图
- 地图  --- 分布图
- 地图  --- 散点图
- 地图  --- 热力图
```

## 使用说明
```
- 首页时间自动轮播，每次时间切换都会调接口，所有的图数据都会刷新
- 首页点击时间轴切换时间
- 首页点击地图可以下钻到县  周围数据都会变，显示对应市县的
- 首页下钻后点击中间空白处或者左上角可以回到对应市县
- 点击两边的echarts图可以进去详情页
- 最右边的关系图点击可以下钻
- 点击地图右上角的图标可以切换地图类型
```


### 文件目录说明
```

├── mock                             ---mock模拟数据
├── public                           ---静态资源文件
├── src          
│  ├── api                           ---接口     
│  ├── assets                        ---图片和字体
│  ├── componentApi                  ---可复用的vue方法
│  ├── components                    ---可复用的vue组件
│  ├── layouts                       ---布局方式
│  ├── router                        ---路由
│  ├── store                         ---vuex
│  ├── styles                        ---sass样式
│  ├── utils                         ---方法函数
│  ├── views                         ---页面
│  ├── App.vue                       
│  ├── main.js                       
├── tests                            ---单元测试文件
├── UI                               ---自定义UI组件库
├── .browserslistrc
├── .env.development
├── .env.production
├── .eslintrc.js
├──  babel.config.js
├── .jest.config.js                  ---jest的配置
├──  package.json
├──  package-lock.json
├──  README.md
└──  vue.config.js                   ---webpack的配置


```


 
## 安装

```
# 克隆项目
git clone https://github.com/biubiubiu01/vue3-bigData.git
# 进入项目目录
cd vue3-bigData
# 安装依赖
npm i
# 本地开发 启动项目
npm run serve
```


### 部署

```
# 打包项目
npm run build
# 单元测试
npm run test
```

## Online Demo

[在线 Demo](https://gist006.gitee.io/vue3-bigdata/#/homepage)

## 捐赠

开源不易，若觉得这个项目对你有用，可以点个[star](https://github.com/biubiubiu01/vue3-bigData)，欢迎提出建议和bug :smile: 。如果这个项目对你有所帮助，可以给作者买杯咖啡，欢迎投喂，任意金额捐赠加好友问题咨询。

<img src="https://i.328888.xyz/2023/02/28/zV27Q.jpeg" alt="alipay" width="250"><img src="https://i.328888.xyz/2023/02/28/zVw2H.jpeg" alt="wechat" width="250">

## 扫码领大红包啦，有朋友领到88元大红包
<img src="https://i.328888.xyz/2023/04/24/iSolbq.jpeg" alt="alipay" width="250">






