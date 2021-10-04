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

router.route('/verifycredentials').post((req,res)=>{
      const email = req.body.email;
      const password = req.body.password;
      try{
        console.log(email);
        usersCredentials.exists({email:email}).then((exists,error)=>{
          if(!exists){
            res.send("wrong credentials,please check!");
            throw error;
          }
          else{
            usersCredentials.findOne({email:email,password:password},(error,user)=>{
              if(!error){
              console.log(user._id);
              const userid=user._id;
              res.send(userid);    
              }
              else{
                res.send("error logging in");
                throw error;
              }
             })
            }
          }).catch(error=>console.log(error));
        }
        catch(err){
          console.log(err);
        }
      });

//creating user or registering user
router.route('/add').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const fullname = req.body.fullname;
  const bio = '';
  const link = '';
  const avatar = '';
  const followers = [];
  const following = [];
  let userid;
  usersCredentials.exists({email:email}).then(exists=>{
    if(!exists){
      //console.log("email not exists in db",email);
    userProfileDetails.exists({username:username}).then(isUsernameThere=>{
      const newUser = new usersCredentials({email,password});
      if(!isUsernameThere){
      newUser.save()
        .then((userCreated)=>{
//res.send('account created successfully!');
        console.log("useradded ")
        userid=userCreated.id;
         console.log(userid);
         const userProfileHydrate = new userProfileDetails({userid,username,fullname,bio,link,avatar,followers,following});
         userProfileHydrate.save().then((err,userDetail)=>{
           res.send("registration successful !")
       console.log("userprofile added/hydrated...")
      // console.log("userDetails",userDetail);
       //console.log("error in profile add",err);
      }).catch(err=>{
        console.log("error in user profile adding",err);
      })
      })
    }
    else{
      res.send("username already exists");
    }
    }).catch(err=>console.log(err))
    }
    else{
      res.send("email already exists");
     // console.log(exists,"user already exist in mongodb");
    }
  }).catch(err=>{
    console.log(err);
  });
  
});



module.exports = router;