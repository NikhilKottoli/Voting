const jwt=require('jsonwebtoken');
const User=require('../models/user.js');

const auth=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.id);
        if(!user){
            return res.status(401).json({message:"User not found"});
        }
        req.user=user;
        next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized",
        error:error.message
        });
    }
}

const authAdmin=(req,res,next)=>{
    if(req.user.role!=='admin'){
        return res.status(403).json({message:"Admin access denied"});
    }
    next();
}
module.exports={auth,authAdmin};