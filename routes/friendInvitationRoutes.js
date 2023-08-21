const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator();
const authControllers = require("../controllers/auth/authControllers");

const auth = require("../middlewares/auth");
const {
  postInvite,
} = require("../controllers/friendInvitation/friendInvitationController");

const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});

router.post(
  "/invite",
  auth,
  validator.body(postFriendInvitationSchema),
  postInvite
);

module.exports = router;
