const authController = require('./controllers/authController');
const express = require('express');

// Let's just test the email service directly since that's what changed!
const emailService = require('./services/emailService');

async function test() {
  try {
    console.log("Testing emailService...");
    await emailService.sendEmailVerificationEmail('test@example.com', 'Test User', 'http://localhost/verify');
    console.log("Success!");
  } catch(e) {
    console.error("Error:", e);
  }
}
test();
