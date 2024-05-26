"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Feedback", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING },
      id_tour: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "DetailTours", // Tên bảng chứa trường khóa chính
          key: "id", // Tên trường khóa chính trong bảng DetailTours
        },
      },
      rate: { type: Sequelize.INTEGER },
      day: { type: Sequelize.STRING },
      note: { type: Sequelize.STRING },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Feedback");
  },
};
