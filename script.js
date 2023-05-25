const gridParent = document.querySelector(".grid-container");
const pairsEl = document.querySelector("#pairs");
const movesEl = document.querySelector("#moves");

let beingMatched = [];
let numOfPairs = 0;
let movesMade = 0;

//display number of pairs and moves
pairsEl.textContent = numOfPairs;
movesEl.textContent = movesMade;

// digits for cards =======================================
const cardNumbers = [];
while (cardNumbers.length < 8) {
  let randomNumber = Math.floor(Math.random() * 10) + 1;
  if (!cardNumbers.includes(randomNumber)) cardNumbers.push(randomNumber);
}

// double the digits
cardNumbers.push(...cardNumbers);

// shuffle the digits
cardNumbers.sort(() => Math.random() - 0.5);

for (let i = 0; i < cardNumbers.length; i++) {
  const newCard = document.createElement("div");
  newCard.classList.add("flip-card", "is-not-flipped");
  newCard.innerHTML = `
  <div class="flip-card-inner">
  <div class="flip-card-front">
  </div>
    <div class="flip-card-back">
      ${cardNumbers[i]}
      </div>
  </div>
  `;

  newCard.addEventListener("click", (e) => {
    flipCard(newCard, cardNumbers[i], i);
  });

  gridParent.appendChild(newCard);
}

function flipCard(newCard, cardValue, index) {
  // [{cardIndex: 9, cardValue: 4}, {}]
  const cards = document.querySelectorAll(".flip-card");

  // if (newCard.classList.contains("is-flipped")) {
  //   newCard.classList.remove("is-flipped");
  //   newCard.classList.add("is-not-flipped");
  //   newCard.children[0].setAttribute("style", "transform: rotateY(0deg)");
  //   beingMatched = beingMatched.filter((item) => item.cardIndex != index);
  // } 
  if (newCard.classList.contains("is-not-flipped")) {
    newCard.classList.add("is-flipped");
    newCard.classList.remove("is-not-flipped");
    newCard.children[0].setAttribute("style", "transform: rotateY(180deg)");

    beingMatched.push({
      cardIndex: index,
      cardValue: cardValue,
    });
  }

  if (beingMatched.length === 2) {
    movesMade++;
    movesEl.textContent = movesMade;
    if (movesMade >= 20) {
      alert("game over");
    }

    gridParent.style.pointerEvents = "none";

    const card1 = cards[beingMatched[0].cardIndex];
    const card2 = cards[beingMatched[1].cardIndex];

    if (beingMatched[0].cardValue === beingMatched[1].cardValue) {
      console.log("match");
      console.log(card1);
      console.log(card2);
      //add class "is-matched" to the cards
      card1.classList.add("is-matched");
      card2.classList.add("is-matched");
      gridParent.style.pointerEvents = "auto";
      beingMatched = [];
      //add 1 to numOfPairs
      numOfPairs++;
      pairsEl.textContent = numOfPairs;
      //if number rof pairs === 8, then game over
      if (numOfPairs === 8) {
        alert("game over")
      }
    } else {
      console.log("no match");
      console.log(card1);
      console.log(card2);
      // flip the cards back over

      setTimeout(() => {
        console.log("hello");
        card1.classList.remove("is-flipped");
        card1.classList.add("is-not-flipped");
        card2.classList.remove("is-flipped");
        card2.classList.add("is-not-flipped");
        card1.children[0].setAttribute("style", "transform: rotateY(0deg)");
        card2.children[0].setAttribute("style", "transform: rotateY(0deg)");
        beingMatched = [];
        gridParent.style.pointerEvents = "auto";
      }, 750);

    }
  }


  // if (beingMatched.length === 2) {
  //   if (beingMatched[0] === beingMatched[1]) {
  //     console.log("match");
  //   } else {
  //     console.log("no match");
  //   }
  // }
}


