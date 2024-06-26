const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');


// router get api/profile/me
// des    get current users profile
// access private
router.get('/me', auth, async (req, res)=> {
  try{
    const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name','avatar']);
    if(!profile){
      return res.status(400).json({ msg: 'There is no profile for this user'})
    }

    res.json(profile);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});


// router POST api/profile
// des    create or update users profile
// access private
router.post('/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skill is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      linkedin,
      instagram
    } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website= website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
      // set it array 
      profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
    console.log(profileFields.skills);
    // build social object
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;
    // console.log(profileFields.social.facebook);
    try{
      let profile = await Profile.findOne({ user: req.user.id });

      if(profile){
        // update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id }, 
          { $set: profileFields },
          { new: true }
          );
          return res.json(profile);
      }

      // create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    }catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
    res.send('Hello')
  }
);

// router GET api/profile
// des    get all profiles
// access public

router.get('/', async (req,res)=>{
  try {
    const profiles = await Profile.find().populate('user', ['name','avatar']);
    res.json(profiles);
  } catch(err){
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// route GET/api/profile/user/:user_id
// des   get profile by user id
// access public
router.get('/user/:user_id', async(req, res)=>{
  try{
    // id从url里获取 => req.params.user_id
    const profile = await Profile.findOne({ user: req.params.user_id}).populate('user', ['name','avatar']);
    if(!profile)
      return res.status(400).json({ msg: 'Profile not found'});
    res.json(profile)
  }catch(err){
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Sever Error')
  }
})

// router DELETE api/profile
// des    delete profile, user & posts
// public priavte
router.delete('/', auth, async (req,res)=>{
  try{
    // remove users posts
    await Post.deleteMany({ user: req.user.id })
    // delete profile
    await Profile.findOneAndRemove({ user: req.user.id})
    // delete user
    await User.findOneAndRemove({ _id: req.user.id})

    res.json({ msg: 'User deleted' })
  }catch(err){
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})


// route PUT api/profile/experience
// des   add profile experience
// access  private
router.put('/experience',
  [
    auth,
    [
      check('title', 'Title is required')
      .not()
      .isEmpty(),
      check('company', 'Company is required')
      .not()
      .isEmpty(),
      check('from', 'From date is required')
      .not()
      .isEmpty()
    ]
  ], 
  async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } 
    try{
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience
      .unshift(newExp);

      await profile.save()

      res.json(profile)
    } catch(err){
      console.error(err.message)
      res.status(500).send('Server Error')
    }
})

// route DELETE api/profile/experience/:exp_id
// des delete experience from profile by id
// access private
router.delete('/experience/:exp_id', auth, async (req, res)=>{
  try{
    const profile = await Profile.findOne({ user: req.user.id});

    // get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id)

    profile.experience.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch(err){
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

// route PUT api/profile/education
// des   add profile education
// access private

router.put('/education',
  [
    auth,
    [
      check('school', 'School is required')
      .not()
      .isEmpty(),
      check('degree', 'Degree is required')
      .not()
      .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
      .not()
      .isEmpty(),
      check('from', 'From date is required')
      .not()
      .isEmpty()
    ]
  ], 
  async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } 
    try{
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education
      .unshift(newEdu);

      await profile.save()

      res.json(profile)
    } catch(err){
      console.error(err.message)
      res.status(500).send('Server Error')
    }
})

//route DELETE api/profile/education/:edu_id
// des  delete education from profile
// access private

router.delete('/education/:edu_id', auth, async(req, res)=>{
  try{
    const profile = await Profile.findOne({ user: req.user.id })

    // get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  }catch(err){
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

// route  GET api/profile/github/:username
// des    get user repos from github
// access public

router.get('/github/:username', (req, res)=> {
  try{
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&
      sort=created:asc&client_id=${config.get(
        'githubClientId'
        )}&client_secret=$
      {config.get('githubSecret')}`, 
      method: 'GET',
      headers: { 'user-agent': 'node.js'}
    };
    // callback, 把函数 (error, response, body) 当作参数给另一个函数使用
   request(options, (error, response, body)=>{
     if(error) console.log(error);

     if(response.statusCode !== 200){
       return res.status(404).json({ msg: 'No Github profile found'})
     }

     res.json(JSON.parse(body));
  })
  }catch(err){
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})
module.exports = router;
