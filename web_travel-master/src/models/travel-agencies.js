"use strict";
const dataTypes = require("sequelize/lib/dialects/postgres/data-types");
var DataTypes = require("../../node_modules/sequelize/lib/data-types");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const TravelAgency = sequelize.define("Travel_agency", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Các trường khác
    name_vi: DataTypes.STRING,
    name_en: DataTypes.STRING,
    license_number: DataTypes.STRING,
    web: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    email: DataTypes.STRING,
    address_agency: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  return TravelAgency;
};
