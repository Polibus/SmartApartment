const UserModel = require('../../db/models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { secret } = require('../../config')
class UsersActions {

    async registerUser(req, res) {
        const email = req.body.email
        const password = bcrypt.hashSync(req.body.password, 10)
        const isAdmin = false
        const isActive = true
        try {
            const newUser = new UserModel({ email, password, isAdmin, isActive });
            await newUser.save();
            res.status(201).json(newUser)
        } catch (err) {
            return res.status(422).json({ isEmptyEmail: false })
        }
    }

    async loginUser(req, res) {

        try {
            const user = await UserModel.findOne({
                email: req.body.email
            })
            const match = bcrypt.compare(user.password, req.body.password)
            if (match) {
                if (user.isActive) {
                    const payload = {
                        email: user.email,
                        isAdmin: user.isAdmin,
                        isActive: user.isActive,
                        user: true
                    }
                    const token = jwt.sign(
                        payload, secret, { expiresIn: '60m' })
                    return res.status(200).json(token)
                } else {
                    return res.status(401).json({ user: true })
                }
            } else {
                return res.status(401).json({ user: false })
            }
        } catch (err) {
            return res.status(401).json({ user: false })
        }
    }
}

module.exports = new UsersActions();