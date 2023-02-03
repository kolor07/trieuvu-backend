import * as couponService from '../services/couponService';

export const getDiscount = async (req, res) => {
    const { coupon } = req.params;

    console.log('coupon', coupon);

    const result = await couponService.getDiscount(coupon);
    result ? res.status(200).json(result) : res.status(501).json(result);
};
