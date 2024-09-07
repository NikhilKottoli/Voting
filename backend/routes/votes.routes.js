const express=require('express');
const router=express.Router();

const {findPollByCode,submitVote,getVotes,getStatsofPoll,avgMarks}=require('../controllers/votes');

router.get('/getvotes',getVotes);
router.get('/findpoll', findPollByCode);
router.post('/submitvote', submitVote);
router.get('/getstats',getStatsofPoll);
router.get('/avgMarks',avgMarks);

module.exports=router;