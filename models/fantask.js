'use strict';
module.exports = (sequelize, DataTypes) => {
  const FanTask = sequelize.define('FanTask', {
    PeriodId: {type: DataTypes.INTEGER, allowNull: false},
    FanProfileId: {type: DataTypes.INTEGER, allowNull: false},
  }, {underscored: true});
  FanTask.associate = function(models) {
    FanTask.belongsTo(models.FanProfile)
    FanTask.belongsTo(models.Period)
  };
  return FanTask;
};