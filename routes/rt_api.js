const express = require('express');
const router  = express.Router();


// Load Controllers
const API = require('../controllers/ctrl_api');
const Site  = require('../controllers/ctrl_site');


// User Operations
router.get('/', API.interviewedLocation);
router.get('/:id', API.listInProvince);
router.post('/:id', API.showBundel);



















module.exports = router;
