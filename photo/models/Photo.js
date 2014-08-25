/**
 * Created by Dang Binh on 8/9/2014.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');

var schema = new mongoose.Schema({
    name: String,
    path: String
})
module.exports = mongoose.model('Photo', schema);