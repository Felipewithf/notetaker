const express = require('express');

// Import our modular routers for /notes
const notesRouter = require('./notes.js');

const app= express();


app.use('/notesFromDB',notesRouter);


module.exports = app;