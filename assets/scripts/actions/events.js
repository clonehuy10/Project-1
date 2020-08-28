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
const onRestart = function (event) {
  event.preventDefault()
  ui.onRestart()
}

const click1 = function () {
  event.preventDefault()
  ui.click()
}
const click2 = function (event) {
  event.preventDefault()
  console.log($('#2').val())
}
const click3 = function (event) {
  event.preventDefault()
}
const click4 = function (event) {
  event.preventDefault()
}
const click5 = function (event) {
  event.preventDefault()
}
const click6 = function (event) {
  event.preventDefault()
}
const click7 = function (event) {
  event.preventDefault()
}
const click8 = function (event) {
  event.preventDefault()
}
const click9 = function (event) {
  event.preventDefault()
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onStartGame,
  onEndGame,
  onRestart,
  click1,
  click2,
  click3,
  click4,
  click5,
  click6,
  click7,
  click8,
  click9,
}
