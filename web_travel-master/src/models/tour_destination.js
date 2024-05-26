"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TourDestination extends Model {
    static associate(models) {
      // this.belongsToMany(models.DetailTours, {
      //   through: "DetailToursTourDestinations",
      //   foreignKey: "TourDestinationId",
      // });
    }
  }
  TourDestination.init(
    {
      id_tour_destination: DataTypes.INTEGER,
      name_destination: DataTypes.STRING,
      rate: DataTypes.FLOAT,
      address: DataTypes.STRING,
      Turn_Register: DataTypes.INTEGER,
      image_1: DataTypes.STRING,
      image_2: DataTypes.STRING,
      image_3: DataTypes.STRING,
      information_destination_1: DataTypes.STRING,
      information_destination_2: DataTypes.STRING,
      information_destination_3: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TourDestination",
    }
  );
  return TourDestination;
};
