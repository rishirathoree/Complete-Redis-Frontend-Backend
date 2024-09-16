'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('owners', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: "username"
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false,
        comment: "password"
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "first name"
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "last name"
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: "email"
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "phone number"
      },
      roles:{
        type: Sequelize.STRING,
        allowNull: false,
        comment: "roles"
      },
      permissions:{
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        comment: "permissions"
      },
      blocked:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull:false,
        comment: "is option blocked?"
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
    await queryInterface.dropTable('owners');
  }
};