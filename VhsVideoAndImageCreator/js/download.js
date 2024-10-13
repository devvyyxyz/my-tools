// download.js

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-modified-btn');

    downloadBtn.addEventListener('click', handleDownload);
});

// Function to handle download of modified image
function handleDownload() {
    const modifiedCanvas = document.getElementById('modified-canvas');
    const image = modifiedCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

    const link = document.createElement('a');
    link.setAttribute('href', image);
    link.setAttribute('download', 'modified-image.png');
    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}
