const Post = require('../models/post')

const findAll = async () => {
    try{
        return await Post.find()
    } catch (err) {
        return { message: err.message }
    }
}

const findById = async (id) => {
    try{
        return await Post.findOne( { _id: id })
    } catch (err) {
        return { message: err.message }
    }
}

const findByUser = async (user) => {
    try{
        return await Post.find({ user: user })
    } catch (err) {
        return { message: err.message }
    }
}

const findByTopic = async (topic) => {
    try{
        return await Post.find({ topic: topic })
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
        return await Post.findByIdAndUpdate(id, post)
    } catch (err) {
        return { message: err.message }
    }
}

const deletePost = async (id) => {
    try{
        return await Post.findByIdAndDelete(id)
    } catch (err) {
        return { message: err.message }
    }
}

module.exports = { findAll, findById, findByTopic, findByUser, create, update, deletePost }