var _ = require('lodash');
var Users = require('../database/users');
var Promise = require('bluebird');

var verifyToken = Promise.method(function(request) {
    return Users.findOne({token: request.headers['authorization']});
});

module.exports.verifyToken = verifyToken;