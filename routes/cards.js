const cardsRouter = require("express").Router();

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/cards.json");
fs.readFile(dataPath, { encoding: "utf8" }, (err, data) => {
  const cards = JSON.parse(data);

  cardsRouter.get("/", (req, res) => {
    res.send(cards);
  });
});

module.exports = { cardsRouter };
