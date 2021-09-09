const router = require('express').Router();
const Users = require('../models/users.model');


//fetches all users data
router.route('/').get((req, res) => {
  res.send("<h1>connected</h1>");
  /*Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
    */
});






module.exports = router;