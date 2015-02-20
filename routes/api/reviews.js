var express = require('express');
var router = express.Router();
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

router.get('/', function(req, res, next) {
    res.send(reviews);
});

router.post('/', function(req, res, next) {
    if ('undefined' == typeof req.body.name || 'undefined' == typeof req.body.placeType || 'undefined' == typeof req.body.stars) {
        res.status(400).send({
            error: 'Problème dans les paramètres'
        });
    } else {
        var review = {
            name: req.body.name,
            placeType: req.body.placeType,
            stars: req.body.stars
        }
        reviews.push(review);
        res.status(201).send(reviews);
    }

});

router.delete('/', function(req, res, next) {
    reviews = [];
    res.status(204).send({});
});

router.get('/:id([0-9]+)', function(req, res, next) {
    if ('undefined' == typeof req.params.id || req.params.id > reviews.length || req.params.id <= 0) {
        res.status(400).send({
            error: 'Problème dans les paramètres'
        });
    } else {
        res.status(200).send(reviews[req.params.id-1]);
    }
});

router.put('/:id([0-9]+)', function(req, res, next) {
    if ('undefined' == typeof req.body.name || 'undefined' == typeof req.body.placeType || 'undefined' == typeof req.body.stars || req.params.id > reviews.length || req.params.id <= 0) {
        res.status(400).send({
            error: 'Problème dans les paramètres'
        });
    } else {
        var review = {
            name: req.body.name,
            placeType: req.body.placeType,
            stars: req.body.stars
        }
        reviews.splice(req.params.id, 1, review);
        res.send(reviews);
    }
});

router.delete('/:id([0-9]+)', function(req, res, next) {
    if ('undefined' == typeof req.body.name || 'undefined' == typeof req.body.placeType || 'undefined' == typeof req.body.stars || req.params.id > reviews.length || req.params.id <= 0) {
        res.status(400).send({
            error: 'Problème dans les paramètres'
        });
    } else {
        reviews.splice(req.params.id, 1);
        res.status(204).send({});
    }
});

module.exports = router;