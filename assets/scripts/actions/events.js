'use strict'
const getFormFields = require('./../../../lib/get-form-fields')
const addNestedValue = require('./../../../lib/add-nested-value')
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

const onBoxClick = function (event) {
  event.preventDefault()
  const clickCell = event.target
  console.log(clickCell)
  console.log('click')
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
