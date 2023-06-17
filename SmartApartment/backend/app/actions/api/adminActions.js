const UserModel = require('../../db/models/userModel')

class AdminActions {

    async getAllUsers(req, res) {
        const data = await UserModel.find();
        res.status(200).json(data)

    }

    async getUser(req, res) {
        const id = req.params.id;
        const device = await UserModel.findOne({ _id: id })

        res.status(200).json(device)
    }

    async updateUser(req, res) {
        const id = req.params.id;
        const email = req.body.email
        const password = req.body.password
        const isAdmin = req.body.isAdmin
        const isActive = req.body.isActive

        const update = await UserModel.findOne({ _id: id });
        update.email = email;
        update.password = password;
        update.isAdmin = isAdmin;
        update.isActive = isActive;

        await update.save();

        res.status(201).json(update)
    }

    async deleteUser(req, res) {
        const id = req.params.id
        await UserModel.deleteOne({ _id: id });

        res.sendStatus(204);
    }
}

module.exports = new AdminActions();