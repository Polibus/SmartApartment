const express = require('express');
const router = express.Router();

const deviceAction = require('../actions/api/devicesActions');
const userAction = require('../actions/api/usersActions');
const adminAction = require('../actions/api/adminActions')

router.post('/register', userAction.registerUser)
router.post('/login', userAction.loginUser)
router.get('/devices', deviceAction.getAllDevices)
router.get('/devices/:id', deviceAction.getDevice)
router.post('/devices', deviceAction.saveDevice)
router.put('/devices/:id', deviceAction.updateDevice)
router.delete('/devices/:id', deviceAction.deleteDevice)

router.get('/admin', adminAction.getAllUsers)
router.get('/admin/:id', adminAction.getUser)
router.put('/admin/:id', adminAction.updateUser)
router.delete('/admin/:id', adminAction.deleteUser)


module.exports = router;