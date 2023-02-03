import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import authConfig from '../config/authConfig';

import db from '../models/index';

export let createToken = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const expiredAt = new Date();

            expiredAt.setSeconds(expiredAt.getSeconds() + authConfig.jwtRefreshExpiration);
            console.log('expiredAt', expiredAt);
            const _token = uuidv4();
            const refreshToken = await db.RefreshToken.create({
                token: _token,
                userId: userId,
                expiryDate: expiredAt.getTime(),
            });
            resolve(refreshToken);
        } catch (error) {
            reject(error);
        }
    });
};

export let verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
};

export let refreshToken = (requestToken) => {
    return new Promise(async (resolve, reject) => {
        let returnValue = {};
        try {
            console.log('refreshToken...');

            if (!requestToken) {
                returnValue = { status: 403, message: 'Refresh Token is required!' };
            }

            let refreshToken = await db.RefreshToken.findOne({ where: { token: requestToken } });

            if (!refreshToken) {
                returnValue = { status: 403, message: 'Refresh token is not in database!' };
            }
            // token was expired
            if (verifyExpiration(refreshToken)) {
                await db.RefreshToken.destroy({ where: { id: refreshToken.id } });

                returnValue = { status: 403, message: 'Refresh token was expired. Please make a new sign in request!' };
            }

            let newAccessToken = jwt.sign({ id: refreshToken.userId }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: authConfig.jwtExpiration,
            });
            returnValue = {
                status: 200,
                data: {
                    accessToken: newAccessToken,
                    refreshToken: refreshToken.token,
                },
            };
            console.log('returnValue...', returnValue);

            resolve(returnValue);
        } catch (error) {
            returnValue = { status: 501, message: error.message };
            reject(returnValue);
        }
    });
};
