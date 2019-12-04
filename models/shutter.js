'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shutter = sequelize.define('Shutter', {
    name: { type: DataTypes.STRING, unique: true },
    openAngle: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 90 },
    closeAngle: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    initValue: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 50 },
    alias: {
      type: DataTypes.STRING, 
      validate: {
        len: [1, 4]
      }
    },
    urlTemplate: {type: DataTypes.STRING},
    direction: DataTypes.ENUM('IN', 'OUT')
  }, { underscored: true });
  Shutter.associate = function (models) {
    Shutter.hasMany(models.ShutterPosition)
  };
  return Shutter;
};