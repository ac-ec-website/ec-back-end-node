'use strict';
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('payment', {
    params: DataTypes.TEXT,
    sn: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    OrderId: DataTypes.INTEGER
  }, {});
  payment.associate = function(models) {
    // associations can be defined here
  };
  return payment;
};