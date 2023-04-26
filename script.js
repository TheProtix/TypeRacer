document.addEventListener("click", () => inpField.focus());
document.addEventListener("keydown", () => inpField.focus());

const texts = [
	'Hej med dig i dag er en rigtig god dag, hvordan har du det ellers i dag? ',
	'Drengen, der hed Lars, gik i 8. klasse og havde to lillesøstre ',
	'Mine forældre er skilt, så jeg bor hver anden uge hos min mor og hver anden uge hos min far. ',
	'Jeg er ikke en hurtig løber, men jeg er til gengæld god til at kaste. '
];

const displayedText = document.querySelector('.typing-text p')
const inpField = document.querySelector('.wrapper .input-field')
const timeSpan = document.querySelector('.time')
const mistakeSpan = document.querySelector('.mistakes')
const precisionSpan = document.querySelector('.precision')
const wpmSpan = document.querySelector('.wpm')

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let precision = 0;
let realPrecision = 0;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function loadText() {
	const randomIndex = Math.floor(Math.random() * texts.length);
    texts[randomIndex].split('').forEach(char => {
		let span = `<span>${char}</span>`
        displayedText.innerHTML += span;
    });
	console.log(displayedText.innerHTML)
}

function typing() {
	let characters = displayedText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
		if (!isTyping) {
			timer = setInterval(startTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
			if (charIndex > 0) {
				charIndex--;
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
			if (characters[charIndex].innerText == typedChar) {
				characters[charIndex].classList.add("correct");
            } else {
				mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
		
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
		if(wpm < 0) {
			wpm = "0";
		}
		precision = mistakes / characters.length * 100
		realPrecision = Math.round(100 - precision)

		precisionSpan.innerText = `${realPrecision}%`
        wpmSpan.innerText = wpm;
        mistakeSpan.innerText = mistakes;
    } else {
		clearInterval(timer);
        inpField.value = "";
    }
}


function startTimer() {
	if (timeLeft > 0) {
		timeLeft--;
        timeSpan.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmSpan.innerText = wpm;
    } else {
		/* Stop timeren fra at blive ved */
		clearInterval(timer);
    }
}

function reloadPage() {
	location.reload()
}

inpField.addEventListener("input", typing);
loadText();
