const gridParent = document.querySelector(".grid-container");
let beingMatched = [];

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
  newCard.classList.add("flip-card");
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

  if (newCard.classList.contains("is-flipped")) {
    newCard.classList.remove("is-flipped");
    newCard.classList.add("is-not-flipped");
    newCard.children[0].setAttribute("style", "transform: rotateY(0deg)");
    beingMatched = beingMatched.filter((item) => item.cardIndex != index);
  } else {
    newCard.classList.add("is-flipped");
    newCard.classList.remove("is-not-flipped");
    newCard.children[0].setAttribute("style", "transform: rotateY(180deg)");

    beingMatched.push({
      cardIndex: index,
      cardValue: cardValue,
    });
  }

  console.log(beingMatched);

  // if (beingMatched.length === 2) {
  //   if (beingMatched[0] === beingMatched[1]) {
  //     console.log("match");
  //   } else {
  //     console.log("no match");
  //   }
  // }
}

