const express = require("express");
require("dotenv").config();
const { adminAuth, userAuth } = require("./middlewares/auth")

const app = express();

app.use("/admin", adminAuth )


app.get("/admin/getAllData", (req, res) => {
    res.send("Feteched Data");
})

app.delete("/admin/deletetAllData", (req, res) => {
    res.send("Deleted Data")
})

app.post("/user/login", (req, res) => {
    res.send("User logged in Successfully");
})

app.get("/user/data", userAuth, (req, res) => {
    res.send("user data fetched")
})


app.use("/",(req, res) => {
    res.send("Welcome to Node.js Learning ")
});

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log(`server is running on port ${process.env.PORT}`)
}) 