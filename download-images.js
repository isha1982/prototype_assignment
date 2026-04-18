const fs = require('fs');
const path = require('path');
const https = require('https');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

const downloads = [
    { name: 'anna.svg', url: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Anna_University_Logo.svg' },
    { name: 'cu.png', url: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Chandigarh_University_Seal.png' },
    { name: 'rec-cognizant.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Cognizant_logo_2022.svg' },
    { name: 'rec-accenture.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg' },
    { name: 'rec-techmahindra.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Tech_Mahindra_New_Logo.svg' },
    { name: 'rec-apollo.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Apollo_Hospitals_Logo.svg' },
    { name: 'rec-capgemini.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Capgemini_Logo.svg' },
    { name: 'rec-amazon.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
];

function downloadFile(url, fileName) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(publicDir, fileName);
        const file = fs.createWriteStream(filePath);
        
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        https.get(url, options, (response) => {
            if (response.statusCode > 300 && response.statusCode < 400 && response.headers.location) {
                return resolve(downloadFile(response.headers.location, fileName));
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}, status code: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${fileName}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => {});
            reject(err);
        });
    });
}

async function run() {
    for (const dl of downloads) {
        try {
            await downloadFile(dl.url, dl.name);
        } catch (e) {
            console.error(e);
        }
    }
}

run();
