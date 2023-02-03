import * as orderService from '../services/orderService';
import * as orderDetailService from '../services/orderDetailService';

export const setOrder = async (req, res, next) => {
    // const result = await orderService.setOrder(req.body).then(orderDetailService.setOrderDetail(req.body));

    console.log('order...', req.body);
    const result = await orderService.setOrder(req.body);

    result ? res.status(200).json(result) : res.status(501).json(result);
};
