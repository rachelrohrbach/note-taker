"use strict";

const fs = require("fs");
const path = require("path");

const notesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../db/db.json"), (err, data) => {
    if (err) throw err;
  })
);
const newNotesData = notesData => {
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(notesData),
    err => {
      if (err) throw err;
    }
  );
};

module.exports = app => {
  app.get("/api/notes", (req, res) => res.json(notesData));

  app.post("/api/notes", (req, res) => {
    let data = req.body;
    let id = notesData.length;
    data.id = id + 1;
    notesData.push(data);
    newNotesData(notesData);
    return res.json(notesData);
  });

  app.delete("/api/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    for (let i = 0; i < notesData.length; ++i) {
      const note = notesData[i];
      if (id === note.id) {
        notesData.splice(i, 1);
        break;
      }
    }
    newNotesData(notesData);
    res.send(notesData);
  });
};
