const bundel = require('../models/mdl_bundel');
const makepage  = require('../models/mdl_page');
const {check, validationResult} = require('express-validator/check');

var fs = require('fs');


// const filemanager = require ('../filemanager.config.json')

const admDashboard = ( req, res ) => {
    if( req.userAuth('/admin/login') ) return;
    res.render('admin/dashboard');
};

// Validation for adding pages
var validatePage = () => {
    return [
            check('language', 'Please enter the language.').not().isEmpty(),
            check('titleName', 'Please enter the title.').not().isEmpty(),
            check('slugName', 'Please enter the slug').not().isEmpty(),
            check('pageEditor', 'Your some value in the page editor.').not().isEmpty()
        ];
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

//make Page and save it into the database
const makePages = (req, res) =>{
  if( req.userAuth('/admin/login') ) return;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let data = {
        errors: errors.array()
    };
    res.render('admin/addPages', data)
  }
  else{

    let newPage = new makepage({
      language : req.body.language,
      titleName : req.body.titleName,
      slugName : req.body.slugName,
      pageEditor : req.body.pageEditor
    });
    newPage.save().then(newPagel =>{
      console.log(newPagel);
      req.setFlash('success', [{'msg': 'Your information has been submitted successfully.'}]);
      res.redirect('/admin/dynamicPage')
    })
    .catch(err =>{
      res.end('You have error in making the page')
    })

  }

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


const showPages = (req ,res)=>{
    if( req.userAuth('/admin/login') ) return;
    res.render('admin/pages');
}

const addDynamicPages = (req, res)=>{
  if( req.userAuth('/admin/login') ) return;
  res.render('admin/addPages', {success: req.getFlash('success')})
}

module.exports = {
    admDashboard: admDashboard,
    viewBundel: viewBundel,
    makeBundel: makeBundel,
    showImage:showImage,
    deleteImage:deleteImage,
    showMedia:showMedia,
    bundles: bundles,
    showPages:showPages,
    addDynamicPages:addDynamicPages,
    makePages:makePages,
    validatePage:validatePage()
};
