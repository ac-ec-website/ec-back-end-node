'use strict'
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    'CartItem',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      quantity: DataTypes.INTEGER,
      CartId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER
    },
    {}
  )
  CartItem.associate = function(models) {
    // associations can be defined here
  }
  return CartItem
}
