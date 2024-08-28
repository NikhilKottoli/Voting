const express=require('express');
const router=express.Router();

const {giveVotes,getVotes,getStatsofPoll}=require('../controllers/votes');

router.get('/getvotes',getVotes);
router.post('/give',giveVotes);
router.get('/getstats',getStatsofPoll);

module.exports=router;