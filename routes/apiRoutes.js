"use strict";

const fs = require("fs");
const path = require("path");

const dbNotes = require("../db/db.json");

module.exports = app => {
  app.get("/api/notes", (req, res) => res.json(dbNotes));

  app.post("/api/notes", (req, res) => {
    dbNotes.push(req.body);

    fs.writeFile("./db/db.json", JSON.stringify(dbNotes), err => {
      if (err) throw err;
    });
    res.json(true);
  });
};
