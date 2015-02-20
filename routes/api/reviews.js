var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var reviews = [{
    name: 'McDo',
    placeType: 'Fastfood',
    stars: 4
}, {
    name: 'KFC',
    placeType: 'Fastfood',
    stars: 5
}, {
    name: 'SUBWAY',
    placeType: 'Fastfood',
    stars: 3
}, {
    name: 'Quick',
    placeType: 'Fastfood',
    stars: 1
}];

var Reviews = mongoose.model('Reviews');

router.get('/', function(req, res, next) {
    Reviews.find({}, function(err, reviews) {
        if (err) {
            res.status(500).send({
                'error': err
            });
        } else {
            res.send(reviews);
        }
    });
});

router.post('/', function(req, res, next) {
    if ('undefined' == typeof req.body.name || 'undefined' == typeof req.body.placeType || 'undefined' == typeof req.body.stars) {
        res.status(400).send({
            error: 'Problème dans les paramètres'
        });
    } else {
        /*var review = {
            name: req.body.name,
            placeType: req.body.placeType,
            stars: req.body.stars
        }
        reviews.push(review);
        res.status(201).send(reviews);*/
        var review = new Reviews({
            name: req.body.name,
            placeType: req.body.placeType,
            stars: req.body.stars
        });
        review.save(function(err) {
            if (err) {
                res.status(500).send({
                    'error': err
                });
            } else {
                res.status(201).send({
                    'message': 'Création'
                });
            }
        });

    }

});

router.delete('/', function(req, res, next) {
    /*reviews = [];
    res.status(204).send({});*/
    Reviews.remove(function(err, reviews) {
        if (err) {
            res.status(500).send({
                'error': err
            });
        } else {
            res.status(204).send({});
        }
    });
});

router.get('/:id', function(req, res, next) {
    if ('undefined' == typeof req.params.id) {
        res.status(400).send({
            error: 'Problème dans les paramètres'
        });
    } else {
        // res.status(200).send(reviews[req.params.id - 1]);
        Reviews.find({
            "_id": req.params.id
        }, function(err, reviews) {
            if (err) {
                res.status(500).send({
                    'error': err
                });
            } else {
                res.status(200).send(reviews);
            }
        });
    }
});

router.put('/:id', function(req, res, next) {
    if ('undefined' == typeof req.body.name || 'undefined' == typeof req.body.placeType || 'undefined' == typeof req.body.stars || 'undefined' == typeof req.params.id) {
        res.status(400).send({
            error: 'Problème dans les paramètres'
        });
    } else {
        /*var review = {
            name: req.body.name,
            placeType: req.body.placeType,
            stars: req.body.stars
        }
        reviews.splice(req.params.id, 1, review);
        res.send(reviews);*/
        var review = {
            name: req.body.name,
            placeType: req.body.placeType,
            stars: req.body.stars
        };
        Reviews.update({
            _id: req.params.id
        }, review, function(err) {
            if (err) {
                res.status(500).send({
                    'error': err
                });
            } else {
                res.status(201).send({
                    'message': 'Update'
                });
            }
        });
    }
});

router.delete('/:id', function(req, res, next) {
    if ('undefined' == typeof req.params.id) {
        res.status(400).send({
            error: 'Problème dans les paramètres'
        });
    } else {
        /*reviews.splice(req.params.id, 1);
        res.status(204).send({});*/
        Reviews.remove({
            _id: req.params.id
        }, function(err) {
            if (err) {
                res.status(500).send({
                    'error': err
                });
            } else {
                res.status(204).send({});
            }
        });
    }
});

module.exports = router;