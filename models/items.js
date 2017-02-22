const mongoose = require('mongoose');

//Items Schema

var itemsSchema = mongoose.Schema({
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
var Items = module.exports = mongoose.model('Items', itemsSchema);

// Get All Listed Items
module.exports.getItems = function(callback, limit) {
    Items.find(callback).limit(limit);
}

// Get Single Item By ID
module.exports.getItemById = function(id, callback) {
    Items.findById(id, callback);
}

// Add Item
module.exports.addItem = function(item, callback) {
    Items.create(item, callback);
}
// Update Item
module.exports.updateItem = function(id, item, options, callback) {
    var query = {
        _id: id
    };
    var update = {
        title: item.title,
        description: item.description,
        img_url: item.img_url
    }
    Items.findOneAndUpdate(qery, update, options);
}
// Delete Item
module.exports.deleteItem = function(id, callback) {
    var query = {
        _id: id
    }
    Items.remove(query, callback);
}
