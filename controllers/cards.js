const Card = require("../models/card");

const INVALID_DATA = 400;
const DATA_NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate("user")
    .then((cards) => {
      if (!cards) {
        return res
          .status(DATA_NOT_FOUND)
          .send({ message: `Cartões não encontrados.` });
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      res.status(SERVER_ERROR).send({
        message: `Não foi possível finalizar a solicitação. ERRO: ${err}`,
      });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      if (!card.name || !card.link) {
        return res.status(INVALID_DATA).send({
          message: `O nome ou o link do cartão é inválido. Nome: ${card.name} e Link: ${card.link}`,
        });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      res
        .status(SERVER_ERROR)
        .send({ message: `Não foi possível criar o cartão. ERRO: ${err}` });
    });
};

module.exports.deleteCard = (req, res) => {
  const { id: cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return res.status(DATA_NOT_FOUND).send({
          message: `Cartão não encontrado. Id do cartão solicitado: ${cardId}.`,
        });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      res.status(SERVER_ERROR).send({
        message: `Não foi possível excluir o cartão. ERRO: ${err}`,
      });
    });
};
