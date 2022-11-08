const express = require('express');
const cors = require('cors');

const router = express.Router()
const Fuse = require('fuse.js')

const Model = require('../model/model')

module.exports = router;

// Post Method
router.post('/post', (req, res) => {
  const data = new Model({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  })

  try {
    const dataToSave = data.save();
    res.status(200).json(dataToSave)
  }
  catch(error) {
    res.status(400).json({message: error.message})
  }
})

// Get all Posts
router.get('/posts', cors(), async (req, res) => {
  const categories = JSON.parse(req.query.categories)

  try {
    if (categories.length) {
      console.log(categories)
      var data = await Model.find({categories: { $in: categories }})
    } else {
      var data = await Model.find()
    }

    const fuse = new Fuse(data, {keys: ['title', 'date'] })

    var foundPosts = req.query.search ? fuse.search(req.query.search) : data

    res.json(foundPosts)
  }
  catch(error) {
    res.status(500).json({message: error.message})
  }
})

// Get by ID Method
router.get('/getOne/:id', async (req, res) => {
  try{
    const data = await Model.findById(req.params.id);
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const result = await Model.findByIdAndUpdate(
          id, updatedData, options
      )

      res.send(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const data = await Model.findByIdAndDelete(id)
      res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})