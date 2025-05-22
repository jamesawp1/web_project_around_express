const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000, BASE_PATH = "default" } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.json());

const { usersRouter } = require("./routes/users");

const { cardsRouter } = require("./routes/cards");

app.use("/users", usersRouter);

app.use("/cards", cardsRouter);

app.use("/", (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada." });
});

app.listen(PORT, () => {
  console.log("Link para o servidor:");
  console.log(BASE_PATH);
});
