const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    contact: { type: Number, required: true },
    email: { type: String, require: true }, 
});

module.exports = mongoose.model('user', userSchema)