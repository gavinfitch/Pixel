'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [
      // Ace
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/beautiful_tree.jpg',
        title: 'beautiful_tree.jpg',
        description: 'Photo of a beautiful tree.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/building.jpg',
        title: 'building.jpg',
        description: 'Photo of a building.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/city_from_car.jpg',
        title: 'city_from_car.jpg',
        description: 'Photo of the city from a car.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/city.jpg',
        title: 'city.jpg',
        description: 'Photo of the city.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/dog_statue.jpg',
        title: 'dog_statue.jpg',
        description: 'Photo of a statue of a dog.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/friend.jpg',
        title: 'friend.jpg',
        description: 'Photo of a friend.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/friend2.jpg',
        title: 'friend2.jpg',
        description: 'Another photo of a friend.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/friends.jpg',
        title: 'friends.jpg',
        description: 'Photo of friends.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/hello_kitty.jpg',
        title: 'hello_kitty.jpg',
        description: 'Hello Kitty photo.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/moon.jpg',
        title: 'moon.jpg',
        description: 'Photo of the moon.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/selfie.jpg',
        title: 'selfie.jpg',
        description: 'Selfie.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/stairs_plants.jpg',
        title: 'stairs_plants.jpg',
        description: 'Plants on stairs.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/building_2.jpg',
        title: 'building 2.jpg',
        description: 'Photo of a building 2.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/building_3.jpg',
        title: 'building 3.jpg',
        description: 'Photo of a building 3.',
      },
      {
        userId: 4,
        albumId: 1,
        photoURL: 'https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Trip+to+Japan/building_4.jpg',
        title: 'building 4.jpg',
        description: 'Photo of a building 4.',
      },
      {
        userId: 4,
        albumId: 2,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Matt+C+Photos/cats.jpg",
        title: "cats.png",
        description: "Matt's cats",
      },
      {
        userId: 4,
        albumId: 2,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Matt+C+Photos/black-car.jpg",
        title: "black car.png",
        description: "Black car",
      },
      {
        userId: 4,
        albumId: 2,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Matt+C+Photos/dive.jpg",
        title: "dive.png",
        description: "Dive off roof at Madison Beach",
      },
      {
        userId: 4,
        albumId: 2,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Matt+C+Photos/tim.jpg",
        title: "tim.png",
        description: "Photo of Tim",
      },
      {
        userId: 4,
        albumId: 2,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Matt+C+Photos/double-exposure-chickens.jpg",
        title: "double exposure chickens.png",
        description: "Double exposure of Matt's chickens",
      },
      {
        userId: 4,
        albumId: 2,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ace/Matt+C+Photos/double-exposure-trees.jpg",
        title: "double exposure trees.png",
        description: "Double exposure 2",
      },
      // Ford
      {
        userId: 5,
        albumId: 3,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ford/Back+home/Portrait-at-red-square.jpg",
        title: "Portrait-at-red-square.jpg",
        description: "Friend at red square",
      },
      {
        userId: 5,
        albumId: 3,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ford/Back+home/Red-Square-man.jpg",
        title: "Red-Square-man.jpg",
        description: "Red square",
      },
      {
        userId: 5,
        albumId: 3,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ford/Back+home/Skyscrapers.jpg",
        title: "Skyscrapers.jpg",
        description: "Downtown",
      },
      {
        userId: 5,
        albumId: 3,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ford/Back+home/Net1.jpg",
        title: "Net1.jpg",
        description: "Net 1",
      },
      {
        userId: 5,
        albumId: 3,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ford/Back+home/Net2.jpg",
        title: "Net2.jpg",
        description: "Net 2",
      },
      {
        userId: 5,
        albumId: 3,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ford/Back+home/Flower.jpg",
        title: "Flower.jpg",
        description: "Flower",
      },
      {
        userId: 5,
        albumId: 3,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ford/Back+home/Eastern-WA.jpg",
        title: "Eastern-WA.jpg",
        description: "Eastern WA",
      },
      {
        userId: 5,
        albumId: 3,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Ford/Back+home/Eastern-WA-sky.jpg",
        title: "Eastern-WA-sky.jpg",
        description: "Eastern WA sky",
      },
      // Tim
      {
        userId: 6,
        albumId: 4,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Tim/Misc./diner.jpg",
        title: "diner.jpg",
        description: "Diner 1",
      },
      {
        userId: 6,
        albumId: 4,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Tim/Misc./natalie.jpg",
        title: "natalie.jpg",
        description: "Diner 2",
      },
      {
        userId: 6,
        albumId: 4,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Tim/Misc./puzzle.jpg",
        title: "puzzle.jpg",
        description: "Puzzle",
      },
      {
        userId: 6,
        albumId: 4,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Tim/Misc./freeway.jpg",
        title: "freeway.jpg",
        description: "Freeway",
      },
      {
        userId: 6,
        albumId: 4,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Tim/Misc./safeco.jpg",
        title: "safeco.jpg",
        description: "Safeco",
      },
      {
        userId: 6,
        albumId: 4,
        photoURL: "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Tim/Misc./friend_from_cave.jpg",
        title: "friend_from_cave.jpg",
        description: "Photo of a friend from a cave.",
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
    return queryInterface.bulkDelete('Photos', null, {});
  }
};
