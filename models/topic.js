const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, require: true },
});

module.exports = mongoose.model('topic', topicSchema)