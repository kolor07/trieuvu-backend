'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            orderUserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            orderAmount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            orderShipName: {
                type: Sequelize.STRING,
            },
            orderShipAddress1: {
                type: Sequelize.STRING,
            },
            discount: {
                type: Sequelize.FLOAT,
            },
            orderDistrict: {
                type: Sequelize.STRING,
            },
            orderProvince: {
                type: Sequelize.STRING,
            },
            orderPhone: {
                type: Sequelize.STRING,
            },
            orderEmail: {
                type: Sequelize.STRING,
            },

            orderShipped: {
                type: Sequelize.BOOLEAN,
            },

            orderDate: {
                type: Sequelize.DATE,
            },

            orderTrackingNumber: {
                type: Sequelize.STRING,
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Orders');
    },
};
