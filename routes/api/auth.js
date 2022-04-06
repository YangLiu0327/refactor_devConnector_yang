const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// router get api/auth
// des    test router
// access public

router.get('/', auth, async (req, res)=> {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
  }catch(err){
    console.log(err.message)
    res.status(500).send('Server Error')
  }
}); 

// route post/api/auth
// des   authenticate user & get token 
// access public

router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'password is required'
  ).exists()
], 
async (req, res)=> {
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
 
    const { email, password } = req.body;

    try {
    // see if user exists
      let user = await User.findOne({ email });

      if(!user){
       return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] });
      }
    // using bcrypt to compare password vs userpassword
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]});
    }

    // return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(
      payload, 
      config.get('jwtSecret'),
      { expiresIn: '5 days'},
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