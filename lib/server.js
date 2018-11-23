'use strict';

// const superagent = require('superagent');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const extraRoutes = require('./extra-routes.js');

// Not working fix later if unsuccessful
// const PORT = process.env.PORT || 8080;
// const API = 'http://localhost:3000';

// Set the view engine for templating
app.set('view engine', 'ejs');

// Dynamic Route
app.use(extraRoutes);

// Static Route
app.use(express.static('./public') );

// Test Chris Middleware Ideas
app.use(express.urlencoded({extended:true}));
app.use(methodOverride(function(request, response) {
  if(request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    // console.log(method);
    delete request.body._method;
    return method;
  }
}));

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};