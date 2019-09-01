'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Coupons',
      [
        {
          id: 1,
          name: '發大財',
          coupon_code: '8888',
          description: '發大財限定優惠券',
          percent: 88,
          product_reduce: null,
          shipping_free: 1,
          limited_num: 88,
          end_date: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: '單身快樂',
          coupon_code: '111',
          description: '單身狗專屬優惠券',
          percent: null,
          product_reduce: 1111,
          shipping_free: 0,
          limited_num: 111,
          end_date: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: '至尊皇家',
          coupon_code: 'vip',
          description: '超級限量的尊爵優惠券',
          percent: 0,
          product_reduce: null,
          shipping_free: 1,
          limited_num: 3,
          end_date: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Coupons', null, {})
  }
}
