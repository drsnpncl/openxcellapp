const Topic = require('../models/topic')

const findAll = async () => {
    try {
        return await Topic.find()
    } catch(err) {
        return { message: err.message }
    }
}

const findById = async (id) => {
    try {
        return await Topic.findOne({ _id: id })
    } catch(err) {
        return { message: err.message }
    }
}

const findByUserId = async (id) => {
    try {
        return await Topic.find({ user: user })
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
        return await Topic.findByIdAndUpdate(id, topic)
    } catch(err) {
        return { message: err.message }
    }
}

const deleteTopic = async (id) => {
    try {
        return await Topic.findByIdAndDelete(id)
    } catch(err) {
        return { message: err.message }
    }
}

module.exports = { findAll, findById, findByUserId, create, update, deleteTopic }