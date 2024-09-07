const Vote = require('../models/votes');
const Poll = require('../models/poll'); 
const mongoose=require('mongoose');

const findPollByCode = async (req, res) => {
    try {
        const { code } = req.query; // Use req.query for GET parameters
        const poll = await Poll.findOne({ code });
        
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        if (poll.votingOn === false) {
            return res.status(400).json({ error: 'Voting is closed for this poll' });
        }

        return res.status(200).json({ poll });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const submitVote = async (req, res) => {
    try {
        const { pollId, marks, feedback } = req.body;

        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        const vote = await Vote.create({ pollId: poll._id, marks, feedback });
        return res.status(201).json({ vote });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


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
        const {id}=req.query;
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

module.exports={findPollByCode,submitVote,getVotes,getStatsofPoll,avgMarks};