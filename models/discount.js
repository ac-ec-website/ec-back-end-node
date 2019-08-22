'use strict'
module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define(
    'Discount',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      target_price: DataTypes.INTEGER,
      percent: DataTypes.INTEGER,
      product_reduce: DataTypes.INTEGER,
      shipping_free: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE
    },
    {}
  )
  Discount.associate = function(models) {
    Discount.hasMany(models.Order)
  }
  return Discount
}
