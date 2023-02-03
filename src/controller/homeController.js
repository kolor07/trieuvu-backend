import * as dbConnection from '../config/dbConnection';
import db from '../models/index.js';

export let getHomePage = async (req, res) => {
    try {
        // const userData = await db.User.findAll();

        console.log('user data ->');

        // await dbConnection.sequelize.authenticate();
        res.status(200).send(JSON.stringify('data'));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        // dbConnection.sequelize.close();
    }
};
