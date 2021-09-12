const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const userProfileDetailsSchema = new Schema(
    {
        userid:{
            type:Schema.Types.ObjectId,
            ref :'usersCredentials',
            unique:true,
            required:true
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
        },
        followers:[{
            type:Schema.Types.ObjectId,
            ref:'usersCredentials',
            unique:true
        }
    ],
    following:
        [{
            type:Schema.Types.ObjectId,
            ref:'usersCredentials',
            unique:true
        }
    ],
    }
);

const userProfileDetails = mongoose.model("userprofiledetails",userProfileDetailsSchema);

module.exports = userProfileDetails;
