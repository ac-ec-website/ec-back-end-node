'use strict'
module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define(
    'Discount',
    {
      type: DataTypes.INTEGER, // 0 - 運費相關、1 - 扣款相關、2 - 打折相關
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      target_price: DataTypes.INTEGER,
      percent: DataTypes.INTEGER,
      product_reduce: DataTypes.INTEGER,
      shipping_free: DataTypes.INTEGER, // 0 - 運費照常、1 - 免運
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE
    },
    {}
  )
  Discount.associate = function (models) {
    Discount.hasMany(models.Order)
  }
  return Discount
}
