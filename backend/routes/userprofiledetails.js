const router = require('express').Router();
const userProfileDetails = require('../models/userprofiledetails.model');


/*
get all the users profile data
*/

router.route('/').get((req,res)=>{
    userProfileDetails.find().then(userProfiles=>{
      res.send(userProfiles);
    }).catch(err=>res.status(400).json("error fetching all users profiles"+err))
});

/*
get user details
*/
router.route('/:username').get((req,res)=>{
    //const userid = req.body.userid;
   /// let userid;
   userProfileDetails.findOne({username:req.params.username}).then((err,user)=>{
    //  console.log(req.params.id);
    if(!err)
      res.send(user);
      else
      res.send(err);
            // console.log("error",err);
     //  console.log("user",user);
      // res.send(user);
        });
});

/*
update user profile details
*/


router.route('/profileupdate').post((req,res)=>{
  const userid=req.body.userid;
  const  profileDataToUpdate ={"$set":{
     username : req.body.username,
     fullname : req.body.fullname,
     bio : req.body.bio,
     link : req.body.link,
     avatar : req.body.avatar,
  }
};
  userProfileDetails.exists({username:req.body.username}).then(result=>{
    if(!result)
    userProfileDetails.findOneAndUpdate({userid:userid},profileDataToUpdate,{ "new": true, "upsert": true }).then(()=>{res.json("profile updated to list")})
    .catch(err => res.status(400).json('error while adding followerid into userid table ' + err));
    else
    res.send("username taken...")
  }
  ).catch(err=>res.status(400).json(`error updating profile ${err}`));
});
/*
add follower
*/
router.route('/follow').post((req,res)=>{
   const userid=req.body.userid;
   const followerid = req.body.followerid;
   /*
   add  followerid into user follower's array
   */
  console.log(userid);
  console.log(followerid);
  userProfileDetails.findOneAndUpdate({userid:userid},{"$addToSet":{
    "followers":followerid
  }},{ "new": true, "upsert": true }).then(()=>{res.json("follower added to list")})
  .catch(err => res.status(400).json('error while adding followerid into userid table ' + err));

  /*
   add userid into follower's following  array
   */
  userProfileDetails.findOneAndUpdate({userid:followerid},{"$addToSet":{
    "following":userid
  }},{ "new": true, "upsert": true }).then(()=>{
    //res.json("user added to following list")
    console.log("user added to following list...")
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

/*
unfollow

*/
router.route('/unfollow').post((req,res)=>{
  const userid=req.body.userid;
  const followerid = req.body.followerId;
  /*
  remove  followerid into user follower's array
  */
 userProfileDetails.findOneAndUpdate({userid:userid},{"$pull":{
   "followers":followerid
 }},{ "new": true, "upsert": true }).then(()=>{res.json("follower remove from list")})
 .catch(err => res.status(400).json('error while removing followerid from userid table ' + err));

 /*
  remove userid into follower's following  array
  */
 userProfileDetails.findOneAndUpdate({userid:followerid},{"$pull":{
   "following":userid
 }},{ "new": true, "upsert": true }).then(()=>{
   /*res.json("user removed from following list")*/
  })
 .catch(err => res.status(400).json('Error: ' + err));
});

/*
fetch following  userDetails list

*/

router.route('/following/:userid').get((req,res)=>{
  userProfileDetails.findOne({userid:req.params.userid},(err,user)=>{
      if(!err){
        userProfileDetails.find({
          'userid':{
              $in:[user.following]
          }
         },(err,alltheposts)=>{
           
          res.send(alltheposts);
      }
         )
      }
  })
})

/*
fetch following  userDetails list

*/

router.route('/followers/:userid').get((req,res)=>{
  userProfileDetails.findOne({userid:req.params.userid},(err,user)=>{
      if(!err){
        userProfileDetails.find({
          'userid':{
              $in:[user.followers]
          }
          
         },(err,alltheposts)=>{
          res.send(alltheposts);
      }
         )
      }
  })
})



module.exports = router;