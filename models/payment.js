'use strict'
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    'Payment',
    {
      params: DataTypes.TEXT,
      sn: DataTypes.STRING,
      total_amount: DataTypes.INTEGER,
      payment_method: DataTypes.STRING,
      payment_status: DataTypes.STRING,
      OrderId: DataTypes.INTEGER
    },
    {}
  )
  Payment.associate = function(models) {
    Payment.belongsTo(models.Order)
  }
  return Payment
}
