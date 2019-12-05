'use strict';
module.exports = (sequelize, DataTypes) => {
  const FanTask = sequelize.define('FanTask', {
    fanSpeed: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 100,
      validate: {
        min: { args: [1], msg: `Spped Should be 1-200%`},
        max: { args: [200], msg: `Spped Should be 1-200%`},
      }
    },
    startPeriod: {type: DataTypes.INTEGER, allowNull: false,
      validate: {
        min: { args: [1], msg: `Start period should be 1-60`},
        max: { args: [60], msg: `Start period should be 1-60`},
      }
    },
    workPeriod: {type: DataTypes.INTEGER, allowNull: false,
      validate: {
        min: { args: [1], msg: `Work period should be 1-60`},
        max: { args: [60], msg: `Work period should be 1-60`},
      }
    },
    PeriodId: {type: DataTypes.INTEGER, allowNull: false},
    FanProfileId: {type: DataTypes.INTEGER, allowNull: false},
  }, {
    validate: {
      checkPeriods() {
        const fullPeriod = parseInt(this.startPeriod,10) + parseInt(this.workPeriod,10)
        if (fullPeriod > 60) {
          throw new Error('Summ of Start period and Work period should be less then 60')
        }
      }
    }, 
    underscored: true
  });
  FanTask.associate = function(models) {
    FanTask.belongsTo(models.FanProfile)
    FanTask.belongsTo(models.Period)
  };
  return FanTask;
};