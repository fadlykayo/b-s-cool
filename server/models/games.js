const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
  content: Array
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Games', GameSchema)
