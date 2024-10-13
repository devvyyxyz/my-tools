function generatePassword() {
    const length = document.getElementById('length').value;
    const includeLetters = document.getElementById('includeLetters').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSpecial = document.getElementById('includeSpecial').checked;

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let characters = '';
    if (includeLetters) characters += letters;
    if (includeNumbers) characters += numbers;
    if (includeSpecial) characters += special;

    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    document.getElementById('passwordOutput').value = password;
}