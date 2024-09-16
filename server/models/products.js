'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsToMany(models.subcategories, { through: models.productsjunctions, foreignKey: 'productId', });
      products.belongsToMany(models.categories, { through: models.productsjunctions, foreignKey: 'productId', });
      products.belongsToMany(models.breeds, { through: models.productsjunctions, foreignKey: 'productId', });
      products.belongsToMany(models.brands, { through: models.productsjunctions, foreignKey: 'productId', });
      products.belongsToMany(models.pets, { through: models.productsjunctions, foreignKey: 'productId', });
      products.hasMany(models.productimages, { foreignKey: "productId",allowNull:false })
      products.hasMany(models.productoptions, { foreignKey: "productId",allowNull:false })
    }
  }
  products.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    itemPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: "Original price of product",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: "Current price of product",
    },
    compareAtPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: "Comparison price of product",
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Available stock of product",
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      comment: "Indicates if the product is blocked",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};