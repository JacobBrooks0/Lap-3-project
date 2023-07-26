require("dotenv").config();
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Token = require("../models/Token");

async function register(req, res) {
  try {
    const data = req.body;

    //Generate a salt with a specific cost
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    //Hash the password
    data["password"] = await bcrypt.hash(data["password"], salt);

    const result = await User.create(data);

    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const data = req.body;
  try {
    const user = await User.getOneByUsername(data.username);
    console.log(user);
    console.log("User", user);
    const authenticated = await bcrypt.compare(data.password, user["password"]);
    console.log("Authenticated", authenticated);
    if (!authenticated) {
      throw new Error("Incorrect credentials.");
    } else {
      //create a new token spec. associated with the user
      const token = await Token.create(user.user_id);
      res
        .status(200)
        .json({ authenticated: true, token: token.token, user: data.username });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: err.message });
  }
}

async function logout(req, res) {
  const token = req.user;
  const tokenObj = await Token.getOneByToken(token.token);
  try {
    const response = await tokenObj.deleteToken();
    res.status(202).json({ message: response });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
}

async function destroy(req, res) {
  const { user_id } = req.params;
  const user = req.user;
  try {
    if (user_id != user.user_id) {
      throw new Error(
        "Permission not granted- you cannot delete someone else's profile"
      );
    }
    const userToDelete = await User.getOneById(user_id);
    const deleteUser = await userToDelete.deleteUser();
    res.status(204).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(405).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
  logout,
  destroy,
};
