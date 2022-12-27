var express = require('express');
var router = express.Router();

const employeeController = require('../controller/users/employee.controller')
const jwtHelper = require('../helpers//authentication.helper')


router.post('/register', employeeController.register)
router.post('/login', employeeController.login)
// router.get('/get-all', jwtHelper.authenticate_user, employeeController.get_all_user)
// router.get('/get/:user_id', jwtHelper.authenticate_user, employeeController.get_user)

module.exports = router;
