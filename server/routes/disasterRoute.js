const express = require('express')
const disasterRoute = express.Router()

const emergency = require('../controllers/emergency')
const getDisasterDetail = require('../controllers/getDisasterDetail')
const verifyUser = require('../controllers/auth')

disasterRoute.post('/emergency',emergency)
disasterRoute.get('/',getDisasterDetail)
disasterRoute.post('/auth',verifyUser)

module.exports = disasterRoute
