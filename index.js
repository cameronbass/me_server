require('dotenv').config();

// const basicAuth = require('express-basic-auth')
const routes = require('./routes/routes');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.MONGODB_URI;
const cors = require('cors');

// Initialize the express app
const app = express();

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.get("/", (req, res) => { res.send("hello world") })
app.use(express.json());
app.use('/api', routes)

app.use(cors());

app.listen(8080, () => {
    console.log(`Server Started at ${8080}`)
})