const Poll = require('../models/poll');

const createPoll = async (req, res) => {
    try {
        const { title,  description ,questions} = req.body;
        const code = Math.floor(Math.random()*10000000).toString().slice(0,6);

        const poll = new Poll({
            title,
            code,
            description,
            createdBy: req.user._id,
            questions
        });
        await poll.save();
        res.status(201).json({ poll });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPolls = async (req, res) => {
    try {
        const polls = await Poll.find();
        res.status(200).json({ polls });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPoll = async (req, res) => {
    try {
        const { id } = req.body
        const poll = await Poll.findById(id);
        if (poll) {
            return res.status(200).json({ poll });
        }
        return res.status(404).json({ error: 'Poll not found' });
    }   
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updatePoll = async (req, res) => {
    try {
        const {title, description,id,questions} = req.body;
        const poll = await Poll.findById(id);
        if(poll.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'You are not authorized to update this poll' });
        }
        if (poll) {
            poll.title = title;
            poll.description = description;
            poll.questions = questions;
            await poll.save();
            return res.status(200).json({ poll });
        } 
        return res.status(404).json({ error: 'Poll not found' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deletePoll = async (req, res) => {
    try {
        const { id } = req.body;
        const poll = await Poll.findById(id);
        if(poll.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'You are not authorized to delete this poll' });
        }
        if(poll) {
            await Poll.findByIdAndDelete(id);
        }
        return res.status(204).json({
            message: 'Poll deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const stopVoting = async (req, res) => {
    try {
        const { id } = req.query;
        const poll = await Poll.findById(id);
        if (poll) {
            poll.votingOn =false
            await poll.save();
            return res.status(200).json({ poll });
        }
        return res.status(404).json({ error: 'Poll not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createPoll,
    getPolls,
    getPoll,
    updatePoll,
    deletePoll,
    stopVoting
}