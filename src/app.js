const express = require("express");
require("dotenv").config();

const app = express();

app.get("/getuserdata", (req, res) => {
    // try {
        
        throw new Error("fefi")
        res.send("user data fetched")
    // } catch(err) {
    //     res.status(500).send("something went wrong");
    // }
    
})


app.use("/",(err, req, res, next) => {
    if(err) {
        // LOg your error
        res.status(500).send("something went wrong");
    }
});

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log(`server is running on port ${process.env.PORT}`)
}) 