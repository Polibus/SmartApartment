const Devices = require('../../db/models/devicesModel')

class DevicesActions {


    async getAllDevices(req, res) {

        const data = await Devices.find();
        res.status(200).json(data)

    }

    async getDevice(req, res) {
        const id = req.params.id;
        const device = await Devices.findOne({ _id: id })

        res.status(200).json(device)
    }

    async saveDevice(req, res) {

        const room = req.body.room
        const name = req.body.name
        const type = req.body.type
        const userEmail = req.body.userEmail
        const isActive = req.body.isActive

        try {
            const newDevice = new Devices({ room, name, type, userEmail, isActive });
            await newDevice.save();
            res.status(201).json(newDevice)
        } catch (err) {
            return res.status(422).json({ message: err.message })
        }
    }

    async updateDevice(req, res) {
        const id = req.params.id;

        const room = req.body.room
        const name = req.body.name
        const type = req.body.type
        const userEmail = req.body.userEmail
        const isActive = req.body.isActive

        const update = await Devices.findOne({ _id: id });
        update.room = room;
        update.name = name;
        update.type = type;
        update.userEmail = userEmail;
        update.isActive = isActive;

        await update.save();

        res.status(201).json(update)
    }

    async deleteDevice(req, res) {
        const id = req.params.id
        await Devices.deleteOne({ _id: id });

        res.sendStatus(204);
    }
}

module.exports = new DevicesActions();