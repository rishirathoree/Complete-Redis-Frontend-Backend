'use strict';
const {
  Model
} = require('sequelize');
const { TOP_PERMISSSIONS, TOP_ROLES } = require('../src/constants');
const { ApiError } = require('../src/lib/class.lib');
module.exports = (sequelize, DataTypes) => {
  class owners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  owners.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "username"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "password"
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "first name"
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "last name"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "email"
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "phone number"
    },
    roles: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "roles"
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      comment: "permissions"
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      comment: "indicates we have a country is blocked or not blocked",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'owners',
    hooks: {
      beforeValidate: (owner, options) => {
        if (options.fields.includes('permissions') && !owner.permissions.every(ownerPerm => TOP_PERMISSSIONS.includes(ownerPerm))) {
          throw new ApiError(400,"Invalid permissions values. Only values from permissions are allowed.");
        }
        if (options.fields.includes('roles') &&!TOP_ROLES.includes(owner.roles)) {
          throw new ApiError(400,"Invalid roles values. Only values from roles are allowed.");
        }
      },
    },

  });
  return owners;
};