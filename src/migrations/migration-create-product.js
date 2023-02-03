'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            price: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            discount: {
                type: Sequelize.INTEGER,
            },
            imageLink: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            imageList: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            view: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            vote: {
                type: Sequelize.DOUBLE,
                allowNull: false,
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
        await queryInterface.dropTable('Products');
    },
};
