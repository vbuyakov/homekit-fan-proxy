'use strict';
module.exports = (sequelize, DataTypes) => {
  const Period = sequelize.define('Period', {
    name: DataTypes.STRING,
    fromH: {type: DataTypes.INTEGER, validate: {
      min: { args: [0], msg: `From, h Should be 0-23`},
      max: { args: [23], msg: `From, h Should be 0-23`},
    }},
    toH: {type:DataTypes.INTEGER, validate: {
      min: { args: [0], msg: `To, h Should be 0-23`},
      max: { args: [24], msg: `To, h Should be 0-23`},
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