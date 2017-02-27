const mongoose = require('mongoose');

//Items Schema
var ItemsSchema =  mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    img_url: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Item = mongoose.model('Item', ItemsSchema);

module.exports = {Item};
