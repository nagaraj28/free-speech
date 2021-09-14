const router = require('express').Router();
const usersCredentials = require('../models/userscredentials.model');
const userProfileDetails = require('../models/userprofiledetails.model');




/*
fetches all users data 
remove it after testing...

*/
router.route('/').get((req, res) => {
  usersCredentials.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


//creating user or registering user
router.route('/add').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const fullname = req.body.fullname;
  const bio = req.body.bio;
  const link = req.body.link;
  const avatar = req.body.avatar;
  const followers = [];
  const following = [];
  let userid;
  usersCredentials.exists({email:email}).then(exists=>{
    if(!exists){
      console.log("email not exists in db",email);
      const newUser = new usersCredentials({email,password});
      newUser.save()
        .then((userCreated)=>{
          res.json('User added!');
          console.log("useradded ")
          userid=userCreated.id;
         console.log(userid);
         const userProfileHydrate = new userProfileDetails({userid,username,fullname,bio,link,avatar,followers,following});
      userProfileHydrate.save().then((err,userDetail)=>{
        console.log("userprofile added/hydrated...")
      // console.log("userDetails",userDetail);
       //console.log("error in profile add",err);
      }).catch(err=>{
        console.log("error in user profile adding",err);
      })
      });
    }
    else{
      res.json("user already exists");
     // console.log(exists,"user already exist in mongodb");
    }
  }).catch(err=>{
    console.log(err);
  });
  
});



module.exports = router;