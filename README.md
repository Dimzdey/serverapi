# serverapi

## Running Locally
***
Make sure you have Node.js and git cli installed

Clone the repository: 
```
    git clone git@github.com:Dimzdey/serverapi.git
```
To start the server run this command in cmd: 
```
    node app.js
```

View in browser at
``` 
    http://localhost:1337
```

## Usage
***

As unregistered user you can view books' details and reviews. 

As registered user you can add new item to databas and add a review.

Server uses token based authentication, each time user loggs in new token created and stored into databse.

Server api supports item and review removal, but its' not implemented on client side.