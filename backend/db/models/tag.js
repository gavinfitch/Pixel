'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Photos' }
    },
    keyword: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsTo(models.Photo, { foreignKey: 'photoId' });
  };
  return Tag;
};