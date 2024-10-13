// random-text.js
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomText() {
    const wordCount = parseInt(document.getElementById('wordCount').value, 10);
    const sentenceCount = parseInt(document.getElementById('sentenceCount').value, 10);
    const minWordLength = parseInt(document.getElementById('minWordLength').value, 10);
    const maxWordLength = parseInt(document.getElementById('maxWordLength').value, 10);
    const numLetters = parseInt(document.getElementById('numLetters').value, 10);
    const numNumbers = parseInt(document.getElementById('numNumbers').value, 10);
    const numSymbols = parseInt(document.getElementById('numSymbols').value, 10);
    
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const includeLetters = document.getElementById('includeLetters').checked;

    let generatedText = '';
    
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{};:,.<>?';

    // Generate sentences
    for (let i = 0; i < sentenceCount; i++) {
        let sentence = '';
        
        // Generate words
        for (let j = 0; j < wordCount; j++) {
            const wordLength = getRandomInt(minWordLength, maxWordLength + 1);
            let word = '';

            // Append random letters to the word
            for (let k = 0; k < wordLength; k++) {
                if (includeLetters) {
                    word += letters.charAt(getRandomInt(0, letters.length));
                }
            }

            // Append specified numbers
            if (includeNumbers && numNumbers > 0) {
                for (let n = 0; n < numNumbers; n++) {
                    word += numbers.charAt(getRandomInt(0, numbers.length));
                }
            }

            // Append specified symbols
            if (includeSymbols && numSymbols > 0) {
                for (let n = 0; n < numSymbols; n++) {
                    word += symbols.charAt(getRandomInt(0, symbols.length));
                }
            }

            // Add the generated word to the sentence
            sentence += word.trim() + ' ';
        }
        generatedText += sentence.trim() + '. ';
    }

    document.getElementById('randomText').textContent = generatedText.trim();
}

document.getElementById('generateBtn').addEventListener('click', generateRandomText);
