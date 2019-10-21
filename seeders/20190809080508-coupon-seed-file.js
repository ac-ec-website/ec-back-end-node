'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Coupons',
      [
        {
          type: 2,
          name: '發大財',
          coupon_code: '8888',
          description: '發大財限定優惠券',
          percent: 88,
          product_reduce: null,
          shipping_free: null,
          limited_num: 88,
          end_date: '2019-11-20T13:00:00',
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          type: 1,
          name: '單身快樂',
          coupon_code: '1111',
          description: '單身狗專屬優惠券',
          percent: null,
          product_reduce: 111,
          shipping_free: null,
          limited_num: 111,
          end_date: '2019-11-20T13:00:00',
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          type: 0,
          name: '至尊皇家',
          coupon_code: 'vip',
          description: '超級限量的尊爵優惠券',
          percent: null,
          product_reduce: null,
          shipping_free: 1,
          limited_num: 3,
          end_date: '2019-11-20T13:00:00',
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Coupons', null, {})
  }
}
