const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
  content: mongoose.Schema.Types.Mixed
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Games', GameSchema)
