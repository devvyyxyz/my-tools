// comparison.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize comparison
    initializeComparison();
});

// Function to initialize comparison
function initializeComparison() {
    const originalImageElement = document.getElementById('original-image').querySelector('img');
    if (!originalImageElement) return;

    const modifiedCanvas = document.getElementById('modified-canvas');
    const modifiedContext = modifiedCanvas.getContext('2d');

    originalImageElement.onload = function() {
        // Clear canvas
        modifiedContext.clearRect(0, 0, modifiedCanvas.width, modifiedCanvas.height);

        // Set canvas dimensions to match image
        modifiedCanvas.width = originalImageElement.width;
        modifiedCanvas.height = originalImageElement.height;

        // Draw original image on canvas
        modifiedContext.drawImage(originalImageElement, 0, 0, modifiedCanvas.width, modifiedCanvas.height);

        // Do not apply filters on initialization
        // applyFilters(modifiedContext);
    };
}

// Function to apply filters to the modified image
function applyFilters(context) {
    // Example: Apply grayscale filter
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // Red
        data[i + 1] = avg; // Green
        data[i + 2] = avg; // Blue
    }

    context.putImageData(imageData, 0, 0);
}
