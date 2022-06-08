const $boardAllItems = document.querySelectorAll('.tictactoe__game-battlefield--match')

const $player1Score = document.querySelector('.player1-score')
const $player2Score = document.querySelector('.player2-score')
const $playerField1 = document.querySelector('.player-field1')
const $playerField2 = document.querySelector('.player-field2')
const $winnerName = document.querySelector('.winner-name')

const $botSwap = document.querySelector('.tictactoe__menu-player-swap')
const $bestOfSwap = document.querySelector('.tictactoe__match-type-choose--holder')

const $historyMoveList = document.querySelector('.tictactoe__history-box')
const $matchHistoryList = document.querySelector('.tictactoe__match-history-list')


const winCondictionList = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]


let namePlayer1 = $playerField1.value
let namePlayer2 = $playerField2.value
let currentMove = 'X'
let scorePlayer1 = 0
let scorePlayer2 = 0
let gameStart = true
let botActive = false
let bestOf = 3

function getScenery() {
  const scenery = []

  for (const $board of $boardAllItems) {
    const move = $board.textContent
    scenery.push(move)
  }

  return scenery
}

function printMatchHistory(winner, scenery) {
  let miniBoardScenery = ''
  for (const $move of scenery) {
    miniBoardScenery += `<span class="tictactoe__match-history-box-div2-result--past-match">${$move}</span>`
  }
  $matchHistoryList.innerHTML += `
            <li class="tictactoe__match-history-box">
              <div class="tictactoe__match-history-box-div1">
                <span class="tictactoe__match-history-box-div1--winner">Vencedor</span>
                <span class="tictactoe__match-history-box-div1--move">${winner}</span>
              </div>
              <div class="tictactoe__match-history-box-div2">
                <span>Cenário</span>
                <div class="tictactoe__match-history-box-div2-result">
                  ${miniBoardScenery}
                </div>
              </div>
            </li>
  `
}

function printMoveHistory(move, player, boardIndex) {
  const dictionaryBoardIndex = [
    'Primeiro',
    'Segundo',
    'Terceiro',
    'Quarto',
    'Quinto',
    'Sexto',
    'Sétimo',
    'Oitavo',
    ' Nono',
  ]
  $historyMoveList.innerHTML += `
  <li class="tictactoe__history-movements">
  <span class="tictactoe__history-movements--move">${move}</span>
  <div class="tictactoe__history-texts">
    <h3 class="tictactoe__history-texts--player">${player}</h3>
    <span class="tictactoe__history-texts--place">${dictionaryBoardIndex[boardIndex]} campo</span>
  </div>
  </li>
`
}

function toggleMove() {
  currentMove = currentMove == 'O' ? 'X' : 'O'
}

function toggleBestOf() {
  bestOf = bestOf === 3 ? bestOf = 5 : 3
  return bestOf
}

function printWinnerName(winnerName) {
  if (winnerName != 'Empatou') {
    $winnerName.innerHTML = `O jogador <strong class='tictactoe__game-scoreboard--name'>"${winnerName}"</strong> venceu!`
  } else if (winnerName == 'Empatou') {
    $winnerName.innerHTML = `Empate! Joguem novamente.`
  }
}

function verifyBestOf() {
  if (scorePlayer1 === 2 && bestOf === 3 || scorePlayer1 === 3 && bestOf === 5) {
    return 'X'
  }
  if (scorePlayer2 === 2 && bestOf === 3 || scorePlayer2 === 3 && bestOf === 5) {
    return 'O'
  }
}

function verifyGame() {
  let filledField = 0
  for (const condition of winCondictionList) {
    const fieldIndex0 = condition[0]
    const fieldIndex1 = condition[1]
    const fieldIndex2 = condition[2]

    const field0 = $boardAllItems[fieldIndex0]
    const field1 = $boardAllItems[fieldIndex1]
    const field2 = $boardAllItems[fieldIndex2]
    if (
      field0.innerHTML != '' &&
      field0.innerHTML == field1.innerHTML &&
      field1.innerHTML == field2.innerHTML
    )
      return currentMove
  }
  for (const $field of $boardAllItems) {
    if ($field.textContent != '') filledField++
  }
  if (filledField == 9) return 'draw'
}

function scoreCount(winner) {
  if (winner == 'X') {
    scorePlayer1 += 1
    $player1Score.innerHTML = scorePlayer1 < 10 ? '0' + scorePlayer1 : scorePlayer1
  } else if (winner == 'O') {
    scorePlayer2 += 1
    $player2Score.innerHTML = scorePlayer2 < 10 ? '0' + scorePlayer2 : scorePlayer2
  }
}

function resetField() {
  $boardAllItems.forEach(function (item) {
    item.innerHTML = ''
  })
}

function resetHistory() {
  $historyMoveList.innerHTML = ''
}

function resetScoreboard() {
  $player1Score.textContent = '00'
  $player2Score.textContent = '00'
}

function bot() {
  const randomNumber = Math.random() * 9
  const index = Math.floor(randomNumber)
  const $boardItem = $boardAllItems[index]

  const game = verifyGame()

  if ($boardItem.textContent != '' && game != 'draw') return bot()

  move(index, 'bot')
}

function move(boardIndex, type) {
  const $boardItem = $boardAllItems[boardIndex]

  if (!gameStart) return

  console.log($boardItem.innerHTML)
  if ($boardItem.innerHTML != '') return

  $boardItem.innerHTML = currentMove
  $boardItem.textContent = currentMove
  const gameResult = verifyGame()

  const scenery = getScenery()

  if ($playerField1.value === '') namePlayer1 = $playerField1.placeholder
  if ($playerField2.value === '') namePlayer2 = $playerField2.placeholder

  const playerName = currentMove === 'X' ? namePlayer1 : namePlayer2

  if (gameResult === 'X' || gameResult === 'O') {
    gameStart = false
    scoreCount(gameResult)
    printWinnerName(playerName, currentMove)
    printMatchHistory(playerName, scenery)
    setTimeout(resetField, 1000)
    setTimeout(resetHistory, 1000)
    setTimeout(function () {
      gameStart = true
    }, 1000
    )
  }
  if (gameResult == 'draw') {
    gameStart = false
    printWinnerName('Empatou')
    printMatchHistory('Empatou', scenery)
    setTimeout(resetField, 1000)
    setTimeout(resetHistory, 1000)
    setTimeout(function () {
      gameStart = true
    }, 1000
    )
  }

  const bestOfResult = verifyBestOf()

  printMoveHistory(currentMove, playerName, boardIndex)
  toggleMove()
  if (type === 'user' && botActive) setTimeout(bot, 100)
  if (bestOfResult != undefined) {
    resetScoreboard()
    scorePlayer1 = 0
    scorePlayer2 = 0
    alert(`O jogador ${playerName} venceu!`)
  }
}

function addBoardListeners() {
  for (let i = 0; i < $boardAllItems.length; i++) {
    const $boardItem = $boardAllItems[i]

    $boardItem.addEventListener('click', function () {
      move(i, 'user')
    })
  }
}

addBoardListeners()

$botSwap.addEventListener('click', function(){
  $botSwap.classList.toggle('active')
  botActive = !botActive
  $playerField2.value = 'BOT'
  if (botActive){
    $playerField2.disabled = true
  } else {
    $playerField2.disabled = false
    $playerField2.value = ''
  }
  
})

$bestOfSwap.addEventListener('click', function(){
  $bestOfSwap.classList.toggle('active')
  toggleBestOf()
})