const router = require('express').Router();
const Users = require('../models/users.model');


//fetches all users data
router.route('/').get((req, res) => {
  Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


//creating user || registering user
router.route('/add').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const fullname = req.body.fullname;
  const bio = req.body.bio;
  const link = req.body.link;
  const avatar = req.body.avatar;


  Users.exists({email:email}).then(exists=>{
    if(!exists){
      console.log("email not exists in db",email);
      const newUser = new Users({email,password,username,fullname,bio,link,avatar});
      newUser.save()
        .then(() => res.json('User added!'))
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





module.exports = router;