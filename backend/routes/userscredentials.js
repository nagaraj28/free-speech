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
  usersCredentials.exists({email:email}).then(exists=>{
    if(!exists){
      console.log("email not exists in db",email);
      const newUser = new usersCredentials({email,password});
      newUser.save()
        .then((userCreated)=>{
          res.json('User added!');
         const userid=userCreated.id;
      const userProfileHydrate = new userProfileDetails({userid,username,fullname,bio,link,avatar});
      userProfileHydrate.save().then(()=>{
        res.json('user profile hydrated...')
      });
      })
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
      res.json("user already exists");
     // console.log(exists,"user already exist in mongodb");
    }
  }).catch(err=>{
    console.log(err);
  })
});

/*
updating userdetails except id,email and password
*/


module.exports = router;