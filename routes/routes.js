const express = require('express');
const cors = require('cors');
const Fuse = require('fuse.js')
const Post = require('../model/post')
const User = require('../model/user')
const passport = require('passport');

const router = express.Router()
module.exports = router;

// router.post('/register', (req, res) => {
//   User.register(new User({ email: req.body.email, username: req.body.username }), req.body.password, function(err, user) {
//     if (err) {
//       console.log(err)
//       // return res.render('register', { account : account });
//     }

//     passport.authenticate('local')(req, res, function () {
//       res.redirect('/');
//     });
//   });
// })

// router.post('/login', passport.authenticate('local'), (req, res) => {
//     res.redirect('/');
// })

// router.get("/secret", isLoggedIn, function(req, res){
//   res.send("success");
// });

// // Login Form
// router.get("/login", function(req, res){
//   res.send("falied")
// });

// router.post("/login", passport.authenticate("local", { successRedirect: "/api/secret", failureRedirect: "/api/login" }), function(req, res) {});

// // check isLoggedIn
// function isLoggedIn(req, res, next){
//   return next();
//   // res.redirect("/login");
// }

// Get all Posts
router.get('/posts', cors(), async (req, res) => {
  const categories = JSON.parse(req.query.categories)

  try {
    if (categories.length) {
      var data = await Post.find({categories: { $in: categories }})
    } else {
      var data = await Post.find()
    }

    const fuse = new Fuse(data, {keys: ['title', 'date'] })

    var foundPosts = req.query.search ? fuse.search(req.query.search) : data

    res.json(foundPosts)
  }
  catch(error) {
    res.status(500).json({message: error.message})
  }
})
