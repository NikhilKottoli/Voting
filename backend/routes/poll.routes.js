const express=require('express');
const router=express.Router();
const {createPoll,
    getPolls,
    getPoll,
    updatePoll,
    stopVoting,
    deletePoll}=require('../controllers/poll');
const {auth,authAdmin}=require('../middleware/auth');
router.get('/getpolls',getPolls);
router.get('/pollbyId',getPoll);    
router.post('/createpoll',auth,authAdmin,createPoll);
router.put('/updatepoll',auth,authAdmin,updatePoll);
router.delete('/deletepoll',auth,authAdmin,deletePoll);
router.put('/stopvoting',auth,authAdmin,stopVoting);

module.exports=router;