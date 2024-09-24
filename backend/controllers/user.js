const User=require('../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const register=async(req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"All input is required"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }
        const userExists=await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"User with this email already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,12);
        const user=await User.create({
            name,email,password:hashedPassword,role
        });
        return res.status(201).json({message:"User created successfully"});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All input is required"});
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.cookie('token',token,{
            httpOnly:true
        });
        return res.status(200).json({
            msg:"Login Successful",
        });
        
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

const logout=(req,res)=>{
    try {
        res.clearCookie('token');
        return res.status(200).json({msg:"Logged out successfully"});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find();
        return res.status(200).json({users});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}
const getuserById=async(req,res)=>{
    try {
        const {id}=req.query;
        const user=await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({user});
    }
    catch (error) {
        return res.status(400).json({message:error.message});
    }
}

const updateUser=async(req,res)=>{
    try {
        const id=req.params.id;
        const {name,email,role}=req.body;
        const user=await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        user.name=name;
        user.email=email;
        user.role=role;
        await user.save();
        return res.status(200).json({user});
    }
    catch (error) {
        return res.status(400).json({message:error.message});
    }
}
const getAdmins=async(req,res)=>{
    try {
        const admins=await User.find({role:'admin'});
        return res.status(200).json({admins});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

module.exports={
    register,
    login,
    logout,
    getAllUsers,
    getuserById,
    updateUser,
    getAdmins
}