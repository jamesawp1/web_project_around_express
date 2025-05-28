const mongoose = require("mongoose");
const User = require("../models/user");

const { INVALID_DATA, DATA_NOT_FOUND, SERVER_ERROR } = require("../utils/utils");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para a obtenção de dados dos usuários. ERRO: ${err}`,
      });
    });
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new Error("Usuário não encontrado."))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(INVALID_DATA).send({ message: "ID fornecido inválido." });
      }

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
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para a criação de um novo usuário. ERRO: ${err}`,
      });
    });
};

module.exports.updateProfileInfo = (req, res) => {
  const { userId } = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about })
    .orFail(new Error("Um dos campos de dados é inválido."))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message.startsWith("Um dos campos")) {
        return res.status(INVALID_DATA).send({ message: err.message });
      }

      return res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para a atualização informacional do usuário. ERRO: ${err}`,
      });
    });
};

module.exports.updateProfileAvatar = (req, res) => {
  const { userId } = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar })
    .orFail(new Error("O campo de dado é inválido."))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message.startsWith("O campo de")) {
        return res.status(INVALID_DATA).send({ message: err.message });
      }

      return res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para a atualização da foto do usuário. ERRO: ${err}`,
      });
    });
};
