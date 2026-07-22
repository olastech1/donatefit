require('dotenv').config();
const pool = require('./config/db');

async function updateName() {
  try {
    await pool.query("UPDATE platform_settings SET setting_value = 'AltruWave' WHERE setting_key = 'platform_name'");
    await pool.query("UPDATE platform_settings SET setting_value = 'AltruWave <noreply@altruwave.com>' WHERE setting_key = 'smtp_from'");
    console.log("Database platform name updated to AltruWave successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Failed to update database:", err);
    process.exit(1);
  }
}

updateName();
