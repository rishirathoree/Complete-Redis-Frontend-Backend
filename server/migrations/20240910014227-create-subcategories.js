'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subcategories', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      categoryId:{
        type: Sequelize.UUID,
        references: {
          model: 'categories',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      image:{
        type: Sequelize.STRING,
        allowNull: false,
        comment: "brands's image url"
      },
      blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull:false,
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
    await queryInterface.dropTable('subcategories');
  }
};