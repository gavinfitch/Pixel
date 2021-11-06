'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Albums' }
    },
    photoURL: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
  }, {});
  Photo.associate = function (models) {
    // associations can be defined here
    Photo.belongsTo(models.User, { foreignKey: 'userId' });
    Photo.belongsTo(models.Album, { foreignKey: 'albumId' });
    Photo.hasMany(models.Comment, { foreignKey: 'photoId' });
    Photo.hasMany(models.Tag, { foreignKey: 'photoId' });
    Photo.hasMany(models.Favorite, { foreignKey: 'photoId' });
  };
  return Photo;
};