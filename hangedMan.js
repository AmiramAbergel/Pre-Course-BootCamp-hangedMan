/***************************
 * Pre-course: JavaScript
 * Name: Amiram Abergel
 * ***************************
 * Hangman game! - word-guessing game
 * In our version of Hangman the JavaScript program will choose the word and the human player will guess letters.
 * ***************************
 * Throughout this game, we'll use a bank of words consisting of 10 words that are stored in local array (our DB).
 * With the figlet module, we first call "printWelcomeMessage()" to print an elegant welcome message.
 * After that, we ask the user to play by calling the "playGame()" function.
 * From a bank of words, a random word is selected and converted to an array of asterisks with the length of the word.
 * Each time, the user can guess either the whole word or just a single letter. The array is updated based on whether the letter is in the array.
 * We decrement the number of attempts by one if the letter isn't in the array.
 * The game ends after 10 attempts without success or if the user guesses the word.
 * ***************************
 */

'use strict'; // strict mode
const prompt = require('prompt-sync')(); // import prompt module
const figlet = require('figlet');   // import figlet module

const allAttempts = 10; // number of attempts

const wordsBank = [ // words bank
    "JavaScript",
    "Wonderland",
    "Game",
    "Test",
    "Course",
    "Computer",
    "FullStack",
    "Apple",
    "Windows",
    "Play",
];

/*************************
 * Print welcome message function
 * *************************/
const printWelcomeMessage = () => {
    console.log(figlet.textSync('HANG MAN', 'epic')); // Calling the figlet object to output the text
};

/*************************
 * Play game function:
 * y - play
 * n - exit
 * *************************/
const playGame = () => {
    console.log("Hey there! Do you want to play? (Y/N) ");
    let userInput = prompt();   // ask if user wants to play
    if (userInput === "y") {    // if user wants to play
        newGame();              // start new game
    } else {
        console.log("Bye!\n");
    }
};

/*************************
 * Select random word from words bank function
 @param {array} words
 * *************************/
const randomSelectWord = (words)=> {
    let word = words[Math.floor(Math.random() * words.length)]; // select random word from words bank
    return word;
};

/*************************
 * Display asterisk function
 * @param {string} word
 * *************************/
const displayAnAsterisk = (word)=> {
    let asteriskArray = []; // array to store asterisks
    for (let i = 0; i < word.length; i++) { // create array of asterisks
        asteriskArray[i] = "*";
    }
    return asteriskArray;
};

/*************************
 * Validate user input function
 * @param {string} guess
 * @param {string} word
 * *************************/
const validate_input = (guess, word)=> {
    let wordPattern = new RegExp ('^[a-z]+'); // declare wordPattern variable and set it to regex pattern
    if (guess === null) { // if user input is null
        console.log("Guess is invalid, please enter only one character (dont worry attempts remaining the same).");
        return false;
    } else if ( !wordPattern.test(guess) || (guess.length !== 1 && guess !== word)) { // If the user input does not match the regex pattern or is not a word
        console.log("Guess is invalid, please enter only one character (dont worry attempts remaining the same).");
        return false;
    }else { // if user input is valid
        return true;
    }
};

/*************************
 * Check if user input is correct and update attempts left
 * @param {string} guess
 * @param {string} word
 * @param {number} attempts
 * *************************/
const checkAndUpdateAttempts = (guess, word, attempts)=> {
    if (!word.includes(guess)) { // if the guess is not in the word
        attempts--; // decrement attempts
    }
    return attempts; // return attempts left
};

/*************************
 * Update user guess
 * @param {string} guess
 * @param {string} word
 * @param {array} arr
 * *************************/
const updateUserGuess = (guess, word, arr)=> {
    for (let j = 0; j < word.length; j++) { // Update the game state with the guess
        if (word[j] === guess) { // if the guess is in the word
            arr[j] = guess; // update the asterisks array with the guess
        }
    }
    return arr; // return the updated asterisks array
};

/*************************
 * Check if user won function
 * @param {array} arr
 * *************************/
const checkIfIncludesAsterisk = (arr)=> {
    if (arr.includes("*")) { // In the case of updated word array containing asterisks
        return false;
    } else { // In the case of updated word array not containing asterisks
        return true;
    }
};

/*************************
 * Display answer function
 * @param {number} attempts
 * @param {array} arr
 * *************************/
const gameState = (attempts,arr)=> {
    console.log(`You have ${attempts} guesses The word is: ` + arr.join(" ")); // display the game state
};

/*************************
 * Geek out!
 * @param {string} guess
 * @param {string} word
 *
 * *************************/
const testEntireWord = (guess, word) => {
    return guess === word; // return true if the guess is the word
};


/*************************
 * New game function
 * *************************/
const newGame = () => {
    console.log("What's your name?");
    let name = prompt(); // ask user for name
    console.log("Hello " + name + "!"); // display name
    let chosenWord = randomSelectWord(wordsBank); // select random word from words bank
    let chosenWord_lowerCase = chosenWord.toLowerCase(); // convert word to lower case
    let chosenAsteriskArray = displayAnAsterisk(chosenWord); // display asterisk
    let userAttempts = allAttempts; // set number of attempts
    gameState(userAttempts,chosenAsteriskArray); // display game state
    while (userAttempts > 0) {  // while loop with condition as number of attempts left
        console.log("Please type your guess (a single letter only!):")
        let guess = prompt().toLowerCase(); // ask user for guess
        if (validate_input(guess, chosenWord_lowerCase)) { // check if user input is valid
            if (testEntireWord(guess, chosenWord_lowerCase)) { // (Geek out) check if user guess the entire word
                console.log("Wow you are good!!! \nThe answer was:\n" + chosenWord);
                break;
            }
            userAttempts = checkAndUpdateAttempts(guess, chosenWord_lowerCase, userAttempts); // update number of attempts
            chosenAsteriskArray = updateUserGuess(guess, chosenWord_lowerCase, chosenAsteriskArray); // update game state
            if (checkIfIncludesAsterisk(chosenAsteriskArray)) { // check if user won
                console.log("Wow you are good!!! \nThe answer was:\n" + chosenWord);
                break;
            }
            gameState(userAttempts,chosenAsteriskArray); // display game state
        }
    }
    if (userAttempts === 0) {   // if user lost
        console.log("Sorry you’ve reached the maximum guesses attempts try again next time!");
    }
};



printWelcomeMessage();  // print welcome message
playGame(); // start game