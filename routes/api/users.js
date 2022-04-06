const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');   // 加密
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @router   GET api/users
// @desc     Test route
// @access   Public
router.get('/', (req, res)=> res.send('User router'));

// @router   Post api/users
// @desc     Register route
// @access   Public
router.post('/', [
  check('name', 'Name is Required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters'
  ).isLength({min: 6})
], 
async (req, res)=> {
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    // post patch put => req.body
    // get => req.param (body param)
    // id /v1/trainers/xxxx => req.params (route param)

    const { name, email, password } = req.body;

    try {
    // see if user exists
      let user = await User.findOne({ email });

      if(user){
       return res.status(400).json({ errors: [{ msg: 'User already exists'}] });
      }
    // get user gravatar 
     const avatar = gravatar.url(email, {
       s: '200',
       r: 'pg',
       d: 'mm'
     })

     user = new User({
       name,
       email,
       avatar,
       password
     });

    // encrypt password
     const salt = await bcrypt.genSalt(10);  // documentation
     user.password = await bcrypt.hash(password, salt);
     await user.save();
     
    // return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(
      payload, 
      config.get('jwtSecret'),
      { expiresIn: 360000},
      (err, token)=> {
        if(err) throw err;
        res.json({ token });
      });
    // res.send('User registered');
    }catch(err){
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  });


module.exports = router;


