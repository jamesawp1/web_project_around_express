const User = require("../models/user");

const INVALID_DATA = 400;
const DATA_NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(new Error("Usuários não encontrados."))
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.message.startsWith("Usuários não")) {
        return res.status(DATA_NOT_FOUND).send({ message: err.message });
      }

      return res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para a obtenção de dados dos usuários. ERRO: ${err}`,
      });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error("Usuário não encontrado."))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message.startsWith("Usuário não")) {
        return res.status(DATA_NOT_FOUND).send({ message: err.message });
      }

      return res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para a obtenção de dados do usuário específicado. ERRO: ${err}`,
      });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .orFail(new Error("Um dos campos de dados do usuário é inválido."))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message.startsWith("Um dos campos")) {
        return res.status(INVALID_DATA).send({ message: err.message });
      }

      return res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para a criação de um novo usuário. ERRO: ${err}`,
      });
    });
};
