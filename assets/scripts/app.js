'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const events = require('./actions/events')
$('#change-password').hide()
$('#sign-out').hide()
$('#end-game').hide()
$('#restart').hide()
$('#start-game').hide()
$('#end-game').hide()
$('.table').hide()

$(() => {
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-in-form').on('submit', events.onSignIn)
  $('#change-password').on('submit', events.onChangePassword)
  $('#sign-out').on('submit', events.onSignOut)
  $('#start-game').on('click', events.onStartGame)
  $('#end-game').on('click', events.onEndGame)
  $('.box').on('click', events.onBoxClick)
  $('#restart').on('click', events.onRestart)
})
