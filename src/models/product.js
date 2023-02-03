'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Product.init(
        {
            categoryId: DataTypes.INTEGER,
            name: DataTypes.STRING(255),
            price: DataTypes.NUMBER,
            content: DataTypes.STRING(255),
            discount: DataTypes.INTEGER,
            imageLink: DataTypes.STRING(255),
            imageList: DataTypes.STRING(255),
            view: DataTypes.INTEGER,
            vote: DataTypes.NUMBER,
        },
        {
            sequelize,
            modelName: 'Product',
        },
    );
    return Product;
};
