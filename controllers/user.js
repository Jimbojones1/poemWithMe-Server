const express = require('express');
const User = require('../models/user');
const router = express.Router();


router.post('/entry', async (req, res, next) => {
    console.log(req.body.username)
        try {
          const user = await User.create(req.body);
          res.send(user)
        } catch (err) {
          res.send('error')
        }

});

router.post('/login', async (req, res, next) => {
    console.log(req.body.username)
        try {
          const user = await User.create(req.body);
          res.send(user)
        } catch (err) {
          res.send('error')
        }

});


router.post('/registration', async (req, res, next) => {
    console.log(req.body.username)
        try {
          const user = await User.create(req.body);
          res.send(user)
        } catch (err) {
          res.send('error')
        }

});






module.exports = router;
