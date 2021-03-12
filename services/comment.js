const Comment = require('../models/comment')

const findAll = async () => {
    try{
        return await Comment.find()
    } catch (err) {
        return { message: err.message }
    }
}

const findById = async (id) => {
    try{
        return await Comment.findOne( { _id: id })
    } catch (err) {
        return { message: err.message }
    }
}

const findByUser = async (user) => {
    try{
        return await Comment.find({ user: user })
    } catch (err) {
        return { message: err.message }
    }
}

const findByTopic = async (topic) => {
    try{
        return await Comment.find({ topic: topic })
    } catch (err) {
        return { message: err.message }
    }
}

const findByPost = async (post) => {
    try {
        return await Comment.find({ post: post })
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
        return await Comment.findByIdAndUpdate(id, post)
    } catch (err) {
        return { message: err.message }
    }
}

const deleteComment = async (id) => {
    try{
        return await Comment.findByIdAndDelete(id)
    } catch (err) {
        return { message: err.message }
    }
}

module.exports = { findAll, findById, findByTopic, findByUser, findByPost, create, update, deleteComment }