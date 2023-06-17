const mongoose = require("mongoose");

const DevicesSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    isActive: {
        type: String,

    }
});


const Devices = mongoose.model('Devices', DevicesSchema);

module.exports = Devices