// all cards in 52 card deck
let cards = [
    "&#x1F0A1", "&#x1F0A2", "&#x1F0A3", "&#x1F0A4", "&#x1F0A5", "&#x1F0A6",
    "&#x1F0A7", "&#x1F0A8", "&#x1F0A9", "&#x1F0AA", "&#x1F0AB", "&#x1F0AD",
    "&#x1F0AE", // spades
    "&#x1F0B1", "&#x1F0B2", "&#x1F0B3", "&#x1F0B4", "&#x1F0B5", "&#x1F0B6",
    "&#x1F0B7", "&#x1F0B8", "&#x1F0B9", "&#x1F0BA", "&#x1F0BB", "&#x1F0BD",
    "&#x1F0BE", // hearts
    "&#x1F0C1", "&#x1F0C2", "&#x1F0C3", "&#x1F0C4", "&#x1F0C5", "&#x1F0C6",
    "&#x1F0C7", "&#x1F0C8", "&#x1F0C9", "&#x1F0CA", "&#x1F0CB", "&#x1F0CD",
    "&#x1F0CE", // diamonds
    "&#x1F0D1", "&#x1F0D2", "&#x1F0D3", "&#x1F0D4", "&#x1F0D5", "&#x1F0D6",
    "&#x1F0D7", "&#x1F0D8", "&#x1F0D9", "&#x1F0DA", "&#x1F0DB", "&#x1F0DD",
    "&#x1F0DE" ] // clubs

let backCard = "&#x1F0A0"

let playerValue = 0
let dealerValue = 0

let cardEl = document.querySelector("#card-display")
let valueEl = document.querySelector("#value-display")
let dealerCardEl = document.querySelector("#dealer-cards")
let dealerValueEl = document.querySelector("#dealer-value")

// btn-el assignments for ace btns
let aceOneEl = document.querySelector("#ace-one")
let aceElevenEl = document.querySelector("#ace-eleven")

// btn-el assignment for start, hit, hold, and reset btns
let startEl = document.querySelector("#start-btn")
let hitEl = document.querySelector("#hit-btn")
let holdEl = document.querySelector("#hold-btn")
let resetEl = document.querySelector("#reset-btn")

// btn-el assignment for bet and return btns
let betEl = document.querySelector("#plus-fifty")
let returnEl = document.querySelector("#minus-fifty")

let resultEl = document.querySelector("#result")

// bools and int for money tracking
let canBet = true
let canReturn = false
let balance = 500
let betAmount = 0
let balanceEl = document.querySelector("#money-tracker")
let betAmountEl = document.querySelector("#bet-tracker")

// initial setup
btnSwitch(aceOneEl, false)
btnSwitch(aceElevenEl, false)
btnSwitch(hitEl, false)
btnSwitch(holdEl, false)
btnSwitch(returnEl, false)

// fn to start game
function start() { 
    cardEl.textContent = ""
    valueEl.textContent = ""
    dealerCardEl.textContent = ""
    dealerValueEl.textContent = ""
    // set btns
    btnSwitch(startEl, false)
    startEl.textContent = "GAME IN SESSION"
    btnSwitch(betEl, false)
    btnSwitch(returnEl, false)
    btnSwitch(hitEl, true)
    btnSwitch(holdEl, true)
    // display two cards
    dealerCardEl.innerHTML += 
    "<span style='font-size: 75px;'>"+backCard+"</span"
    dealerCardEl.innerHTML += 
    "<span style='font-size: 75px;'>"+
    cards[Math.floor(Math.random()*52)]+"</span>" // needs to be fixed, here for testing
    hit()
    hit()
}

