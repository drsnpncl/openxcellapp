var mongoose = require('mongoose')
const Comment = require('../models/comment')

const findAll = async () => {
    try{
        return await Comment.find().populate('user', 'username')
    } catch (err) {
        return { message: err.message }
    }
}

const findById = async (id) => {
    try{
        return await Comment.findOne( { _id: mongoose.Types.ObjectId(id) })
    } catch (err) {
        return { message: err.message }
    }
}

const findByUser = async (user) => {
    try{
        return await Comment.find({ user:  mongoose.Types.ObjectId(user) })
    } catch (err) {
        return { message: err.message }
    }
}

const findByTopic = async (topic) => {
    try{
        return await Comment.find({ topic:  mongoose.Types.ObjectId(topic) }).populate('user', 'username')
    } catch (err) {
        return { message: err.message }
    }
}

const findByPost = async (post) => {
    try {
        return await Comment.find({ post:  mongoose.Types.ObjectId(post) }).populate('user', 'username')
    } catch (err) {
        return { message: err.message }
    }
}

const create = async (post) => {
    try{
        return await Comment.create(post)
    } catch (err) {
        return { message: err.message }
    }
}

const update = async (id, post) => {
    try{
        return await Comment.findByIdAndUpdate( mongoose.Types.ObjectId(id), post)
    } catch (err) {
        return { message: err.message }
    }
}

const deleteComment = async (id) => {
    try{
        return await Comment.findByIdAndDelete( mongoose.Types.ObjectId(id))
    } catch (err) {
        return { message: err.message }
    }
}

module.exports = { findAll, findById, findByTopic, findByUser, findByPost, create, update, deleteComment }