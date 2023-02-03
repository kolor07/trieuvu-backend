import Sequelize from 'sequelize';

// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize('basic', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
});
