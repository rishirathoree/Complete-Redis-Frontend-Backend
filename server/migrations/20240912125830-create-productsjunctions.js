'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productsjunctions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: 'products',
          key: 'id',
        },
        allowNull:true,
        onDelete: 'CASCADE'
      },
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: 'categories',
          key: 'id',
        },
        allowNull:true,
        onDelete: 'CASCADE'
      },
      subcategoryId: {
        type: Sequelize.UUID,
        references: {
          model:'subcategories',
          key: 'id',
        },
        allowNull:true,
        onDelete: 'CASCADE'
      },
      brandId: {
        type: Sequelize.UUID,
        references: {
          model: 'brands',
          key: 'id',
        },
        allowNull:true,
        onDelete: 'CASCADE'
      },
      breedId: {
        type: Sequelize.UUID,
        references: {
          model: 'breeds',
          key: 'id',
        },
        allowNull: true,
        onDelete: 'CASCADE'
      },
      petId: {
        type: Sequelize.UUID,
        references: {
          model: 'pets',
          key: 'id',
        },
        allowNull: true,
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('productsjunctions');
  }
};