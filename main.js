// Array Of Words
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing",
];

// Create Levels 
const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2,
}

// Default Level
let defaultLevelName = "Easy"
let defaultLevelSeconds = lvls[defaultLevelName]

// Select Elements In Page

let level = document.querySelector(".message .level")
let seconds = document.querySelector(".message .seconds")
let start = document.querySelector(".start")
let word = document.querySelector(".word")
let input = document.querySelector("input")
let upcomingWord = document.querySelector(".upcoming-words")
let show = document.querySelector(".show-words")
let timeLeft = document.querySelector(".finish span.time")
let scoreGot = document.querySelector(".finish .score-got")
let scoreTotal = document.querySelector(".finish .total")
let rate = document.querySelector(".rate")

// Process On Elements In Page
level.innerHTML = defaultLevelName
seconds.innerHTML = defaultLevelSeconds
timeLeft.innerHTML = defaultLevelSeconds
scoreTotal.innerHTML = words.length

// Function To Disable To Paste Text
input.onpaste = function() {
    return false
}

// Process On Start Button
start.onclick = function() {
    genWords()
    this.remove()
    input.focus()
}

function genWords() {
    // Random Word From Words Array
    let randomWord = words[Math.floor(Math.random() * words.length)]

    // Index Of Random Word
    let indexWord = words.indexOf(randomWord)

    // Remove Word From Array
    words.splice(randomWord, 1)

    // Add Random Word In Page
    word.innerHTML = randomWord

    // Empty UpComing Words
    upcomingWord.innerHTML = ''

    // Generate Words
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div")
        let txt = document.createTextNode(words[i])
        div.appendChild(txt)
        upcomingWord.appendChild(div)
    }
    startPlay()
}

function startPlay() {
    timeLeft.innerHTML = defaultLevelSeconds
    let startTime = setInterval(() => {
        timeLeft.innerHTML--
            if (timeLeft.innerHTML === "0") {
                clearInterval(startTime)
                if (word.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                    // Empty Input Field
                    input.value = '';
                    // Increase Score
                    scoreGot.innerHTML++;
                    if (words.length > 0) {
                        // Call Generate Word Function
                        genWords();
                    } else {
                        let span = document.createElement("span");
                        span.className = 'good';
                        let spanText = document.createTextNode("Congratz");
                        span.appendChild(spanText);
                        rate.appendChild(span);
                        // Remove Upcoming Words Box
                        upcomingWord.remove();
                    }
                } else {
                    let span = document.createElement("span");
                    span.className = 'bad';
                    let spanText = document.createTextNode("Game Over");
                    span.appendChild(spanText);
                    rate.appendChild(span);
                }
            }
    }, 1000);
}
