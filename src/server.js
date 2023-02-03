import express from 'express';
import cors from 'cors';
import apiInitial from './route/api';
import webInitial from './route/webRouter';
import configViewEngine from './config/viewEngineConfig';

require('dotenv').config();

const app = express();
const port = process.env.PORTz || 8080;
console.log(port);
// parse
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
    // r// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

configViewEngine(app);

// initialize
apiInitial(app);
webInitial(app);

app.use((req, res) => {
    return res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
