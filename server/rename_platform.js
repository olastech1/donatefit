require('dotenv').config();
const pool = require('./config/db');

async function updateName() {
  try {
    await pool.query("UPDATE platform_settings SET setting_value = 'DonateFit' WHERE setting_key = 'platform_name'");
    await pool.query("UPDATE platform_settings SET setting_value = 'DonateFit <noreply@donatefit.com>' WHERE setting_key = 'smtp_from'");
    console.log("Database platform name updated to DonateFit successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Failed to update database:", err);
    process.exit(1);
  }
}

updateName();
