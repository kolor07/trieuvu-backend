import jwt from 'jsonwebtoken';

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: 'Unauthorized! Access Token was expired!' });
    }
    return res.status(401).send({ message: 'Unauthorized!' });
};

export const verifyToken = (req, res, next) => {
    console.log('>>>verifyToken....', req.headers);

    const headerToken = req.headers['authorization'];
    console.log('headerToken....', headerToken);
    if (!headerToken) {
        res.status(403).send({ message: 'No token provided!' });
    }
    const token = headerToken.split(' ')[1];
    console.log('token...', token);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return catchError(err, res);
        res.id = decoded.id;
        next();
    });
};
