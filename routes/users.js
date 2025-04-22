const usersRouter = require("express").Router();

const fs = require("fs");

const path = require("path");

const dataPath = path.join(__dirname, "../data/users.json");
fs.readFile(dataPath, { encoding: "utf8" }, (err, data) => {
  const users = JSON.parse(data);

  usersRouter.get("/users", (req, res) => {
    res.send(users);
  });

  usersRouter.get("/users/:id", (req, res) => {
    const userFinder =
      users.find((user) => user._id === req.params.id) || false;

    if (!userFinder) {
      res.status(404).send({ message: "ID do usuário não encontrado" });
      return;
    }

    res.send(userFinder);
  });
});

module.exports = { usersRouter };
