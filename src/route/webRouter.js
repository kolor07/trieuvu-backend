import express from 'express';

import * as userController from '../controller/userController';

let router = express.Router();

const webInitial = async (app) => {
    router.get('/', userController.getAllUser);
    router.get('/register', userController.getRegisterPage);
    router.get('/edit/:id', userController.getEditPage);
    router.get('/login', userController.getLoginPage);
    router.get('/profile/:id', userController.getProfile);
    router.post('/register-user', userController.postRegisterPage);
    router.post('/login-check', userController.postCheckLogin);
    router.put('/put-user', userController.putUser);
    router.post('/edit-user', userController.updateUser);
    router.get('/delete-user/:id', userController.deleteUser);
    router.post('/api/login', userController.postCheckLogin);

    app.use('/', router);
};

export default webInitial;
