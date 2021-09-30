const router = require('express').Router();
const posts = require('../models/posts.model');
const userProfileDetails = require("../models/userprofiledetails.model");

/*
get posts with given id's

**/

router.route('/posts/:userid').get((req,res)=>{
   // console.log(req.params.userid);
   try{
        userProfileDetails.findOne({userid:req.params.userid},(err,user)=>{
            if(!err){
               posts.find({
                'userid':{
                    $in:[...user.following,req.params.userid]
                }
               },(err,alltheposts)=>{
                   if(!err)
                res.send(alltheposts);
              //  else
            //    console.log(err);
            }
               )
            }
            else
            throw err;
        })
    }
    catch(err){
        console.log(err);
    }
})


/*
get only user posts 

**/

router.route('/userposts/:id').get((req,res)=>{
    posts.find({userid:req.params.id},(err,alltheposts)=>{
        if(!err)
        res.send(alltheposts);
        else{
            res.status(400).json("error in fetching user posts");
                }
    });
})
 
/*
add new post
*/

router.route('/addpost').post((req,res)=>{    
    const postToAdd = {
        userid : req.body.userid,
        caption  : req.body.caption,
        postimg : req.body.postimg,
        likes :req.body.likes,
    }
        const newPost = new posts(postToAdd);
        newPost.save().then(()=>{
                console.log("post added successfully");
                res.status(200).send(newPost);
        }).catch((err)=>{
            console.log(err);
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
         
    const postid =req.body.postid;
    const userid = req.body.userid;
    console.log(postid,userid);
    const addLike = {
        "$addToSet":{
            "likes":userid
        }
    }
    posts.findByIdAndUpdate(postid,addLike,(err,result)=>{
        if(err){
            console.log("post like not success")
        res.json(`error liking post $(err)`);
    }
        else{
            console.log("post like success")
        res.json("post successfully liked...");
        }
    })
});

/*
post dislike
*/
router.route('/removepostlike').post((req,res)=>{
      const postid =req.body.postid;
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