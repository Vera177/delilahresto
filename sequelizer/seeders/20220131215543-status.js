'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('statuses', [
      {
        name: 'Nuevo'
      },
      {
        name: 'Confirmado'
      },
      {
        name: 'Preparando'
      },
      {
        name: 'Enviando'
      },
      {
        name: 'Cancelado'
      },
      {
        name: 'Entregado'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('statuses', null, {});
  }
};
