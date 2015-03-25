var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ReviewsSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    placeType: {
        type: String,
        default: ''
    },
    stars: {
        type: Number,
        default: 0
    }
});

mongoose.model('Reviews', ReviewsSchema);