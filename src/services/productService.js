import db from '../models/index';
export const getProductNewArrival = async (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let perPage = +process.env.PERPAGETAB;

            const result = await db.Product.findAndCountAll({
                raw: true,
                order: [
                    ['createdAt', 'DESC'],
                    ['id', 'DESC'],
                ],
                offset: perPage * page - perPage,
                limit: perPage,
            });

            resolve(result);
        } catch (err) {
            console.log('>>> error', err);
            reject(err);
        }
    });
};
export const getProductBestSale = async (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let perPage = +process.env.PERPAGETAB;

            const result = await db.Product.findAndCountAll({
                // where: { outOfStock: true },
                raw: true,
                order: [
                    ['discount', 'DESC'],
                    ['createdAt', 'DESC'],
                    ['id', 'DESC'],
                ],
                offset: perPage * page - perPage,
                limit: perPage,
            });

            resolve(result);
        } catch (err) {
            console.log('>>> error', err);
            reject(err);
        }
    });
};

export const getProductBestVote = async (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let perPage = +process.env.PERPAGETAB;

            const result = await db.Product.findAndCountAll({
                // where: { outOfStock: true },
                raw: true,
                order: [
                    ['vote', 'DESC'],
                    ['createdAt', 'DESC'],
                    ['id', 'DESC'],
                ],
                offset: perPage * page - perPage,
                limit: perPage,
            });

            resolve(result);
        } catch (err) {
            console.log('>>> error', err);
            reject(err);
        }
    });
};

export const getProductByCategoryId = async (categoryId, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let perPage = +process.env.PERPAGEALL;

            const result = await db.Product.findAndCountAll({
                // where: { outOfStock: false, categoryId: categoryId },
                where: { categoryId: categoryId },
                raw: true,
                order: [
                    ['createdAt', 'DESC'],
                    ['id', 'DESC'],
                ],
                offset: perPage * page - perPage,
                limit: perPage,
            });
            console.log(result);
            resolve(result);
        } catch (err) {
            console.log('>>> error', err);
            reject(err);
        }
    });
};

export const getProductById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Product.findByPk(id);
            console.log('result', result);
            resolve(result);
        } catch (err) {
            reject(err.message);
        }
    });
};

export const getProductByNames = (searchInput, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('searchInput', searchInput, page);

            const { Op } = require('sequelize');
            let perPage = +page !== 0 ? +process.env.PERPAGEALL : 1;

            const result = await db.Product.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `${searchInput}%`,
                    },
                },
                // raw: true,
                order: [
                    ['createdAt', 'DESC'],
                    ['id', 'DESC'],
                ],
                offset: perPage * page - perPage,
                limit: perPage,
            });
            console.log('result', result);
            resolve(result);
        } catch (err) {
            reject(err.message);
        }
    });
};
