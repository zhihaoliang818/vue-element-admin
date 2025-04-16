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
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
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
      // 设备采购管理
      {
        path: 'equipment-purchase',
        component: () => import('@/views/equipment/purchase'),
        name: 'EquipmentPurchase',
        meta: {
          title: '设备采购管理',
          icon: 'table'
        }
      },
      // 设备维修管理
      {
        path: 'equipment-maintenance',
        component: () => import('@/views/equipment/maintenance'),
        name: 'EquipmentMaintenance',
        meta: {
          title: '设备维修管理',
          icon: 'table'
        }
      },
      // 设备报废管理
      {
        path: 'equipment-scrap',
        component: () => import('@/views/equipment/scrap'),
        name: 'EquipmentScrap',
        meta: {
          title: '设备报废管理',
          icon: 'table'
        }
      },
      // 数据分析
      {
        path: 'data-analysis',
        component: () => import('@/views/data-analysis'),
        name: 'DataAnalysis',
        meta: {
          title: '数据分析',
          icon: 'chart' // 使用图表图标
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
