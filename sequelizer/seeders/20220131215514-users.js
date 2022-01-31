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
     await queryInterface.bulkInsert('users', [
      {
        user_name: 'administrator',
        name: 'admin',
        password: 'admin',
        email: 'administrator@email.com',
        phone: '12345678',
        address: 'calle falsa 123',
        roles_id: 1
      },
      {
        user_name: 'user',
        name: 'user',
        password: '123456',
        email: 'user@email.com',
        phone: '12345678',
        address: 'calle falsa 321',
        roles_id: 2
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
     await queryInterface.bulkDelete('users', null, {});
  }
};
