require('dotenv').config();

module.exports = {
    port: process.env.Port,
    database: process.env.DATABASE,
    secret: process.env.SECRET
};