import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
//   getTableData: {
//     url: '/pc/goods/listGoods',
//     method: 'post'
//   },
//   updateGoods: {
//     url: '/pc/goods/updateGoods',
//     method: 'post'
//   },
//   saveGoods: {
//     url: '/pc/goods/saveGoods',
//     method: 'post'
//   },
//   deleteGoods: {
//     url: '/pc/goods/deleteGoods',
//     method: 'post'
//   },
//   searchGoods: {
//     url: '/pc/goods/getGoodsByGoodsCode',
//     method: 'post'
//   },
//   upDownGoods: {
//     url: '/pc/goods/upDownGoods',
//     method: 'post'
//   },
  listManagerOrders: {
    url: '/app/manangerOrder/listManagerOrders',
    method: 'post'
  },
  listManagerOrderDeepen: {
    url: '/app/manangerOrder/listManagerOrderDeepen',
    method: 'post'
  },
  updateManangerOrderStatus: {
    url: '/app/manangerOrder/updateManangerOrderStatus',
    method: 'post'
  },
  listManangerDrivers: {
    url: '/app/manangerInformation/listManangerDrivers',
    method: 'post'
  },
  updateUserPwd: {
    url: '/app/userInformation/updateUserPwd',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
