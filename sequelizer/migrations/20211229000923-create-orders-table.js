'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
      'orders',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        date: Sequelize.DATE,
        total: Sequelize.DOUBLE,
        users_id: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' }
        },
        status_id: {
          type: Sequelize.INTEGER,
          references: { model: 'status', key: 'id' }
        },        
        pay_method_id: {
          type: Sequelize.INTEGER,
          references: { model: 'pay_method', key: 'id' }
        }              
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('orders');
  }
};
