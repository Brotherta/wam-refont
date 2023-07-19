const express = require('express');
const config= require('../config');
const plugins = require("../../plugins.json");

const router = express.Router();

router.get("/wams", (req, res) => {
    res.send(plugins.map((plugin) => `${config.HTTPS ? 'https' : 'http'}://${req.get("Host")}/plugins/${plugin}/`));
});

module.exports = router;