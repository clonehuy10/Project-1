'use strict'
const config = require('./../config')
const store = require('./../store')

const startGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const playGame = function (boxLocation, activePlayer, over) {
  // console.log('boxLocation: ', boxLocation)
  // console.log('activePlayer: ', activePlayer)
  // console.log('over: ', activePlayer)
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game._id,
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      game: {
        cell: {
          index: boxLocation,
          value: activePlayer
        },
        over: over
      }
    }
  })
}

module.exports = {
  startGame,
  playGame
}
