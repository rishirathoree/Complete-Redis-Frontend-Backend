'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      itemPrice : {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        comment: "original price of product"
      },
      price:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        comment: "price of product"
      },
      compareAtPrice:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        comment: "price of product for compare"
      },
      stock : {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "stock of product"
      },
      blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: "indicates wehave a country is blocked or not blocked"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};