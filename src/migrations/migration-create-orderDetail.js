'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('OrderDetails', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            detailOrderId: {
                type: Sequelize.INTEGER,
            },
            detailProductId: {
                type: Sequelize.INTEGER,
            },
            detailName: {
                type: Sequelize.STRING,
            },
            detailPrice: {
                type: Sequelize.FLOAT,
            },
            detailQuantity: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('OrderDetails');
    },
};
