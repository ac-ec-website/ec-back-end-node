'use strict'
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    'Reply',
    {
      comment: DataTypes.STRING,
      ProductId: DataTypes.INTEGER,
      OrderId: DataTypes.INTEGER
    },
    {}
  )
  Reply.associate = function (models) {
    Reply.belongsTo(models.Product)
    Reply.belongsTo(models.Order)
  }
  return Reply
}
