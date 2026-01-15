const express = require("express");
require("dotenv").config();

const app = express();

app.use("/user", (req, res, next) => {
    // res.send("response 1");
    next()
},
 (req, res) => {
    res.send("response 2");
});


app.use("/",(req, res) => {
    res.send("BOSS")
});
const port = process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log(`server is running on port ${process.env.PORT}`)
}) 