const express = require('express');
const notes = require('express').Router();
const uniqid = require('uniqid');

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils.js');

// GET Route for retrieving all the notes
notes.get('/getAll', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)));
});

// POST to save note in db
notes.post('/addNote', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    const payload = {
        title,
        text,
        id: uniqid(),
    }
    console.log(payload);
    readAndAppend(payload, './db/db.json');
    res.json(`newNote Added to DB`);
});


// DELETE note from db
notes.delete('/:id', (req, res) => {
    console.log('the id to delete is: ' + req.params.id);
    readFromFile('./db/db.json')
    .then((data) => (JSON.parse(data)))
    .then((data) =>{
        data.forEach(element => {
            if (element.id == req.params.id){
                const index = data.indexOf(req.params.id);
                data.splice(index,1);
                writeToFile('./db/db.json',data); 
            }
            console.log(data);
        });
        res.send(`DELETE request completed`);
    })
});


  module.exports = notes;