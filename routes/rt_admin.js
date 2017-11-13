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
router.post('/user/:id', Users.editValidate, Users.edit);
router.get('/users',     Users.admList);


// Setting
router.get('/setting', Site.admSetting);
router.post('/setting', Site.save);

// Dashboard
router.post('/bundel', Pages.makeBundel);
router.get('/bundel', Pages.viewBundel);
router.get('/', Pages.admDashboard);

//Media manager Routes
router.get('/bundel/files', Pages.showImage);
router.post('/bundel/delete_file', Pages.deleteImage)

//Media display
router.get('/gallery', Pages.displayMedia)


module.exports = router;
