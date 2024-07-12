const qrText = document.getElementById('text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrcontainer = document.querySelector('.qr-body');

let size = sizes.value;
let qrCode = null;

generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isemptyInput();
});

sizes.addEventListener('change', (e) => {
    size = e.target.value;
    isemptyInput();
});

downloadBtn.addEventListener('click', () => {
    if (qrCode !== null) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = qrCode._oDrawing._elCanvas.width;
        canvas.height = qrCode._oDrawing._elCanvas.height;
        ctx.drawImage(qrCode._oDrawing._elCanvas, 0, 0);

        let dataURL = canvas.toDataURL('image/png');
        downloadBtn.href = dataURL;
        downloadBtn.download = 'qrcode.png';
    } else {
        alert("No QR code available to download. Generate QR code first.");
    }
});

function isemptyInput() {
    if (qrText.value.trim().length > 0) {
        generateQRCode();
    } else {
        alert("Enter the text or URL to generate your QR Code");
    }
}

function generateQRCode() {
    qrcontainer.innerHTML = "";
    qrCode = new QRCode(qrcontainer, {
        text: qrText.value,
        width: parseInt(size),
        height: parseInt(size),
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}
