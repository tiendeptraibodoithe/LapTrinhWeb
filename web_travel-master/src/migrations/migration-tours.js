"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("DetailToursTourDestinations", {
      DetailTourId: {
        type: Sequelize.INTEGER,
        references: {
          model: "DetailTours",
          key: "id",
        },
        allowNull: false,
      },
      TourDestinationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "TourDestinations",
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("DetailToursTourDestinations");
  },
};
