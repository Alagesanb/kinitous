var express = require('express');

var router = express.Router();

const userControl = require('../controller/user_control')


router.post('/adduser',userControl.AddNewUser)
router.post('/login',userControl.Login)
module.exports = router