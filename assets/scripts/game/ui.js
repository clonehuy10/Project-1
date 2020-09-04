'use strict'
const store = require('./../store')
const userApi = require('./../user/api')
const userUi = require('./../user/ui')
const api = require('./api')

// Start a new game
const onStartGameSuccess = function (response) {
  store.game = response.game

  $('#message').show()
  $('#message-failure').hide()
  $('#message').text('~~~LET PLAY!!!!~~~')
  $('#player-turn').text('Current player: X')
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#start-game').hide()
  $('#restart').show()
  $('.board').show()
  $('#number-game-played').hide()
  $('#exit').show()
}
const onStartGameFailure = function () {
  $('#message-failure').text('Error....... cannot start game, please try again!')
}

// An empty board to keep track of the game with player turn
const currentState = {
  playerTurn: 'X',
  board: ['', '', '', '', '', '', '', '', '']
}
// Winning combination
const winArray = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6]
]
// Check winner
const checkWinner = function () {
  return winArray.some(row => { // true or false
    return row.every(index => { // true or false
      return currentState.board[index].includes(currentState.playerTurn)
    })
  })
}
// PLAY GAME
const playGame = function (boxLocation) {
  // only allow player to play when they click on avaiable space
  if ($('#' + boxLocation).text().length === 0) {
    // display the moves on board
    currentState.board[boxLocation] = currentState.playerTurn
    $('#' + boxLocation).text(currentState.playerTurn)
    $('#message-failure').hide()

    // game logic
    if (checkWinner(currentState)) {
      // check winner

      $('#message').text('Player ' + currentState.playerTurn + ' won the game!!!!!')
      $('#player-turn').hide()
      $('.board').hide()
      $('#restart').show()
      $('.bean2').show()
      api.playGame(boxLocation, currentState.playerTurn, true)
    } else if (currentState.board.every(a => a === 'X' || a === 'O')) {
      // check tie game

      $('#message').text('Tie Game!!!!!!!')
      $('#player-turn').hide()
      $('.board').hide()
      $('#restart').show()
      $('.bean1').show()
      api.playGame(boxLocation, currentState.playerTurn, true)
    } else {
      // keep playing

      api.playGame(boxLocation, currentState.playerTurn, false)
    }

    // rotate turn
    currentState.playerTurn = currentState.playerTurn === 'X' ? 'O' : 'X'
    $('#player-turn').text('Current player: ' + currentState.playerTurn)
  } else {
    $('#message-failure').show()
    $('#message-failure').text('Invalid Move')
  }
}

// Start another game
const onRestartSuccess = function (response) {
  store.game = response.game
  currentState.playerTurn = 'X'
  currentState.board = ['', '', '', '', '', '', '', '', '']
  $('.box').text('')

  $('#message').show()
  $('#message-failure').hide()
  $('#message').text('LET PLAY AGAIN!!!!')
  $('#player-turn').show()
  $('#player-turn').text('Current player: X')
  $('.board').show()
  $('.bean1').hide()
  $('.bean2').hide()
  userApi.getGame()
    .then(userUi.onGetGame)
}
const onRestartFailure = function () {
  $('#message').hide()
  $('#message-failure').show()
  $('#message-failure').text('Sorry but you cannot play anymore, please come back at another time!')
}

// Go back to change password and sign out
const onExit = function () {
  userApi.getGame()
    .then(userUi.onGetGame)
  currentState.playerTurn = 'X'
  currentState.board = ['', '', '', '', '', '', '', '', '']
  $('.box').text('')
  $('#message').text('')
  $('#message-failure').hide()
  $('#change-password').show()
  $('#sign-out').show()
  $('#start-game').show()
  $('#exit').hide()
  $('#restart').hide()
  $('#number-game-played').show()
  $('.board').hide()
  $('.bean').hide()
  $('#player-turn').hide()
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
