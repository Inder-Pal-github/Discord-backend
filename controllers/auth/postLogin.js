const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail });
    if (user && (await bcrypt.compare(password, user.password))) {
      // send the token
      const JWT_TOKEN = jwt.sign(
        { userId: user._id, mail },
        process.env.JWT_TOKEN_KEY,
        { expiresIn: "24h" }
      );
      return res.status(200).json({
        userDetails: { mail: user.mail, token: JWT_TOKEN, username: user.username,_id:user._id },
      });
    }
    return res.status(400).send({ message: "Invalid email or password" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong", error: error });
  }
};
module.exports = postLogin;
