'use strict'
module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define(
    'Coupon',
    {
      name: DataTypes.STRING,
      coupon_code: DataTypes.STRING,
      description: DataTypes.TEXT,
      percent: DataTypes.INTEGER,
      product_reduce: DataTypes.INTEGER,
      shipping_free: DataTypes.INTEGER,
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
