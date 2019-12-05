'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn('shutters', 'url_template', Sequelize.STRING);
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('shutters', 'url_template');
   
  }
};
