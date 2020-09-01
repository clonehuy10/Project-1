'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const userEvents = require('./user/events')
const gameEvents = require('./game/events')

$('#change-password').hide()
$('#sign-out').hide()
$('#restart').hide()
$('#start-game').hide()
$('#exit').hide()
$('.board').hide()
$('#number-game-played').hide()
$('.bean1').hide()
$('.bean2').hide()

$(() => {
  $('#sign-up-form').on('submit', userEvents.onSignUp)
  $('#sign-in-form').on('submit', userEvents.onSignIn)
  $('#change-password').on('submit', userEvents.onChangePassword)
  $('#sign-out').on('submit', userEvents.onSignOut)
  $('#start-game').on('click', gameEvents.onStartGame)
  $('.box').on('click', gameEvents.onBoxClick)
  $('#restart').on('click', gameEvents.onRestart)
  $('#exit').on('click', gameEvents.onExit)
})
