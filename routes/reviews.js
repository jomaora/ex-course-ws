var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Reviews = require('../database/reviews');

var verifyHeaders = function(res, req) {
    if (!req.headers['accept'].match(/json|html/)) {
        res.status(406);
        res.send({error: 'Only HTML or Json format are served.'});
        return false;
    }
    return true;
}

router.route('/')
    
    .get(function (req, res) {
        if (!verifyHeaders(res, req)) {
            return;
        }
        Reviews.find({}, function (err, reviews) {
            if (err) {
                res.status(500).send({'error': err});
            } else {
                res.status(200);
                if (req.headers['accept'].match(/json/)) {
                    res.send(reviews);
                }
                else {
                    res.render('reviews', {reviews: reviews});
                }
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
        if (!verifyHeaders(res, req)) {
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
        if (!verifyHeaders(res, req)) {
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