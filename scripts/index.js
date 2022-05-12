const $boardItem0 = document.querySelector('.board-item0')
const $boardItem1 = document.querySelector('.board-item1')
const $boardItem2 = document.querySelector('.board-item2')
const $boardItem3 = document.querySelector('.board-item3')
const $boardItem4 = document.querySelector('.board-item4')
const $boardItem5 = document.querySelector('.board-item5')
const $boardItem6 = document.querySelector('.board-item6')
const $boardItem7 = document.querySelector('.board-item7')
const $boardItem8 = document.querySelector('.board-item8')

const $boardAllItems = document.querySelectorAll(
  '.tictactoe__game-battlefield--match'
)

const $player1Score = document.querySelector('.player1-score')
const $player2Score = document.querySelector('.player2-score')
// const $playerTurn = document.querySelector('.player-turn')

let currentMove = 'X'
let scorePlayer1 = 0
let scorePlayer2 = 0

let quant = 0

function toggleMove() {
  if (currentMove == 'X') {
    currentMove = 'O'
    $playerTurn.innerHTML = 'Jogador 2'
  } else {
    currentMove = 'X'
    $playerTurn.innerHTML = 'Jogador 1'
  }
}

function verifyGame() {
  if (
    $boardItem0.innerHTML != '' &&
    $boardItem0.innerHTML == $boardItem1.innerHTML &&
    $boardItem0.innerHTML == $boardItem2.innerHTML
  ) {
    // alert('LINHA 0')
    return currentMove
  }

  if (
    $boardItem3.innerHTML != '' &&
    $boardItem3.innerHTML == $boardItem4.innerHTML &&
    $boardItem3.innerHTML == $boardItem5.innerHTML
  ) {
    // alert('LINHA 1')
    return currentMove
  }

  if (
    $boardItem6.innerHTML != '' &&
    $boardItem6.innerHTML == $boardItem7.innerHTML &&
    $boardItem6.innerHTML == $boardItem8.innerHTML
  ) {
    // alert('LINHA 2')
    return currentMove
  }
  if (
    $boardItem0.innerHTML != '' &&
    $boardItem0.innerHTML == $boardItem3.innerHTML &&
    $boardItem0.innerHTML == $boardItem6.innerHTML
  ) {
    // alert('COLUNA 0')
    return currentMove
  }

  if (
    $boardItem1.innerHTML != '' &&
    $boardItem1.innerHTML == $boardItem4.innerHTML &&
    $boardItem1.innerHTML == $boardItem7.innerHTML
  ) {
    // alert('COLUNA 1')
    return currentMove
  }

  if (
    $boardItem2.innerHTML != '' &&
    $boardItem2.innerHTML == $boardItem5.innerHTML &&
    $boardItem2.innerHTML == $boardItem8.innerHTML
  ) {
    // alert('COLUNA 2')
    return currentMove
  }

  if (
    $boardItem0.innerHTML != '' &&
    $boardItem0.innerHTML == $boardItem4.innerHTML &&
    $boardItem0.innerHTML == $boardItem8.innerHTML
  ) {
    // alert('DIAGONAL 0')
    return currentMove
  }

  if (
    $boardItem2.innerHTML != '' &&
    $boardItem2.innerHTML == $boardItem4.innerHTML &&
    $boardItem2.innerHTML == $boardItem6.innerHTML
  ) {
    // alert('DIAGONAL 1')
    return currentMove
  }
}

function scoreCount(winner) {
  if (winner == 'X') {
    scorePlayer1 += 1
    if (scorePlayer1 < 10) {
      $player1Score.innerHTML = '0' + scorePlayer1
    } else {
      $player1Score.innerHTML = scorePlayer1
    }
  } else if (winner == 'O') {
    scorePlayer2 += 1
    if (scorePlayer2 < 10) {
      $player2Score.innerHTML = '0' + scorePlayer2
    } else {
      $player2Score.innerHTML = scorePlayer2
    }
  }
}

function fieldReset() {
  $boardAllItems.forEach(function (item) {
    item.innerHTML = ''
  })
}


function checker() {
  const gameResult = verifyGame()
  if (gameResult == 'X' || gameResult == 'O') {
    scoreCount(gameResult)
    setTimeout(fieldReset, 1000)
    currentMove = 'O'
  }
  toggleMove()
}

$boardItem0.addEventListener('click', function () {
  if ($boardItem0.innerHTML != '') {
    return
  }
  $boardItem0.innerHTML = currentMove
  checker()
})

$boardItem1.addEventListener('click', function () {
  if ($boardItem1.innerHTML != '') {
    return
  }
  $boardItem1.innerHTML = currentMove
  checker()
})

$boardItem2.addEventListener('click', function () {
  if ($boardItem2.innerHTML != '') {
    return
  }
  $boardItem2.innerHTML = currentMove
  checker()
})

$boardItem3.addEventListener('click', function () {
  if ($boardItem3.innerHTML != '') {
    return
  }
  $boardItem3.innerHTML = currentMove
  checker()
})

$boardItem4.addEventListener('click', function () {
  if ($boardItem4.innerHTML != '') {
    return
  }
  $boardItem4.innerHTML = currentMove
  checker()
})

$boardItem5.addEventListener('click', function () {
  if ($boardItem5.innerHTML != '') {
    return
  }
  $boardItem5.innerHTML = currentMove
  checker()
})

$boardItem6.addEventListener('click', function () {
  if ($boardItem6.innerHTML != '') {
    return
  }
  $boardItem6.innerHTML = currentMove
  checker()
})

$boardItem7.addEventListener('click', function () {
  if ($boardItem7.innerHTML != '') {
    return
  }
  $boardItem7.innerHTML = currentMove
  checker()
})

$boardItem8.addEventListener('click', function () {
  if ($boardItem8.innerHTML != '') {
    return
  }
  $boardItem8.innerHTML = currentMove
  checker()
})