function hit() {
    let tempCardNum = Math.floor(Math.random()*52)
    // logic for adding value
    if (tempCardNum === 0 || tempCardNum === 13 ||
        tempCardNum === 26 || tempCardNum === 39) {
            resultEl.textContent = "You drew an ace! Pick 1 or 11 for its value."
            cardEl.innerHTML += "<span style='font-size: 75px;'>"+cards[tempCardNum]+"</span>"
            btnSwitch(aceOneEl, true)
            btnSwitch(aceElevenEl, true)
    } else if (tempCardNum === 9 || tempCardNum === 10 || tempCardNum === 11 ||
        tempCardNum === 12 || tempCardNum === 22 || tempCardNum === 23 ||
        tempCardNum === 24 || tempCardNum === 25 || tempCardNum === 35 ||
        tempCardNum === 36 || tempCardNum === 37 || tempCardNum === 38 ||
        tempCardNum === 48 || tempCardNum === 49 || tempCardNum === 50 ||
        tempCardNum === 51) {
            playerValue += 10
            cardEl.innerHTML += "<span style='font-size: 75px;'>"+cards[tempCardNum]+"</span>"
    } else if (tempCardNum > 0 && tempCardNum < 9) {
        playerValue += tempCardNum + 1
        cardEl.innerHTML += "<span style='font-size: 75px;'>"+cards[tempCardNum]+"</span>"
    } else if (tempCardNum > 13 & tempCardNum < 22) {
        playerValue += tempCardNum - 12
        cardEl.innerHTML += "<span style='font-size: 75px;'>"+cards[tempCardNum]+"</span>"
    } else if (tempCardNum > 26 && tempCardNum< 35) {
        playerValue += tempCardNum - 25
        cardEl.innerHTML += "<span style='font-size: 75px;'>"+cards[tempCardNum]+"</span>"
    } else if (tempCardNum > 39 && tempCardNum < 48) {
        playerValue += tempCardNum - 38
        cardEl.innerHTML += "<span style='font-size: 75px;'>"+cards[tempCardNum]+"</span>"
    }
    // logic for bust, blackjack, or keep going
    if (playerValue < 21) {
        resultEl.textContent = "Hit or Hold?"
    } else if (playerValue === 21) {
        btnSwitch(hitEl, false)
        btnSwitch(holdEl, false)
        setTimeout(hold(), 5000)
    } else if (playerValue > 21) {
        resultEl.textContent = "Bust!"
        btnSwitch(hitEl, false)
        btnSwitch(holdEl, false)
        setTimeout(hold(), 5000)
    }
}

function hold() {
    if (playerValue === 21) {
        if (playerValue === dealerValue) {
            resultEl.textContent = "It's a tie! Your bet amount is returned."
            playerValue += betAmount
            endGame()
        } else {

        }
    }
    if (playerValue === dealerValue) {
        resultEl.textContent = "It's a tie! Your bet amount is returned."
        playerValue += betAmount
        endGame()
    } else if (playerValue > dealerValue && playerValue < 21) {
        if (playerValue < 21){
            resultEl.textContent = "You win! The dealer pays you your bet amount!"
        } else if (playerValue === 21) {
            resultEl.textContent = "Blackjack! You win! The dealer pays your you bet amount!"
        }
        playerValue += betAmount*2
        endGame()
    } else if (playerValue < dealerValue || playerValue > 21) {
        if (playerValue > 21) {
            resultEl.textContent = "Bust! You lose! The dealer keeps your bet amount."
        } else {
            resultEl.textContent = "You lose! The dealer keeps your bet amount."
        }
        endGame()
    }
}

function aceOne() {
    playerValue += 1
    resultEl.textContent = "Hit or Hold?"
    btnSwitch(aceOneEl, false)
    btnSwitch(aceElevelEl, false)
}

function aceEleven() {
    playerValue += 11
    resultEl.textContent = "Hit or Hold?"
    btnSwitch(aceOneEl, false)
    btnSwitch(aceElevelEl, false)
}

// fn for endgame
function endGame() {
    if (balance > 0) {
        btnSwitch(startEl, true)
        btnSwitch(betEl, true)
        btnSwitch(holdEl, false)
        btnSwitch(hitEl, false)
        startEl.textContent = "START GAME"
    } else if (balance <= 0) {
        alert("You went bankrupt! Please reset table!")
    }
}

function bet() {
    if (balance > 0) {
        balance -= 50
        betAmount += 50
        betAmountEl.innerHTML = "BET AMOUNT: $" + betAmount
        balanceEl.innerHTML = "BALANCE: $" + balance
        btnSwitch(returnEl, true)
        if (balance === 0) {
            btnSwitch(betEl, false)
        }
    } else if (balance <= 0) {
        btnSwitch(betEl, false)
    }
}

function returnMoney() {
    if (betAmount > 0) {
        balance += 50
        betAmount -= 50
        betAmountEl.innerHTML = "BET AMOUNT: $" + betAmount
        balanceEl.innerHTML = "BALANCE: $" + balance
        btnSwitch(betEl, true)
        if (betAmount === 0) {
            btnSwitch(returnEl, false)
        }
    } else if (betAmount <= 0) {
        btnSwitch(returnEl, false)
    }
}

// fn to reset table
function reset() {
    location.reload()
}

// fn to enable and disable btns
// if onOff is false, disable, if on, enable
function btnSwitch(element, onOff) {
    if (!onOff) {
        element.disabled = true
    } else if (onOff) {
        element.disabled = false
    }
}