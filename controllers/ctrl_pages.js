// const User = require('../models/mdl_user');
const {check, validationResult} = require('express-validator/check');
var fs = require('fs');


const admDashboard = ( req, res ) => {
    if( req.userAuth('/admin/login') ) return;
    res.render('admin/dashboard');
};

const viewBundel = (req , res ) => {
    if( req.userAuth('/admin/login') ) return;
    var title = "Plugin Imagebrowser ckeditor for nodejs"
    res.render('admin/bundel', { result: 'result' })
}

//show all the images in upload to json
const showImage = (req , res ) => {
    const images = fs.readdirSync('public/upload')
    var sorted = []
    for (let item of images){
        if(item.split('.').pop() === 'png'
        || item.split('.').pop() === 'jpg'
        || item.split('.').pop() === 'jpeg'
        || item.split('.').pop() === 'svg'){
            var abc = {
                  "image" : "/upload/"+item,
                  "folder" : '/'
            }
            sorted.push(abc)
        }
    }
    res.send(sorted);
}

//To delete all the images
const deleteImage = (req , res, next ) => {
  var url_del = 'public' + req.body.url_del
  console.log(url_del)
  if(fs.existsSync(url_del)){
    fs.unlinkSync(url_del)
  }
  res.redirect('back');
}

//Diaplay Media

const displayMedia = (req,res) =>{
  res.render('admin/media');
}


const makeBundel = (req , res ) => {
    if( req.userAuth('/admin/login') ) return;
    console.log(req.body);
}


module.exports = {
    admDashboard: admDashboard,
    viewBundel: viewBundel,
    makeBundel: makeBundel,
    showImage:showImage,
    deleteImage:deleteImage,
    displayMedia: displayMedia
};
