'use strict'
const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

// Account related events
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

// Game events
const onStartGame = function (event) {
  event.preventDefault()
  api.startGame()
    .then(ui.onStartGameSuccess)
    .catch(ui.onStartGameFailure)
}

const onBoxClick = function (event) {
  console.log(event.target)
  event.preventDefault()
  const boxLocation = event.target.id

  ui.playGame(boxLocation)
}

const onExit = function (event) {
  event.preventDefault()
  ui.onExit()
}

const onRestart = function (event) {
  event.preventDefault()
  api.startGame()
    .then(ui.onRestartSuccess)
    .catch(ui.onStartGameFailure)
}
module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onStartGame,
  onExit,
  onRestart,
  onBoxClick
}
