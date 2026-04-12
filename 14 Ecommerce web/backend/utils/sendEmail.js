// ============================================================
// utils/sendEmail.js — Nodemailer Email Service
// ============================================================
// Sends order confirmation emails using Nodemailer and Gmail.
//
// ENVIRONMENT VARIABLES NEEDED IN .env:
//   EMAIL_USER    → Your Gmail address (e.g. myapp@gmail.com)
//   EMAIL_PASS    → Gmail App Password (NOT your regular password)
//
// HOW TO GET A GMAIL APP PASSWORD:
//   1. Go to https://myaccount.google.com/security
//   2. Enable 2-Step Verification
//   3. Go to "App Passwords" → Generate one for "Mail"
//   4. Paste the 16-char password into EMAIL_PASS in .env
// ============================================================

import nodemailer from 'nodemailer';

// Create a reusable SMTP transporter using Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Your Gmail address
      pass: process.env.EMAIL_PASS,  // Gmail App Password
    },
  });
};

/**
 * Sends an order confirmation email to the customer.
 * @param {Object} options
 * @param {string} options.to        — Recipient email address
 * @param {string} options.userName  — Customer's name
 * @param {string} options.orderId   — MongoDB Order ID
 * @param {Array}  options.items     — Array of ordered items
 * @param {number} options.total     — Total order amount
 * @param {Object} options.address   — Shipping address object
 */
const sendOrderConfirmation = async ({ to, userName, orderId, items, total, address }) => {
  // If email credentials aren't configured, log a warning and skip
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('⚠️  Email credentials not configured. Skipping email notification.');
    console.log(`   Would have sent order confirmation to: ${to}`);
    return { skipped: true };
  }

  const transporter = createTransporter();

  // Build the items list as HTML rows
  const itemsHTML = items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.qty}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toFixed(2)}</td>
        </tr>`
    )
    .join('');

  // Build the full HTML email
  const htmlContent = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e6edf3; border-radius: 12px; overflow: hidden;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #ff4757, #ff6b81); padding: 30px; text-align: center;">
        <h1 style="margin: 0; color: white; font-size: 24px;">⚡ AeroSports</h1>
        <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Order Confirmation</p>
      </div>

      <!-- Body -->
      <div style="padding: 30px;">
        <h2 style="color: #4ade80; margin-top: 0;">Order Placed Successfully! 🎉</h2>
        <p style="color: #8b949e;">Hi <strong style="color: #e6edf3;">${userName}</strong>,</p>
        <p style="color: #8b949e;">Thank you for your order! Here are the details:</p>

        <!-- Order Info -->
        <div style="background: #161b22; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 4px 0; color: #8b949e;">Order ID: <strong style="color: #ff6b81;">${orderId}</strong></p>
          <p style="margin: 4px 0; color: #8b949e;">Payment: <strong style="color: #e6edf3;">Cash on Delivery</strong></p>
        </div>

        <!-- Items Table -->
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #161b22;">
              <th style="padding: 10px; text-align: left; color: #8b949e;">Item</th>
              <th style="padding: 10px; text-align: center; color: #8b949e;">Qty</th>
              <th style="padding: 10px; text-align: right; color: #8b949e;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <!-- Total -->
        <div style="text-align: right; margin: 20px 0; padding: 16px; background: #161b22; border-radius: 8px;">
          <span style="font-size: 20px; font-weight: 700; color: #4ade80;">Total: ₹${total.toFixed(2)}</span>
        </div>

        <!-- Shipping Address -->
        <div style="background: #161b22; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px; color: #8b949e; font-weight: 600;">Shipping To:</p>
          <p style="margin: 0; color: #e6edf3;">${address.address}, ${address.city} - ${address.postalCode}, ${address.country}</p>
        </div>

        <p style="color: #8b949e; font-size: 13px; margin-top: 30px;">
          If you have any questions, reply to this email. Thanks for shopping with AeroSports!
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #161b22; padding: 16px; text-align: center; color: #484f58; font-size: 12px;">
        © 2026 AeroSports. All rights reserved.
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"AeroSports" <${process.env.EMAIL_USER}>`,
    to,
    subject: `✅ Order Confirmed — #${orderId}`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Order confirmation email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    // Don't throw — email failure should not break the order flow
    return { error: error.message };
  }
};

export default sendOrderConfirmation;
