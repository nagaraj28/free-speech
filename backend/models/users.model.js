const mongoose  = require('mongoose');

const Schema =  mongoose.Schema

const userSchema =  new Schema({
    id:{
        type: String,
    required: true,
    unique: true,
    trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    username:{
        type: String,
    required: true,
    unique: true,
    trim: true,
    },
    fullname:{
        type: String,
    required: true,
    trim: true,
    },
    followers:{
        type: Array,
    trim: true,
    },
    following:{
        type: Array,
    trim: true,
    },
    posts:{
        type: Array,
    trim: true,
    },
})


const Users = mongoose.model('Users', userSchema);

module.exports = Users;