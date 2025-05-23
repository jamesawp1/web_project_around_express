const User = require("../models/user");

const INVALID_DATA = 400;
const DATA_NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        return res
          .status(DATA_NOT_FOUND)
          .send({ message: `Usuários não encontrados.` });
      }
      return res.send({ data: users });
    })
    .catch((err) => {
      res.status(SERVER_ERROR).send({
        message: `Não foi possível finalizar a solicitação. ERRO: ${err}`,
      });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(DATA_NOT_FOUND).send({
          message: `Usuário não encontrado. Id do usuário solicitado: ${user._id}`,
        });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      res.status(SERVER_ERROR).send({
        message: `Não foi possível finalizar a solicitação. ERRO: ${err}`,
      });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      if (!user.name || !user.about || !user.avatar) {
        return res.status(INVALID_DATA).send({
          message: `Um dos campos de dados do usuário é inválido. Nome: ${user.name}, Sobre: ${user.about} e Avatar: ${user.Avatar}`,
        });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      res.status(SERVER_ERROR).send({
        message: `Não foi possível finalizar a solicitação. ERRO: ${err}`,
      });
    });
};
