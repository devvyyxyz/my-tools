// filters.js

// Function to apply grayscale filter
function applyGrayscale(context) {
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

// Function to apply sepia filter
function applySepia(context) {
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        data[i] = Math.min(255, red * 0.393 + green * 0.769 + blue * 0.189); // Red
        data[i + 1] = Math.min(255, red * 0.349 + green * 0.686 + blue * 0.168); // Green
        data[i + 2] = Math.min(255, red * 0.272 + green * 0.534 + blue * 0.131); // Blue
    }

    context.putImageData(imageData, 0, 0);
}

// Function to apply invert filter
function applyInvert(context) {
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]; // Red
        data[i + 1] = 255 - data[i + 1]; // Green
        data[i + 2] = 255 - data[i + 2]; // Blue
    }

    context.putImageData(imageData, 0, 0);
}

// Function to apply noise filter with intensity scale
function applyNoise(context, intensity) {
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const data = imageData.data;
    const factor = intensity / 100; // Convert intensity to a factor between 0 and 1

    for (let i = 0; i < data.length; i += 4) {
        const random = (Math.random() * 2 - 1) * factor * 255; // Random noise between -factor * 255 to +factor * 255
        data[i] += random; // Red channel
        data[i + 1] += random; // Green channel
        data[i + 2] += random; // Blue channel
    }

    context.putImageData(imageData, 0, 0);
}
