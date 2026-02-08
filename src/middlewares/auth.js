const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        // Read the token from request cookies
       const {token} = req.cookies
       if(!token){
        throw new Error("Invalid token")
       }
        // validate the token
        const decodedObj = await jwt.verify(token, process.env.JWTSECRET)
        // find the user
        const {_id} = decodedObj;
        const user = await User.findById(_id)
        if(!user) {
            throw new Error("User not found")
        }
        req.user = user;
        next()
    } catch(err) {
        res.status(404).send("ERROR :" + err.message)
    } 
};

module.exports = {
    userAuth,
};