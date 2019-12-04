'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShutterProfile = sequelize.define('ShutterProfile', {
    name: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {underscored: true});
  ShutterProfile.associate = function(models) {
    ShutterProfile.hasMany(models.ShutterTask)
  };
  return ShutterProfile;
};