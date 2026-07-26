const nodemailer = require('nodemailer');
const { getSetting } = require('../config/settings');

// ── AltruWave Email Design System ──────────────────────────────
// Premium dark-header emails with teal accent branding.
// All templates are responsive and dark-mode friendly.
// ────────────────────────────────────────────────────────────────

const BRAND = {
  accent:     '#14b8a6',   // teal-500
  accentDark: '#0d9488',   // teal-600
  accentGlow: 'rgba(20,184,166,0.25)',
  navy:       '#0b0f19',
  navyLight:  '#111827',
  text:       '#334155',
  textLight:  '#64748b',
  textDark:   '#0f172a',
  success:    '#10b981',
  danger:     '#ef4444',
  warning:    '#f59e0b',
  white:      '#ffffff',
  bgLight:    '#f8fafc',
  border:     '#e2e8f0',
};

const getEmailTemplate = (content, previewText = '', platformName = 'AltruWave') => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${platformName}</title>
  <!--[if mso]><style>body{font-family:Arial,sans-serif!important}</style><![endif]-->
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 40px 16px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <!-- Preview Text -->
  <div style="display: none; max-height: 0px; overflow: hidden; color: transparent; opacity: 0; font-size: 0; line-height: 0;">
    ${previewText}&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;
  </div>

  <!-- Container -->
  <div style="max-width: 600px; margin: 0 auto;">

    <!-- Card -->
    <div style="background-color: ${BRAND.white}; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid ${BRAND.border};">

      <!-- Header -->
      <div style="background: linear-gradient(135deg, ${BRAND.navy} 0%, #1e293b 100%); padding: 36px 32px; text-align: center;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <!-- Logo circle -->
              <div style="display: inline-block; width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, ${BRAND.accent}, #06b6d4); margin-bottom: 12px; line-height: 48px; text-align: center;">
                <span style="font-size: 22px; color: ${BRAND.white}; font-weight: 800;">A</span>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="margin: 0; color: ${BRAND.white}; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">${platformName}</h1>
              <p style="margin: 6px 0 0; color: ${BRAND.accent}; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">Crowdfunding Platform</p>
            </td>
          </tr>
        </table>
      </div>

      <!-- Content -->
      <div style="padding: 40px 32px; color: ${BRAND.text}; font-size: 15px; line-height: 1.7;">
        ${content}
      </div>

      <!-- Footer -->
      <div style="background-color: ${BRAND.bgLight}; padding: 24px 32px; text-align: center; border-top: 1px solid ${BRAND.border};">
        <p style="margin: 0 0 8px; color: ${BRAND.textLight}; font-size: 12px; line-height: 1.6;">
          © ${new Date().getFullYear()} ${platformName}. All rights reserved.<br>
          Empowering Generosity, One Campaign at a Time.
        </p>
        <p style="margin: 0; font-size: 11px;">
          <a href="\${process.env.FRONTEND_URL || 'https://altruwave.com'}" style="color: ${BRAND.accent}; text-decoration: none; font-weight: 600;">altruwave.com</a>
        </p>
      </div>

    </div>

    <!-- Sub-footer -->
    <p style="text-align: center; color: #94a3b8; font-size: 11px; margin-top: 20px; line-height: 1.5;">
      You're receiving this because you have an account on ${platformName}.<br>
      If this wasn't intended for you, please ignore this email.
    </p>

  </div>
</body>
</html>
`;

const getButtonHtml = (url, text, variant = 'primary') => {
  const bg = variant === 'danger' ? BRAND.danger : `linear-gradient(135deg, ${BRAND.accent}, #06b6d4)`;
  const shadow = variant === 'danger' ? 'rgba(239,68,94,0.3)' : BRAND.accentGlow;
  return `
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
    <tr>
      <td align="left">
        <a href="${url}" style="display: inline-block; background: ${bg}; color: ${BRAND.white}; padding: 14px 32px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 14px ${shadow}; letter-spacing: -0.01em; mso-padding-alt: 14px 32px;">${text}</a>
      </td>
    </tr>
  </table>
`;
};

const getInfoBox = (label, value, color = BRAND.accent) => `
  <div style="background: linear-gradient(135deg, ${color}10, ${color}08); border: 1px solid ${color}30; border-radius: 12px; padding: 24px; margin: 20px 0; text-align: center;">
    <p style="margin: 0 0 4px; font-size: 11px; color: ${color}; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">${label}</p>
    <p style="margin: 0; font-size: 38px; font-weight: 800; color: ${color}; line-height: 1.2;">${value}</p>
  </div>
`;

