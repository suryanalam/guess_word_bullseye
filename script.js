const guess_box = document.querySelector(".guess-box");
const hint_span = document.querySelector(".hint>span");
const counter = document.querySelector(".counter>span");
const mispelled = document.querySelector(".mispelled>span");
const reset_btn = document.querySelector(".btn");

let word, incorrectLetters = [], correctLetters =[], rem_guess = 8;

//Reset the values after clicking on the reset button:
const resetGame =()=>{
    incorrectLetters = [], correctLetters =[], rem_guess=8;
    counter.innerText = rem_guess;
    mispelled.innerText = "";
}

//Main function to get the random object in an array of data.js files
const generateRandomWord = () => {
    resetGame();

   const randomIndex =  Math.floor( Math.random() * wordList.length);

   const randomObj = wordList[randomIndex];
   word = randomObj.word;
   const hint = randomObj.hint;
   
//Rendering the input elements w.r.t the word length.
   let html = "";
   for(let i=0; i < word.length; i++){
    html += '<input type="text" class="box" disabled />';
   }

   //Assigning the input elements and hint rendered in js to the index.html file. 
   guess_box.innerHTML = html;
   hint_span.innerText = hint;
};

const checkLetter = (e)=>{

    
    const key = e.key.toLowerCase();
    //Condition to omit the inputs other than alphabets [A-Z] 
    if(key < 'a' || key > 'z'){
        return ;
    }

    // returns nothing if key present in incorrectLetters[] and correctLetters[]
    if(incorrectLetters.includes(key) || correctLetters.includes(key)){
        return;
        
    }

    //Condition for to update counter, mispelled.
    // if user input is not present in the original word then push that key/alphabet to the incorrectLetters array and decrease the counter.
    if(!word.includes(key)){
        incorrectLetters.push(key);
        rem_guess--;
        counter.innerText = rem_guess;
        mispelled.innerText = incorrectLetters.join(",");
    }

    if(word.includes(key)){
        const  boxes = document.querySelectorAll(".box");
        for(let i = 0; i < boxes.length; i++){
            const letter = word[i];

            if(letter === key){
                boxes[i].value = letter;
                correctLetters.push(key);
            }
        }
    }

    //Condition to end the game
    if(rem_guess === 0){        
        const boxes = document.querySelectorAll(".box");
        for (let i = 0; i < boxes.length; i++) {
          const letter = word[i];
          boxes[i].value = letter;
        }

        setTimeout(()=>{
            alert("game lost!!");
            generateRandomWord();
        });
    }

    if(correctLetters.length === word.length){
        setTimeout(()=>{
            alert("game won!!");
            generateRandomWord();
        });
    }
};

reset_btn.addEventListener("click",generateRandomWord);
document.addEventListener('keypress',checkLetter)
generateRandomWord();