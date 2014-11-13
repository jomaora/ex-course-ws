var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Reviews = require('../database/reviews');

router.route('/')
    
    .get(function (req, res) {
        Reviews.find({}, function (err, reviews) {
            if (err) {
                res.status(500).send({'error': err});
            } else {
                res.send(reviews);
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
            Reviews.create(review, function (err, review) {
                if (err) {
                    res.status(500).send({'error': err});
                } else {
                    res.status(201).send(review);
                }
            });
        }
    })
;

router.route('/:id')
    
    .get(function (req, res) {
        if (req.params.id >= reviews.length) {
            res.status(404).send({'error': 'Id of review not found'});
        } else {
            Reviews.findById(req.params.id, function (err, review) {
                if (err) {
                    res.status(500).send({'error': err});
                } else {
                    if (!review) {
                        res.status(404).send({'error': 'Id of review not found'});
                    } else {
                        res.send(review);
                    }
                }
            });
        }
    })

    .delete(function (req, res) {
        if (!req.params.id) {
            res.status(403).send({'error': 'Operation Impossible'});
        } else {
            Reviews.remove({_id: req.params.id}, function (err) {
                if (err) {
                    res.status(500).send({'error': err});
                } else {
                    res.status(204).send({'message': 'Deleted'});
                }
            });
        }
    })

    .put(function (req, res) {
        if (!req.params.id) {
            res.status(400).send({'error': 'Parametres manquants'});
        } else {
            Reviews.findById(req.params.id, function (err, review) {
                if (err) {
                   res.status(500).send({'error': err});
                } else {
                    if (!review) {
                        res.status(404).send({'error': 'Id of review not found'});
                    } else {
                        review = _.merge(review, req.body);
                        review.save(function (err, review, numberAffected) {
                            if (err) {
                                res.status(500).send({'error': err});
                            } else {
                                console.log('The number of updated documents was %d', numberAffected);
                                console.log('The raw response from Mongo was ', review);
                                res.send(review);
                            }
                        });

                    }
                }
            });
        }
    })
;

module.exports = router;