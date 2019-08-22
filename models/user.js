'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {}
  )
  User.associate = function(models) {
    User.hasMany(models.Order)
    User.belongsToMany(models.Product, {
      through: models.Favorite,
      foreignKey: 'UserId',
      as: 'FavoritedProducts'
    })
  }
  return User
}
