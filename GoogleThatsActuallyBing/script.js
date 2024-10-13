document.addEventListener('DOMContentLoaded', function() {
    var googleLogo = document.getElementById('google-logo');
    var clickCount = 0;

    googleLogo.addEventListener('click', function() {
        clickCount++;

        if (clickCount === 5) {
            // Change the Google logo to the Bing logo
            googleLogo.src = 'https://www.bing.com/rp/QO12R6eZz9WMzJPOio-qN8bXJZ4.png'; // Replace with Bing logo URL
            googleLogo.alt = 'Bing Logo'; // Optional: Set an alt attribute for accessibility
            // googleLogo.style.width = '160px'; // Adjust width to match Bing logo size
            // googleLogo.style.height = '40px'; // Adjust height to match Bing logo size
        }
    });
});