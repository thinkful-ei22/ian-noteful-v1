'use strict';

const express = require('express');
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);
const { PORT } = require('./config');
const { logger } = require('./middleware/logger');
const app = express();

//middleware
app.use(logger);



//endpoints
app.use(express.static('public'));

app.get('/api/notes', (req, res, next) => {
    const {searchTerm} = req.query;

    notes.filter(searchTerm, (err, list) => {
        if(err){
            return next(err);
        }
        res.json(list);
    });
});

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let note = data.find(item => item.id === Number(id));
    res.json(note);
})

app.use(function(req, res, next){
    let err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({message: 'Not Found'})
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

//server listening
app.listen(PORT, function() {
    console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
    console.error(err);
});


