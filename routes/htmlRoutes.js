"use strict";

const path = require("path");

module.exports = app => {
  app.get("/public/assets/css/styles.css", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
  });

  app.get("/public/assets/js/index.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
  });

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
  );

  app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/notes.html"))
  );
};
