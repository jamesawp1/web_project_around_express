const mongoose = require("mongoose");
const Card = require("../models/card");
const { INVALID_DATA, DATA_NOT_FOUND, SERVER_ERROR } = require("../utils/utils");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate([])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para a obtenção de dados dos cartões. ERRO: ${err}`,
      });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para a criação de cartões. ERRO: ${err}`,
      });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail(new Error(`Cartão não encontrado. Id do cartão: ${cardId}.`))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(cardId)) {
        return res.status(INVALID_DATA).send({ message: "ID do cartão fornecido é inválido." });
      }

      if (err.message.startsWith("Cartão não")) {
        return res.status(DATA_NOT_FOUND).send({ message: err.message });
      }

      return res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para a exclusão do cartão. ERRO: ${err}`,
      });
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error("Cartão não encontrado."))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(cardId)) {
        return res.status(INVALID_DATA).send({ message: "ID do cartão fornecido é inválido." });
      }

      if (err.message.startsWith("Cartão não")) {
        return res.status(DATA_NOT_FOUND).send({ message: err.message });
      }

      return res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para curtir o cartão. ERRO: ${err}`,
      });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error("Cartão não encontrado."))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(cardId)) {
        return res.status(INVALID_DATA).send({ message: "ID do cartão fornecido é inválido." });
      }

      if (err.message.startsWith("Cartão não")) {
        return res.status(DATA_NOT_FOUND).send({ message: err.message });
      }

      return res.status(SERVER_ERROR).send({
        message: `Não foi possível completar a solicitação para descurtir o cartão. ERRO: ${err}`,
      });
    });
};
