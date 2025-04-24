/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: '分析',
    icon: 'chart'
    // icon: 'el-icon-data-analysis' // 图标
  },
  children: [
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: '近2年境内、外订单数占比', noCache: true }
    },
    {
      path: 'baifen',
      component: () => import('@/views/charts/baifen'),
      name: 'baifenChart',
      meta: { title: '近2年每月的订单数占比', noCache: true }
    }
  ]
}

export default chartsRouter
