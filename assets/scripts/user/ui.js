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

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangeSuccess,
  onChangeFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onGetGame
}
