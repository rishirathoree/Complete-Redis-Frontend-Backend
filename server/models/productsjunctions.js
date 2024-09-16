'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productsjunctions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      productsjunctions.belongsTo(models.products, { foreignKey: 'productId', });
      productsjunctions.belongsTo(models.subcategories, { foreignKey:'subcategoryId', });
      productsjunctions.belongsTo(models.categories, { foreignKey: 'categoryId', });
      productsjunctions.belongsTo(models.breeds, { foreignKey: 'breedId', });
      productsjunctions.belongsTo(models.brands, { foreignKey: 'brandId', });
      productsjunctions.belongsTo(models.products, { foreignKey: 'productId', });
    }
  }
  productsjunctions.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    modelName: 'productsjunctions',
  });
  return productsjunctions;
};