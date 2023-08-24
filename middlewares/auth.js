const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = async (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];
  if (!token)
    return res
      .status(403)
      .send({ message: "Token required for authentication." });

  try {
    // remove Bearer keyword from token
    token = token.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, config.JWT_TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    // console.log(error);
    return res.status(500).send({ message: "Invalid token." });
  }
  return next();
};

module.exports = verifyToken;
