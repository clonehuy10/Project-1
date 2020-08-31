'use strict'
const store = require('./../store')
const userApi = require('./../user/api')
const userUi = require('./../user/ui')
const api = require('./api')

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

    // game logic
    if (checkWinner(currentState)) {
      // check winner

      $('#message').text('Player ' + currentState.playerTurn + ' won the game!!!!!')
      $('.board').hide()
      $('#restart').show()
      // currentState.over = true
      api.playGame(boxLocation, currentState.playerTurn, true)
    } else if (currentState.board.every(a => a === 'X' || a === 'O')) {
      // check tie game

      $('#message').text('Tie Game!!!!!!!')
      $('.board').hide()
      $('#restart').show()
      // currentState.over = true
      api.playGame(boxLocation, currentState.playerTurn, true)
    } else {
      // keep playing

      api.playGame(boxLocation, currentState.playerTurn, false)
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
  $('#message').text('LET PLAY AGAIN!!!!')
  $('.board').show()
  userApi.getGame()
    .then(userUi.onGetGame)
}
const onRestartFailure = function () {
  $('#message').text('Sorry but you cannot play anymore, please come back at another time!')
}

// Go back to change password and sign out
const onExit = function () {
  userApi.getGame()
    .then(userUi.onGetGame)
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
  onStartGameSuccess,
  onStartGameFailure,
  onExit,
  currentState,
  playGame,
  onRestartSuccess,
  onRestartFailure
}
