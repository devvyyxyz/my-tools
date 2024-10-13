// upload.js

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');

    // Event listener for file input change
    fileInput.addEventListener('change', handleFileSelect);

    // Load default image if no file is uploaded
    loadDefaultImage();
});

// Function to handle file selection
function handleFileSelect(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = function(e) {
        // Render image preview
        const previewElement = document.getElementById('original-image');
        previewElement.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;

        // Initialize comparison with the uploaded image
        initializeComparison(e.target.result);
    };

    // Read in the image file as a data URL.
    reader.readAsDataURL(file);
}

// Function to load default image if no file is uploaded
function loadDefaultImage() {
    const previewElement = document.getElementById('original-image');
    previewElement.innerHTML = `<img src="default.png" alt="Default Image">`;

    // Initialize comparison with the default image
    initializeComparison('default.png');
}

// Function to initialize comparison with the image
function initializeComparison(imageSrc) {
    const originalImage = new Image();
    originalImage.onload = function() {
        // Update canvas size to match the image dimensions
        const modifiedCanvas = document.getElementById('modified-canvas');
        modifiedCanvas.width = originalImage.width;
        modifiedCanvas.height = originalImage.height;

        // Draw original image on canvas
        const modifiedContext = modifiedCanvas.getContext('2d');
        modifiedContext.drawImage(originalImage, 0, 0);

        // Apply filters and setup comparison
        applyFilters();
    };
    originalImage.src = imageSrc;
}
