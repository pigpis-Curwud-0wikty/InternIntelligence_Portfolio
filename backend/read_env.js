const fs = require('fs');
const path = require('path');

try {
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log(envContent);
} catch (err) {
    console.error('Error reading .env:', err);
}
