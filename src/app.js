const express = require("express");
require("dotenv").config();
const { connectDb } = require("./config/database");
const User = require("./models/user");

const app = express();

const port = process.env.PORT || 5000;

app.post("/signup", async (req, res) => {
    // Creating the new instance of user model
    const user = new User({
        firstName: "Syed",
        lastName: "Farhan",
        emailId: "syedw@gmail.com",
        password: "syed123"
    });
    try {
    await user.save();
    res.send("User data added successfully")
    } catch(err) {
        res.status(400).send({mesage: "Error saving the user", err})
    }
})




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
