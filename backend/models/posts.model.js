const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        ref:'Users',
    },
    caption:{
        type:String,
    },
    postimg:{
        Type:String,
        
    },
    likes:[{
        userliked:{
            type:Schema.Types.ObjectId,
        ref:'User',
        }
    }],
    comments:[{
        commentbyUser:{
            type:Schema.Types.ObjectId,
            ref:'User',
        },
        commentBody:{
            type:String,
        }
    }]
})

const posts = mongoose.model('posts',postSchema);

module.exports = posts;
