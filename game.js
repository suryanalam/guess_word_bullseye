const guess_box = document.querySelector(".guess-box");
reset_btn = document.querySelector(".btn");
hint = document.querySelector(".hint");
counter = document.querySelector(".counter"),
mispelled = document.querySelector(".mispelled"),
typingInput = document.querySelector(".typing-input");

function wordGenerate(){
    let randomWord = data[Math.floor(Math.random() * data.length)];
    let word = randomWord.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    hint.innerText = ranItem.hint;
    counter.innerText = maxGuesses;
    mispelled.innerText = incorrectLetters;

    hint.innerText = randomWord.hint;
    let guessWord="";
    for(let i=0; i<data.length; i++){
        html += `<input type="text" disabled >`;
    }
    guess_word.innerHtML= guessWord;
}

wordGenerate();

function guessGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        counter.innerText = maxGuesses;
        mispelled.innerText = incorrectLetters;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(correctLetters.length === word.length) {
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            return randomWord();
        } else if(maxGuesses < 1) {
            alert("Game over! You don't have remaining guesses");
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

reset_btn.addEventListener("click",wordGenerate);
typingInput.addEventListener("input", guessGame);
guess_box.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus())
