'use strict'
module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define(
    'Coupon',
    {
      type: DataTypes.INTEGER, // 0 - 運費相關、1 - 扣款相關、2 - 打折相關
      name: DataTypes.STRING,
      coupon_code: DataTypes.STRING,
      description: DataTypes.TEXT,
      percent: DataTypes.INTEGER,
      product_reduce: DataTypes.INTEGER,
      shipping_free: DataTypes.INTEGER, // 0 - 運費照常、1 - 免運
      limited_num: DataTypes.INTEGER,
      end_date: DataTypes.DATE
    },
    {}
  )
  Coupon.associate = function(models) {
    Coupon.hasMany(models.Order)
  }
  return Coupon
}
