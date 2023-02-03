import jwt from 'jsonwebtoken';
import * as userService from '../services/userService';

export const getRegisterPage = async (req, res) => {
    console.log('getRegisterPage is being called');
    res.render('user-register.ejs', { dataInput: {}, errorMessage: '' });
};

export const getEditPage = async (req, res, next) => {
    const userId = req.params.id;
    console.log('getRegisterPage is being called', userId);
    const user = await userService.getUserById(userId);
    if (user) {
        res.render('user-edit.ejs', { dataInput: user, errorMessage: '' });
    } else {
        console.log('what the fuck');
        next();
    }
};
export let getProfile = async (req, res) => {
    const userId = req.params.id;
    const result = await userService.getUserById(userId);
    res.render('profile.ejs', { userInfo: result });
};

export let getAllUser = async (req, res) => {
    try {
        const result = await userService.getAllUser();

        console.log('>>>result...', result);
        res.render('listUser.ejs', { users: result });
    } catch (err) {
        next();
    }
};

export let getLoginPage = async (req, res) => {
    res.render('login.ejs');
};

export let postCheckLogin = async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.CheckLogin(email, password);

    res.status(200).json(result);
};

let authenToken = (req, res, next) => {
    const authenToken = req.headers['authorization'];
    const token = authenToken.split(' ')[1];
    if (token) res.sendStatus(401).json(token);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data) => {
        res.sendStatus(403).json(token);
    });
};

export let postRegisterPage = async (req, res, next) => {
    const user = req.body;
    console.log('request body ->', user);
    const result = await userService.registerUser(user);

    // execute next process bases on th status code
    console.log(result.statusCode);
    // register successfully
    if (result.statusCode === 0) {
        res.status(200).json(user);
    } else {
        res.status(401).json(user);
    }
    // // email has already existed
    // else if (result.statusCode === 1) {
    //     const dataInput = req.body;
    //     res.render('user-register.ejs', { dataInput: user, errorMessage: result.message });
    // }
    // // there is something wrong
    // else {
    //     next();
    // }
};

export let putUser = async (req, res) => {
    try {
        console.log('>>> im in putUser');
        const userInput = req.body;
        const result = await userService.UpdateUserById(userInput);
        console.log('>>> fucking result put->', result);

        if (result.statusCode) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(404).json(error);
    }
};

export let updateUser = async (req, res) => {
    try {
        console.log('>>> im in postUpdateUser');
        const userInput = req.body;
        const result = await userService.UpdateUserById(userInput);
        console.log('>>> fucking result edit ->', result);

        if (result.statusCode === 0) {
            // redirect to page detail user
            res.redirect(`/profile/${userInput.id}`);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(404).json(error);
    }
};

export let deleteUser = async (req, res) => {
    try {
        console.log('>>> im in delete');
        const userId = req.params.id;
        const result = await userService.deleteUserById(userId);
        console.log('>>> fucking result delete ->', result);

        if (result.statusCode === 0) {
            // redirect to page detail user
            res.redirect('/');
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(404).json(error);
    }
};
