const { Router } = require("express");
const userRouter = Router();

const isAuthenticated = require("../middleware/authenticator");
const userController = require("../controllers/user");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

userRouter.use(isAuthenticated);

userRouter.delete("/logout", userController.logout);

module.exports = userRouter;
