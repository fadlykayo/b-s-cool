const igdb = require('igdb-api-node')
const Games = require('../models/games')
const config = require('../config/config.json')
process.env.mashapeKey = config.igdb

const getGames = (cb, params) => {
  igdb.games({
    limit: 12,
    offset: 0,
    fields: 'name,url,rating,release_dates,cover',
    order: 'rating:desc',
    search: params
  }).then(function (games) {
    cb(games.body)
  }).catch(function (err) {
    cb(err)
  })
}

module.exports = {
  createGame: (req, res) => {
    getGames(function (games) {
      Games.create({
        content: games
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    }, req.body.search)
  },

  getAllGames: (req, res) => {
    Games.find().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  getGameById: (req, res) => {
    Games.findOne({
      _id: req.params.id
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  updateGame: (req, res) => {
    Games.findOneAndUpdate({
      _id: req.params.id
    }, {content: req.body.content}, {
      new: true
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  deleteGame: (req, res) => {
    Games.findOneAndRemove({
      _id: req.params.id
    }).then(function (data) {
      res.send({message: `Deleted Game with ID: ${req.params.id}`})
    }).catch(function (err) {
      res.send({message: 'Error data not found'})
    })
  }

}
