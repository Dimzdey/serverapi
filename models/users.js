const mongoose = require('mongoose');

//Users Schema
var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    e_mail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Users = module.exports = mongoose.model('Users', userSchema);

// Get All Users
module.exports.getUsers = function(callback, limit) {
    Users.find(callback).limit(limit);
}

// Get A Single User By ID
module.exports.getUserById = function(id, callback) {
    Users.findById(id, callback);
}

// Add Item
module.exports.addUser = function(user, callback) {
    Users.create(user, callback);
}

// Delete Item
module.exports.deleteUser = function(id, callback) {
    var query = {
        _id: id
    }
    Users.remove(query, callback);
}
