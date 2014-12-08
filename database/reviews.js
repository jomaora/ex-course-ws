'user strict'

var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    name: String,
    placeType: String,
    stars: Number,
    user: String
});

module.exports = mongoose.model('review', reviewSchema);