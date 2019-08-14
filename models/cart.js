'use strict'
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
    {
      quantity: DataTypes.INTEGER
    },
    {}
  )
  Cart.associate = function(models) {
    Cart.belongsToMany(models.Product, {
      as: 'items',
      through: {
        model: models.CartItem,
        unique: false
      },
      foreignKey: 'CartId'
    })
  }
  return Cart
}
