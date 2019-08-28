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
          percent: 80,
          product_reduce: 200,
          shipping_free: 1,
          limited_num: 88,
          end_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: '超級特惠價格',
          coupon_code: '1111',
          description: '單身狗專屬優惠券',
          percent: 50,
          product_reduce: 110,
          shipping_free: 0,
          limited_num: 111,
          end_date: new Date(),
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
