document.addEventListener("DOMContentLoaded", () => {
    populateConverterTypes();
    populateDirection();
    document.getElementById('converterType').addEventListener('change', populateDirection);
});

const converters = {
    binary: {
        toText: binaryToText,
        fromText: textToBinary,
        toDecimal: binaryToDecimal,
        fromDecimal: decimalToBinary
    },
    hex: {
        toText: hexToText,
        fromText: textToHex,
        toDecimal: hexToDecimal,
        fromDecimal: decimalToHex
    },
    base64: {
        toText: base64ToText,
        fromText: textToBase64
    },
    url: {
        toText: urlDecode,
        fromText: urlEncode
    },
    morse: {
        toText: morseToText,
        fromText: textToMorse
    },
    ascii: {
        toText: asciiToText,
        fromText: textToAscii
    },
    rot13: {
        toText: rot13,
        fromText: rot13 // ROT13 encoding and decoding are the same
    },
    htmlEntities: {
        toText: htmlEntitiesDecode,
        fromText: htmlEntitiesEncode
    },
    md5: {
        fromText: md5Hash
    },
    sha256: {
        fromText: sha256Hash
    },
    uuid: {
        fromText: generateUUID
    }
};

function populateConverterTypes() {
    const converterType = document.getElementById('converterType');
    converterType.innerHTML = Object.keys(converters).map(type => `<option value="${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</option>`).join('');
}

function populateDirection() {
    const converterType = document.getElementById('converterType').value;
    const conversionDirection = document.getElementById('conversionDirection');
    const directions = converters[converterType];
    conversionDirection.innerHTML = Object.keys(directions).map(direction => {
        let label = '';
        switch (direction) {
            case 'toText':
                label = `${converterType.charAt(0).toUpperCase() + converterType.slice(1)} to Text`;
                break;
            case 'fromText':
                label = `Text to ${converterType.charAt(0).toUpperCase() + converterType.slice(1)}`;
                break;
            case 'toDecimal':
                label = `${converterType.charAt(0).toUpperCase() + converterType.slice(1)} to Decimal`;
                break;
            case 'fromDecimal':
                label = `Decimal to ${converterType.charAt(0).toUpperCase() + converterType.slice(1)}`;
                break;
            default:
                label = `${converterType.charAt(0).toUpperCase() + converterType.slice(1)}`;
        }
        return `<option value="${direction}">${label}</option>`;
    }).join('');
}

function convert() {
    const converterType = document.getElementById('converterType').value;
    const conversionDirection = document.getElementById('conversionDirection').value;
    converters[converterType][conversionDirection]();
}

function binaryToText() {
    const binaryInput = document.getElementById('input').value;
    const binaryArray = binaryInput.split(' ');
    let textOutput = '';
    try {
        binaryArray.forEach(binary => {
            textOutput += String.fromCharCode(parseInt(binary, 2));
        });
        document.getElementById('output').value = textOutput;
    } catch (e) {
        document.getElementById('output').value = 'Invalid binary input.';
    }
}

function textToBinary() {
    const textInput = document.getElementById('input').value;
    let binaryOutput = '';
    for (let i = 0; i < textInput.length; i++) {
        binaryOutput += textInput[i].charCodeAt(0).toString(2).padStart(8, '0') + ' ';
    }
    document.getElementById('output').value = binaryOutput.trim();
}

function binaryToDecimal() {
    const binaryInput = document.getElementById('input').value;
    let decimalOutput = '';
    try {
        decimalOutput = parseInt(binaryInput, 2);
        document.getElementById('output').value = decimalOutput;
    } catch (e) {
        document.getElementById('output').value = 'Invalid binary input.';
    }
}

function decimalToBinary() {
    const decimalInput = document.getElementById('input').value;
    let binaryOutput = '';
    try {
        binaryOutput = parseInt(decimalInput, 10).toString(2);
        document.getElementById('output').value = binaryOutput;
    } catch (e) {
        document.getElementById('output').value = 'Invalid decimal input.';
    }
}

function hexToText() {
    const hexInput = document.getElementById('input').value;
    let textOutput = '';
    try {
        for (let i = 0; i < hexInput.length; i += 2) {
            textOutput += String.fromCharCode(parseInt(hexInput.substr(i, 2), 16));
        }
        document.getElementById('output').value = textOutput;
    } catch (e) {
        document.getElementById('output').value = 'Invalid hex input.';
    }
}

function textToHex() {
    const textInput = document.getElementById('input').value;
    let hexOutput = '';
    for (let i = 0; i < textInput.length; i++) {
        hexOutput += textInput.charCodeAt(i).toString(16).padStart(2, '0');
    }
    document.getElementById('output').value = hexOutput;
}

