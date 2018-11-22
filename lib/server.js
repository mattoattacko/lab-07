'use strict';

const superagent = require('superagent');
const express = require('express');
const app = express();

// Not working fix later if unsuccessful
// const PORT = process.env.PORT || 8080;
// const API = 'http://localhost:3000';

// Set the view engine for templating
app.set('view engine', 'ejs');

// Dynamic Route
app.use(router);

// Static Route
app.use( express.static('./public') );

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};