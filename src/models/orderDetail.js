'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrderDetail.init(
        {
            detailOrderId: DataTypes.INTEGER,
            detailProductId: DataTypes.INTEGER,
            detailName: DataTypes.STRING,
            detailPrice: DataTypes.FLOAT,
            detailQuantity: DataTypes.NUMBER,
        },
        {
            sequelize,
            modelName: 'OrderDetail',
        },
    );
    return OrderDetail;
};
