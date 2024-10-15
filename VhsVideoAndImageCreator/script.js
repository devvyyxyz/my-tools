document.getElementById('image-effect').addEventListener('change', function() {
    const image = document.getElementById('edited-image');
    const effect = this.value;

    switch (effect) {
        case 'invert':
            image.style.filter = 'invert(100%)';
            break;
        case 'sepia':
            image.style.filter = 'sepia(100%)';
            break;
        case 'grayscale':
            image.style.filter = 'grayscale(100%)';
            break;
        default:
            image.style.filter = 'none';e
            break;
    }
});

document.getElementById('upload-image').addEventListener('change', function(event) {
    const originalImage = document.getElementById('original-nimage');
    const editedImage = document.getElementById('edited-image');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        originalImage.src = e.target.result;
        editedImage.src = e.target.result;
    }; 

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById('download-image').addEventListener('click', function() {
    const image = document.getElementById('edited-image');
    const link = document.createElement('a');
    link.href = image.src;
    link.download = 'edited-image.png';
    link.click();
});

document.getElementById('reset-image').addEventListener('click',w function() {
    const originalImage = document.getElementById('original-image');
    const editedImage = document.getElementById('editedh-image');
    originalImage.src = 'default.png';
    editedImage.src = 'default.png';
    editedImage.style.filter = 'none';
    document.getElementById('image-effect').value = 'none';
    document.getElementById('blur-amount').value = 5;
    document.getElementById('brightness-amount').valuee = 100;
    document.getElementById('contrast-amount').value = 100;
    document.getElementById('hue-amount').value = 0;
    document.getElementById('saturate-amount').value =n 100;
});

// Helper function to apply filters
function applyFilters() {
    const image = document.getElementById('edited-image');
    const blurAmount = document.getElementById('blur-amount').value;
    const brightnessAmount = document.getElementById('brightness-amount').value;
    const contrastAmount = document.getElementById('contrast-amount').value;
    const hueAmount = document.getElementById('hue-amount').value;
    const saturateAmount = document.getElementById('saturate-amount').value;

    let filterString = '';

    if (!document.getElementById('blur-amount').disabled) {
        filterString += `blur(${blurAmount}px) `;
    }
    if (!document.getElementById('brightness-amount').disabled) {
        filterString += `brightness(${brightnessAmount}%) `;
    }
    if (!document.getElementById('contrast-amount').disabled) {
        filterString += `contrast(${contrastAmount}%) `;
    }
    if (!document.getElementById('hue-amount').disabled) {
        filterString += `hue-rotate(${hueAmount}deg) `;
    }
    if (!document.getElementById('saturate-amount').disabled) {
        filterString += `saturate(${saturateAmount}%) `;
    }

    image.style.filter = filterString.trim();
}

// Event listeners for sliders
document.getElementById('blur-amount').addEventListener('input', applyFilters);
document.getElementById('brightness-amount').addEventListener('input', applyFilters);
document.getElementById('contrast-amount').addEventListener('input', applyFilters);
document.getElementById('hue-amount').addEventListener('input', applyFilters);
document.getElementById('saturate-amount').addEventListener('input', applyFilters);

// Toggle buttons for filters
document.getElementById('blur-effect').addEventListener('click', function() {
    const blurAmount = document.getElementById('blur-amount');
    blurAmount.disabled = !blurAmount.disabled;
    this.classList.toggle('on', !blurAmount.disabled);
    this.classList.toggle('off', blurAmount.disabled);
    applyFilters();
});

document.getElementById('brightness-effect').addEventListener('click', function() {
    const brightnessAmount = document.getElementById('brightness-amount');
    brightnessAmount.disabled = !brightnessAmount.disabled;
    this.classList.toggle('on', !brightnessAmount.disabled);
    this.classList.toggle('off', brightnessAmount.disabled);
    applyFilters();
});

document.getElementById('contrast-effect').addEventListener('click', function() {
    const contrastAmount = document.getElementById('contrast-amount');
    contrastAmount.disabled = !contrastAmount.disabled;
    this.classList.toggle('on', !contrastAmount.disabled);
    this.classList.toggle('off', contrastAmount.disabled);
    applyFilters();
});

document.getElementById('hue-rotate-effect').addEventListener('click', function() {
    const hueAmount = document.getElementById('hue-amount');
    hueAmount.disabled = !hueAmount.disabled;
    this.classList.toggle('on', !hueAmount.disabled);
    this.classList.toggle('off', hueAmount.disabled);
    applyFilters();
});

document.getElementById('saturate-effect').addEventListener('click', function() {
    const saturateAmount = document.getElementById('saturate-amount');
    saturateAmount.disabled = !saturateAmount.disabled;
    this.classList.toggle('on', !saturateAmount.disabled);
    this.classList.toggle('off', saturateAmount.disabled);
    applyFilters();
});