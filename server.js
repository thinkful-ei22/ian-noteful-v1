'use strict';

const express = require('express');
const { PORT } = require('./config');
const morgan = require('morgan');
const app = express();
const router = require('./router/notes.router');

//middleware
app.use(morgan('dev'));

app.use(express.static('public'));

app.use(express.json());

app.use('/api/notes', router);

//error handling
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
if( require.main === module ) {
    app.listen(PORT, function() {
        console.info(`Server listening on ${this.address().port}`);
    }).on('error', err => {
        console.error(err);
});
}

module.exports = app;


