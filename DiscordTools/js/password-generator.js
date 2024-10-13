// Function to generate a random password
function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    // Define character sets based on user selection
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+[]{}|;:,.<>?';

    // Generate the password
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Display the password
    document.getElementById('password').textContent = password;
}

// Function to copy the password to clipboard
function copyPassword() {
    const passwordText = document.getElementById('password').textContent;
    navigator.clipboard.writeText(passwordText)
        .then(() => {
            alert('Password copied to clipboard!');
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
        });
}

// Event listeners
document.getElementById('generate').addEventListener('click', generatePassword);
document.getElementById('copy').addEventListener('click', copyPassword);
