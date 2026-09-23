let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;


const dimension = 150;
const board = document.getElementById("game-board");
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
        matchedCount++;
        resetTurn();
    }
}

function resetTurn(){
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}




window.onload = initGame;