function hexToDecimal() {
    const hexInput = document.getElementById('input').value;
    let decimalOutput = '';
    try {
        decimalOutput = parseInt(hexInput, 16);
        document.getElementById('output').value = decimalOutput;
    } catch (e) {
        document.getElementById('output').value = 'Invalid hex input.';
    }
}

function decimalToHex() {
    const decimalInput = document.getElementById('input').value;
    let hexOutput = '';
    try {
        hexOutput = parseInt(decimalInput, 10).toString(16);
        document.getElementById('output').value = hexOutput;
    } catch (e) {
        document.getElementById('output').value = 'Invalid decimal input.';
    }
}

function base64ToText() {
    const base64Input = document.getElementById('input').value;
    try {
        const textOutput = atob(base64Input);
        document.getElementById('output').value = textOutput;
    } catch (e) {
        document.getElementById('output').value = 'Invalid Base64 input.';
    }
}

function textToBase64() {
    const textInput = document.getElementById('input').value;
    const base64Output = btoa(textInput);
    document.getElementById('output').value = base64Output;
}

function urlEncode() {
    const textInput = document.getElementById('input').value;
    const encodedOutput = encodeURIComponent(textInput);
    document.getElementById('output').value = encodedOutput;
}

function urlDecode() {
    const urlInput = document.getElementById('input').value;
    try {
        const decodedOutput = decodeURIComponent(urlInput);
        document.getElementById('output').value = decodedOutput;
    } catch (e) {
        document.getElementById('output').value = 'Invalid URL input.';
    }
}

function morseToText() {
    const morseInput = document.getElementById('input').value.trim();
    const morseDictionary = {
        ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E", "..-.": "F", "--.": "G", "....": "H", "..": "I",
        ".---": "J", "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O", ".--.": "P", "--.-": "Q", ".-.": "R",
        "...": "S", "-": "T", "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y", "--..": "Z",
        "-----": "0", ".----": "1", "..---": "2", "...--": "3", "....-": "4", ".....": "5", "-....": "6", "--...": "7",
        "---..": "8", "----.": "9", "|": " "
    };
    let textOutput = morseInput.split(' ').map(code => morseDictionary[code] || '').join('');
    document.getElementById('output').value = textOutput;
}

function textToMorse() {
    const textInput = document.getElementById('input').value.toUpperCase();
    const morseDictionary = {
        "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.", "H": "....", "I": "..",
        "J": ".---", "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.",
        "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--", "Z": "--..",
        "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...",
        "8": "---..", "9": "----.", " ": "|"
    };
    let morseOutput = textInput.split('').map(char => morseDictionary[char] || '').join(' ');
    document.getElementById('output').value = morseOutput;
}

function asciiToText() {
    const asciiInput = document.getElementById('input').value.split(' ');
    let textOutput = '';
    try {
        asciiInput.forEach(ascii => {
            textOutput += String.fromCharCode(parseInt(ascii, 10));
        });
        document.getElementById('output').value = textOutput;
    } catch (e) {
        document.getElementById('output').value = 'Invalid ASCII input.';
    }
}

function textToAscii() {
    const textInput = document.getElementById('input').value;
    let asciiOutput = '';
    for (let i = 0; i < textInput.length; i++) {
        asciiOutput += textInput.charCodeAt(i) + ' ';
    }
    document.getElementById('output').value = asciiOutput.trim();
}

function rot13() {
    const input = document.getElementById('input').value;
    const output = input.replace(/[A-Za-z]/g, function (c) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(
            "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm".indexOf(c)
        );
    });
    document.getElementById('output').value = output;
}

function htmlEntitiesEncode() {
    const textInput = document.getElementById('input').value;
    const encodedOutput = textInput.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
    document.getElementById('output').value = encodedOutput;
}

function htmlEntitiesDecode() {
    const htmlInput = document.getElementById('input').value;
    const doc = new DOMParser().parseFromString(htmlInput, "text/html");
    document.getElementById('output').value = doc.documentElement.textContent;
}

async function md5Hash() {
    const textInput = document.getElementById('input').value;
    const buffer = new TextEncoder().encode(textInput);
    const hashBuffer = await crypto.subtle.digest('MD5', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    document.getElementById('output').value = hashHex;
}

async function sha256Hash() {
    const textInput = document.getElementById('input').value;
    const buffer = new TextEncoder().encode(textInput);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    document.getElementById('output').value = hashHex;
}

function generateUUID() {
    const uuid = URL.createObjectURL(new Blob()).substring(9);
    document.getElementById('output').value = uuid;
}
