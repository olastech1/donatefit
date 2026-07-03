const authController = require('./controllers/authController');
const express = require('express');

// Fake req, res
const req = {
  body: {
    name: 'Olaniyi iyanu',
    email: 'ola2@olaniyi.me', // random new email
    password: 'password123',
    role: 'creator'
  },
  headers: { origin: 'http://localhost' }
};
const res = {
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    console.log('STATUS:', this.statusCode);
    console.log('JSON RESPONSE:', data);
  }
};

async function test() {
  try {
    await authController.register(req, res);
  } catch(e) {
    console.error("UNCAUGHT EXCEPTION:", e);
  }
}
test();
