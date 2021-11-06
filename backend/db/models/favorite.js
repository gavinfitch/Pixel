'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Photos' }
    }
  }, {});
  Favorite.associate = function (models) {
    // associations can be defined here
    Favorite.belongsTo(models.User, { foreignKey: 'userId' });
    Favorite.belongsTo(models.Photo, { foreignKey: 'photoId' });
  };
  return Favorite;
};