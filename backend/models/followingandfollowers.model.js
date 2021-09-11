const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const followingandfollowersSchema = new Schema(
    {
        userid:{
            type:Schema.Types.ObjectId,
            ref :'Users',
            unique:true,
            required:true
        },
        
        followers:[{
            type:Schema.Types.ObjectId,
            ref:'Users',
            unique:true
        }
    ],
    following:
        [{
            type:Schema.Types.ObjectId,
            ref:'Users',
            unique:true
        }
    ],
    }
);

const followingandfollowers = mongoose.model("following",followingandfollowersSchema);

module.exports = followingandfollowersSchema;
