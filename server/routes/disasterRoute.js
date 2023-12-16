const express = require('express');
const disasterRoute = express.Router();

const emergency = require('../controllers/emergency')
const getDisasterDetail = require('../controllers/getDisasterDetail')

disasterRoute.post('/emergency',emergency)
disasterRoute.get('/',getDisasterDetail)

module.exports = disasterRoute;
