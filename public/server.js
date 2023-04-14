const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const HTTPS = process.env.HTTPS === 'true';
const app = express();
const PORT = process.env.PORT;


// Set headers
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});

// Serve your webpack-built static files
app.use(express.static(path.join(__dirname, 'dist')));

if (HTTPS) {
    // HTTPS server

    const privateKey = fs.readFileSync('key.pem', 'utf8');
    const certificate = fs.readFileSync('cert.pem', 'utf8');
    const credentials = { key: privateKey, cert: certificate };
    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(PORT, () => {
        console.log(`HTTPS Server running on https://localhost:${PORT}`);
    });
}

else {
    // HTTP server
    app.listen(PORT, () => {
        console.log(`HTTP Server running on http://localhost:${PORT}`);
    });
}


