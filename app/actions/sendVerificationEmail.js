// app/actions/sendVerificationEmail.js
"use server";

import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  service: "gmail", // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email) {
  try {
    // 1. Find the row
    const sub = await prisma.newsletterSubscription.findUnique({
      where: { email },
    });
    if (!sub) return { sent: false, error: "Not found" };

    // 2. Create (or refresh) token
    const token = crypto.randomBytes(32).toString("hex");
    await prisma.newsletterSubscription.update({
      where: { email },
      data: { token },
    });

    // 3. Build verification link
    const link = `${process.env.NEXTAUTH_URL}/verify?token=${token}`;

    // 4. Build styled email HTML
    const emailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirm Newsletter Subscription - Uni-Bok</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f8fafc;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 0 20px;
          }
          .email-card {
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
          .header {
            padding: 32px 32px 0 32px;
            text-align: center;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: white;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          .header-title {
            font-size: 24px;
            font-weight: bold;
            color: white;
            margin: 0 0 8px 0;
          }
          .header-subtitle {
            color: rgba(219, 234, 254, 0.9);
            font-size: 16px;
            margin: 0 0 32px 0;
            line-height: 1.5;
          }
          .content {
            background: white;
            margin: 0 16px 16px 16px;
            border-radius: 12px;
            padding: 32px;
            text-align: center;
          }
          .welcome-icon {
            font-size: 48px;
            margin-bottom: 16px;
          }
          .content-title {
            font-size: 22px;
            font-weight: bold;
            color: #1e293b;
            margin: 0 0 12px 0;
          }
          .content-text {
            color: #64748b;
            font-size: 16px;
            margin: 0 0 32px 0;
            line-height: 1.5;
          }
          .verify-button {
            display: inline-block;
            background: #ffffff;
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            margin: 0 0 24px 0;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }
          .verify-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
          }
          .benefits {
            background: #f8fafc;
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            text-align: left;
          }
          .benefits-title {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            margin: 0 0 16px 0;
            text-align: center;
          }
          .benefit-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            color: #475569;
            font-size: 14px;
          }
          .benefit-item:last-child {
            margin-bottom: 0;
          }
          .check-icon {
            width: 16px;
            height: 16px;
            background: linear-gradient(135deg, #10b981, #3b82f6);
            border-radius: 50%;
            margin-right: 12px;
            flex-shrink: 0;
            position: relative;
          }
          .check-icon::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 10px;
            font-weight: bold;
          }
          .footer {
            background: rgba(255, 255, 255, 0.1);
            margin: 0 16px 16px 16px;
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .footer p {
            color: rgba(219, 234, 254, 0.9);
            font-size: 14px;
            margin: 0 0 8px 0;
          }
          .footer a {
            color: white;
            text-decoration: underline;
            font-weight: 500;
          }
          .fallback-link {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 16px;
            margin-top: 16px;
            word-break: break-all;
            font-size: 12px;
            color: rgba(219, 234, 254, 0.8);
          }
          @media (max-width: 600px) {
            .container {
              margin: 20px auto;
              padding: 0 16px;
            }
            .header {
              padding: 24px 24px 0 24px;
            }
            .content {
              margin: 0 8px 8px 8px;
              padding: 24px 20px;
            }
            .footer {
              margin: 0 8px 8px 8px;
              padding: 20px;
            }
            .header-title {
              font-size: 20px;
            }
            .content-title {
              font-size: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email-card">
            <div class="header">
              <div class="logo">Uni-Bok</div>
              <h1 class="header-title">🚀 Almost There!</h1>
              <p class="header-subtitle">
                One quick step to start receiving your daily tech insights
              </p>
            </div>

            <div class="content">
              <div class="welcome-icon">📧</div>
              <h2 class="content-title">Confirm Your Newsletter Subscription</h2>
              <p class="content-text">
                Thank you for joining our community! Click the button below to confirm 
                your subscription and start receiving the latest tech news and insights.
              </p>

              <a href="${link}" class="verify-button">
                Confirm Subscription ✨
              </a>

              <div class="benefits">
                <h3 class="benefits-title">What you'll get:</h3>
                <div class="benefit-item">
                  <div class="check-icon"></div>
                  <span>Daily curated tech news and breaking stories</span>
                </div>
                <div class="benefit-item">
                  <div class="check-icon"></div>
                  <span>Exclusive insights from industry experts</span>
                </div>
                <div class="benefit-item">
                  <div class="check-icon"></div>
                  <span>Early access to trending topics and analysis</span>
                </div>
                <div class="benefit-item">
                  <div class="check-icon"></div>
                  <span>Weekly roundups of the most important updates</span>
                </div>
              </div>

              <div class="fallback-link">
                <strong>Having trouble?</strong> Copy and paste this link:<br>
                ${link}
              </div>
            </div>

            <div class="footer">
              <p>
                <strong>Welcome to the community!</strong><br>
                Join thousands of readers staying ahead of the curve.
              </p>
              <p style="margin-top: 16px; font-size: 12px;">
                If you didn't subscribe to this newsletter, you can safely ignore this email.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 24px; color: #64748b; font-size: 12px;">
            © 2025 Uni-Bok. All rights reserved.<br>
            <span style="margin-top: 8px; display: inline-block;">
              For support, contact us at support@uni-bok.com
            </span>
          </div>
        </div>
      </body>
      </html>
    `;

    // 5. Send mail with styled template
    await transporter.sendMail({
      from: `"Uni-Bok Newsletter" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🚀 Confirm your Uni-Bok newsletter subscription",
      html: emailHTML,
    });

    return { sent: true };
  } catch (err) {
    console.error(err);
    return { sent: false, error: "Send failed" };
  }
}
