document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.getElementById('modeToggle');
    const counterDisplay = document.getElementById('counter');

    // Function to format numbers into abbreviated format
    function formatNumber(num) {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
        }
        if (num >= 1e6) {
            return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1e3) {
            return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return num.toString();
    }

    // Check local storage for mode and counter
    const currentMode = localStorage.getItem('mode');
    let switchCount = parseInt(localStorage.getItem('switchCount')) || 0;
    let isFormatted = localStorage.getItem('isFormatted') === 'true';

    // Update the counter display initially
    updateCounterDisplay();

    if (currentMode) {
        document.body.classList.add(currentMode);

        if (currentMode === 'dark-mode') {
            toggleSwitch.checked = true;
        }
    }

    // Function to update counter display based on format preference
    function updateCounterDisplay() {
        if (isFormatted) {
            counterDisplay.textContent = `Switch Count: ${formatNumber(switchCount)}`;
        } else {
            counterDisplay.textContent = `Switch Count: ${switchCount}`;
        }
    }

    // Toggle between formatted and normal number display on click
    counterDisplay.addEventListener('click', function () {
        isFormatted = !isFormatted;
        localStorage.setItem('isFormatted', isFormatted);

        updateCounterDisplay();
    });

    toggleSwitch.addEventListener('change', function () {
        switchCount += 1;
        localStorage.setItem('switchCount', switchCount);
        updateCounterDisplay();

        if (this.checked) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('mode', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('mode', 'light-mode');
        }
    });
});