var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var _ = require('lodash');
var Promise = require('bluebird');
var Users = require('../database/users');

router.route('/signIn')
    .post(function(req, res) {
        Users.findOne({login: req.body.login})
        .exec()
        .then(function(user) {
          if (user) {
              res.status(409).send({err: 'This login already exists'});
              return null;
          }

          return Users.create(req.body);
        })
        .then(function(user) {
            if (user) {
                res.status(200).send(user);
            }
        })
    })
;

router.route('/login')
    .post(function(req, res) {
        return Users.findOne({login: req.body.login})
        .exec()
        .then(function(user) {
            if (!user) {
              res.status(404).send({err: 'User not found'});
              return null;
            }

            return (user.password === req.body.password);
        })
        .then(function(correctPassword) {
            if (!correctPassword) {
                res.status(401).send({err: 'Bad credentials'});
                return;
            }

            var shasum = crypto.createHash('sha1');
            shasum.update((new Date()).valueOf().toString(), 'utf8');
            return shasum.digest('hex');
        })
        .then(function(token) {
            console.log(token);

            if (!token) {
                return;
            }

            Users.update({login: req.body.login}, {token: token}, function (err, numberAffected, raw) {
                if (!err) {
                    res.status(200).send({token: token});
                }
            });
        });
    })
;

module.exports = router;
