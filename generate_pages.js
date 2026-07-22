const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'server/.env') });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const pages = {
  page_about_us: `
    <h2>About AltruWave</h2>
    <p>Welcome to <strong>AltruWave</strong>, a general crowdfunding platform dedicated to empowering meaningful causes, community projects, and personal dreams.</p>
    
    <h3>Our Mission</h3>
    <p>Our mission is to provide the technology that connects changemakers with a global community of supporters. We believe that everyone deserves a secure and transparent platform to bring their ideas to life, support communities in need, and overcome personal challenges.</p>

    <h3>Why Choose Us?</h3>
    <ul>
      <li><strong>Secure Technology:</strong> Backed by industry-leading encryption and powered by Stripe, your payments are always safe.</li>
      <li><strong>Identity Verification:</strong> We prioritize trust. Every creator goes through a KYC (Know Your Customer) process before withdrawing funds.</li>
      <li><strong>Global Impact:</strong> Support campaigns from anywhere in the world and create waves of impact beyond borders.</li>
    </ul>
    
    <p>AltruWave is a technology provider and does not act as a broker, financial institution, or registered charity.</p>
  `,
  
  page_contact: `
    <h2>Contact Support</h2>
    <p>We are here to help you! Whether you have a question about a campaign, need help with your account, or want to report an issue, our support team is ready to assist.</p>
    
    <h3>Get in Touch</h3>
    <p><strong>Email Support:</strong> <br />
    Reach out to us anytime at <a href="mailto:support@altruwave.com">support@altruwave.com</a>. We aim to respond to all inquiries within 24-48 hours.</p>

    <p><strong>Business Inquiries:</strong> <br />
    For partnerships and press inquiries, please email <a href="mailto:business@altruwave.com">business@altruwave.com</a>.</p>
    
    <h3>Working Hours</h3>
    <p>Monday - Friday: 9:00 AM - 6:00 PM (EST)<br />
    Saturday - Sunday: Closed</p>
  `,

  page_terms_conditions: `
    <h2>Terms and Conditions</h2>
    <p><strong>Last Updated: July 2026</strong></p>

    <h3>1. Acceptance of Terms & Platform Role</h3>
    <p>By accessing or using the AltruWave platform, you agree to these Terms. AltruWave is a technology platform and software provider designed to facilitate voluntary donations to campaigns. <strong>We are not a broker, financial institution, creditor, or registered 501(c)(3) charity.</strong> We do not guarantee the success of any campaign or the delivery of any promised rewards.</p>

    <h3>2. Campaign Creation & KYC</h3>
    <p>Users creating campaigns ("Creators") must provide accurate personal and banking information. Funds will not be disbursed until identity verification is complete. Creators are legally liable for fulfilling any promises or rewards offered in their campaigns.</p>

    <h3>3. Prohibited Businesses & Causes</h3>
    <p>In accordance with Stripe's policies, you may not use AltruWave to raise funds for restricted or prohibited businesses, including but not limited to: illegal activities, firearms/weapons, adult content, gambling, multi-level marketing, or hate speech. Any violation will result in immediate account termination and freezing of funds.</p>

    <h3>4. Donations</h3>
    <p>Donations are made voluntarily and directly support the Creator. Donors understand that they are supporting a campaign at their own risk. AltruWave deducts a platform fee from donations to cover payment processing and operational costs.</p>

    <h3>5. Platform Rights</h3>
    <p>We reserve the right to suspend or terminate campaigns, freeze funds, or ban users who violate our community guidelines, engage in fraudulent activities, or violate our payment processor's Acceptable Use Policy.</p>
  `,

  page_refund_policy: `
    <h2>Refund Policy</h2>
    <p><strong>Last Updated: July 2026</strong></p>

    <h3>1. General Refund Policy</h3>
    <p>AltruWave provides the software to facilitate donations, but the funds are ultimately disbursed to the campaign Creators. Therefore, <strong>all donations made on AltruWave are generally considered final and non-refundable</strong> by the platform.</p>

    <h3>2. Creator Liability</h3>
    <p>The Creator is solely responsible for fulfilling promises or rewards. AltruWave does not guarantee that funds will be used as promised. Any disputes regarding refunds must be directed to the Creator of the campaign.</p>

    <h3>3. Requesting a Refund for Errors</h3>
    <p>If you made a factual error (e.g., donating $100 instead of $10), you may request a refund within <strong>14 days</strong> of the transaction by contacting <a href="mailto:support@altruwave.com">support@altruwave.com</a>. Refunds for errors can only be issued if the funds have not yet been withdrawn by the Creator.</p>

    <h3>4. Fraud and Unauthorized Transactions</h3>
    <p>In the event of a proven fraudulent campaign or an unauthorized transaction, we will work with Stripe to investigate. If the funds are still held by the platform, we will issue a full refund to affected donors. We reserve the right to refund donations if a campaign violates our Terms.</p>
  `
};

async function run() {
  try {
    for (const [key, content] of Object.entries(pages)) {
      await pool.query(
        `UPDATE platform_settings SET setting_value = $1 WHERE setting_key = $2`,
        [content.trim(), key]
      );
      console.log(`Updated ${key}`);
    }
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
run();
