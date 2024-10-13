document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const input = document.getElementById('input');
    const typingSound = document.getElementById('typingSound');
    let gameState = 'prelude';
    let typingSpeed = 50;  // Speed of typing effect in milliseconds

    function display(text) {
        output.innerHTML += text + '\n';
        output.scrollTop = output.scrollHeight;
    }

    function typeText(text, callback) {
        let i = 0;
        function type() {
            if (i < text.length) {
                output.innerHTML += text.charAt(i);
                typingSound.currentTime = 0;
                typingSound.play();
                i++;
                setTimeout(type, typingSpeed);
            } else {
                output.innerHTML += '\n';
                if (callback) callback();
            }
        }
        type();
    }

    function clearInput() {
        input.value = '';
    }

    function handleInput(command) {
        switch (gameState) {
            case 'prelude':
                display('You: ' + command);
                gameState = 'start';
                typeText('\nBirdseeker: Finally, someone on the other end... You have no idea how long I\'ve been waiting. We don\'t have much time, so listen carefully.', nextStep);
                break;
            case 'start':
                startInteraction(command);
                break;
            case 'birdseeker_response_1':
                birdseekerResponse1(command);
                break;
            case 'birdseeker_response_2':
                birdseekerResponse2(command);
                break;
            case 'birdseeker_response_3':
                birdseekerResponse3(command);
                break;
            case 'play_again':
                handlePlayAgain(command);
                break;
            default:
                display('Unexpected state.');
                break;
        }
    }

    function startInteraction(command) {
        display('You: ' + command);
        typeText('\nBirdseeker: I\'ve been hiding from Crow Corporation for weeks. They unleashed the nukes that destroyed everything. But I found something, something they\'re desperate to keep hidden.', () => {
            typeText('\nBirdseeker: Do you want to know what I found?', () => {
                display('A: Yes, tell me everything.');
                display('B: I don\'t trust you.');
                gameState = 'birdseeker_response_1';
            });
        });
    }

    function birdseekerResponse1(command) {
        display('You: ' + command);
        if (command.toLowerCase() === 'a') {
            typeText('\nBirdseeker: Good choice. I found out that the nukes were just the beginning. Crow Corporation has a facility not far from here, where they are conducting experiments... on people.', () => {
                typeText('Birdseeker: You need to get to that facility and find proof of their experiments. Will you help me?', () => {
                    display('A: Yes, I will help you.');
                    display('B: No, it\'s too dangerous.');
                    gameState = 'birdseeker_response_2';
                });
            });
        } else if (command.toLowerCase() === 'b') {
            typeText('\nBirdseeker: I understand your hesitation, but I promise you, this is the only way to stop them. Will you help me?', () => {
                display('A: Yes, I will help you.');
                display('B: No, it\'s too dangerous.');
                gameState = 'birdseeker_response_2';
            });
        } else {
            display('Invalid choice. Please enter A or B.');
        }
    }

    function birdseekerResponse2(command) {
        display('You: ' + command);
        if (command.toLowerCase() === 'a') {
            typeText('\nBirdseeker: Thank you. The facility is heavily guarded. You\'ll need to find a way to sneak in. Do you want to know the best route?', () => {
                display('A: Yes, give me the details.');
                display('B: No, I\'ll find my own way.');
                gameState = 'birdseeker_response_3';
            });
        } else if (command.toLowerCase() === 'b') {
            typeText('\nBirdseeker: I understand, but this is the only way to stop them. Will you help me?', () => {
                display('A: Yes, I will help you.');
                display('B: No, it\'s too dangerous.');
                gameState = 'birdseeker_response_2';
            });
        } else {
            display('Invalid choice. Please enter A or B.');
        }
    }

    function birdseekerResponse3(command) {
        display('You: ' + command);
        if (command.toLowerCase() === 'a') {
            typeText('\nBirdseeker: Follow the old railway tracks. They\'ll lead you to a hidden entrance. Once inside, find the main laboratory. That\'s where the evidence is kept.', () => {
                typeText('Birdseeker: Good luck, and remember, trust no one.', () => {
                    endGame('Mission Accepted');
                });
            });
        } else if (command.toLowerCase() === 'b') {
            typeText('\nBirdseeker: I hope you know what you\'re doing. Good luck.', () => {
                endGame('Going Alone');
            });
        } else {
            display('Invalid choice. Please enter A or B.');
        }
    }

    function endGame(outcome) {
        display(`\nOutcome: ${outcome}`);
        display('Thank you for playing The Lost Expedition.');
        display('Would you like to play again? (Y/N)');
        gameState = 'play_again';
    }

    function handlePlayAgain(command) {
        display('You: ' + command);
        if (command.toLowerCase() === 'y') {
            startGame();
        } else if (command.toLowerCase() === 'n') {
            display('Goodbye!');
        } else {
            display('Invalid choice. Please enter Y or N.');
        }
    }

    function nextStep() {
        switch (gameState) {
            case 'start':
                display('\nWhat do you want to say to Birdseeker?');
                break;
            case 'birdseeker_response_1':
            case 'birdseeker_response_2':
            case 'birdseeker_response_3':
                break;
            default:
                display('Unexpected state.');
                break;
        }
    }

    function startGame() {
        output.innerHTML = '';
        typeText('Welcome to The Lost Expedition!\nYou are living in a post-apocalyptic world, ravaged by nuclear devastation caused by Crow Corporation.\nYou find an old terminal and start communicating with a mysterious person known as "Birdseeker".\nYour choices will determine your fate and whether you can uncover the secrets of Crow Corporation.\nGood luck!', () => {
            typeText('\nBirdseeker: Are you there? (Type something to continue)');
            gameState = 'prelude';
        });
    }

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const command = input.value.trim();
            handleInput(command);
            clearInput();
        }
    });

    startGame();
});