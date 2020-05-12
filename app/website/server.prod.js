'use strict';

const express = require('express');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static('./dist/', {index: 'index.html'}))

app.listen(PORT, HOST);