const jwt = require("jsonwebtoken");

const jwtKey = "my_secret_key"; //this should be moved to config or env var
const jwtExpirySeconds = 300;

function getNewJWT(payload) {
  // Create a new token with the username in the payload
  // and which expires 300 seconds after issue
  const token = jwt.sign({ payload }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
  console.log("token:", token);
  return token;
}

module.exports = {
  getNewJWT,
  jwtExpirySeconds,
  jwtKey,
};
