'user strict'

var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    name: String,
    placeType: String,
    stars: Number
});

module.exports = mongoose.model('review', reviewSchema);