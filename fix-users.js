const fs = require('fs');

const files = [
  './make-admin-fast.js',
  './check-vercel.js',
  './fix_other_pages.js',
  './upgrade-admin.js',
  './fix_pages.js',
  './server/rename_platform.js',
  './server/index.js',
  './server/scripts/seed-admin.js',
  './server/scripts/sync-settings.js',
  './server/scripts/test-kyc-endpoints.js',
  './server/scripts/test-admin-add-user-funds.js',
  './server/scripts/seed-creator.js',
  './server/scripts/test-admin-settings.js',
  './server/scripts/test-admin-add-funds.js',
  './server/migrate-smtp.js',
  './server/controllers/donationController.js',
  './server/controllers/adminController.js',
  './server/services/emailService.js',
  './test-login.js',
  './debug_email.js',
  './generate_pages.js',
  './sync-users.js',
  './generate_campaigns.js',
  './check-active.js'
];

for (let file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  if (file.includes('emailService.js')) {
    content = content.replace(/Fuel Every Goal\./g, 'Waves of Impact.');
    content = content.replace(/Donate Fate\|DonatePlate\|DonateFate/gi, 'Donate Fate|DonatePlate|DonateFit|AltruWave');
  }

  content = content.replace(/DonateFit/g, 'AltruWave');
  content = content.replace(/donatefit\.com/g, 'altruwave.com');
  content = content.replace(/donatefit/g, 'altruwave');
  content = content.replace(/DONATEFIT/g, 'ALTRUWAVE');
  content = content.replace(/💪/g, '🌊');
  
  fs.writeFileSync(file, content);
}
console.log('Successfully completed AltruWave rebranding across scripts!');
