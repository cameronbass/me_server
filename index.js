require('dotenv').config();

const routes = require('./routes/routes');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.MONGODB_URI;
const cors = require('cors');

mongoose.connect(mongoString);
const database = mongoose.connection;

console.log(database)

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(express.json());
app.use('/api', routes)

app.use(cors());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})