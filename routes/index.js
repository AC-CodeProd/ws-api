var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var accepts = require('accepts');
var Reviews = mongoose.model('Reviews');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});


router.get('/reviews/topPlaces', function(req, res, next) {

    var accept = accepts(req)
    Reviews.find().limit(3).sort({
        stars: -1
    }).find(function(err, reviews) {
        if (err) {
            res.status(500).send({
                'error': err
            });
        } else {
            switch (accept.type(['json', 'html'])) {
                case 'json':
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(reviews);
                    break
                case 'html':
                    res.setHeader('Content-Type', 'text/html');
                    res.render('reviews/topplaces', {
                        reviews: reviews
                    });
                    break
                default:
                    res.status(300).send({
                        'message': 'header accept type html or json'
                    });
                    break
            }
        }
    });
});

router.get('/search', function(req, res, next) {
    if (Object.keys(req.query).length == 0) {
        res.status(200).render('reviews/search');
    } else {
        Reviews.find(req.query, function(err, reviews) {
            if (err) {
                res.status(500).send({
                    'error': err
                });
            } else {
                 console.log(reviews);
                res.render('reviews/index', {
                    reviews: reviews
                });
            }
        });
    }
});



module.exports = router;