'use strict';

const express = require('express');
const superagent = require('superagent');
const router = express.Router();
const API = 'http://localhost:3000';

// Routes (moved from server.js)
router.get('/', homePage);
router.get('/list', listPage);
router.post('/list', postPage);
router.patch('/list', patchPage);
router.delete('/list', deletePage);

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

// Create Our Post, Patch, Delete Functions
function postPage(request, response) {
  superagent.post( `${API}/api/v1/categories`)
    .send(request.body)
    .then(() => {
      response.redirect('/catagories');
    })
    .catch(error => {
      response.render('site', {page: './pages/error', title:'Error', error:error});
    });
}
function patchPage(request, response) {
  superagent.put( `${API}/categories/${request.body._id}`)
    .send(request.body)
    .then(() => {
      response.redirect('/catagories');
    })
    .catch(error => {
      response.render('site', {page: './pages/error', title:'Error', error:error});
    });
}
function deletePage(request, response) {
  superagent.delete( `${API}/categories/${request.body._id}`)
    .then(() => {
      response.redirect('/catagories');
    })
    .catch(error => {
      response.render('site', {page: './pages/error', title:'Error', error:error});
    });
}
// Make sure to export 
module.exports = router; 