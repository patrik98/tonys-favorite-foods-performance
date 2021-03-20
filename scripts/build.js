const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function asset(filename) {
    return path.join(__dirname + '/../assets', filename);
}

function target(filename) {
    return path.join(__dirname + '/../www/assets', filename);
}

async function resizeAndMove(img) {
    await sharp(asset(img))
    .resize(null, 200)
    .jpeg()
    .toFile(target(img))
    .catch(error => {
        console.log(error);
    });
}

resizeAndMove('images/soop.jpg');
resizeAndMove('images/brrto.jpg');
resizeAndMove('images/fish.jpg');
resizeAndMove('images/pezza.jpg');
fs.copyFileSync(asset('css/style.css'), target('css/style.css'));
fs.copyFileSync(asset('js/index.js'), target('js/index.js'));