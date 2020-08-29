'use strict'
const store = require('./../store')
// const api = require('./api')

const onSignUpSuccess = function (response) {
  $('#message').text('Thanks for signing up ' + response.user.email)
  $('#sign-up-form').trigger('reset')
}
const onSignUpFailure = function (response) {
  $('#message').text('Sign up failed, please try again')
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
}
const onSignInFailure = function () {
  $('#message').text('Sign in failed, please try again')
}

const onChangeSuccess = function () {
  $('#message').text('Changed password successfully')
  $('#change-password').trigger('reset')
}
const onChangeFailure = function () {
  $('#message').text('Change password failed, please try again')
}

const onSignOutSuccess = function () {
  store.user = null
  $('#message').text('See you next time!!!!')
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#sign-up-form').show()
  $('#sign-in-form').show()
  $('#start-game').hide()
}
const onSignOutFailure = function () {
  $('#message').text('Failed to sign out!!!!')
}

const onStartGameSuccess = function (response) {
  store.game = response.game
  $('#message').text('LET PLAY!!!!')
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#start-game').hide()
  $('#end-game').show()
  $('#restart').show()
  $('.table').show()
}
const onStartGameFailure = function () {
  $('#message').text('Error....... cannot start game, please try again!')
}
const onEndGame = function () {
  $('#message').text('')
  $('#change-password').show()
  $('#sign-out').show()
  $('#start-game').show()
  $('#end-game').hide()
  $('#restart').hide()
}
// const onRestart = function () {
//   console.log('restart the game')
// }

// an empty table to keep track of the game with player turn
const currentState = {
  playerTurn: 'X',
  table: ['', '', '', '', '', '', '', '', '']
}
// winning combination
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
// checkwinner
const checkWinner = function (currentState) {
  return winArray.some(row => {
    return row.every(index => {
      return currentState.table[index].includes(currentState.playerTurn)
    })
  })
}
// PLAY GAME
const playGame = function (boxLocation) {
  // only allow player to play when they click on avaiable space
  if ($('#' + boxLocation).html().length === 0) {
  // rotate turn
    currentState.playerTurn = currentState.playerTurn === 'X' ? 'O' : 'X'

    // display the moves on table
    currentState.table[boxLocation] = currentState.playerTurn
    $('#' + boxLocation).text(currentState.playerTurn)
    // check tie game
    if (currentState.table.every(a => a === 'X' || a === 'O')) {
      $('#message').text('Tie Game!!!!!!!')
      $('.table').hide()
      $('#restart').show()
      // api.endGame(boxLocation, currentState.playerTurn)
    }
    // check winner
    if (checkWinner(currentState)) {
      $('#message').text('Player ' + currentState.playerTurn + ' won the game!!!!!')
      $('.table').hide()
      $('#restart').show()
      // api.endGame(boxLocation, currentState.playerTurn)
    }
  }
}
const onRestartSuccess = function (response) {
  store.game = response.game
  currentState.playerTurn = 'X'
  currentState.table = ['', '', '', '', '', '', '', '', '']
  $('.box').text('')
  $('.table').show()
  $('#message').text('LET PLAY AGAIN!!!!')
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
  onEndGame,
  currentState,
  playGame,
  onRestartSuccess
}
