const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const express = require("express");
const app = express();


let notes;



fs.readFile("./db/db.json", function (err, data) {
  if (err) {
    throw err;
  }
  notes = JSON.parse(data);
  // GET /api/notes - Should read the db.json file and return all saved notes as JSON.
});

module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    return res.json(notes);
  });

  app.get("/api/notes/:id", function (req, res) {
    let noteId = req.params.id;

    for (let i = 0; i < notes.length; i++) {
      if (noteId == notes[i].id) {
        return res.json(notes[i]);
      }
    }
    return res.json(false);
  });

  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    newNote.id = uuidv4();

    notes.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
      if (err) {
        throw err
      }
    })
    res.json(newNote);
  });


  app.delete("/api/notes/:id", function (req, res) {
    
    let deletedNote = req.params.id;

    for (let i = 0; i < notes.length; i++) {
      if (deletedNote === notes[i].id) {
        notes.splice(i, 1);
      }
    };

    fs.writeFile('./db/db.json', JSON.stringify(notes), function (err, notes) {
      if (err) {
        throw err
      }
    })

    return res.json(notes);

  });
};
