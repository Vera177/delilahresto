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
     await queryInterface.bulkInsert('products', [
      {
        name: 'Bagel de Salmon',
        price: 425,
        url_image: 'https://www.casanhelp.com.ar/wp-content/uploads/2020/05/bagel-de-salmon-169.jpg'
      },
      {
        name: 'Hamburguesa clasica',
        price: 350,
        url_image: 'https://www.casanhelp.com.ar/wp-content/uploads/2020/05/bagel-de-salmon-169.jpg'
      },
      {
        name: 'Sandwich veggie',
        price: 310,
        url_image: 'https://www.casanhelp.com.ar/wp-content/uploads/2020/05/bagel-de-salmon-169.jpg'
      },
      {
        name: 'Ensalada veggie',
        price: 340,
        url_image: 'https://www.casanhelp.com.ar/wp-content/uploads/2020/05/bagel-de-salmon-169.jpg'
      },
      {
        name: 'Focaccia',
        price: 300,
        url_image: 'https://www.casanhelp.com.ar/wp-content/uploads/2020/05/bagel-de-salmon-169.jpg'
      },
      {
        name: 'Sandwich Focaccia',
        price: 440,
        url_image: 'https://www.casanhelp.com.ar/wp-content/uploads/2020/05/bagel-de-salmon-169.jpg'
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
     await queryInterface.bulkDelete('products', null, {});
  }
};
