import jwt from 'jsonwebtoken';
import * as userService from '../services/userService';
import * as refreshTokenService from '../services/refreshTokenService';

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    console.log('result', email, password);

    const result = await userService.signIn(email, password);
    res.status(200).json({
        message: result.message,
        user: result.user,
    });
};

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    const result = await refreshTokenService.refreshToken(refreshToken);
    console.log('result......', result);

    switch (result.statusCode) {
        case 401: {
            res.status(403).json({
                message: result.message,
            });
            break;
        }
        case 501: {
            res.status(501).json({
                message: result.message,
            });
            break;
        }
        default: {
            res.status(200).json({
                data: result.data,
            });
            break;
        }
    }
};

export const signUp = async (req, res) => {
    const data = req.body;

    console.log('data', data);

    const result = await userService.signUp(data);
    switch (result.statusCode) {
        case 404: {
            res.status(404).json({
                message: result.message,
            });
            break;
        }
        case 500: {
            res.status(500).json({
                message: result.message,
            });
            break;
        }
        default: {
            res.status(200).json({
                message: result.message,
                user: result.user,
            });
            break;
        }
    }
};
