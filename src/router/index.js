import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* 只保留需要的路由模块 */
import chartsRouter from './modules/charts'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    meta: {
      title: '设备管理',
      icon: 'table'
    },
    redirect: '/equipment-purchase', // 修改默认跳转到设备采购
    children: [
      {
        path: 'equipment-purchase',
        component: () => import('@/views/equipment/purchase'),
        name: 'EquipmentPurchase',
        meta: { title: '设备采购管理', icon: 'table' }
      },
      {
        path: 'equipment-maintenance',
        component: () => import('@/views/equipment/maintenance'),
        name: 'EquipmentMaintenance',
        meta: { title: '设备维修管理', icon: 'table' }
      },
      {
        path: 'equipment-scrap',
        component: () => import('@/views/equipment/scrap'),
        name: 'EquipmentScrap',
        meta: { title: '设备报废管理', icon: 'table' }
      },
      {
        path: 'data-analysis',
        component: () => import('@/views/data-analysis'),
        name: 'DataAnalysis',
        meta: { title: '数据分析', icon: 'chart' }
      }
    ]
  }
]

export const asyncRoutes = [
  // 恢复图表模块原始配置
  chartsRouter,

  // 404页面必须放在最后
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
