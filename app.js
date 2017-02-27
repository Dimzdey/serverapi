const express    = require('express');
const bodyParser = require('body-parser');
const _          = require('lodash');
const {ObjectID} = require('mongodb');

const app = express();

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

const {Item}         = require('./models/items');
const {User}         = require('./models/users');
const {Review}       = require('./models/reviews');
const {authenticate} = require('./middleware/authenticate')
const {mongoose}     = require('./db/mongoose');


/*
/
/ ************** ITEMS API ROUTER START **************
/
*/

//Handling request adding item into database
app.post('/api/items', (req, res) => {

  var body = _.pick(req.body, ['title', 'description', 'img_url']);
  var item = new Item(body);

   item.save().then((doc) => {
     res.json(doc);
   }, (e) => {
     res.status(400).send(e);
   });
});

//Handling get req for items
app.get('/api/items', (req, res) => {
   Item.find().then((items) => {
     res.send({items});
   }, (e) => {
     res.status(400).send(e);
   });
});

//Handling get req for single item
app.get('/api/items/:id', (req, res) => {
   var id = req.params.id;

     if (!ObjectID.isValid(id)) {
       return res.status(404).send();
     }

     Item.findById(id).then((item) =>{
       if(!item){
         return res.status(404).send();
       }
       res.send({item});
     }).catch((e) => {
       res.status(400).send();
     });

});

// Handling delete request for item
app.delete('/api/items/:id', (req, res) => {
    var id = req.params.id;

      if (!ObjectID.isValid(id)) {
        return res.status(404).send();
      }

      Item.findByIdAndRemove(id).then((item) =>{
        if (!item) {
          return res.status(404).send();
        }
        res.send(item);
      }).catch((e) => {
        res.status(400).send();
      });

});

/*
/
/ ************** ITEM API ROUTER END **************
/
*/

/*
/
/ ************** USER API ROUTER START **************
/
*/

// POST /api/users
app.post('/api/register', (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'username']);
    var user = new User(body);

    user.save().then(() => {
        res.status(200).send();
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/api/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// POST users/login {mail, pass}
app.post('/api/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    }).catch((e) => {
      res.status(400).send();
    });
});

// Route for logout (deleting token)
app.delete('/api/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

/*
/
/ ************** User API ROUTER END **************
/
*/


/*
/
/ ************** Review API ROUTER START **************
/
*/

// POST new review
app.post('/api/reviews', (req, res) => {

   var review  = new Review({
     product: req.body.product,
     rating: req.body.rating,
     text: req.body.text,
     created_by:{
       user_id: req.body.created_by.user_id,
       username: req.body.created_by.username
     }
   });

   review.save().then((doc) => {
     res.json(doc);
   }, (e) => {
     res.status(400).send(e);
   });
});

// GET all existing reviews (not product specified)
app.get('/api/reviews', (req, res) => {
   Review.find().then((review) => {
     res.send(review);
   }, (e) => {
     res.status(400).send(e);
   });
});

// GET one particular review
app.get('/api/reviews/:product', (req, res) => {
   var productid = req.params.product;

     if (!ObjectID.isValid(productid)) {
       return res.status(404).send();
     }

     Review.find({'product':productid}).then((review) =>{
       if(!review){
         return res.status(404).send();
       }
       res.send(review);
     }).catch((e) => {
       res.status(400).send();
     });

});

/*
/
/ ************** Review API ROUTER END **************
/
*/

app.listen(1337);
console.log('Yohoho and the bottle of port:1337');
