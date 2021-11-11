'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    photoURL: {
      type: DataTypes.TEXT,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] },
        },
        loginUser: {
          attributes: {},
        },
      },
    });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Album, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
    User.hasMany(models.Photo, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
    User.hasMany(models.Comment, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
    User.hasMany(models.Favorite, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
  };

  User.prototype.toSafeObject = function () { // remember, this cannot be an arrow function
    const { id, username, firstName, lastName, email, photoURL } = this; // context will be the User instance
    return { id, username, firstName, lastName, email, photoURL };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, firstName, lastName, email, photoURL, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      photoURL,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};