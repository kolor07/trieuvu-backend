import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import authConfig from '../config/authConfig';

import db from '../models/index';
import * as refreshTokenService from '../services/refreshTokenService';

const salt = bcrypt.genSaltSync(10);

export let getRegisterPage = async () => {};

/**
 * Register a user
 * Returns true : the user is registered successfully ,
 *  false : the user is registered unsuccessfully
 *
 * @param {object} userData The user data input
 */
export let registerUser = async (userData) => {
    return new Promise(async (resolve, reject) => {
        let outPut = {};
        try {
            const isUserExist = await checkEmail(userData.email);
            console.log('>>>isUserExist.............', isUserExist);

            if (!userData.email) {
                outPut = { statusCode: 1, message: `email can not be empty` };
                resolve(outPut);
            }
            if (isUserExist) {
                // the email has already been registered
                console.log('This email has already been registered`');
                outPut = { statusCode: 1, message: `This email has been registered` };
                resolve(outPut);
            } else {
                console.log('>>> continue running.....');
                // hash password
                let hashPassWord = await hashPassword(userData.password);
                // register user
                const result = await db.User.create({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    password: hashPassWord,
                    address: userData.address,
                    gender: userData.gender === 1 ? true : false,
                    phoneNumber: userData.phoneNumber,
                });
                outPut = { statusCode: 0, message: `` };
                resolve(outPut);
            }
        } catch (error) {
            outPut = { statusCode: 9, message: `there is something wrong , let fucking check` };
            reject(outPut);
        }
    });
};

/**
 * get all user
 * Returns true : user exits , false : user does no exit
 */
export let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        let result = await db.User.findAll({ raw: true });
        console.log(result);
        if (result) {
            resolve(result);
        } else {
            reject({});
        }
    });
};

/**
 * get user by id
 * Returns true : user exits , false : user does no exit
 */
export let getUserById = async (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await db.User.findByPk(idInput, { raw: true });
            if (result) {
                resolve(result);
            } else {
                reject({});
            }
        } catch (error) {
            reject(error);
        }
    });
};

export let signIn = (email, password) => {
    return new Promise(async (resolve, reject) => {
        let userData = {};
        console.log('>>>signIn...');
        try {
            const user = await db.User.findOne({
                attributes: ['id', 'email', 'password', 'firstName', 'roleId', 'address', 'phoneNumber'],
                where: { email: email },
            });
            if (!user) {
                userData = { statusCode: 200, message: 'User not found' };
            } else {
                let isPwdExist = await bcrypt.compare(password, user.password);

                if (!isPwdExist) {
                    userData = { statusCode: 200, message: 'Invalid Password' };
                } else {
                    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: authConfig.jwtExpiration,
                    });

                    // insert  refreshToken into database based on userId
                    let refreshToken = await refreshTokenService.createToken(user.id);

                    userData = {
                        user: {
                            id: user.id,
                            email: user.email,
                            firstName: user.firstName,
                            address: user.address,
                            phoneNumber: user.phoneNumber,
                            role:
                                user.roleId === 'R1' ? 'ROLE_ADMIN' : user.roleId === 'R2' ? 'ROLE_MODE' : 'ROLE_USER',
                            accessToken: token,
                            refreshToken: refreshToken.token,
                        },
                        statusCode: 200,
                        message: '',
                    };
                }
            }
            resolve(userData);
        } catch (error) {
            userData = { statusCode: 200, message: error.message };
            reject(userData);
        }
    });
};

export let signUp = (userInput) => {
    return new Promise(async (resolve, reject) => {
        let userData = {};
        console.log('>>>signUp...');
        try {
            const user = await db.User.findOne({
                attributes: ['id'],
                where: { email: userInput.email },
            });
            console.log('user', user);
            if (user) {
                userData = { statusCode: 404, message: 'User not existed' };
            } else {
                let hashPassWord = await hashPassword(userInput.password);
                // register user
                const result = await db.User.create({
                    firstName: userInput.firstName,
                    lastName: userInput.lastName,
                    email: userInput.email,
                    password: hashPassWord,
                    address: userInput.address,
                    gender: userInput.gender === 1 ? true : false,
                    phoneNumber: userInput.phoneNumber,
                });
                console.log('register user', result.id);

                const token = jwt.sign({ id: result.id }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: authConfig.jwtExpiration,
                });
                console.log('jwt.sign...');

                // insert  refreshToken into database based on userId
                let refreshToken = await refreshTokenService.createToken(result.id);
                console.log('refreshToken...');

                userData = {
                    user: {
                        id: result.id,
                        email: result.email,
                        firstName: result.firstName,
                        role:
                            result.roleId === 'R1' ? 'ROLE_ADMIN' : result.roleId === 'R2' ? 'ROLE_MODE' : 'ROLE_USER',
                        accessToken: token,
                        refreshToken: refreshToken.token,
                    },
                    statusCode: 200,
                    message: '',
                };
                console.log('userdata...', userData);
            }

            resolve(userData);
        } catch (error) {
            console.log('>>>error....', error);
            userData = { statusCode: 501, message: error.message };
            reject(userData);
        }
    });
};
/**
 * check user login
 * Returns statusCode = 0 - login successfully
 * statusCode !0 login unsuccessfully
 */
