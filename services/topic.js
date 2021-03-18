var mongoose = require('mongoose')
const Topic = require('../models/topic')

const findAll = async () => {
    try {
        return await Topic.find().populate('user', 'username')
    } catch(err) {
        return { message: err.message }
    }
}

const findById = async (id) => {
    try {
        return await Topic.findOne({ _id: mongoose.Types.ObjectId(id) }).populate('user', 'username')
    } catch(err) {
        return { message: err.message }
    }
}

const findByUserId = async (user) => {
    try {
        return await Topic.find({ user: mongoose.Types.ObjectId(user) })
    } catch(err) {
        return { message: err.message }
    }
}

const checkOwnership = async (id, user) => {
    try {
        return await Topic.findOne({ _id: mongoose.Types.ObjectId(id), user: mongoose.Types.ObjectId(user) })
    } catch(err) {
        return { message: err.message }
    }
}

const create = async (topic) => {
    try {
        return await Topic.create(topic)
    } catch(err) {
        return { message: err.message }
    }
}

const update = async (id, topic) => {
    try {
        return await Topic.findByIdAndUpdate(mongoose.Types.ObjectId(id), topic)
    } catch(err) {
        return { message: err.message }
    }
}

const deleteTopic = async (id) => {
    try {
        return await Topic.findByIdAndDelete(mongoose.Types.ObjectId(id))
    } catch(err) {
        return { message: err.message }
    }
}

module.exports = { findAll, findById, findByUserId, checkOwnership, create, update, deleteTopic }