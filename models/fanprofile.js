'use strict';
module.exports = (sequelize, DataTypes) => {
  const FanProfile = sequelize.define('FanProfile', {
    name: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {underscored: true});
  FanProfile.associate = function(models) {
    FanProfile.hasMany(models.FanTask);
  };
  return FanProfile;
};