const express = require('express');
const router  = express.Router();
// Load Controllers
const Users = require('../controllers/ctrl_users');
const Pages = require('../controllers/ctrl_pages');
const Site  = require('../controllers/ctrl_site');

// User Operations
router.get('/logout', Users.doLogout);
router.get('/login',  Users.admLogin);
router.post('/login', Users.lValidate(), Users.doLogin);

router.get('/user/delete/:id', Users.remove);
router.get('/user',      Users.addForm);
router.post('/user',     Users.validateRegister, Users.add);
router.get('/user/:id',  Users.edtForm);
router.post('/user/:id', Users.eValidate, Users.edit);
router.get('/users',     Users.admList);


// Setting
router.get('/setting', Site.admSetting);
router.post('/setting', Site.save);

// Dashboard
router.get('/', Pages.admDashboard);


module.exports = router;
