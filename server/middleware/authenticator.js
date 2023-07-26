const Token = require("../models/Token");

// Middleware function to check if a user is authenticated
async function isAuthenticated(req, res, next) {
  const authToken = req.headers["authorization"];
  
  // Check if the authentication token is present and valid
  if (authToken && Token.isValidAuthToken(authToken)) {
    try {
      // If the token is valid, get the user associated with the token in the db
      const user = await Token.getOneByToken(authToken);

      if (user) {
        // Store the user object in the request for later use in the route handlers
        req.user = user;
        next(); // User is authenticated and can access the route
      } else {
        // Token is invalid or doesn't match any user in the database
        res.status(401).json({ error: "Unauthorised" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Token is missing or not valid
    res.status(403).json({ error: "Unauthorised" });
  }
}

module.exports = isAuthenticated;
