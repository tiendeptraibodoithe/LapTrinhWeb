"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("DetailTours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: { type: Sequelize.STRING },
      name_tour: {
        type: Sequelize.STRING,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      time: {
        type: Sequelize.STRING,
      },
      origin_price: {
        type: Sequelize.DOUBLE,
      },
      price: {
        type: Sequelize.DOUBLE,
      },
      id_agency: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Travel_agencies",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      imageUrl: { type: Sequelize.STRING },
      image_1: {
        type: Sequelize.STRING,
      },
      image_2: {
        type: Sequelize.STRING,
      },
      image_3: {
        type: Sequelize.STRING,
      },
      information_tour_1: {
        type: Sequelize.STRING,
      },
      information_tour_2: {
        type: Sequelize.STRING,
      },
      information_tour_3: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("DetailTours");
  },
};