export let CheckLogin = async (email, passwordInput) => {
    let createToken = await refreshTokenService.createToken('1');
    console.log('createToken', createToken);

    return new Promise(async (resolve, reject) => {
        let userData = {};
        try {
            console.log('Checking user', email, passwordInput);
            if (!email || !passwordInput) {
                userData = { data: {}, message: `your email does not exist , plz check again 11`, statusCode: 1 };
            } else {
                // check email
                let isEmailExist = await checkEmail(email);
                // email is not correct
                if (isEmailExist) {
                    // get user to check password
                    let userInfo = await db.User.findOne({
                        raw: true,
                        attributes: ['email', 'password', 'lastName', 'firstName'],
                        where: { email: email },
                    });
                    // user account does not exist
                    if (!userInfo) {
                        userData = { data: {}, message: `your email does not exist , plz check again`, statusCode: 1 };
                    } else {
                        // check passwordInput
                        let isPassExist = await bcrypt.compare(passwordInput, userInfo.password);

                        // password is not correct
                        if (!isPassExist) {
                            console.log("your password isn't correct");
                            userData = {
                                data: {},
                                message: `your password isn't correct , plz check again`,
                                statusCode: 2,
                            };
                        } else {
                            // login successfully

                            const token = await generateAccessToken({ firstName: userInfo.firstName });
                            console.log('>>>>>generate token', token);
                            userData = { accessToken: token, statusCode: 0 };
                        }
                    }
                } else {
                    // email does not exist
                    userData = {
                        data: {},
                        message: `your email does not exist , plz check again`,
                        statusCode: 1,
                    };
                }
            }

            resolve(userData);
        } catch (error) {
            userData = {
                data: {},
                message: `there is something wrong , let fucking check`,
                statusCode: 9,
            };
            reject(userData);
        }
    });
};

/**
 * update user by id
 * @param {object} data : user's data
 * Returns statusCode = 0 - update successfully
 * statusCode !0 update unsuccessfully
 */
export let UpdateUserById = async (data) => {
    let userData = {};
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findByPk(data.id, { raw: true });
            // const user = await db.User.findOne({
            //     where: { email: 'nguyen@gmail.com' },
            // });
            console.log('>>> user : findByPk->', user);
            if (!user) {
                console.log('>>> why u came here baby');
                userData = {
                    statusCode: 1,
                    message: `can not find user with id ${data.id}`,
                };
            } else {
                await db.User.update(
                    {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                        gender: data.gender,
                    },
                    {
                        where: {
                            id: data.id,
                        },
                    },
                );
                userData = {
                    statusCode: 0,
                    message: `update data successfully`,
                };
            }
            resolve(userData);
        } catch (error) {
            userData = {
                statusCode: 9,
                message: `there is something wrong , let fucking check`,
            };
            reject(userData);
        }
    });
};

/**
 * delete user by id
 * @param {integer} id : user's id
 * Returns statusCode = 0 - delete successfully
 * statusCode !0 delete unsuccessfully
 */
export let deleteUserById = async (id) => {
    let userData = {};
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({ where: { id: id } });

            userData = {
                statusCode: 0,
                message: `delete  user's ${id} successfully`,
            };

            resolve(userData);
        } catch (error) {
            userData = {
                statusCode: 9,
                message: `there is something wrong , let fucking check`,
            };
            reject(userData);
        }
    });
};

// private method
let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await bcrypt.hashSync(password, salt);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};

// private method
let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await db.User.findOne({ where: { email: email } });
            console.log('>>>>>check email ....`', email, result);

            if (result) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            console.log('>>> there are some errors in getEmail', error);

            reject(error);
        }
    });
};

let generateAccessToken = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            console.log('access token ', result);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};
