const Vote = require('../models/votes');
const Poll = require('../models/poll'); 
const mongoose=require('mongoose');

const giveVotes=async(req,res)=>{
    try{
        const {code,marks,feedback}=req.body;
        const pollId=await Poll.findOne({code});
        if(String(pollId.votingOn)===String(false)){
            return res.status(400).json({error:'Voting is closed for this poll'});
        }
        if(!pollId){
            return res.status(404).json({error:'Poll not found'});
        }
        const vote=await Vote.create({pollId:pollId._id,marks,feedback});
        res.status(201).json({vote});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

const getVotes=async(req,res)=>{
    try{
        const {id}=req.body;
        const poll=await Poll.findById(id);
        if(!poll){
            return res.status(404).json({error:'Poll not found'});
        }
        const votes=await Vote.find({pollId:id});
        res.status(200).json({votes});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

const avgMarks=async(req,res)=>{
    try{
        const {id}=req.body;
        const poll=await Poll.findById(id);
        if(!poll){
            return res.status(404).json({error:'Poll not found'});
        }
        const votes=await Vote.find({pollId:id});
        let sum=0;
        votes.forEach(vote=>{
            sum+=vote.marks;
        });
        const avg=sum/votes.length;
        res.status(200).json({avg});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

const getStatsofPoll=async(req,res)=>{
    try{
        const {id}=req.body;
        const aggregation=[{
            $match: {
              pollId:new mongoose.Types.ObjectId(id)
            }
            },
             {
                $group: {
                  _id: "$pollId",
                  averageMarks: { $avg: "$marks" },
                totalVotes:{$count:{}}
                }
              },
             {
            $lookup: {
              from: "polls",
              localField: "_id",
              foreignField: "_id",
              as: "data"
            }},{
            $addFields: {
              pollInfo:{
                $arrayElemAt:["$data",0]
              }
            }
             },
             {
               $project: {
                 data:0,
                 _id:0
               }
             }
            ];

            const stats=await Vote.aggregate(aggregation);
            return res.status(200).json({stats});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

module.exports={giveVotes,getVotes,getStatsofPoll};