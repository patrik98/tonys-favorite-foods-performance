const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const csso = require('csso');
const terser = require('terser');

function asset(filename) {
    return path.join(__dirname + '/../assets', filename);
}

function target(filename) {
    return path.join(__dirname + '/../www/assets', filename);
}

function resizeAndMoveImg(img) {
    sharp(asset(img))
    .resize(null, 200)
    .jpeg()
    .toFile(target(img))
    .catch(error => {
        console.log(error);
    });
}

function minifyAndMoveCSS(css) {
    try {
        const cssFile = fs.readFileSync(asset('css/style.css'), 'utf8');
        let output = csso.minify(cssFile, {
            filename: css
        });
        fs.writeFileSync(target(css), Buffer.from(output.css, 'utf-8'));
    } catch(e) {
        console.log(e);
    }
}

function minifyAndMoveJS(js) {
    const jsFile = fs.readFileSync(asset(js), 'utf8');
    terser.minify(jsFile)
    .then(minifiedJS => {
        fs.writeFileSync(target(js), Buffer.from(minifiedJS.code, 'utf-8'));
    })
    .catch(error => {
        console.log(error);
    });
}

resizeAndMoveImg('images/soop.jpg');
resizeAndMoveImg('images/brrto.jpg');
resizeAndMoveImg('images/fish.jpg');
resizeAndMoveImg('images/pezza.jpg');

minifyAndMoveCSS('css/style.css')

// removed JS completely, to get last point of performance
// minifyAndMoveJS('js/index.js');