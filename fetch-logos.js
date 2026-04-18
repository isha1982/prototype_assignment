const fs = require('fs');
const path = require('path');
const https = require('https');

const publicDir = path.join(__dirname, 'public');

const logos = [
    { name: 'v-logo-cognizant.png', domain: 'cognizant.com' },
    { name: 'v-logo-accenture.png', domain: 'accenture.com' },
    { name: 'v-logo-techmahindra.png', domain: 'techmahindra.com' },
    { name: 'v-logo-apollo.png', domain: 'apollohospitals.com' },
    { name: 'v-logo-capgemini.png', domain: 'capgemini.com' },
    { name: 'v-logo-amazon.png', domain: 'amazon.com' }
];

function downloadFavicon(domain, fileName) {
    return new Promise((resolve) => {
        const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
        const filePath = path.join(publicDir, fileName);
        const file = fs.createWriteStream(filePath);
        
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                console.log("Failed", domain);
                resolve();
            }
        }).on('error', () => resolve());
    });
}

async function run() {
    for (let l of logos) {
        await downloadFavicon(l.domain, l.name);
    }
}

run();
