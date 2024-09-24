const express=require('express');
const router=express.Router();

const {findPollByCode,submitVote,getVotes,getStatsofPoll,avgMarks}=require('../controllers/votes');
const {auth,authAdmin}=require('../middleware/auth');
router.get('/getvotes',getVotes);
router.get('/findpoll', findPollByCode);
//Add auth for students for storing their votes
router.post('/submitvote', submitVote);
router.get('/getstats',getStatsofPoll);
router.get('/avgMarks',avgMarks);

module.exports=router;