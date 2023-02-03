import db from '../models/index';

export const setOrderDetail = (orderDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = [...orderDetails];
            // data.push(orderDetails);
            // data.push(orderDetails);
            console.log('data', data);
            const result = await db.OrderDetail.bulkCreate(data);
            resolve(result);
        } catch (err) {
            console.log(err.message);
            reject({});
        }
    });
};
