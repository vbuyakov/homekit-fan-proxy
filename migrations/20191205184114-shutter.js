'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return Promise.all([ 
     queryInterface.addColumn('fan_tasks', 'fan_speed', Sequelize.STRING),
     queryInterface.addColumn('fan_tasks', 'start_period', Sequelize.STRING),
     queryInterface.addColumn('fan_tasks', 'work_period', Sequelize.STRING)
   ])

  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.removeColumn('fan_tasks', 'fan_speed',),
      queryInterface.removeColumn('fan_tasks', 'start_period'),
      queryInterface.removeColumn('fan_tasks', 'work_period')
    ])
  }
};
