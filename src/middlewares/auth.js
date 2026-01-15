const adminAuth = (rq, res, next) => {
    const token = "xyz";
    const isAdminAuthorized = token == "xyz";
    if(!isAdminAuthorized) {
        res.status(401).send({message: "Unauthorized Admin"})
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    const token = "xyz";
    const isUserAuthorized = token == "xyz";
    if(!isUserAuthorized) {
        res.status(401).send({message: "Unauthorized User"})
    } else {
        next();
    }
};

module.exports = {
    adminAuth,
    userAuth,
};