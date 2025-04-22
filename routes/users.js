const usersRouter = require("express").Router();

const fs = require("fs");

const path = require("path");

usersRouter.get("/", (req, res) => {
  const dataPath = path.join(__dirname, "../data/users.json");
  fs.readFile(dataPath, { encoding: "utf8" }, (err, data) => {
    const users = JSON.parse(data);
    res.send(users);
  });
});

/* router.get("/users/:id", (req, res) => {
  const ide = aaaaaa.find((user) => user._id === req.params.id) || false;

  if (!ide) {
    res.status(404).send({ message: "ID do usuário não encontrado" });
    return;
  }

  res.send(ide);
}); */

module.exports = { usersRouter };
