$(document).ready(function () {
  $('.parallax').parallax()

  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: -70, // Spacing from edge
    belowOrigin: true, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    stopPropagation: false // Stops event propagation
  })
})

var app = new Vue({
  el: '#root',
  data: {
    add: {
      content: ''
    },
    edit: {
      _id: '',
      content: ''
    },
    games: []
  },
  methods: {
    loadGames: function () {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/games',
        success: function (resp) {
          for (let i = 0; i < resp.length; i++) {
            app.games = resp[i].content
          }
        },
        error: function () {
          console.log('GET loadGames request error')
        }
      })
    },

    addGame: function () {
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/games',
        data: {
          content: app.add.content
        },
        success: function (resp) {
          console.log(resp.content)
          console.log('add ', [{content: resp.content}])
          app.add.content = ''
          app.games = [{content: resp.content}]
        },
        error: function () {
          console.log('POST addGame request error')
        }
      })
    },

    getGame: function (id) {
      $.ajax({
        type: 'GET',
        url: `http://localhost:3000/api/twatt/${id}`,
        success: function (resp) {
          app.edit._id = resp._id,
          app.edit.content = resp.content,
          app.edit.userid = resp.userid,
          app.edit.postedby = resp.postedby,
          app.edit.tag = resp.tag
        },
        error: function () {
          console.log('GET getGame request error')
        }
      })
    },

    deleteGame: function (id) {
      $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/twatt/${id}`,
        success: function (resp) {
          app.loadGames()
        },
        error: function () {
          console.log('DELETE deleteGame request error')
        }
      })
    }
  }
})

app.loadGames()
