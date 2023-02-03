import db from '../models/index';
const Sequelize = require('sequelize');

export const setOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        const { orders, shippingInfo, userId } = data;
        let order = {};
        let orderDetails = [];

        const amountItem = orders.reduce((total, item) => {
            return total + +item.quantity;
        }, 0);

        order = {
            orderUserId: userId ? userId : '',
            orderAmount: amountItem,
            orderShipName: shippingInfo.lastName,
            orderShipAddress1: shippingInfo.address,
            orderShipAddress2: '',
            orderDistrict: shippingInfo.district,
            orderProvince: shippingInfo.province,
            orderPhone: shippingInfo.phoneNumber,
            orderEmail: shippingInfo.email,
            orderShipped: 0,
            orderDate: Date.now,
            orderTrackingNumber: '',
        };

        const t = await db.sequelize.transaction();
        try {
            const result = await db.Order.create(order, { transaction: t });

            orderDetails = orders.map((item) => {
                return {
                    detailOrderId: result.id,
                    detailProductId: item.product.id,
                    detailName: item.product.name,
                    detailPrice: item.product.price,
                    detailQuantity: item.quantity,
                };
            });

            await db.OrderDetail.bulkCreate(orderDetails, { transaction: t });

            await t.commit();

            resolve(true);
        } catch (err) {
            await t.rollback();
            console.log(err);
            reject(false);
        }
    });
};
