'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class breeds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      breeds.belongsTo(models.pets, { foreignKey: "petId", allowNull: true, onDelete: "CASCADE", onUpdate: "CASCADE" });
      breeds.belongsToMany(models.products, { through: models.productsjunctions, foreignKey: "breedId" });
    }
  }
  breeds.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "breed's image url"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "breed description"
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
    modelName: 'breeds',
  });
  return breeds;
};