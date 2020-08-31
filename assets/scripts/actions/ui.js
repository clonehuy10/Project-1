'use strict'
const store = require('./../store')
const api = require('./api')

// Sign up new account
const onSignUpSuccess = function (response) {
  $('#message').text('Thanks for signing up ' + response.user.email)
  $('#sign-up-form').trigger('reset')
}
const onSignUpFailure = function (response) {
  $('#message').text('Sign up failed, please try again')
}

// Sign in and check number of game played
const onGetGame = function (response) {
  console.log(response)
  $('#number-game-played').text(`Number of games you have played: ${Object.keys(response.games).length} games`)
}
const onSignInSuccess = function (response) {
  store.user = response.user
  $('#message').text('')
  $('#message').text('Thanks for signing in ' + response.user.email)
  $('#sign-in-form').trigger('reset')
  $('#change-password').show()
  $('#sign-out').show()
  $('#sign-up-form').hide()
  $('#sign-in-form').hide()
  $('#start-game').show()
  $('#number-game-played').show()
  api.getGame()
    .then(onGetGame)
}
const onSignInFailure = function () {
  $('#message').text('Sign in failed, please try again')
}

// Change password
const onChangeSuccess = function () {
  $('#message').text('Changed password successfully')
  $('#change-password').trigger('reset')
}
const onChangeFailure = function () {
  $('#message').text('Change password failed, please try again')
}

// Sign out
const onSignOutSuccess = function () {
  store.user = null
  $('#message').text('See you next time!!!!')
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#sign-up-form').show()
  $('#sign-in-form').show()
  $('#start-game').hide()
  $('#number-game-played').hide()
}
const onSignOutFailure = function () {
  $('#message').text('Failed to sign out!!!!')
}

// Start a new game
const onStartGameSuccess = function (response) {
  store.game = response.game
  $('#message').text('LET PLAY!!!!')
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#start-game').hide()
  $('#restart').show()
  $('.board').show()
  $('#number-game-played').hide()
  $('#exit').show()
}
const onStartGameFailure = function () {
  $('#message').text('Error....... cannot start game, please try again!')
}

// An empty board to keep track of the game with player turn
const currentState = {
  playerTurn: 'X',
  board: ['', '', '', '', '', '', '', '', '']
}
// Winning combination
const winArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
]
// Check winner
const checkWinner = function (currentState) {
  return winArray.some(row => {
    return row.every(index => {
      return currentState.board[index].includes(currentState.playerTurn)
    })
  })
}

// PLAY GAME
const playGame = function (boxLocation) {
  // only allow player to play when they click on avaiable space
  if ($('#' + boxLocation).html().length === 0) {
    // display the moves on board
    currentState.board[boxLocation] = currentState.playerTurn
    $('#' + boxLocation).text(currentState.playerTurn)

    // check winner
    if (checkWinner(currentState)) {
      $('#message').text('Player ' + currentState.playerTurn + ' won the game!!!!!')
      $('.board').hide()
      $('#restart').show()
      api.endGame(boxLocation, currentState.playerTurn)
      api.getGame()
        .then(onGetGame)
    }

    // check tie game
    if (currentState.board.every(a => a === 'X' || a === 'O')) {
      $('#message').text('Tie Game!!!!!!!')
      $('.board').hide()
      $('#restart').show()
      api.endGame(boxLocation, currentState.playerTurn)
    }

    // rotate turn
    currentState.playerTurn = currentState.playerTurn === 'X' ? 'O' : 'X'
  }
}

// Start another game
const onRestartSuccess = function (response) {
  store.game = response.game
  currentState.playerTurn = 'X'
  currentState.board = ['', '', '', '', '', '', '', '', '']
  $('.box').text('')
  $('.board').show()
  $('#message').text('LET PLAY AGAIN!!!!')
}
const onRestartFailure = function () {
  $('#message').text('Sorry but you cannot play anymore, please come back at another time!')
}

// Go back to change password and sign out
const onExit = function () {
  api.getGame()
    .then(onGetGame)
  currentState.playerTurn = 'X'
  currentState.board = ['', '', '', '', '', '', '', '', '']
  $('.box').text('')
  $('#message').text('')
  $('#change-password').show()
  $('#sign-out').show()
  $('#start-game').show()
  $('#exit').hide()
  $('#restart').hide()
  $('#number-game-played').show()
  $('.board').hide()
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangeSuccess,
  onChangeFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onStartGameSuccess,
  onStartGameFailure,
  onExit,
  currentState,
  playGame,
  onRestartSuccess,
  onRestartFailure,
  onGetGame
}
