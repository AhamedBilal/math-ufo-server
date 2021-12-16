const Sequelize = require('sequelize');
const config = require('./app-config');

const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',

});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

