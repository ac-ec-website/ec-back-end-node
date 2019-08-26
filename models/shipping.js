'use strict'
module.exports = (sequelize, DataTypes) => {
  const Shipping = sequelize.define(
    'Shipping',
    {
      sn: DataTypes.STRING,
      shipping_fee: DataTypes.INTEGER,
      shipping_method: DataTypes.STRING,
      shipping_status: DataTypes.STRING,
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      OrderId: DataTypes.INTEGER
    },
    {}
  )
  Shipping.associate = function(models) {
    Shipping.belongsTo(models.Order)
  }
  return Shipping
}
