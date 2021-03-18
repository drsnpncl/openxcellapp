var mongoose = require('mongoose')
const Post = require('../models/post')

const findAll = async () => {
    try{
        return await Post.find().populate('user', 'username')
    } catch (err) {
        return { message: err.message }
    }
}

const findById = async (id) => {
    try{
        return await Post.findOne( { _id:  mongoose.Types.ObjectId(id) }).populate('user', 'username')
    } catch (err) {
        return { message: err.message }
    }
}

const findByUser = async (user) => {
    try{
        return await Post.find({ user:  mongoose.Types.ObjectId(user) })
    } catch (err) {
        return { message: err.message }
    }
}

const findByTopic = async (topic) => {
    try{
        return await Post.find({ topic:  mongoose.Types.ObjectId(topic) }).populate('user', 'username')
    } catch (err) {
        return { message: err.message }
    }
}

const create = async (post) => {
    try{
        return await Post.create(post)
    } catch (err) {
        return { message: err.message }
    }
}

const update = async (id, post) => {
    try{
        return await Post.findByIdAndUpdate( mongoose.Types.ObjectId(id), post)
    } catch (err) {
        return { message: err.message }
    }
}

const deletePost = async (id) => {
    try{
        return await Post.findByIdAndDelete( mongoose.Types.ObjectId(id))
    } catch (err) {
        return { message: err.message }
    }
}

module.exports = { findAll, findById, findByTopic, findByUser, create, update, deletePost }