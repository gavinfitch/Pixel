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
        firstName: 'Ford',
        lastName: 'Sorita',
        email: 'ford@ford.com',
        username: 'fords123',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Tim',
        lastName: 'Willis',
        email: 'tim@tim.com',
        username: 'timw123',
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
