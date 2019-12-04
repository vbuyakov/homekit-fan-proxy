'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShutterPosition = sequelize.define('ShutterPosition', {
    value: {type:DataTypes.INTEGER.UNSIGNED, allowNull: false, validate: {
      min: 0,
      max: 100
    }},
    ShutterId: {type:DataTypes.INTEGER, allowNull: false},
    ShutterTaskId: {type:DataTypes.INTEGER, allowNull: false}
  }, {underscored: true});
  ShutterPosition.associate = function(models) {
    ShutterPosition.belongsTo(models.Shutter)
    ShutterPosition.belongsTo(models.ShutterTask)
  };
  return ShutterPosition;
};