'use strict';

const express = require('express');
var favicon = require('serve-favicon');


// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static('./dist/', {index: 'index.html'}))

// FavIcon
app.use(favicon('./dist/assets/favIcon.ico'));

app.listen(PORT, HOST);