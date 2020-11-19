'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {through: 'Cart'})
      // Product.hasMany(models.Cart, {foreignKey: 'ProductId'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: 'name is a required field'
        },
        notNull: {
          args: true,
          message: 'name is a required field'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: 'image_url is a required field'
        },
        notNull: {
          args: true,
          message: 'image_url is a required field'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: 'price is a required field'
        },
        notNull: {
          args: true,
          message: 'price is a required field'
        },
        min: 0
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: 'stock is a required field'
        },
        notNull: {
          args: true,
          message: 'stock is a required field'
        },
        min: 0
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};