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
     await queryInterface.bulkInsert('pay_method', [
      {
        name: 'Mercado Pago'
      },
      {
        name: 'Tarjeta de debito'
      },
      {
        name: 'Tarjeta de credito'
      },
      {
        name: 'Efectivo'
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
     await queryInterface.bulkDelete('pay_method', null, {});
  }
};
