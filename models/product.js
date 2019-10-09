'use strict'
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      stock_quantity: DataTypes.INTEGER,
      cost_price: DataTypes.INTEGER,
      origin_price: DataTypes.INTEGER,
      sell_price: DataTypes.INTEGER,
      product_status: DataTypes.BOOLEAN,
      CategoryId: DataTypes.INTEGER
    },
    {}
  )
  Product.associate = function (models) {
    Product.belongsToMany(models.Cart, {
      as: 'carts',
      through: {
        model: models.CartItem,
        unique: false
      },
      foreignKey: 'ProductId'
    })
    Product.belongsToMany(models.Order, {
      as: 'orders',
      through: {
        model: models.OrderItem,
        unique: false
      },
      foreignKey: 'ProductId'
    })
    Product.belongsTo(models.Category)
    Product.belongsToMany(models.User, {
      through: models.Favorite,
      foreignKey: 'ProductId',
      as: 'FavoritedUsers'
    })
    Product.hasMany(models.Reply)
  }
  return Product
}
