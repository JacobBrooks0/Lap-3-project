const { Router } = require("express");
const userRouter = Router();

const isAuthenticated = require("../middleware/authenticator");
const userController = require("../controllers/user");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

userRouter.use(isAuthenticated);
userRouter.get("/", userController.details);
userRouter.delete("/logout", userController.logout);
userRouter.delete("/", userController.destroy);

module.exports = userRouter;
