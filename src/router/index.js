import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 布局组件 - 包含侧边栏、导航栏等公共布局 */
import Layout from '@/layout'

/* 路由模块 - 只保留需要的路由模块 */
import chartsRouter from './modules/charts'

/**
 * 常量路由（不需要权限校验的路由）
 */
export const constantRoutes = [
  // 重定向路由（用于处理旧路径跳转）
  {
    path: '/redirect',
    component: Layout,
    hidden: true, // 不在侧边栏显示
    children: [
      {
        path: '/redirect/:path(.*)', // 匹配所有路径
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  // 登录页
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true // 不在侧边栏显示
  },

  // 404页面
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  // 主页管理
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  /**
   * 根路由 - 首页
   * 注意：这里对应侧边栏的「首页」父级菜单
   */
  {
    path: '/manger',
    component: Layout,
    meta: {
      title: '管理', // 修改此处将显示名称改为「管理」
      icon: 'table' // 侧边栏图标（Element UI图标名称）
    },
    redirect: 'noRedirect',
    children: [
      // 境内订单管理路由
      {
        path: 'domestic-orders',
        component: () => import('@/views/order/domestic'),
        name: 'DomesticOrders',
        meta: {
          title: '境内订单管理',
          icon: 'el-icon-s-order'
        }
      },

      // 境外订单管理路由
      {
        path: 'international-orders',
        component: () => import('@/views/order/international'),
        name: 'InternationalOrders',
        meta: {
          title: '境外订单管理',
          icon: 'el-icon-s-promotion'
        }
      },

      // 退改订单管理路由
      {
        path: 'order-amendments',
        component: () => import('@/views/order/amendments'),
        name: 'OrderAmendments',
        meta: {
          title: '退改订单管理',
          icon: 'el-icon-refresh-left'
        }
      }
    ]
  }
]

/**
 * 异步路由（需要动态加载的权限路由）
 */
export const asyncRoutes = [
  // 图表模块（从单独模块文件引入）
  chartsRouter,
  {
    path: '/log',
    component: Layout,
    redirect: '/log/list',
    meta: { title: '日志管理', icon: 'el-icon-notebook-2' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/log-table/index'),
        name: 'LogList',
        meta: { title: '日志列表', icon: 'el-icon-tickets' }
      }
    ]
  },

  // 404页面必须放在最后
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * 创建路由实例
 */
const createRouter = () => new Router({
  // 页面切换时滚动到顶部
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

/**
 * 重置路由（用于权限变更时重新加载路由）
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
