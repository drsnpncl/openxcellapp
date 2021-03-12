const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'topic' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
    title: { type: String, require: true },
    text: { type: String, require: true }
});

module.exports = mongoose.model('comment', commentSchema)