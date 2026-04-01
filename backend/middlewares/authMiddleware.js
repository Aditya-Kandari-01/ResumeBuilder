const jwt = require('jsonwebtoken')
const tokenBlackListModel = require("../models/blackListModel")

const authUser = async(req,res,next) =>{
    const token = req.cookies.token
    if (!token){
        return res.status(401).json({
            message:"Token not provided"
        })
    }
    const isTokenBlackeListed = await tokenBlackListModel.findOne({
        token
    })
    if (isTokenBlackeListed){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
    try {
        // after the verify decoded will have the user details(id,email,username)
        const decoded = jwt.verify(token,process.env.JWT_SECRET) 
        req.user = decoded
        next()
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }

}

module.exports = {authUser}