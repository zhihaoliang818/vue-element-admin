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
      meta: { title: '境内与境外', noCache: true }
    },
    {
      path: 'baifen',
      component: () => import('@/views/charts/baifen'),
      name: 'baifenChart',
      meta: { title: '近两年每月', noCache: true }
    }
  ]
}

export default chartsRouter
