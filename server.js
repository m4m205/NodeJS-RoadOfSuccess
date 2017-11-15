// Packages
const express    = require('express');
const path       = require('path');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const cors       = require('cors');
const session    = require('express-session');
const mysql      = require('mysql');


//File uploads sharile
var multer  =   require('multer');
var fs = require('fs')
var crypto = require('crypto');



// Shahrokh Library
const core = require('./core');

// MongoDB Connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/roadToSuccess", {useMongoClient: true})
        .then( () => { // check db connection
            console.log('MongoDB has been conneted');
        })
        .catch( err => { //Check for db errors
            console.log(`There is an error: ${err}`);
        });


// MySQL Connection
global.db = require('./db');


// Create express server
const app = express();


//Adding config multer
//folder public/upload for uploading file
// var storage = multer.diskStorage({
//   destination: 'public/upload/',
//   filename: function (req, file, cb) {
//     crypto.pseudoRandomBytes(16, function (err, raw) {
//       if (err) return cb(err)
//       cb(null, Math.floor(Math.random()*9000000000) + 1000000000 + path.extname(file.originalname))
//     })
//   }
// })
// var upload = multer({ storage: storage });

// Load Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Define a static folder path
app.use(express.static(path.join(__dirname, 'public')));


// Parse posted data - Middelware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cross-origin resource sharing - Middelware
app.use(cors());

// Session - Middelware
app.use(session({
    resave: true,
    secret: 'V#5PQ7WLkk%*7ckr',
    saveUninitialized:true,
    cookie: { maxAge: (60000*30) }
}));

// My Core Functions
app.use('*', core.pathUserSession);

//upload image to the folder upload
// app.post('/admin/bundel/upload', upload.array('flFileUpload', 12), function (req, res, next) {
//     if( req.userAuth('/admin/login') ) return;
//     res.redirect('back')
// });

// file manager

app.use('/admin/filemanager', require('./node_modules/rich-filemanager/connectors/nodejs/filemanager')(path.normalize(`${__dirname}/public`)));


// Routes
app.use('/admin', require('./routes/rt_admin'));
app.use('/api', require('./routes/rt_api'));
// Listen to port
const port = process.argv[2] || process.env.port || 3500;
app.listen( port, () => {
    console.log(`Server is listening on ${port}.`);
});
