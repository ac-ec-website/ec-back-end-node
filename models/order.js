'use strict'
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      sn: DataTypes.INTEGER,
      total_amount: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      shipping_status: DataTypes.STRING,
      payment_status: DataTypes.STRING,
      UserId: DataTypes.INTEGER
    },
    {}
  )
  Order.associate = function(models) {
    Order.belongsTo(models.User)
    Order.belongsToMany(models.Product, {
      as: 'items',
      through: {
        model: models.OrderItem,
        unique: false
      },
      foreignKey: 'OrderId'
    })
    Order.hasMany(models.Payment)
  }
  return Order
}