const getAlertBox = (message, color = BRAND.danger) => `
  <div style="background-color: ${color}08; border-left: 4px solid ${color}; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
    ${message}
  </div>
`;

const getHeading = (text, color = BRAND.textDark) =>
  `<h3 style="color: ${color}; font-size: 20px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">${text}</h3>`;

const getParagraph = (text) =>
  `<p style="margin: 0 0 16px; color: ${BRAND.text}; font-size: 15px; line-height: 1.7;">${text}</p>`;

const getSmallNote = (text) =>
  `<p style="margin-top: 32px; font-size: 12px; color: ${BRAND.textLight}; border-top: 1px solid ${BRAND.border}; padding-top: 16px; line-height: 1.5;">${text}</p>`;

/**
 * Send an email safely (fails gracefully if SMTP is not configured)
 */
const sendEmail = async (to, subject, htmlContent, previewText = '', throwError = false) => {
  try {
    const platformName = await getSetting('platform_name') || 'AltruWave';
    const cleanSubject = subject.replace(/AltruWave/gi, platformName);
    let cleanHtmlContent = htmlContent.replace(/AltruWave/gi, platformName);
    let cleanPreviewText = previewText.replace(/AltruWave/gi, platformName);

    // DB settings take priority; fall back to Env vars if not set
    const smtpHost = await getSetting('smtp_host') || process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = await getSetting('smtp_port') || process.env.SMTP_PORT || '587';
    const smtpUser = await getSetting('smtp_user') || process.env.SMTP_USER;
    const smtpPass = await getSetting('smtp_pass') || process.env.SMTP_PASS;
    const defaultFrom = `"${platformName}" <noreply@${platformName.replace(/\s+/g, '').toLowerCase()}.com>`;
    const smtpFrom = await getSetting('smtp_from') || process.env.SMTP_FROM || defaultFrom;

    if (!smtpUser || !smtpPass) {
      console.log(`[EMAIL MOCK] To: ${to} | Subject: ${subject}`);
      if (throwError) throw new Error('SMTP credentials missing. Check SETTINGS_ENCRYPTION_KEY or SMTP_USER/PASS.');
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: smtpPort === '465',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const info = await transporter.sendMail({
      from: smtpFrom,
      to,
      subject: cleanSubject,
      html: getEmailTemplate(cleanHtmlContent, cleanPreviewText, platformName),
    });
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error('Error sending email:', error);
    if (throwError) throw error;
  }
};

module.exports = {
  // Raw email sender for custom broadcast
  sendEmail,

  // ═══════════════════════════════════════════════════════════
  // 1. AUTH EMAILS
  // ═══════════════════════════════════════════════════════════

  sendEmailVerificationEmail: (email, name, verifyUrl) =>
    sendEmail(
      email,
      'Verify your email — AltruWave',
      `
        ${getHeading(`Welcome aboard, ${name}! 🎉`)}
        ${getParagraph(`Thanks for creating an AltruWave account. To get started, we just need to confirm your email address.`)}
        ${getParagraph(`Click the button below to verify. This link expires in <strong>24 hours</strong>.`)}
        ${getButtonHtml(verifyUrl, '✓  Verify Email Address')}
        ${getSmallNote('If you didn\'t create an AltruWave account, you can safely ignore this email.')}
      `,
      'Confirm your email to activate your AltruWave account.'
    ),

  sendWelcomeEmail: (email, name) =>
    sendEmail(
      email,
      'Welcome to AltruWave! 🎉',
      `
        ${getHeading(`You're all set, ${name}!`)}
        ${getParagraph(`Your email has been verified and your AltruWave account is now fully active.`)}
        ${getParagraph(`Here's what you can do next:`)}
        <ul style="margin: 0 0 20px; padding-left: 20px; color: ${BRAND.text}; font-size: 15px; line-height: 2;">
          <li><strong>Create a campaign</strong> to raise funds for a cause</li>
          <li><strong>Browse campaigns</strong> and support others</li>
          <li><strong>Track donations</strong> in real time from your dashboard</li>
        </ul>
        ${getButtonHtml(`${process.env.FRONTEND_URL || 'https://altruwave.com'}/dashboard`, 'Go to My Dashboard')}
      `,
      'Your account is verified and ready to use.'
    ),

  // ═══════════════════════════════════════════════════════════
  // 2. ADMIN VERIFICATION
  // ═══════════════════════════════════════════════════════════

  sendAdminVerifiedEmail: (email, name) =>
    sendEmail(
      email,
      'Your account has been verified ✓',
      `
        ${getHeading(`Good news, ${name}! ✓`)}
        ${getParagraph(`An administrator has reviewed and <strong>verified</strong> your AltruWave account.`)}
        ${getParagraph(`You now have full access to create campaigns, receive donations, and request withdrawals.`)}
        ${getButtonHtml(`${process.env.FRONTEND_URL || 'https://altruwave.com'}/dashboard`, 'Go to Dashboard')}
      `,
      'Your account has been manually verified by an administrator.'
    ),

  // ═══════════════════════════════════════════════════════════
  // 3. CAMPAIGN EMAILS
  // ═══════════════════════════════════════════════════════════

  sendCampaignPendingEmail: (email, title) =>
    sendEmail(
      email,
      'Campaign submitted for review',
      `
        ${getHeading('Campaign Submitted Successfully')}
        ${getParagraph(`Your campaign <strong style="color: ${BRAND.accent};">"${title}"</strong> has been submitted and is now pending review.`)}
        ${getInfoBox('Status', '⏳ Under Review', BRAND.warning)}
        ${getParagraph(`Our team reviews submissions within <strong>24 hours</strong> to ensure they meet community guidelines. We'll email you the moment your campaign is approved.`)}
      `,
      `Your campaign "${title}" is pending review.`
    ),

  sendCampaignApprovedEmail: (email, title, campaignId) =>
    sendEmail(
      email,
      'Your campaign is now LIVE! 🎉',
      `
        ${getHeading('Campaign Approved! 🎉')}
        ${getParagraph(`Great news — your campaign <strong style="color: ${BRAND.accent};">"${title}"</strong> has been approved and is now live on AltruWave.`)}
        ${getInfoBox('Status', '✓ Live & Active', BRAND.success)}
        ${getParagraph(`Share your campaign link with friends, family, and your network to start receiving donations.`)}
        ${getButtonHtml(`${process.env.FRONTEND_URL || 'https://altruwave.com'}/campaigns/${campaignId}`, 'View Your Campaign')}
      `,
      `Your campaign "${title}" has been approved and is live!`
    ),

  sendCampaignRejectedEmail: (email, title) =>
    sendEmail(
      email,
      'Campaign review update',
      `
        ${getHeading('Campaign Not Approved')}
        ${getParagraph(`Unfortunately, your campaign <strong style="color: ${BRAND.accent};">"${title}"</strong> could not be approved as it did not meet our community guidelines.`)}
        ${getAlertBox(`
          <p style="margin: 0; font-weight: 600; color: #991b1b; font-size: 14px;">What you can do:</p>
          <p style="margin: 6px 0 0; color: #7f1d1d; font-size: 13px; line-height: 1.5;">Review the feedback in your dashboard, make the necessary changes, and resubmit. If you believe this was a mistake, contact our support team.</p>
        `)}
        ${getButtonHtml(`${process.env.FRONTEND_URL || 'https://altruwave.com'}/dashboard`, 'Review in Dashboard')}
      `,
      `Your campaign "${title}" requires changes before approval.`
    ),

  // ═══════════════════════════════════════════════════════════
  // 4. DONATION EMAILS
  // ═══════════════════════════════════════════════════════════

  sendDonationReceiptEmail: (email, donorName, amount, campaignTitle, trackingUrl) =>
    sendEmail(
      email,
      `Donation receipt — $${amount}`,
      `
        ${getHeading(`Thank you, ${donorName}! 💚`)}
        ${getParagraph(`Your donation has been successfully processed.`)}
        ${getInfoBox('Amount Donated', `$${amount}`, BRAND.success)}
        ${getParagraph(`Campaign: <strong style="color: ${BRAND.accent};">"${campaignTitle}"</strong>`)}
        ${getParagraph(`Your generosity makes a real difference. Track the impact of your donation any time using the button below.`)}
        ${getButtonHtml(trackingUrl, 'Track Your Donation')}
      `,
      `Your donation of $${amount} to "${campaignTitle}" was successful.`
    ),

  sendDonationAlertEmail: (creatorEmail, creatorName, donorName, amount, campaignTitle) =>
    sendEmail(
      creatorEmail,
      `New donation: $${amount} received! 🎉`,
      `
        ${getHeading(`You received a donation! 🎉`)}
        ${getParagraph(`Someone just supported your campaign <strong style="color: ${BRAND.accent};">"${campaignTitle}"</strong>.`)}

        <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 1px solid #86efac; border-radius: 14px; padding: 28px; margin: 24px 0; text-align: center;">
          <p style="margin: 0 0 4px; font-size: 11px; color: #15803d; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Donation Received</p>
          <p style="margin: 0; font-size: 44px; font-weight: 800; color: #15803d; line-height: 1.1;">$${amount}</p>
          <p style="margin: 10px 0 0; font-size: 14px; color: #166534;">from <strong>${donorName}</strong></p>
        </div>

        ${getParagraph(`Log in to your dashboard to view your full campaign progress and manage withdrawals.`)}
        ${getButtonHtml(`${process.env.FRONTEND_URL || 'https://altruwave.com'}/dashboard`, 'View Dashboard')}
      `,
      `You received a $${amount} donation on "${campaignTitle}".`
    ),

  // ═══════════════════════════════════════════════════════════
  // 5. WITHDRAWAL EMAILS
  // ═══════════════════════════════════════════════════════════

  sendWithdrawalRequestEmail: (email, amount, campaignTitle) =>
    sendEmail(
      email,
      'Withdrawal request received',
      `
        ${getHeading('Payout Request Submitted')}
        ${getParagraph(`Your request to withdraw funds from your campaign has been received.`)}
        ${getInfoBox('Withdrawal Amount', `$${amount}`, BRAND.accent)}
        ${getParagraph(`Campaign: <strong style="color: ${BRAND.accent};">"${campaignTitle}"</strong>`)}
        ${getParagraph(`Our finance team will review your request and process it shortly. You'll receive a confirmation email once the transfer is initiated.`)}
      `,
      `Your withdrawal request for $${amount} has been received.`
    ),

  sendWithdrawalApprovedEmail: (email, amount, campaignTitle) =>
    sendEmail(
      email,
      'Withdrawal approved — funds on the way! 💸',
      `
        ${getHeading('Funds Are On The Way! 💸')}
        ${getParagraph(`Your withdrawal request has been approved and processed.`)}
        ${getInfoBox('Amount Transferred', `$${amount}`, BRAND.success)}
        ${getParagraph(`Campaign: <strong style="color: ${BRAND.accent};">"${campaignTitle}"</strong>`)}
        ${getParagraph(`Please allow <strong>3–5 business days</strong> for the funds to appear in your bank account, depending on your financial institution.`)}
      `,
      `Your withdrawal of $${amount} has been approved and is being processed.`
    ),

  sendWithdrawalRejectedEmail: (email, amount, campaignTitle) =>
    sendEmail(
      email,
      'Withdrawal request update',
      `
        ${getHeading('Withdrawal Request Declined')}
        ${getParagraph(`Your request to withdraw <strong style="color: ${BRAND.success};">$${amount}</strong> from <strong style="color: ${BRAND.accent};">"${campaignTitle}"</strong> could not be processed at this time.`)}
        ${getAlertBox(`
          <p style="margin: 0; font-weight: 600; color: #991b1b; font-size: 14px;">Common reasons:</p>
          <ul style="margin: 8px 0 0; padding-left: 18px; color: #7f1d1d; font-size: 13px; line-height: 1.8;">
            <li>KYC verification is incomplete</li>
            <li>Bank details need to be updated</li>
            <li>Campaign balance is insufficient</li>
          </ul>
        `)}
        ${getParagraph(`Please check your dashboard or contact support for more details.`)}
        ${getButtonHtml(`${process.env.FRONTEND_URL || 'https://altruwave.com'}/dashboard`, 'Go to Dashboard')}
      `,
      'Your withdrawal request could not be processed.'
    ),

  // ═══════════════════════════════════════════════════════════
  // 6. DONATION REMINDER
  // ═══════════════════════════════════════════════════════════

  sendDonationReminderEmail: (email, name, amount, campaignTitle, campaignUrl) =>
    sendEmail(
      email,
      'Your donation is waiting ✨',
      `
        ${getHeading(`Hi ${name}, you left something behind`)}
        ${getParagraph(`You started a donation of <strong style="color: ${BRAND.success}; font-size: 17px;">$${amount}</strong> to <strong style="color: ${BRAND.accent};">"${campaignTitle}"</strong> but didn't complete checkout.`)}
        ${getParagraph(`Every contribution counts — your support could be the one that pushes this campaign to its goal.`)}
        ${getButtonHtml(campaignUrl, 'Complete Your Donation')}
        ${getSmallNote('If you already completed this donation, please disregard this email.')}
      `,
      `Complete your $${amount} donation to "${campaignTitle}".`
    ),

  // ═══════════════════════════════════════════════════════════
  // 7. TEST EMAIL
  // ═══════════════════════════════════════════════════════════

  sendTestEmail: (email) =>
    sendEmail(
      email,
      'SMTP Test — AltruWave ✓',
      `
        ${getHeading('SMTP Configuration Working! ✓')}
        ${getInfoBox('Status', '✓ Connected', BRAND.success)}
        ${getParagraph(`Your email delivery system is properly configured. AltruWave can now send:`)}
        <ul style="margin: 0 0 20px; padding-left: 20px; color: ${BRAND.text}; font-size: 14px; line-height: 2.2;">
          <li>Email verification links</li>
          <li>Donation receipts & alerts</li>
          <li>Campaign status notifications</li>
          <li>Withdrawal confirmations</li>
          <li>Broadcast emails to users</li>
        </ul>
        ${getParagraph(`You can now safely enable all email-based features from your admin dashboard.`)}
      `,
      'Your SMTP configuration is working perfectly.',
      true // throw error if it fails
    ),

  // ═══════════════════════════════════════════════════════════
  // 8. PASSWORD RESET
  // ═══════════════════════════════════════════════════════════

  sendPasswordResetEmail: (email, resetUrl) =>
    sendEmail(
      email,
      'Reset your password — AltruWave',
      `
        ${getHeading('Password Reset Request')}
        ${getParagraph(`We received a request to reset the password for your AltruWave account.`)}
        ${getParagraph(`Click the button below to choose a new password. This link expires in <strong>1 hour</strong>.`)}
        ${getButtonHtml(resetUrl, 'Reset My Password')}
        ${getSmallNote('If you didn\'t request a password reset, you can safely ignore this email. Your password will remain unchanged.')}
      `,
      'Instructions to reset your AltruWave password.'
    ),

  // ═══════════════════════════════════════════════════════════
  // 9. ACCOUNT BAN / UNBAN
  // ═══════════════════════════════════════════════════════════

  sendUserBannedEmail: (email, name, banType, banExpiresAt, reason) => {
    const isTemp = banType === 'temporary';
    const durationText = isTemp
      ? `This suspension is <strong>temporary</strong> and will be lifted on <strong>${new Date(banExpiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>.`
      : 'This suspension is <strong>permanent</strong>. You will no longer be able to log in or access your campaigns.';
    const reasonSection = reason
      ? getAlertBox(`
          <p style="margin: 0; font-weight: 700; color: #991b1b; font-size: 14px;">Reason for Suspension</p>
          <p style="margin: 6px 0 0; color: #7f1d1d; font-size: 13px; line-height: 1.5;">${reason}</p>
        `)
      : '';

    return sendEmail(
      email,
      'Important: Your AltruWave account has been suspended',
      `
        ${getHeading('Account Suspended', BRAND.danger)}
        ${getParagraph(`Hello ${name},`)}
        ${getParagraph(`We're writing to inform you that your AltruWave account has been suspended due to a violation of our platform policies.`)}
        ${reasonSection}
        ${getParagraph(durationText)}
        ${getParagraph(`If you believe this was a mistake, please contact our support team for further assistance.`)}
      `,
      'Your AltruWave account has been suspended.'
    );
  },

  sendUserUnbannedEmail: (email, name) =>
    sendEmail(
      email,
      'Your AltruWave account has been restored! 🎉',
      `
        ${getHeading('Account Restored! 🎉', BRAND.success)}
        ${getParagraph(`Hello ${name},`)}
        ${getParagraph(`We're pleased to inform you that the suspension on your AltruWave account has been <strong>lifted</strong> and your account is fully restored.`)}
        ${getParagraph(`You can now log in, manage your campaigns, and resume all activity on the platform.`)}
        ${getButtonHtml(`${process.env.FRONTEND_URL || 'https://altruwave.com'}/login`, 'Log In to Your Account')}
      `,
      'Your AltruWave account suspension has been lifted.'
    ),
};
