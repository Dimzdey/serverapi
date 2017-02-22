const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const app = express();

app.use(bodyParser.json());

Items = require('./models/items');
Users = require('./models/users');
//Connect to mongoose
mongoose.connect('localhost/store');
var db = mongoose.connection;

app.get('/', function(req, res) {
    res.send('Hello World');
});

/*
/
/ ************** ITEMS API CONTROLLER START **************
/
*/

//Handling get req for items
app.get('/api/items', function(req, res) {
    Items.getItems(function(err, items) {
        if (err) {
            throw err;
        }
        res.json(items);
    });
});

//Handling get req for single item
app.get('/api/items/:_id', function(req, res) {
    Items.getItemById(req.params._id, function(err, item) {
        if (err) {
            throw err;
        }
        res.json(item);
    });
});

//Handling request adding item into database
app.post('/api/items', function(req, res) {
    var item = req.body;
    Items.addItem(item, function(err, item) {
        if (err) {
            throw err;
        }
        res.json(item);
    });
});

// Handling update request for item
app.put('/api/items/:_id', function(req, res) {
    var id = req.params._id;
    var item = req.body;
    Items.updateItem(id, item, {}, function(err, item) {
        if (err) {
            throw err;
        }
        res.json(item);
    });
});

// Handling delete request for item
app.delete('/api/items/:_id', function(req, res) {
    var id = req.params._id;
    Items.deleteItem(id, function(err, item) {
        if (err) {
            throw err;
        }
        res.json(item);
    });
});

/*
/
/ ************** ITEM API CONTROLLER END **************
/
*/

/*
/
/ ************** USER API CONTROLLER START **************
/
*/

app.get('/api/users', function(req, res) {
    Users.getUsers(function(err, users) {
        if (err) {
            throw err;
        }
        res.json(users);
    });
});

//Handling get req for single item
app.get('/api/users/:_id', function(req, res) {
    Users.getUserById(req.params._id, function(err, user) {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});

//Handling request adding item into database
app.post('/api/users', function(req, res) {
    var user = req.body;
    Users.addUser(user, function(err, user) {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});

// Handling delete request for user
app.delete('/api/users/:_id', function(req, res) {
    var id = req.params._id;
    Users.deleteUser(id, function(err, user) {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});



app.listen(1337);
console.log('Yohoho and the bottle of port:1337');
