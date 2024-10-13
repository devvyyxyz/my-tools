// mode-toggle.js

document.addEventListener('DOMContentLoaded', () => {
    const modeToggleButton = document.getElementById('mode-toggle-btn');
    const body = document.body;

    modeToggleButton.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            modeToggleButton.textContent = 'Switch to Dark Mode';
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            modeToggleButton.textContent = 'Switch to Light Mode';
        }

        // Update all relevant elements
        updateMode(body.classList.contains('dark-mode'));
    });

    function updateMode(isDarkMode) {
        const elementsToToggle = document.querySelectorAll('.filter-option, header, h2, button, input[type="file"]');
        elementsToToggle.forEach(element => {
            if (isDarkMode) {
                element.classList.remove('light-mode');
                element.classList.add('dark-mode');
            } else {
                element.classList.remove('dark-mode');
                element.classList.add('light-mode');
            }
        });
    }

    // Set initial mode based on class present on body
    updateMode(body.classList.contains('dark-mode'));
});
