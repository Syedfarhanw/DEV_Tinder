const express = require("express");
require("dotenv").config();

const app = express();

app.get("/user", (req, res) => {
    res.send({firstName: "Syed", lastName: "Farhan"})
});

app.post("/user/:userId", (req, res) => {
    console.log(req.params);
    res.send({firstName: "Syed", lastName: "Farhan"})
})

app.post("/user", (req, res) => {
    res.send("Data saved Successfully")
})

app.use("/hello/2",(req, res) => {
    res.send("Hellooooo")
});;

app.use("/hello",(req, res) => {
    res.send("Hello2")
})

app.use("/test",(req, res) => {
    res.send("Hello Test")
});


app.use("/",(req, res) => {
    res.send("BOSS")
});
const port = process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log(`server is running on port ${process.env.PORT}`)
}) 