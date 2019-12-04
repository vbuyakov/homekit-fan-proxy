'use strict';
module.exports = (sequelize, DataTypes) => {
  const Period = sequelize.define('Period', {
    name: DataTypes.STRING,
    fromH: {type: DataTypes.INTEGER, validate: {
      min: 0,
      max: 23,
    }},
    toH: {type:DataTypes.INTEGER, validate: {
      min: 1,
      max: 24
    }, 
    set(val) {
      this.setDataValue('toH', val == 0 ? 24: val)
    },
    get() {
      const val = this.getDataValue('toH');
      return val == 24 ? 0 : val
    }
  }
  }, {underscored:true});
  Period.associate = function(models) {
    Period.hasMany(models.FanTask)
    Period.hasMany(models.ShutterTask);
  };
  return Period;
};