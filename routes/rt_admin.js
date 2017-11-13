const express = require('express');
const router  = express.Router();
const path       = require('path');

// Load Controllers
const Users = require('../controllers/ctrl_users');
const Pages = require('../controllers/ctrl_pages');
const Site  = require('../controllers/ctrl_site');

// for filemanager
// router.use('/filemanager', require('../node_modules/rich-filemanager/connectors/nodejs/filemanager')(path.normalize(`${__dirname}/public`)))

// User Operations
router.get('/logout', Users.doLogout);
router.get('/login',  Users.admLogin);
router.post('/login', Users.lValidate(), Users.doLogin);
router.get('/user/delete/:id', Users.remove);
router.get('/user',      Users.addForm);
router.post('/user',     Users.validateRegister, Users.add);
router.get('/user/:id',  Users.edtForm);
router.post('/user/:id', Users.editValidate, Users.edit);
router.get('/users',     Users.admList);
router.get('/media',     Users.showMedia);


// Setting
router.get('/setting', Site.admSetting);
router.post('/setting', Site.save);

// Dashboard
router.post('/bundel', Pages.makeBundel);
router.get('/bundel', Pages.viewBundel);
router.get('/', Pages.admDashboard);


module.exports = router;
