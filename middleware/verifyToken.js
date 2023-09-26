const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
            if(err) res.status(403).json("Invalid Token");
            req.user = user;
            console.log(user);
            next();
        });

    }else{
        return res.status(401).json("Unauthorized Access");
    }
};

const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req,res, ()=>{
        if(req.user.id || !req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are restricted to perform this Task");
        }
    });
};


const verifyAnAdmin = (req, res, next) => {
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not an Admin");
        }
    });
};






//last line
module.exports = {verifyToken,verifyAndAuthorization,verifyAnAdmin};
