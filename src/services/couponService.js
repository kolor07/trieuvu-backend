import db from '../models/index';

export const getDiscount = (coupon) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Coupon.findOne({
                where: { coupon: coupon },
                attributes: ['discount'],
            });

            resolve({ discount: result?.discount });
        } catch (error) {
            console.log(error);
            reject({});
        }
    });
};
