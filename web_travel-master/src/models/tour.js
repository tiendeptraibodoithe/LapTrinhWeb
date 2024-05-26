"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DetailToursTourDestination extends Model {
    static associate(models) {
      // Khai báo các mối quan hệ ở đây nếu cần
    }
  }
  DetailToursTourDestination.init(
    {
      DetailTourId: {
        type: DataTypes.INTEGER,
        references: {
          model: "detail_tours",
          key: "id",
        },
      },
      TourDestinationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "tour_destinations",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "DetailToursTourDestination",
    }
  );
  return DetailToursTourDestination;
};
