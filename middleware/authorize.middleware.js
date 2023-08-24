const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorize = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1] || null;

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if(err){
            return res.status(401).send({"ok":false, err})
        }
        if(decoded){
            req.user = decoded.user;
            next();
        }
    });
}

module.exports = {
    authorize
}