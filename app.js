const express = require("express");

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

const { usersRouter } = require("./routes/users");

app.use("/", usersRouter);

app.get("/", (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada." });
});

app.get("/cards", (req, res) => {
  res.send("cards");
});

app.listen(PORT, () => {
  console.log("Link para o servidor:");
  console.log(BASE_PATH);
});
