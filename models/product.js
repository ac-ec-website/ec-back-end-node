'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    stock_quantity: DataTypes.INTEGER,
    cost_price: DataTypes.INTEGER,
    sell_price: DataTypes.INTEGER,
    product_status: DataTypes.BOOLEAN
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};