"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      // Sửa lại quan hệ với bảng DetailTour
      this.belongsTo(models.DetailTour, { foreignKey: "id_tour", as: "tour" });
    }
  }
  Feedback.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      id_tour: DataTypes.INTEGER,
      rate: DataTypes.INTEGER,
      day: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );
  return Feedback;
};
