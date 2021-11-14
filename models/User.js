'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Work }) {
      // define association here
      this.hasMany(Work, { foreignKey: 'userId', as: 'work' });
    }
  }
  User.init(
    {
      userType: {
        type: DataTypes.ENUM,
        values: ['user', 'author', 'company', 'admin'],
        defaultValue: 'user',
      },
      name: { type: DataTypes.CHAR, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      phoneNumber: DataTypes.CHAR,
      companyContact: DataTypes.CHAR,
      birthDate: DataTypes.DATE,
      gender: {
        type: DataTypes.ENUM,
        values: ['man', 'woman', 'none'],
        defaultValue: 'none',
      },
      authorName: DataTypes.CHAR,
      authorApprovedDate: DataTypes.DATE,
      authorDescription: DataTypes.CHAR,
      authorAvatar: DataTypes.STRING,
      companyName: DataTypes.CHAR,
      companyLicenseNumber: DataTypes.CHAR,
      companyApprovedDate: DataTypes.DATE,
      companyImageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        },
      },
    }
  );
  return User;
};
