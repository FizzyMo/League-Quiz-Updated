// Define an array of words, definitions, and hints
const words = ["leona", "sivir","jinx",
"ahri",
"teemo",
"braum",
"nautilus",
"diana",
"morgana",
"missfortune",
"caitlyn",
"tristana",
"zed",
"soraka",
"rakan",
"xayah",
"ashe",
"vi",
"irelia"];
const definitions = ["I must not fall", "Everyone has a price","i feel like i forgot to shoot something",
"dont you trust me",
"ill scout ahead",
"you hit like baby ram",
"all will drown",
"no more lies",
"without mercy",
"i know what im doing",
"boom headshot",
"get in my way i dare ya",
"Brave the shadows, find the truth.",
"this is my path",
"you going to marry me today",
"compromise is so unsatisfying",
"i always take the high ground",
"here i come to save the day.. or wreck it",
"tyrant"];
const hints = ["-Support- Uses a shield", "-ADC- Has a spell shield","-ADC- Is a rebel",
"-Mid- Has 9 tails",
"-Top or JG- Has a blind",
"Support- Uses a shield to block damage",
"-Support- Uses a hook",
"-Mid or JG- Moon Goodness",
"-Support, Mid or JG- Roots with Q",
"-ADC- Has two guns",
"-ADC- Is a sniper",
"ADC or Mid- Uses a canyon to shoot",
"-Mid or JG- Shadow assassin",
"-Support- Heals with W",
"-Support- When ulting you are charmed",
"-ADC- Uses feathers",
"-ADC- Has ice arrows",
"-JG- Uses fists to fight",
"-Mid or Top- Has floating blades"];

let word = "";
let guessedLetters = [];
let remainingGuesses = 5;
let lastHint = ""; 

function start() {
    // Redirect to start.html
    window.location.href = "../assets/game/start.html";
}

// Function to remove the hint from display
function removeHint() {
    // Store the last displayed hint before clearing it
    lastHint = document.getElementById("hint").innerHTML;
    // Clear the hint displayed on the HTML element with id "hint"
    document.getElementById("hint").innerHTML = "";
}

// Function to display a hint
function displayHint() {
    // If the last hint is not empty, display it again
    if (lastHint !== "") {
        document.getElementById("hint").innerHTML = lastHint;
    } else {
        // Otherwise, generate a new hint and display it
        const randomIndex = Math.floor(Math.random() * words.length);
        const hint = hints[randomIndex];
        document.getElementById("hint").innerHTML = hint;
    }
}

// Event listener for the hint button
document.getElementById("hintButton").addEventListener("click", displayHint);

// Function to start the game
function startGame() {
    guessedLetters = [];
    remainingGuesses = 5;

    const randomIndex = Math.floor(Math.random() * words.length);
    word = words[randomIndex].toUpperCase();

    document.getElementById("guesses_remain").innerHTML = remainingGuesses;
    document.getElementById("letters_left").innerHTML = "";
    document.getElementById("message").innerHTML = "";

    // Display dashes for the word
    let dashes = '';
    for (let i = 0; i < word.length; i++) {
        dashes += "_ ";
    }
    document.getElementById("dashes").innerHTML = dashes;

    document.getElementById("def").innerHTML = definitions[randomIndex];
    document.getElementById("hint").innerHTML = hints[randomIndex];

    // Remove the selected word from the arrays
    words.splice(randomIndex, 1);
    definitions.splice(randomIndex, 1);
    hints.splice(randomIndex, 1);
}

// Function to handle keyboard input
document.addEventListener("keydown", (event) => {
    if (remainingGuesses > 0) {
        const keyChar = event.key.toUpperCase();

        // Check if the pressed key is a letter
        if (/^[A-Z]$/.test(keyChar)) {
            if (!guessedLetters.includes(keyChar)) {
                guessedLetters.push(keyChar);
                document.getElementById("letters_left").innerHTML = guessedLetters.join(", ");

                // Check if the letter is in the word
                if (word.includes(keyChar)) {
                    // Update the displayed word
                    let updatedWord = '';
                    for (const char of word) {
                        if (guessedLetters.includes(char)) {
                            updatedWord += char + ' ';
                        } else {
                            updatedWord += "_ ";
                        }
                    }
                    document.getElementById("dashes").innerHTML = updatedWord;

                    // Check if the word has been completely guessed
                    if (!updatedWord.includes("_")) {
                        document.getElementById("message").innerHTML =
                            "You Won!!! Good job. You either googled the answers or you play league!";
                        // Start a new game if there are more words available
                        if (words.length > 0) {
                            startGame(); // Start a new game
                        }
                    }
                } else {
                    // Decrement remaining guesses
                    remainingGuesses--;
                    document.getElementById("guesses_remain").innerHTML = remainingGuesses;

                    // Check if no remaining guesses
                    if (remainingGuesses === 0) {
                        document.getElementById("message").innerHTML = `You Lost <br> The word was: ${word}`;
                        if (words.length > 0) {
                            startGame();
                        }
                    }
                }
            }
        }
    }
});

// Start the game when the page loads
startGame();
