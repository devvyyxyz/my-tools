// options.js

let currentNoiseData = null; // Store original image data to prevent cumulative noise
let currentVCRLinesData = null; // Store original image data for VCR lines filter

document.addEventListener('DOMContentLoaded', () => {
    // Initialize filter checkboxes to unchecked state
    const filterCheckboxes = document.querySelectorAll('.toggle-filter');
    filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false; // Ensure filters are initially unchecked
        checkbox.addEventListener('change', () => {
            toggleFilter(checkbox.dataset.filter, checkbox.checked);
        });
    });

    // Initialize VCR Lines Intensity slider and input field
    const vcrLinesIntensitySlider = document.getElementById('vcr-lines-intensity');
    const vcrLinesIntensityInput = document.getElementById('vcr-lines-intensity-value');
    vcrLinesIntensitySlider.addEventListener('input', () => {
        vcrLinesIntensityInput.value = vcrLinesIntensitySlider.value;
        applyVCRLinesWithIntensity(parseInt(vcrLinesIntensitySlider.value, 10));
    });
    vcrLinesIntensityInput.addEventListener('input', () => {
        vcrLinesIntensitySlider.value = vcrLinesIntensityInput.value;
        applyVCRLinesWithIntensity(parseInt(vcrLinesIntensityInput.value, 10));
    });

    // Initialize Noise Intensity slider and input field
    const noiseIntensitySlider = document.getElementById('noise-intensity');
    const noiseIntensityInput = document.getElementById('noise-intensity-value');
    noiseIntensitySlider.addEventListener('input', () => {
        noiseIntensityInput.value = noiseIntensitySlider.value;
        applyNoiseWithIntensity(parseInt(noiseIntensitySlider.value, 10));
    });
    noiseIntensityInput.addEventListener('input', () => {
        noiseIntensitySlider.value = noiseIntensityInput.value;
        applyNoiseWithIntensity(parseInt(noiseIntensityInput.value, 10));
    });

    // Initialize JPEG Compression slider and input field
    const jpegIntensitySlider = document.getElementById('jpeg-intensity');
    const jpegIntensityInput = document.getElementById('jpeg-intensity-value');
    jpegIntensitySlider.addEventListener('input', () => {
        jpegIntensityInput.value = jpegIntensitySlider.value;
        if (document.querySelector('.toggle-filter[data-filter="jpeg"]').checked) {
            applyJPEGCompression(parseInt(jpegIntensitySlider.value, 10));
        }
    });
    jpegIntensityInput.addEventListener('input', () => {
        jpegIntensitySlider.value = jpegIntensityInput.value;
        if (document.querySelector('.toggle-filter[data-filter="jpeg"]').checked) {
            applyJPEGCompression(parseInt(jpegIntensityInput.value, 10));
        }
    });

    // Initialize Color Bleed Intensity slider and input field
    const colorBleedIntensitySlider = document.getElementById('color-bleed-intensity');
    const colorBleedIntensityInput = document.getElementById('color-bleed-intensity-value');
    colorBleedIntensitySlider.addEventListener('input', () => {
        colorBleedIntensityInput.value = colorBleedIntensitySlider.value;
        if (document.querySelector('.toggle-filter[data-filter="colorBleed"]').checked) {
            applyColorBleed(parseInt(colorBleedIntensitySlider.value, 10));
        }
    });
    colorBleedIntensityInput.addEventListener('input', () => {
        colorBleedIntensitySlider.value = colorBleedIntensityInput.value;
        if (document.querySelector('.toggle-filter[data-filter="colorBleed"]').checked) {
            applyColorBleed(parseInt(colorBleedIntensityInput.value, 10));
        }
    });

    // Initialize VHS Intensity slider and input field
    const vhsIntensitySlider = document.getElementById('vhs-intensity');
    const vhsIntensityInput = document.getElementById('vhs-intensity-value');
    vhsIntensitySlider.addEventListener('input', () => {
        vhsIntensityInput.value = vhsIntensitySlider.value;
        if (document.querySelector('.toggle-filter[data-filter="vhs"]').checked) {
            applyVHSCompression(parseInt(vhsIntensitySlider.value, 10));
        }
    });
    vhsIntensityInput.addEventListener('input', () => {
        vhsIntensitySlider.value = vhsIntensityInput.value;
        if (document.querySelector('.toggle-filter[data-filter="vhs"]').checked) {
            applyVHSCompression(parseInt(vhsIntensityInput.value, 10));
        }
    });
    
    // Add event listener for reset button if available
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetImageAndFilters);
    }
});

