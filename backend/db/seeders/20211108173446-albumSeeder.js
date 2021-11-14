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
        title: 'Matt\'s Photos',
        description: 'Photos that Matt took.',
      },
      {
        userId: 5,
        title: 'Back Home',
        description: 'Photos taken around Seattle 2019.',
      },
      {
        userId: 6,
        title: 'Misc.',
        description: 'Miscellaneous photos.',
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
