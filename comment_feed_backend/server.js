require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const Comments = require('./Comments');
const payload = require('request-payload');
let mongoose = require('mongoose');


const app = express()

app.use(express.static('public'))
app.use(cors())


app.get('/', (req, res) => {
    const help = `
  <pre>
    Welcome to the comment feed API!
    Use an Authorization header to work with your own data:
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})
    
    The following endpoints are available:
    
    GET /comments
      USAGE:
        Get all of the comments.
    POST /comments
      USAGE:
        Add a new comment
      PARAMS:
        id
        timestamp
        email
        message - String
      
    GET /comments/:id
      USAGE:
        Get the details of a single comment

    PUT /comments/:id
      USAGE:
        Edit the details of an existing comment
      PARAMS:
        message - String
    DELETE /comments/:id
      USAGE:
        Delete comment
    
 </pre>
  `

    res.send(help);
});

mongoose.connect('mongodb://zoek6:bisli111@ds249372.mlab.com:49372/comment-feed').then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

app.use((req, res, next) => {
    const token = req.get('Authorization')
    if (token) {

        req.token = token;

        next()
    } else {
        res.status(403).send({
            error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
        })
    }
})


//get all comments
app.get('/comments', (req, res) => {
    Comments.find({}, function(err, comments) {
        if (err)
            res.send(err);
        return res.json(comments);
    });
});

//add a comment
app.post('/comments', bodyParser.json(), (req, res) => {
    for(var x in req.body){
        console.log(x + " ------------");
    }

    let objToReturn = {};
    let comments = new Comments();
    comments.timestamp = req.body.timestamp.toString();
    comments.email = req.body.email.toString();
    comments.message = req.body.message.toString();

    objToReturn.timestamp = req.body.timestamp.toString();
    objToReturn.message = req.body.message.toString();
    objToReturn.email = req.body.email.toString();

    comments.save(function(err, comments) {
        if (err)
            res.send(err);

        return res.json(comments);
    });
})

//get a single comment
app.get('/comments/:id', (req, res) => {
    let comments = new Comments();
    comments.get(req.token, req.params.id)
        .then(
            (data) => res.send(data),
            (error) => {
                console.error(error)
                res.status(500).send({
                    error: 'There was an error.'
                })
            }
        )
})



app.put('/comments/:id', bodyParser.json(), (req, res) => {
    let comments = new Comments();
    comments.edit(req.token, req.params.id, req.body)
        .then(
            (data) => res.send(data),
            (error) => {
                console.error(error)
                res.status(500).send({
                    error: 'There was an error.'
                })
            }
        )
})

app.delete('/comments/:id', (req, res) => {
    let comments = new Comments();
    comments.disable(req.token, req.params.id)
        .then(
            (data) => res.send(data),
            (error) => {
                console.error(error)
                res.status(500).send({
                    error: 'There was an error.'
                })
            }
        )
})

app.listen(config.port, () => {
    console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})