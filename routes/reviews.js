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

module.exports = router;