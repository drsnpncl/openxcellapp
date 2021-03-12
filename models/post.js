const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'topic' },
    title: { type: String, require: true },
    text: { type: String, require: true }
});

module.exports = mongoose.model('post', postSchema)