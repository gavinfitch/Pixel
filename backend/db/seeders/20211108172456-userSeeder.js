'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Ace',
        lastName: 'Kieffer',
        email: 'ace@ace.com',
        username: 'acek123',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Brian',
        lastName: 'Long',
        email: 'brian@brian.com',
        username: 'brianl123',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Dylan',
        lastName: 'Shippee',
        email: 'dylan@dylan.com',
        username: 'dylans123',
        hashedPassword: bcrypt.hashSync('password'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('Users', null, {});
  }
};
