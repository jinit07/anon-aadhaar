const Jimp = require('jimp');
const QrCode = require('qrcode-reader');
const fs = require('fs');
const path = require('path');

// Function to read the QR code from an image
function readQRCode(filePath) {
  return new Promise((resolve, reject) => {
    Jimp.read(filePath, (err, image) => {
      if (err) {
        return reject(err);
      }
      const qr = new QrCode();
      qr.callback = (err, value) => {
        if (err) {
          return reject(err);
        }
        resolve(value.result);
      };
      qr.decode(image.bitmap);
    });
  });
}

// Function to save data to dataInput.json
function saveToJsonFile(data, fileName) {
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, JSON.stringify({ data }, null, 2), 'utf-8');
  console.log(`Data saved to ${fileName}`);
}

// Main function to execute the process
async function main() {
  try {
    const qrCodeFilePath = path.join(__dirname, './qrjhalak.png'); // Change this to your QR code image path
    const data = await readQRCode(qrCodeFilePath);
    saveToJsonFile(data, 'dataInput.json');
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
