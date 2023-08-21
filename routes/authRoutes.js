const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator();
const authControllers = require("../controllers/auth/authControllers");
const auth = require("../middlewares/auth")

// Joi register validator schema
const registerSchema = Joi.object({
    username:Joi.string().min(3).max(12).required(),
    password:Joi.string().min(6).max(12).required(),
    mail:Joi.string().email().required()
})
// Joi login validator schema
const loginSchema = Joi.object({
    password:Joi.string().min(6).max(12).required(),
    mail:Joi.string().email().required()
})

router.post("/register",validator.body(registerSchema), authControllers.postRegister);
router.post("/login",validator.body(loginSchema), authControllers.postLogin);
// test auth middleware
router.get("/test",auth,(req,res)=>{
    res.send("request passed");
})

module.exports = router;
