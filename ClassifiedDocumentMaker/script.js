function execCmd(command, value = null) {
    document.execCommand(command, false, value);
}

function blackoutText() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.className = 'classified';
        span.textContent = selection.toString();
        range.deleteContents();
        range.insertNode(span);
    }
}

function saveAsHtml() {
    const scpDocument = document.getElementById('scp-document').innerHTML;
    const blob = new Blob([scpDocument], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'scp-document.html';
    link.click();
}

function saveAsImage() {
    const scpDocument = document.getElementById('scp-document');
    html2canvas(scpDocument).then(canvas => {
        const link = document.createElement('a');
        link.download = 'scp-document.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}