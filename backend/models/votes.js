const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    pollId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll',
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    feedback: {
        type: String
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
    questionAnswer: [
        {
            answer: String
        }
    ]
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;