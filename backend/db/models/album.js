'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
  }, {});
  Album.associate = function (models) {
    // associations can be defined here
    Album.belongsTo(models.User, { foreignKey: 'userId' });
    Album.hasMany(models.Photo, { foreignKey: 'albumId', onDelete: 'CASCADE', hooks: true });
  };
  return Album;
};