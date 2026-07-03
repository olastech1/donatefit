require('dotenv').config({ path: './server/.env' });
const emailService = require('./server/services/emailService');

async function testEmail() {
  try {
    console.log('Testing email...');
    await emailService.sendEmail('test@example.com', 'Test Email', '<p>Test email works with new SMTP details!</p>');
    console.log('Email sent successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error sending test email:', err);
    process.exit(1);
  }
}

testEmail();
