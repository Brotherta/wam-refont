const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const HTTPS = process.env.HTTPS === "true";
const PORT = process.env.PORT || 5002;
console.log("FRONT: ", process.env.BACKEND_URL);



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
    const keyPath = process.env.SSL_KEY_FILE;
    const certPath = process.env.SSL_CERT_FILE;
    const privateKey = fs.readFileSync(keyPath, 'utf8');
    const certificate = fs.readFileSync(certPath, 'utf8');
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


