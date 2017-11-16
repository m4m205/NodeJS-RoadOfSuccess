const express = require('express');
const router  = express.Router();


// Load Controllers
const API = require('../controllers/ctrl_api');
const Site  = require('../controllers/ctrl_site');


// User Operations
router.get('/bundel/:id', API.showBundel);
router.get('/bundels/:lang', API.bundelsLocationAndName);
router.get('/:id/:lang', API.listInProvince);
router.get('/pages', API.listOfPages);
router.get('/settings', API.getSettings);

















module.exports = router;
