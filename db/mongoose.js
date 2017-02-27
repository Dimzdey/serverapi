const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Dimzdey:password@ds163699.mlab.com:63699/shop');

module.exports = {mongoose};
