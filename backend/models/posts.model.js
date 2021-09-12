const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        ref:'userCredentials',
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
        ref:'userCredentials',
        }
    }],
    comments:[{
        commentbyUser:{
            type:Schema.Types.ObjectId,
            ref:'userCredentials',
        },
        commentBody:{
            type:String,
        }
    }]
})





const posts = mongoose.model('posts',postSchema);

module.exports = posts;
