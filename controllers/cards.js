const Card = require("../models/card");

const INVALID_DATA = 400;
const DATA_NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate("user")
    .orFail(new Error("Cartões não encontrados."))
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.message.startsWith("Cartões não")) {
        return res.status(DATA_NOT_FOUND).send({ message: err.message });
      }

      return res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para a obtenção de dados dos cartões. ERRO: ${err}`,
      });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .orFail(new Error("Um dos campos de dados do cartão não é válido."))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message.startsWith("Um dos campos")) {
        return res.status(INVALID_DATA).send({ message: err.message });
      }

      return res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para a criação de cartões. ERRO: ${err}`,
      });
    });
};

module.exports.deleteCard = (req, res) => {
  const { id: cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail(new Error(`Cartão não encontrado. Id do cartão: ${cardId}.`))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message.startsWith("Cartão não")) {
        return res.status(DATA_NOT_FOUND).send({ message: err.message });
      }

      return res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para a exclusão do cartão. ERRO: ${err}`,
      });
    });
};
