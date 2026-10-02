let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;
let seconds = 0;
let timerInterval = null;


const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result")
const restartButton = document.getElementById("restartBtn")

const dimension = 150;
const imgStart = Math.floor(Math.random() * 99) + 1;

const images = []

for(let i = 0; i < 8; i++){
    images.push(`https://picsum.photos/seed/${imgStart+i}/${dimension}/${dimension}`);
}

let cards = [...images, ...images];

function shuffle(array){
    for(let i = array.length - 1; i > 0 ; i--){
        let randInt = Math.floor(Math.random() * (i+1) );
        let tamp = array[randInt];
        array[randInt] = array[i];
        array[i] = tamp; 

    }
}

function initGame(){
    board.innerHTML = "";
    resultDisplay.textContent = "";
    moves = 0;
    matchedCount = 0;
    seconds = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false; 

    movesDisplay.textContent = `Number of moves : ${moves}`;
    timerDisplay.textContent = `Times : 00:00`;

    shuffle(cards);
    cards.forEach((imgUrl) => {
        const card = document.createElement('div');
        card.classList.add("cards");
        card.dataset.value = imgUrl;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        
        board.appendChild(card);

        card.addEventListener("click", () => handleCardClick(card));

    })
    clearInterval(timerInterval); 
    startTimer();
}

function handleCardClick(card){
    if (lockBoard || card.classList.contains("matched")){
        return ;
    }

    if (firstCard == null){
        revealCard(card);
        firstCard = card;
        
    }
    else if(secondCard == null && card != firstCard){
        revealCard(card);
        secondCard = card;
        moves++;
        movesDisplay.textContent =`Number of moves : ${moves}`;
        lockBoard = true;
        checkMatch()
    }
}

function revealCard(card){
    const img = document.createElement("img");
    img.src = card.dataset.value;
    img.alt = "image de la carte"
    card.appendChild(img)
}

function checkMatch(){
    const isMatched = firstCard.dataset.value === secondCard.dataset.value;
    if (!isMatched){
        setTimeout(() =>{
            firstCard.innerHTML = "";
            secondCard.innerHTML = "";
            resetTurn();
        }, 800)
        
    }
    else {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCount+=2;
        resetTurn();
        checkVictory();
    }
}

function checkVictory(){
    if(matchedCount === cards.length){
        resultDisplay.textContent = `Victoire ! Moves : ${moves} | Temps : ${formatTime(seconds)}`;
        clearInterval(timerInterval);
    }
}


function resetTurn(){
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}


function formatTime(sec){
    const s = String(sec % 60).padStart(2,'0');
    const min = String(Math.floor(sec/60)).padStart(2,'0');
    return `${min}:${s}`;
}

function startTimer(){
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = ` Times : ${formatTime(seconds)}`;
    },1000)
}

restartButton.addEventListener("click", initGame);
window.onload = initGame;



