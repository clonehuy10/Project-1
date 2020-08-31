'use strict'
const api = require('./api')
const ui = require('./ui')

const onStartGame = function (event) {
  event.preventDefault()
  api.startGame()
    .then(ui.onStartGameSuccess)
    .catch(ui.onStartGameFailure)
}

const onBoxClick = function (event) {
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
  onStartGame,
  onBoxClick,
  onExit,
  onRestart
}
