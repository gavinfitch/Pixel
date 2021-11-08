'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Trip+to+Japan/beautiful_tree.jpg',
        title: 'beautiful_tree.jpg',
        description: 'Photo of a beautiful tree.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Trip+to+Japan/building.jpg',
        title: 'building.jpg',
        description: 'Photo of a building.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Trip+to+Japan/city_from_car.jpg',
        title: 'city_from_car.jpg',
        description: 'Photo of the city from a car.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Trip+to+Japan/city.jpg',
        title: 'city.jpg',
        description: 'Photo of the city.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Trip+to+Japan/dog_statue.jpg',
        title: 'dog_statue.jpg',
        description: 'Photo of a statue of a dog.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Trip+to+Japan/friend.jpg',
        title: 'friend.jpg',
        description: 'Photo of a friend.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Trip+to+Japan/friend2.jpg',
        title: 'friend2.jpg',
        description: 'Another photo of a friend.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Trip+to+Japan/friends.jpg',
        title: 'friends.jpg',
        description: 'Photo of friends.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Trip+to+Japan/hello_kitty.jpg',
        title: 'hello_kitty.jpg',
        description: 'Hello Kitty photo.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Trip+to+Japan/moon.jpg',
        title: 'moon.jpg',
        description: 'Photo of the moon.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Trip+to+Japan/selfie.jpg',
        title: 'selfie.jpg',
        description: 'Selfie.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Trip+to+Japan/stairs_plants.jpg',
        title: 'stairs_plants.jpg',
        description: 'Plants on stairs.',
      },
      {
        userId: 4,
        albumId: 2,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Back+home/dog1.jpg',
        title: 'dog1.jpg',
        description: 'Photo of my dog.',
      },
      {
        userId: 4,
        albumId: 2,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Back+home/dog2.jpg',
        title: 'dog2.jpg',
        description: 'Another photo of my dog.',
      },
      {
        userId: 4,
        albumId: 2,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Back+home/golf_pink.jpg',
        title: 'golf_pink.jpg',
        description: 'Mini golf.',
      },
      {
        userId: 4,
        albumId: 2,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Back+home/golf_shoes.jpg',
        title: 'golf_shoes.jpg',
        description: 'Shoes from mini golf.',
      },
      {
        userId: 4,
        albumId: 2,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Back+home/parrot.jpg',
        title: 'parrot.jpg',
        description: 'Kitchen parrot.',
      },
      {
        userId: 4,
        albumId: 2,
        photoURL: 'https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Back+home/window_plant.jpg',
        title: 'window_plant.jpg',
        description: 'Photo of reflection.',
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
  }
};
