var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Reviews = require('../database/reviews');

var verifyHeaders = function(res, req, header) {
    if(req.headers[header]) {
        if (!req.headers[header].match(/json|html|text\/plain/)) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
};

var reduceReviewToString = function(review) {
    return _.reduce(_.pick(review, ['name', 'placeType', 'stars']), function(textToSent, attributeValue) {
        return textToSent + '_' + attributeValue;
    });
};

router.route('/')
    
    .get(function (req, res) {
        console.log('verifyHeaders', verifyHeaders(res, req, 'accept'));
        if (!verifyHeaders(res, req, 'accept')) {
            res.status(406);
            res.send({error: 'Only HTML, Json or text/plain format are served.'});
            return;
        }
        Reviews.find({}, function (err, reviews) {
            if (err) {
                console.error(err);
                res.status(500).send({'error': err});
            } else {
                res.status(200);
                res.format({
                    'text/plain': function(){
                        var textToSent = '';
                        _.forEach(reviews, function(review) {
                            textToSent += reduceReviewToString(review) + '|';
                        })
                        res.send(textToSent);
                    },

                    'text/html': function(){
                        res.render('reviews', {reviews: reviews});
                    },

                    'application/json': function(){
                        res.send(reviews);
                    }
                });
            }
        });
    })

    .post(function (req, res) {
        if (!req.body.name || !req.body.placeType || !req.body.stars) {
            res.status(400).send({'error': 'Parametres manquants'});
        } else {
            var review = {
                name: req.body.name,
                placeType: req.body.placeType,
                stars: req.body.stars
            };
            console.log('User-Agent', req.headers['user-agent']);
            Reviews.create(review, function (err, review) {
                if (err) {
                    res.status(500).send({'error': err});
                } else {
                    res.format({
                    'text/plain': function(){
                        res.status(201).send('201');
                    },

                    'text/html': function(){
                        res.redirect(301, '/reviews/' + review._id);
                    },

                    'application/json': function(){
                        res.status(201).send(review);
                    }
                });

                    if (req.headers['accept'].match(/json/)) {
                        
                    }
                    else {
                        
                    }
                }
            });
        }
    })
;

router.route('/:id')
    
    .get(function (req, res) {
        if (!verifyHeaders(res, req, 'accept')) {
            res.status(406);
            res.send({error: 'Only HTML, Json or text/plain format are served.'});
            return;
        }
        if (!req.params.id) {
            res.status(400).send({'error': 'Operation Impossible'});
        } else {
            Reviews.findById(req.params.id, function (err, review) {
                if (err) {
                    res.status(500).send({'error': err});
                } else {
                    if (!review) {
                        res.status(404).send({'error': 'Id of review not found'});
                    } else {
                        res.status(200);
                        if (req.headers['accept'].match(/json/)) {
                            res.send(review);
                        }
                        else if (req.headers['accept'].match(/html/)) {
                            res.render('review', { review: review });
                        }
                    }
                }
            });
        }
    })

    .delete(function (req, res) {
        if (!verifyHeaders(res, req, 'accept')) {
            res.status(406);
            res.send({error: 'Only HTML, Json or text/plain format are served.'});
            return;
        }
        if (!req.params.id) {
            res.status(400).send({'error': 'Operation Impossible'});
        } else {
            Reviews.remove({_id: req.params.id}, function (err) {
                if (err) {
                    res.status(500).send({'error': err});
                } else {
                    // delete method won't render any template. Rendering with be handle by utils.js
                    res.status(204).send();
                }
            });
        }
    })

    .put(function (req, res) {
        // Adding verification on content-type, received but no render any template
        if (!verifyHeaders(res, req, 'content-type')) {
            res.status(406);
            res.send({error: 'Only HTML, Json or text/plain format are served.'});
            return;
        }
        if (!req.params.id) {
            res.status(400).send({'error': 'Parametres manquants'});
        } else {
            Reviews.findByIdAndUpdate(req.params.id, req.body, function (err, review) {
                if (err) {
                    res.status(500).send({'error': err});
                } else {
                    res.status(200).send(review);
                }
            });
        }
    })
;

module.exports = router;