function toggleFilter(filterName, enabled) {
    const canvas = document.getElementById('modified-canvas');
    const context = canvas.getContext('2d');

    switch (filterName) {
        case 'grayscale':
            if (enabled) {
                applyGrayscale(context);
            } else {
                clearGrayscale(context);
            }
            break;
        case 'sepia':
            if (enabled) {
                applySepia(context);
            } else {
                clearSepia(context);
            }
            break;
        case 'invert':
            if (enabled) {
                applyInvert(context);
            } else {
                clearInvert(context);
            }
            break;
        case 'noise':
            if (enabled) {
                applyNoiseWithIntensity(parseInt(document.getElementById('noise-intensity').value, 10));
            } else {
                clearNoise(context);
            }
            break;
        case 'vcrLines':
            if (enabled) {
                applyVCRLinesWithIntensity(parseInt(document.getElementById('vcr-lines-intensity').value, 10));
            } else {
                clearVCRLines(context);
            }
            break;
        case 'jpeg':
            if (enabled) {
                applyJPEGCompression();
            } else {
                clearJPEGCompression(context);
            }
            break;
        case 'colorBleed':
            if (enabled) {
                applyColorBleed(parseInt(document.getElementById('color-bleed-intensity').value, 10));
            } else {
                clearColorBleed(context);
            }
            break;
        case 'vhs':
            if (enabled) {
                applyVHSCompression(parseInt(document.getElementById('vhs-intensity').value, 10));
            } else {
                clearVHSCompression(context);
            }
            break;
        default:
            break;
    }
}

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

// Function to clear grayscale filter
function clearGrayscale(context) {
    const originalImage = document.getElementById('original-image').querySelector('img');
    if (!originalImage) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);
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

// Function to clear sepia filter
function clearSepia(context) {
    const originalImage = document.getElementById('original-image').querySelector('img');
    if (!originalImage) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);
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

// Function to clear invert filter
function clearInvert(context) {
    const originalImage = document.getElementById('original-image').querySelector('img');
    if (!originalImage) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);
}

// Function to apply noise filter with intensity scale from slider
function applyNoiseWithIntensity(intensity) {
    const canvas = document.getElementById('modified-canvas');
    const context = canvas.getContext('2d');

    // Check if original image data is stored
    if (!currentNoiseData) {
        currentNoiseData = context.getImageData(0, 0, canvas.width, canvas.height);
    }

    const imageData = context.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    const factor = intensity / 100; // Convert intensity to a factor between 0 and 1

    for (let i = 0; i < data.length; i += 4) {
        const random = (Math.random() * 2 - 1) * factor * 255; // Random noise between -factor * 255 to +factor * 255
        data[i] = currentNoiseData.data[i] + random; // Red channel
        data[i + 1] = currentNoiseData.data[i + 1] + random; // Green channel
        data[i + 2] = currentNoiseData.data[i + 2] + random; // Blue channel
        data[i + 3] = 255; // Alpha channel
    }

    context.putImageData(imageData, 0, 0);
}

// Function to clear noise filter
function clearNoise(context) {
    const originalImage = document.getElementById('original-image').querySelector('img');
    if (!originalImage) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);

    // Reset stored image data
    currentNoiseData = null;
}

