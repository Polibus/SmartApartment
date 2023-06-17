const mongoose = require('mongoose');
const { database } = require('../config')

mongoose.connect(database, {})
    .then(() => {
        console.log('connected to MongoDB');

    })
    .catch((err) => {
        console.log('error connecting to MongoDB:', err);
    });
