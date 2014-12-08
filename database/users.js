'user strict'

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    login: String,
    password: String,
    token: String
});

module.exports = mongoose.model('user', userSchema);
