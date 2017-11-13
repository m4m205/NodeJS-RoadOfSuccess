const mongoose = require('mongoose');


// make a Schema
const bundelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bundelEditor: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    publish_date:{
        type: Date,
        required: true
    },
    createAt:{
        type: Date,
        required: false,
        default: Date.now()
    },
    frontEndDesc: {
        type: String,
        required: true
    },
    udateAt:{
        type: Date,
        required: false
    }

});

module.exports = mongoose.model('bundels', bundelSchema);
