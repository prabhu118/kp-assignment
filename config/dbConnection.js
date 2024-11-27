'use strict';

const { Sequelize } = require('sequelize')
const DB = require('./config').development;

// module.exports = (app) => {
    // try {
        const sequelizeCon = new Sequelize(DB.database, DB.username, DB.password, {
            host: DB.host,
            dialect: 'postgres',
            logging: false,
            pool: {
                max: 20,            // Increase max connections if you have high concurrency
                min: 0,             // Allow Sequelize to close idle connections
                acquire: 30000,     // Timeout for acquiring a connection
                idle: 10000         // Timeout before releasing an idle connection from pool
            }
        });

        sequelizeCon.authenticate()
            .then(() => {
                console.log('DB connected successfully')
                // app.emit('ready');
            }).catch(err => {
                console.log(err.message);
                process.exit(1);
            });
    
        module.exports = sequelizeCon
    // } catch(err) {
    //     console.log(err);
    // }
    
// }