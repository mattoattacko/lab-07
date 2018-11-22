'use strict';

const express = require('express');
const superagent = require('superagent');
const router = express.Router();
const API = 'http://localhost:3000';

// Routes (moved from server.js)
router.get('/', homePage);
router.get('/list', listPage);

// Route Runners (moved from server.js)
function homePage(request, response) {
    response.render('site', {page: './pages/index', title:'Welcome Home'});
}

// Function (moved from server.js)
function listPage(request, response) {
    superagent.get( `${API}/api/v1/categories`)
      .then(data => {
        response.render('site', {page: './pages/list', title:'Listings', items: data.body});
      })
      .catch( error => {
        response.render('site', {page: './pages/error', title:'Error', error:error});
      });
}

// Make sure to export 
module.exports = router; 