'use strict'
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      sn: DataTypes.STRING,
      checkoutPrice: DataTypes.INTEGER,
      shipping_fee: DataTypes.INTEGER,
      discount_fee: DataTypes.INTEGER,
      total_amount: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      order_status: DataTypes.STRING,
      remark: DataTypes.TEXT,
      shipping_status: DataTypes.STRING,
      payment_status: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      CouponId: DataTypes.INTEGER,
      DiscountId: DataTypes.INTEGER
    },
    {}
  )
  Order.associate = function (models) {
    Order.belongsToMany(models.Product, {
      as: 'items',
      through: {
        model: models.OrderItem,
        unique: false
      },
      foreignKey: 'OrderId'
    })
    Order.hasMany(models.Payment)
    Order.hasMany(models.Shipping)
    Order.hasMany(models.Reply)
    Order.belongsTo(models.User)
    Order.belongsTo(models.Coupon)
    Order.belongsTo(models.Discount)
  }
  return Order
}
