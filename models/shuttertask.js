'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShutterTask = sequelize.define('ShutterTask', {
    PeriodId: {type:DataTypes.INTEGER, allowNull: false},
    ShutterProfileId: {type:DataTypes.INTEGER, allowNull: false}
  }, {underscored: true});
  ShutterTask.associate = function(models) {
    ShutterTask.belongsTo(models.Period)
    ShutterTask.belongsTo(models.ShutterProfile)
    ShutterTask.hasMany(models.ShutterPosition)
  };
  return ShutterTask;
};