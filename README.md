# 🚤 游艇旅游订单管理系统

[![Vue.js](https://img.shields.io/badge/Vue-2.6.14-brightgreen.svg)](https://vuejs.org/)
[![Element UI](https://img.shields.io/badge/Element--UI-2.15.6-blue.svg)](https://element.eleme.io/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> 基于 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 二次开发，专为游艇旅游业务打造的高效订单管理平台。

---

## 📑 目录

- [项目简介](#项目简介)
- [核心功能](#核心功能)
- [安装与启动](#安装与启动)
- [发布](#发布)
- [其它命令](#其它命令)
- [特别说明](#特别说明)
- [致谢](#致谢)

---

## 项目简介

本系统以数据安全与高效管理为核心，集成多种业务模块，助力游艇旅游企业数字化转型。

---

## 核心功能

- **用户管理**  
  注册、登录、修改密码、退出等
- **境内订单管理**  
  订单创建、修改、删除
- **境外订单管理**  
  订单创建、修改、删除
- **退改订单管理**  
  订单创建、修改、删除
- **数据分析**  
  集成 ECharts 数据可视化
- **日志管理**  
  记录系统操作日志

> **安全保障**：用户密码加密存储，所有列表默认按最新排序，确保数据安全与高效管理。

---

## 安装与启动

```bash
# 克隆项目
git clone https://github.com/siyijiang/vue-element-admin.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。
# 推荐使用淘宝镜像加速
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

---

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

---

## 其它命令

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

---

## 特别说明

> ⚠️ 本项目使用了 mockjs 进行数据模拟，**请勿直接用浏览器打开本地 HTML 文件**，否则数据接口将无法正常加载。请务必通过 `npm run dev` 启动本地服务后访问项目页面，或使用如 Live Server 等本地服务器工具进行访问。

---

## 致谢

感谢 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 及所有开源贡献者！

---
