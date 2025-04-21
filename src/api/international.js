import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/international/list',
    method: 'get',
    params: {
      ...query,
      orderNumber: query.orderNumber,
      customerName: query.customerName,
      serviceName: query.serviceName,
      status: query.status
    }
  })
}

export function createOrder(data) {
  return request({
    url: '/vue-element-admin/international/create',
    method: 'post',
    data: {
      ...data,
      visitorNames: data.visitorNames.join(','),
      orderTime: +new Date(data.orderTime),
      paymentTime: +new Date(data.paymentTime)
    }
  })
}

export function updateOrder(data) {
  return request({
    url: '/vue-element-admin/international/update',
    method: 'post',
    data: {
      ...data,
      visitorNames: data.visitorNames.join(','),
      orderTime: +new Date(data.orderTime),
      paymentTime: +new Date(data.paymentTime),
      modifyTime: +new Date()
    }
  })
}
