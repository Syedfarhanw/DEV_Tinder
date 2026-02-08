const express = require("express");
require("dotenv").config();
const { connectDb } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const  {userAuth} = require("./middlewares/auth")

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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


app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + "Send the connection request")
});

// Get Profile
app.get("/profile", userAuth,  async (req, res) => {
    try{
    const user = req.user;~
    res.send(user)
} catch(err) { 
    res.status(400).send("ERROR :", + err.message)
}
})

// Get User by email
app.get("/user", async (req, res) => {
  const UserEmail = req.body.emailId;
  try {
    const userData = await User.findOne({ emailId: UserEmail });
    if (userData.length === 0) {
      res.status(404).send("User not found");
    } else {
      res
        .status(200)
        .send({ message: "user data found successfully", data: userData });
    }
  } catch (err) {
    res.status(400).send({ User, err });
  }
});

// Feed API - GET /feed - get all user from the database
app.get("/feed", async (req, res) => {
  try {
    const userData = await User.find({});
    if (userData.length === 0) {
      res.status(404).send({ message: "No Data" });
    } else {
      res
        .status(200)
        .send({ message: "user data fetched successfully", data: userData });
    }
  } catch (err) {
    res.status(400).send({ message: "Something went wrong", err });
  }
});

app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await User.findById(userId);
    res
      .status(200)
      .send({ message: `user data found for id:${userId}`, data: userData });
  } catch (err) {
    res.status(400).send({ message: "something went wrong", err });
  }
});

app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await user.findByIdAndDelete({ _id: userId });
    res.status(200).send({
      message: `user data deleted successfully for id:${userId}`,
      data: userData,
    });
  } catch (err) {
    res.status(400).send({ message: "something went wrong", err });
  }
});

app.patch("/user/:id", async (req, res) => {
  const userId = req.params?.id;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "age", "about", "skills", "gender"];
    const isAllowed = Object.keys(data).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    if (!isAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("update not allowed");
    }
    const UpadtedData = await User.findOneAndUpdate({ _id: userId }, data, {
      new: true,
      runValidators: true,
    });
    if (!UpadtedData) {
      res.status(404).send({ message: `User not found with id:${userId}` });
    }
    res
      .status(200)
      .send({ message: "user updated successfully", data: UpadtedData });
  } catch (err) {
    res.status(400).send({ message: "update failed:" + err.message });
  }
});

connectDb()
  .then(() => {
    console.log("Database connection Established...");
    const server = app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database Error...");
  });
