const JWT = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req, res, next) => {
    try{
        const token = 
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "");
    
       
        
        if(!token){
            res.status(401).json({
                success: false,
                message: "Token not found",
                data: token,
            });
        }
       
        try{
            const decode = await JWT.verify(token, process.env.JWT_SECRET);
        
            req.user = decode;
        }catch(err){
            console.log("Erro in auth middleware during decoding the token--", err);
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            })
        }
        next();
    }catch(err){
        console.log("Error in auth middleware--",err);
        return res.status(500).json({
            success: false,
            message: "Error in auth middleware" 
        });
    }
};

exports.isPatient = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Patient"){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this Patient's route",
            });
        }
        next();

    }catch(err){
        console.log("Error in isPatient middleware--",err);
        return res.status(500).json({
            success: false,
            message: "Error in isPatient middleware",
        });
    }
}

exports.isDoctor = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Doctor"){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this Doctor's route",
            }); 
        }
        next();
    }
    catch(err){
        console.log("Error in isDoctor middleware--",err);
        return res.status(500).json({
            success: false,
            message: "Error in isDoctor middleware",
        });
    }   
};