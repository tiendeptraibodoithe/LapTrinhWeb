"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DetailTour extends Model {
    static associate(models) {
      this.belongsTo(models.Travel_agency, { foreignKey: "id_agency" });

      this.belongsToMany(models.TourDestination, {
        through: "DetailToursTourDestination",
        foreignKey: "DetailTourId",
      });
      this.hasMany(models.Feedback, { foreignKey: "detailTourId" });
    }
  }
  DetailTour.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      name_tour: DataTypes.STRING,
      date: DataTypes.DATE,
      time: DataTypes.STRING,
      origin_price: DataTypes.DOUBLE,
      price: DataTypes.DOUBLE,
      id_agency: {
        type: DataTypes.INTEGER,
        references: {
          model: "Travel_agencies", // Tên bảng chính xác
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      imageUrl: DataTypes.STRING,
      image_1: DataTypes.STRING,
      image_2: DataTypes.STRING,
      image_3: DataTypes.STRING,
      information_tour_1: DataTypes.STRING,
      information_tour_2: DataTypes.STRING,
      information_tour_3: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "DetailTour",
    }
  );
  return DetailTour;
};
