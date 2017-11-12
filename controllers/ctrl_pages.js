// const User = require('../models/mdl_user');
const {check, validationResult} = require('express-validator/check');


const admDashboard = ( req, res ) => {
    if( req.userAuth('/admin/login') ) return;
    res.render('admin/dashboard');
};

module.exports = {
    admDashboard: admDashboard
};
