const router = require('express').Router();
const posts = require('../models/posts.model');
const userProfileDetails = require("../models/userprofiledetails.model");

/*
get posts with given id's

**/

router.route('/posts/:id').get((req,res)=>{
        userProfileDetails.findOne({userid:req.params.id},(err,user)=>{
            if(!err){
               posts.find({
                'userid':{
                    $in:[user.following,req.params.id]
                }
               },(err,alltheposts)=>{
                res.send(alltheposts);
            }
               )
            }
        })
})
 
/*
add new post
*/

router.route('/addpost').post((req,res)=>{    
    const postToAdd = {
        userid : req.body.userid,
        caption  : req.body.caption,
        postimg : req.body.postimg,
    }
        const newPost = new posts(postToAdd);
        newPost.save().then(()=>{
                console.log("post added successfully");
                res.status(200).json("posted added successfully...")
        }).catch((err)=>{
            res.status(400).json("error in adding post");
        })
})

/*
delete  post with given id
*/

router.route('/deletepost/:postid').post((req,res)=>{
         
        const postid = req.params.postid;
        posts.findByIdAndDelete(postid,(err,post)=>{
                if(err){
                    res.status(400).json("error deleting post");
                }
                else{
                    res.json(`${post} deleted successfully...`);
                }
        })

})


/*
post liked
*/
router.route('/likepost').post((req,res)=>{
         
    const postid =req.body.id;
    const userid = req.body.userid;
    const addLike = {
        "$addToSet":{
            "likes":userid
        }
    }
    posts.findByIdAndUpdate(postid,addLike,(err,result)=>{
        if(err)
        res.json(`error liking post $(err)`);
        else
        res.json("post successfully liked...");
    })
 
});

/*
post dislike
*/
router.route('/removepostlike').post((req,res)=>{
         
      const postid =req.body.id;
    const userid = req.body.userid;
    const removeLike = {
        "$pull":{
            "likes":userid
        }
    }
    posts.findByIdAndUpdate(postid,removeLike,(err,result)=>{
        if(err)
        res.json(`error removing post like $(err)`);
        else
        res.json("remove dislike from post success...");
    })
  
});


module.exports =router;