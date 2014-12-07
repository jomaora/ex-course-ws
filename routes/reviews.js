var express = require('express');
var router = express.Router();

var reviews = [{name: 'McDo',
    placeType: 'Fastfood',
    stars: 3 }];

router.route('/')
    
    .get(function (req, res) {
        res.send(reviews);
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
            reviews.push(review);
            res.status(201).send(review);
        }
    })
;

router.route('/:id')
    
    .get(function (req, res) {
        if (req.params.id >= reviews.length) {
            res.status(404).send({'error': 'Id of review not found'});
        } else {
            res.send(reviews[req.params.id]);    
        }
    })

    .delete(function (req, res) {
        if (!req.params.id) {
            res.status(403).send({'error': 'Operation Impossible'});
        } else {
            if (req.params.id > reviews.length) {
                res.status(404).send({'error': 'Id of review not found'});
            } else {
                delete reviews[req.params.id];
                res.status(204).send({'message': 'Deleted'});
            }
        }
    })

    .put(function (req, res) {
        if (!req.params.id) {
            res.status(400).send({'error': 'Parametres manquants'});
        } else {
            if (req.params.id > reviews.length) {
                res.status(404).send({'error': 'Id of review not found'});
            } else {
                var review = reviews[req.params.id];

                review.name = (req.body.name) ? req.body.name : review.name;
                review.placeType = (req.body.placeType) ? req.body.placeType : review.placeType;
                review.stars = (req.body.stars) ? req.body.stars : review.stars;
                
                reviews[req.params.id] = review;
                res.status(200).send(reviews[req.params.id]);
            }
        }
    })
;

module.exports = router;