// Function to apply VCR lines filter with intensity scale from slider
function applyVCRLinesWithIntensity(intensity) {
    const canvas = document.getElementById('modified-canvas');
    const context = canvas.getContext('2d');

    // Check if original image data is stored
    if (!currentVCRLinesData) {
        currentVCRLinesData = context.getImageData(0, 0, canvas.width, canvas.height);
    }

    const imageData = context.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    const lineGap = Math.floor(canvas.height / intensity); // Calculate line gap based on intensity

    for (let y = 0; y < canvas.height; y++) {
        if (y % lineGap === 0) {
            for (let x = 0; x < canvas.width; x++) {
                const index = (y * canvas.width + x) * 4;
                data[index] = currentVCRLinesData.data[index] * 0.8; // Red channel
                data[index + 1] = currentVCRLinesData.data[index + 1] * 0.8; // Green channel
                data[index + 2] = currentVCRLinesData.data[index + 2] * 0.8; // Blue channel
                data[index + 3] = 255; // Alpha channel
            }
        }
    }

    context.putImageData(imageData, 0, 0);
}


// Function to clear VCR lines filter
function clearVCRLines(context) {
    const originalImage = document.getElementById('original-image').querySelector('img');
    if (!originalImage) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);

    // Reset stored image data
currentVCRLinesData = null;
}

function applyJPEGCompression(quality) {
    const canvas = document.getElementById('modified-canvas');
    const context = canvas.getContext('2d');
    quality = quality / 100; // Convert to a quality factor between 0 and 1

    // Convert the image data to JPEG format with specified quality
    const jpegImageData = canvas.toDataURL('image/jpeg', quality);

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the compressed JPEG image onto the canvas
    const img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = jpegImageData;
}


// Function to clear JPEG compression (restore original image)
function clearJPEGCompression(context) {
    const originalImage = document.getElementById('original-image').querySelector('img');
    if (!originalImage) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);
}

// Function to apply color bleed filter
function applyColorBleed(intensity) {
    const canvas = document.getElementById('modified-canvas');
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        data[i] = Math.min(255, red + intensity); // Red
        data[i + 1] = Math.min(255, green + intensity); // Green
        data[i + 2] = Math.min(255, blue + intensity); // Blue
    }

    context.putImageData(imageData, 0, 0);
}

// Function to clear color bleed filter
function clearColorBleed(context) {
    const originalImage = document.getElementById('original-image').querySelector('img');
    if (!originalImage) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);
}

// Function to apply VHS compression effect
function applyVHSCompression(intensity) {
    const canvas = document.getElementById('modified-canvas');
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Apply noise
    for (let i = 0; i < data.length; i += 4) {
        const rand = Math.random() * intensity / 2;
        data[i] = data[i] + rand; // Red
        data[i + 1] = data[i + 1] + rand; // Green
        data[i + 2] = data[i + 2] + rand; // Blue
    }

    // Apply color bleed
    for (let i = 0; i < data.length; i += 4) {
        const rand = Math.random() * intensity / 4;
        data[i] = data[i] + rand; // Red
        data[i + 1] = data[i + 1] - rand; // Green
        data[i + 2] = data[i + 2] + rand; // Blue
    }

    // Apply horizontal line artifacts
    for (let i = 0; i < data.length; i += 4 * canvas.width) {
        const rand = Math.random() * intensity / 2;
        for (let j = 0; j < 4 * canvas.width; j += 4) {
            data[i + j] = data[i + j] + rand; // Red
            data[i + j + 1] = data[i + j + 1] + rand; // Green
            data[i + j + 2] = data[i + j + 2] + rand; // Blue
        }
    }

    context.putImageData(imageData, 0, 0);
}

// Function to clear VHS compression effect
function clearVHSCompression(context) {
    const originalImage = document.getElementById('original-image').querySelector('img');
    if (!originalImage) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);
}

// Function to reset image and all filters
function resetImageAndFilters() {
const canvas = document.getElementById('modified-canvas');
const context = canvas.getContext('2d');

// Clear canvas
const originalImage = document.getElementById('original-image').querySelector('img');
if (originalImage) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
}

// Reset filter checkboxes
const filterCheckboxes = document.querySelectorAll('.toggle-filter');
filterCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
});

// Clear any applied filters
clearGrayscale(context);
clearSepia(context);
clearInvert(context);
clearNoise(context);
clearVCRLines(context);
clearJPEGCompression(context);
clearColorBleed(context);
}
