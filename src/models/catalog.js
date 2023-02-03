'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Catalog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Catalog.init(
        {
            name: DataTypes.STRING,
            parentId: DataTypes.INTEGER,
            sortOrder: DataTypes.INTEGER(4),
        },
        {
            sequelize,
            modelName: 'Catalog',
        },
    );
    return Catalog;
};
