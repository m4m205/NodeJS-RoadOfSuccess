// const User = require('../models/mdl_user');
const {check, validationResult} = require('express-validator/check');


const admDashboard = ( req, res ) => {
    if( req.userAuth('/admin/login') ) return;
    res.render('admin/dashboard');
};
const viewBundel = (req , res ) => {
    if( req.userAuth('/admin/login') ) return;
    res.render('admin/bundel');
}

const makeBundel = (req , res ) => {
    if( req.userAuth('/admin/login') ) return;
    console.log(req.body);
}


module.exports = {
    admDashboard: admDashboard,
    viewBundel: viewBundel,
    makeBundel: makeBundel
};
