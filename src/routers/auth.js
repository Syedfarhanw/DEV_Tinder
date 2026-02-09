const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");

const authRouter = express.Router();


// signup
authRouter.post("/signup", async (req, res) => {
  try {
    // validation of the data
    validateSignUpData(req);
    const {firstName, lastName, emailId, password} = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10)
    console.log(passwordHash)
     // Creating the new instance of user model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash
    });
    const savedData = await user.save();
    res.send({ message: "User data added successfully", data: savedData });
  } catch (err) {
    res.status(400).send({ mesage: "Error : " + err.message });
  }
});

// Login
authRouter.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validatePassword(password)
        if(isPasswordValid) {
            // Create a JWT Token
            const token = await user.getJwt()
            // Add the token to cookie and send the response back to user
            res.cookie('token', token, {expires: new Date(Date.now() + 8 * 3600000)}).send({message: "Login Successfull!!!"})
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send({message: `Error :` + err.message});
    }
})

module.exports = authRouter;