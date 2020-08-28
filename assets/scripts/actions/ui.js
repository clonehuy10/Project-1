'use strict'
const store = require('./../store')

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
  $('.container').show()
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
  $('.container').hide()
}
const onSignOutFailure = function () {
  $('#message').text('Failed to sign out!!!!')
}

const onStartGameSuccess = function () {
  $('#message').text('LET PLAY!!!!')
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#start-game').hide()
  $('#end-game').show()
  $('#restart').show()
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
const onRestart = function () {
  console.log('restart the game')
}

let turn = 0
const click = function () {
  turn += 1
  turn % 2 === 0 ? $('#1').text('O') : $('#1').text('X')
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
  onRestart,
  click
}
