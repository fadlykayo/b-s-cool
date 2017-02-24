var express = require('express')
var router = express.Router()
const gameController = require('../controllers/games')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Go to http://localhost:8080/')
})

// API

router.get('/api', function (req, res, next) {
  res.send({
    endpoints: [
      '/api/games',
      '/api/games/:id'
    ]
  })
})

router.get('/api/games', gameController.getAllGames)

router.get('/api/games/:id', gameController.getGameById)

router.post('/api/games', gameController.createGame)

router.delete('/api/games/:id', gameController.deleteGame)

// // Users
//
// router.get('/auth', function (req, res, next) {
//   res.send({
//     endpoints: [
//       '/auth/users/register',
//       '/auth/users/login',
//       '/auth/users',
//       '/auth/users/:id'
//     ]
//   })
// })
//
// router.post('/auth/users/register', userController.createUser)
//
// router.post('/auth/users/login', userController.verifyUser)
//
// router.get('/auth/users', userController.getUsers)
//
// router.get('/auth/users/:id', userController.getUser)
//
// router.put('/auth/users/:id', userController.updateUser)
//
// router.delete('/auth/users/:id', userController.deleteUser)

module.exports = router
