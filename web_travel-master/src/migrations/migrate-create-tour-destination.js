"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TourDestinations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name_destination: { type: Sequelize.STRING },
      rate: { type: Sequelize.FLOAT },
      address: { type: Sequelize.STRING },
      Turn_Register: { type: Sequelize.INTEGER },
      image_1: { type: Sequelize.STRING },
      image_2: { type: Sequelize.STRING },
      image_3: { type: Sequelize.STRING },
      information_destination_1: { type: Sequelize.STRING },
      information_destination_2: { type: Sequelize.STRING },
      information_destination_3: { type: Sequelize.STRING },
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
    await queryInterface.dropTable("TourDestinations");
  },
};
