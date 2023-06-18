const UserModel = require('../../db/models/userModel')
const bcrypt = require('bcrypt');
const { secret } = require('../../config')
const jwt = require('jsonwebtoken')
class UsersActions {

    async registrationUser(req, res) {
        const email = req.body.email
        let password = req.body.password
        const isAdmin = false
        const isActive = true
        try {
            if (email !== "" && password !== "") {
                password = bcrypt.hashSync(password, 10)
                const newUser = new UserModel({ email, password, isAdmin, isActive });
                await newUser.save();
                res.status(201).json(newUser)
            } else {
                return res.status(422).json({ isEmptyEmail: true })
            }

        } catch (err) {
            return res.status(422).json({ isEmptyEmail: false })
        }
    }

    async loginUser(req, res) {
        try {
            let loginEmail = req.body.email
            loginEmail = loginEmail.toLowerCase()
            const user = await UserModel.findOne({
                email: loginEmail
            })
            bcrypt.compare(req.body.password, user.password, function (err, resP) {
                if (err) {
                    console.log("err bcrypt")
                }
                if (resP) {
                    if (user.isActive) {
                        const payload = {
                            email: user.email,
                            isAdmin: user.isAdmin,
                            isActive: user.isActive,
                            user: true
                        }
                        const token = jwt.sign(payload, secret, { expiresIn: '60m' })
                        return res.status(200).json(token)
                    } else {
                        return res.status(401).json({ user: true })
                    }
                } else {
                    return res.status(401).json({ user: false })
                }
            });
        } catch (err) {
            return res.status(401).json({ user: false })
        }
    }
}

module.exports = new UsersActions();