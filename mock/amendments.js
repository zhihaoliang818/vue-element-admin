const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    orderNumber: Mock.Random.string('number', 12),
    customerName: Mock.Random.cname(),
    province: Mock.Random.province(),
    city: Mock.Random.city(),
    gender: Mock.Random.pick(['男', '女']),
    serviceName: Mock.Random.ctitle(5, 8) + '服务套餐',
    amount: Mock.Random.float(1000, 50000, 2, 2),
    orderTime: +Mock.Random.date('T'),
    visitorCount: Mock.Random.integer(1, 10),
    visitorNames: Array.from({length: Mock.Random.integer(1, 5)}, () => Mock.Random.cname()),
    paymentTime: +Mock.Random.date('T'),
    auditor: Mock.Random.cname(),
    auditTime: +Mock.Random.date('T'),
    modifyTime: +Mock.Random.date('T'),
    status: Mock.Random.pick(['已审核', '待审核', '已修改'])
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/amendments/list',
    type: 'get',
    response: config => {
      const { searchKey, searchValue, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (searchKey && searchValue) {
          return String(item[searchKey]).toLowerCase().includes(searchValue.toLowerCase())
        }
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/amendments/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/amendments/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/amendments/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/amendments/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
