require('dotenv').config();

const routes = require('./routes/routes');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.MONGODB_URI;
const cors = require('cors');

// AUTH STUFF
const authRoute = require('./routes/authRoute')
const auth = require('./middleware/auth.js')()
const passport = require('passport');
const User = require('./model/user')
const LocalStrategy = require('passport-local');
const bodyParser = require("body-parser");
// const session = require('express-session');

// Initialize the express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.initialize());
passport.use(new LocalStrategy(User.authenticate()));


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.get("/", (req, res) => { 
  res.send("hello worl") 
})

app.use(require("express-session")({
  secret:"Miss white is my cat",
  resave: false,
  saveUninitialized: false
}));

app.use(cors());
app.use(express.json());
app.use('/api', routes)
app.use(authRoute)

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(8080, () => {
    console.log(`Server Started at ${8080}`)
})
