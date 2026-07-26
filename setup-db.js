/**
 * Full database setup: schema + migrations + seed
 * Run with: DATABASE_URL=... node setup-db.js
 */
require('dotenv').config({ path: require('path').join(__dirname, 'server', '.env') });
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const dbUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!dbUrl) {
  console.error('❌ No DATABASE_URL found. Set NEON_DATABASE_URL or DATABASE_URL in server/.env');
  process.exit(1);
}

const pool = new Pool({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false }
});

const files = [
  'database/schema.sql',
  'database/migration_v2.sql',
  'database/migration_v3.sql',
  'database/migration_v4.sql',
  'database/seed.sql',
];

async function run() {
  const host = dbUrl.match(/@([^/]+)\//)?.[1] || 'unknown';
  console.log(`📡 Connecting to: ${host}\n`);

  for (const file of files) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${file} (not found)`);
      continue;
    }
    const sql = fs.readFileSync(filePath, 'utf8');
    try {
      console.log(`📜 Running ${file}...`);
      await pool.query(sql);
      console.log(`   ✅ Done\n`);
    } catch (err) {
      if (err.message.includes('already exists') || err.message.includes('duplicate key')) {
        console.log(`   ⚠️  ${file}: ${err.message.split('\n')[0]} (OK, skipping)\n`);
      } else {
        console.error(`   ❌ ${file} FAILED: ${err.message}\n`);
      }
    }
  }

  // Verify
  try {
    const users = await pool.query('SELECT COUNT(*) FROM users');
    const campaigns = await pool.query('SELECT COUNT(*) FROM campaigns');
    const settings = await pool.query('SELECT COUNT(*) FROM platform_settings');
    console.log('═══════════════════════════════════');
    console.log(`✅ Database setup complete!`);
    console.log(`   Users:    ${users.rows[0].count}`);
    console.log(`   Campaigns: ${campaigns.rows[0].count}`);
    console.log(`   Settings:  ${settings.rows[0].count}`);
    console.log('═══════════════════════════════════');
  } catch (err) {
    console.error('Verify failed:', err.message);
  }

  await pool.end();
}

run();
