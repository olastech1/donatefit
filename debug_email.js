require('dotenv').config({ path: './server/.env' });
const nodemailer = require('nodemailer');
const settings = require('./server/config/settings');

async function debugEmail() {
  try {
    const smtpHost = await settings.getSetting('smtp_host');
    const smtpPort = await settings.getSetting('smtp_port');
    const smtpUser = await settings.getSetting('smtp_user');
    const smtpPass = await settings.getSetting('smtp_pass');
    const smtpFrom = await settings.getSetting('smtp_from');

    console.log({ smtpHost, smtpPort, smtpUser, smtpFrom });

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: smtpPort === '465',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      debug: true, // show debug output
      logger: true // log information in console
    });

    const info = await transporter.sendMail({
      from: smtpFrom,
      to: 'olastechng@gmail.com',
      subject: 'Debug Email - AltruWave',
      html: '<p>This is a debug email sent from Node.js with verbose logging.</p>',
    });

    console.log(`Email sent: ${info.messageId}`);
    console.log(info.response);
    process.exit(0);
  } catch (error) {
    console.error('Debug error:', error);
    process.exit(1);
  }
}

debugEmail();
