'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order.init(
        {
            orderUserId: DataTypes.INTEGER,
            orderAmount: DataTypes.FLOAT,
            orderShipName: DataTypes.STRING,
            orderShipAddress1: DataTypes.STRING,
            discount: DataTypes.FLOAT,
            orderDistrict: DataTypes.STRING,
            orderProvince: DataTypes.STRING,
            orderPhone: DataTypes.STRING,
            orderEmail: DataTypes.STRING,
            orderShipped: DataTypes.BOOLEAN,
            orderDate: DataTypes.DATE,
            orderTrackingNumber: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Order',
        },
    );
    return Order;
};
