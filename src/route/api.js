import express from 'express';
import jwt from 'jsonwebtoken';

import * as homeController from '../controller/homeController';
import * as userController from '../controller/userController';
import * as productController from '../controller/productController';
import * as authController from '../controller/authController';
import * as catalogController from '../controller/catalogController';
import * as orderController from '../controller/orderController';
import * as couponController from '../controller/couponController';

import { verifyToken } from '../middlewares/authJwt';
let router = express.Router();

const apiInitial = async (app) => {
    console.log('call from API');

    router.get('/', homeController.getHomePage);
    router.get('/v1/product/newarrival/:page', productController.getProductNewArrival);
    router.get('/v1/auth/product/newarrival/:page', verifyToken, productController.getProductNewArrival);
    router.get('/v1/product/bestsale/:page', productController.getProductBestSale);
    router.get('/v1/auth/product/bestsale/:page', verifyToken, productController.getProductBestSale);
    router.get('/v1/product/bestvote/:page', productController.getProductBestVote);
    router.get('/v1/auth/product/bestvote/:page', verifyToken, productController.getProductBestVote);

    router.get('/v1/auth/category/:id', verifyToken, catalogController.getCatalogById);
    router.get('/v1/category/:id', catalogController.getCatalogById);

    router.get('/v1/product/categoryId/:categoryId/page/:page', productController.getProductByCategoryId);
    router.get(
        '/v1/auth/product/categoryId/:categoryId/page/:page',
        verifyToken,
        productController.getProductByCategoryId,
    );

    router.get('/v1/product-detail/:id', productController.getProductById);
    router.get('/v1/search/:data/page/:page', productController.getProductsByName);
    router.get('/v1/coupon/:coupon', couponController.getDiscount);

    router.post('/v1/login', userController.postCheckLogin);
    router.post('/v1/register', userController.postRegisterPage);
    router.post('/v1/auth/signin', authController.signIn);
    router.post('/v1/auth/signup', authController.signUp);
    router.post('/v1/auth/refreshtoken', authController.refreshToken);
    router.post('/v1/order', orderController.setOrder);

    app.use('/api/', router);
};

export default apiInitial;
