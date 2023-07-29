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

    const authenticated = await bcrypt.compare(data.password, user["password"]);
    console.log("Authenticated", authenticated);
    if (!authenticated) {
      throw new Error("Incorrect credentials.");
    } else {
      //create a new token spec. associated with the user
      const token = await Token.create(user.user_id);
      await user.updateUser();
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

async function details(req, res) {
  try {
    const userId = req.user.user_id;
    
    const user = await User.getOneById(userId);

    // Omit the password from the user object
    delete user.password;
    // Send the user information (without password) in the response
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Unable to get user details." });
  }
}

async function destroy(req, res) {
  const user_id = req.user.user_id;
  try {
    const userToDelete = await User.getOneById(user_id);
    await userToDelete.deleteUser();
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
  details,
};
