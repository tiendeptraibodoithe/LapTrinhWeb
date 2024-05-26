"use strict";
const dataTypes = require("sequelize/lib/dialects/postgres/data-types");
var DataTypes = require("../../node_modules/sequelize/lib/data-types");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      permission: DataTypes.TINYINT,
      state: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
