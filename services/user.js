var mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const findAll = async () => {
    try{
        return await User.findAll({}, { password: 0 })
    } catch(err) {
        return { message: err.message }
    }
}

const findById = async (id) => {
    try{
        return await User.findOne({ _id: mongoose.Types.ObjectId(id) }, { password: 0 })
    } catch(err) {
        return { message: err.message }
    }
}

const findByUsername = async (username) => {
    try{
        return await User.findOne({ username: username }, { password: 0 })
    } catch(err) {
        return { message: err.message }
    }
}

const findByEmail = async (email) => {
    try{
        return await User.findOne({ email: email }, { password: 0 })
    } catch(err) {
        return { message: err.message }
    }
}

const findByContact = async (contact) => {
    try{
        return await User.findOne({ contact: contact }, { password: 0 })
    } catch(err) {
        return { message: err.message }
    }
}

const authenticate = async (username, password) => {
    try{
        var newPass = await User.findOne({ username: username }, { password: 1, _id: 1})
        if(bcrypt.compareSync(password, newPass.password)) {
            return username;
        } else {

            return { message: 'Incorrect password'}
        }
    } catch(err) {
        return { message: err.message }
    }
}

const create = async (user) => {
    user.password = bcrypt.hashSync(user.password, 10)
    try{
        return await User.create(user) 
    } catch(err) {
        return { message: err.message }
    }
}

const update = async (id, user) => {
    user.password = bcrypt.hashSync(user.password, 10)
    try{
        return await User.findByIdAndUpdate(mongoose.Types.ObjectId(id), user)
    } catch(err) {
        return { message: err.message }
    }
}

module.exports = { findAll, findById, findByUsername, findByEmail, findByContact, authenticate, create, update }