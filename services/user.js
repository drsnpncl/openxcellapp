const User = require('../models/user')

const findAll = async () => {
    try{
        return await User.findAll().select({ password: 0 })
    } catch(err) {
        return { message: err.message }
    }
}

const findById = async (id) => {
    try{
        return await User.findOne({ _id: id }).select({ password: 0 })
    } catch(err) {
        return { message: err.message }
    }
}

const findByUsername = async (username) => {
    try{
        return await User.findOne({ username: username }).select({ password: 0 })
    } catch(err) {
        return { message: err.message }
    }
}

const findByEmail = async (email) => {
    try{
        return await User.findOne({ email: email }).select({ password: 0 })
    } catch(err) {
        return { message: err.message }
    }
}

const findByContact = async (contact) => {
    try{
        return await User.findOne({ contact: contact }).select({ password: 0 })
    } catch(err) {
        return { message: err.message }
    }
}

const authenticate = async (username, password) => {
    try{
        return await User.findOne({ username: username, password }).select({ username: 1 })
    } catch(err) {
        return { message: err.message }
    }
}

const create = async (user) => {
    try{
        return await User.create(user) 
    } catch(err) {
        return { message: err.message }
    }
}

const update = async (id, user) => {
    try{
        return await User.findByIdAndUpdate(id, user)
    } catch(err) {
        return { message: err.message }
    }
}

module.exports = { findAll, findById, findByUsername, findByEmail, findByContact, authenticate, create, update }