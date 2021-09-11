const router = require('express').Router();
const FollowingAndFollowers = require('../models/followingandfollowers.model');
const Users = require('../models/users.model');



router.route('/fetchfollowingandfollowers').post((req,res)=>{
   // const userid = req.body.userid;
    //const userfollower = req.body.userfollower;
       /* let userid = Users.findOne({email:"nag@gmail.com"}).then((err,user)=>{
            if(!err)
            userid=user._id;
        })
        */
      
});
