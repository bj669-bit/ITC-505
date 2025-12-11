const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));
server.use(express.json());

// Serve static files from "public"
const publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath));

// Random number endpoint
server.get('/do_a_random', (req, res) => {
  res.json({ addednum: Math.floor(Math.random() * 100) + 1 });
});

// Mad Lib POST route
server.post('/submit', (req, res) => {
    const { adjective, noun, verb, place, pluralNoun } = req.body;

    if (!adjective || !noun || !verb || !place || !pluralNoun) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const madLib = `Today I went to ${place} and saw a ${adjective} ${noun}. I decided to ${verb} with ${pluralNoun}. What an adventure!`;

    res.json({ madLib });
});

// Start server
let port = 80;
if (process.argv[2] === 'local') port = 8080;
server.listen(port, () => console.log(`Server running on port ${port}`));
