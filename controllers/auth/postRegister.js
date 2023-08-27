const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;
    // check if the user exists already
    const isUserPresent = await User.exists({ mail: mail });
    if (isUserPresent) {
      return res.status(409).send({ message: "Email already registered." });
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hashSync(password, 10);
    // create user document and save to db
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });
    // jwt token
    const JWT_TOKEN = jwt.sign(
      { userId: user._id, mail },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: "24h" }
    );
    return res.status(201).send({
      userDetails: {
        mail: user.mail,
        token: JWT_TOKEN,
        username: user.username,
        _id:user._id
      },
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error occured", error: error.message });
  }
};
module.exports = postRegister;
