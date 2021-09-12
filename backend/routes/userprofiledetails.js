const router = require('express').Router();
const userProfileDetails = require('../models/userprofiledetails.model');

/*
get user details

*/
router.route('/:id').get((req,res)=>{
    //const userid = req.body.userid;
   /// let userid;
   userProfileDetails.findOne({userid:req.params.id}).then((err,user)=>{
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
  
 userProfileDetails.findOneAndUpdate({userid:userid},profileDataToUpdate,{ "new": true, "upsert": true }).then(()=>{res.json("profile updated to list")})
 .catch(err => res.status(400).json('error while adding followerid into userid table ' + err));

});






/*
add follower

*/

router.route('/follow').post((req,res)=>{
   const userid=req.body.userid;
   const followerid = req.body.followerId;
   /*
   add  followerid into user follower's array
   */
  userProfileDetails.findOneAndUpdate({userid:userid},{"$addToSet":{
    "followers":followerid
  }},{ "new": true, "upsert": true }).then(()=>{res.json("follower added to list")})
  .catch(err => res.status(400).json('error while adding followerid into userid table ' + err));

  /*
   add userid into follower's following  array
   */
  userProfileDetails.findOneAndUpdate({userid:followerid},{"$addToSet":{
    "following":userid
  }},{ "new": true, "upsert": true }).then(()=>{res.json("user added to following list")})
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
 }},{ "new": true, "upsert": true }).then(()=>{res.json("user removed from following list")})
 .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;