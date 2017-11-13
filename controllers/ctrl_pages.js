const bundel = require('../models/mdl_bundel');
const {check, validationResult} = require('express-validator/check');


const admDashboard = ( req, res ) => {
    if( req.userAuth('/admin/login') ) return;
    res.render('admin/dashboard');
}
const viewBundel = (req , res ) => {
    if( req.userAuth('/admin/login') ) return;
    res.render('admin/bundel');
}

const makeBundel = (req , res ) => {
    if( req.userAuth('/admin/login') ) return;

    let newBundel = new bundel({
      name:         req.body.bundelName,
      bundelEditor: req.body.bundelEditor ,
      publish_date: req.body.publishDate,
      frontEndDesc: req.body.frontEndDesc
    });

    newBundel.save().then(newBundel=>{


    })
    .catch(err=>{
      res.end('You have error in making bundel!!!')
    })
}





module.exports = {
    admDashboard: admDashboard,
    viewBundel: viewBundel,
    makeBundel: makeBundel,
};
