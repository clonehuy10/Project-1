'use strict'
const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)

  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}
const onSignIn = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)

  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}
const onChangePassword = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)

  api.changePassword(data)
    .then(ui.onChangeSuccess)
    .catch(ui.onChangeFailure)
}
const onSignOut = function (event) {
  event.preventDefault()

  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onStartGame = function (event) {
  event.preventDefault()
  api.startGame()
    .then(ui.onStartGameSuccess)
    .catch(ui.onStartGameFailure)
}
const onEndGame = function (event) {
  event.preventDefault()
  ui.onEndGame()
}
// const onRestart = function (event) {
//   event.preventDefault()
//   ui.onRestart()
// }

const currentState = {
  playerTurn: 'X',
  table: ['', '', '', '', '', '', '', '', '']
}
let playerX = []
let playerO = []
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

const onBoxClick = function (event) {
  event.preventDefault()
  const boxLocation = event.target.id

if ($('#' + boxLocation).html().length === 0) {
    currentState.playerTurn = currentState.playerTurn === 'X' ? 'O' : 'X'
    currentState.table[boxLocation] = currentState.playerTurn
    $('#' + boxLocation).text(currentState.playerTurn)
    if (currentState.playerTurn === 'X') {
      playerX.push(boxLocation)
    } else {
      playerO.push(boxLocation)
    }

    // check winner

    // api.playGame(boxLocation, currentState.playerTurn)
  }
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onStartGame,
  onEndGame,
  // onRestart,
  onBoxClick
}
