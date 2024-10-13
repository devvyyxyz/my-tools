// Search functionality for regex rules
document.getElementById('regex-search').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const regexListItems = document.querySelectorAll('#regex-list li');
    
    regexListItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchValue) ? '' : 'none';
    });
});

// Random Text Generator functionality
const randomTextButton = document.getElementById('generate-button');
const randomTextParagraph = document.getElementById('random-text');

const randomTexts = [
    "Lorem ipsum dolor sit amet.",
    "Consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt.",
    "Ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam."
];

if (randomTextButton) {
    randomTextButton.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * randomTexts.length);
        randomTextParagraph.textContent = randomTexts[randomIndex];
    });
}

// nav menu listener
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('nav-active');
});
