const mongoose  = require('mongoose');

const Schema =  mongoose.Schema

const userSchema =  new Schema({
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
    bio:{
        type:String,
        default:'',
    },
    link:{
        type:String,
        default:'',
    },
    avatar:{
        type:String,
        default:'',
    }
});


const Users = mongoose.model('Users', userSchema);
module.exports = Users;