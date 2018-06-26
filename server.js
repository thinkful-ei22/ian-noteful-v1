'use strict';

const express = require('express');
const data = require('./db/notes');
const { PORT } = require('./config');
const { logger } = require('./middleware/logger');
const app = express();

//middleware
app.use(logger);



//endpoints
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    const queryTerm = req.query.searchTerm;
    let filteredData = data.filter(item => item.title.includes(queryTerm));
    res.json(filteredData);
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let note = data.find(item => item.id === Number(id));
    res.json(note);
})


//server listening
app.listen(PORT, function() {
    console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
    console.error(err);
});


