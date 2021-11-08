'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      {
        userId: 4,
        title: 'Trip to Japan',
        description: 'Photos from a Stussy business trip to Japan I took in 2017.',
      },
      {
        userId: 4,
        title: 'Back home',
        description: 'Trip back home visiting parents for the holidays.',
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
      return queryInterface.bulkDelete('Albums', null, {});
  }
};
