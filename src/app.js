const express = require("express");
require("dotenv").config();

const app = express();

app.use("/test",(req, res) => {
    res.send("Hello")
})

app

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log(`server is running on port ${process.env.PORT}`)
}) 