const usersRouter = require("express").Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateProfileInfo,
  updateProfileAvatar,
} = require("../controllers/users");

usersRouter.get("/", getUsers);

usersRouter.get("/:userId", getUserById);

usersRouter.post("/", createUser);

usersRouter.patch("/me", updateProfileInfo);

usersRouter.patch("/me/avatar", updateProfileAvatar);

module.exports = { usersRouter };
