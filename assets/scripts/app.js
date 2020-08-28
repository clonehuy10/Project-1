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
// $('.container').hide()

$(() => {
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-in-form').on('submit', events.onSignIn)
  $('#change-password').on('submit', events.onChangePassword)
  $('#sign-out').on('submit', events.onSignOut)
  $('#start-game').on('click', events.onStartGame)
  $('#end-game').on('click', events.onEndGame)
  $('#restart').on('click', events.onRestart)

  $('#1').on('click', events.click1)
  $('#2').on('click', events.click2)
  $('#3').on('click', events.click3)
  $('#4').on('click', events.click4)
  $('#5').on('click', events.click5)
  $('#6').on('click', events.click6)
  $('#7').on('click', events.click7)
  $('#8').on('click', events.click8)
  $('#9').on('click', events.click9)
})
