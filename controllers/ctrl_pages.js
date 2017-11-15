const bundel = require('../models/mdl_bundel');
const {check, validationResult} = require('express-validator/check');

var fs = require('fs');


// const filemanager = require ('../filemanager.config.json')

const admDashboard = ( req, res ) => {
    if( req.userAuth('/admin/login') ) return;
    res.render('admin/dashboard');
};

// const viewBundel = (req , res ) => {
//     if( req.userAuth('/admin/login') ) return;
//     var title = "Plugin Imagebrowser ckeditor for nodejs"
//     res.render('admin/bundel', { result: 'result' })
// }

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

const viewBundel = (req , res ) => {
    if( req.userAuth('/admin/login') ) return;
    var title = "Plugin Imagebrowser ckeditor for nodejs"
    res.render('admin/bundel', { result: 'result' })
}


const makeBundel = (req , res ) => {
    if( req.userAuth('/admin/login') ) return;

    let newBundel = new bundel({
      name:         req.body.bundelName,
      bundelEditor: req.body.bundelEditor ,
      publish_date: req.body.publishDate,
      frontEndDesc: req.body.frontEndDesc,
      province:     req.body.province,
      language:     req.body.language
    });

    newBundel.save().then(newBundel=>{
        res.redirect('/admin/bundels')
    })
    .catch(err=>{
      res.end('You have error in making bundel!!!')
    })
}

// show Media
const showMedia = (req ,res)=>{
    if( req.userAuth('/admin/login') ) return;
    res.render('admin/media');
}

// bundle display
const bundles = (req ,res)=>{
    if( req.userAuth('/admin/login') ) return;
    res.render('admin/bundleDisplay');
}



module.exports = {
    admDashboard: admDashboard,
    viewBundel: viewBundel,
    makeBundel: makeBundel,
    showImage:showImage,
    deleteImage:deleteImage,
    showMedia:showMedia,
    bundles: bundles
};
