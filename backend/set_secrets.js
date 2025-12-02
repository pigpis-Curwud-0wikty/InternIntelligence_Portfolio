const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

try {
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const secrets = envContent.split('\n')
        .filter(line => line.trim() && !line.startsWith('#'))
        .map(line => {
            const [key, ...valParts] = line.trim().split('=');
            const val = valParts.join('=');
            return `${key}="${val}"`;
        })
        .join(' ');

    console.log('Setting secrets...');
    exec(`flyctl secrets set ${secrets}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error setting secrets: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
    });
} catch (err) {
    console.error('Error reading .env:', err);
}
