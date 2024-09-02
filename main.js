const boxes = document.querySelectorAll(".box");
const message = document.querySelector(".message");

const wordOfTheDay = "camera";

const WORD_SIZE = 6;
let letters = "";
let idx = 0;
let row = 0;
let isGameOver = false;

const insertLetter = (key) => {
  if (letters.length < WORD_SIZE) {
    letters += key;
    console.log(letters);
    boxes[row * WORD_SIZE + idx].textContent = letters[idx];
    idx++;
  }
};

const compute = () => {
  if (letters.length === WORD_SIZE) {
    if (letters === wordOfTheDay) {
      message.textContent = `Congrats, you've guessed it right. the word was ${wordOfTheDay}`;
      for (let i = 0; i < WORD_SIZE; i++) {
        let cell = row * WORD_SIZE + i;
        boxes[cell].classList.add("correct");
      }
    } else {
      const used = [];
      for (let i = 0; i < WORD_SIZE; i++) {
        const cell = row * WORD_SIZE + i;
        if (used.includes(letters[i])) continue;
        if (letters[i] === wordOfTheDay[i]) {
          boxes[cell].classList.add("good-guess");
          message.textContent = `Wrong guess. you guessed some letters correctly`;
        } else if (wordOfTheDay.includes(letters[i])) {
          boxes[cell].classList.add("okay");
          message.textContent = `Wrong guess. some of the letters definitly are in the word.`;
        }
        used.push(letters[i]);
      }

      row++;
      letters = "";
      idx = 0;
    }
  }
};

window.addEventListener("keydown", (event) => {
  const keyPressed = event.key;
  if (keyPressed === "Enter") {
    compute();
  } else if (keyPressed === "Backspace") {
  } else if ("abcdefghijklmnopqrstuvwxyz".includes(keyPressed)) {
    insertLetter(keyPressed);
  }
});
