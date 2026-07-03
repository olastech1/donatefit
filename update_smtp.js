require('dotenv').config({ path: './server/.env' });
const pool = require('./server/config/db');
const settings = require('./server/config/settings');

async function checkAndSet() {
  try {
    await settings.setSetting('smtp_host', 'mail.donateplea.com');
    await settings.setSetting('smtp_port', '587');
    await settings.setSetting('smtp_user', 'noreply@donatefate.com');
    await settings.setSetting('smtp_pass', 'ChangeMe2026!');
    await settings.setSetting('smtp_from', 'Donate Fate <noreply@donatefate.com>');

    console.log('Settings updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
checkAndSet();
