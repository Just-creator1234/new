// import nodemailer from "nodemailer";

// export async function sendVerificationEmail(email, token) {
//   console.log(process.env.EMAIL_USER,process.env.EMAIL_PASS);
//   const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

//   console.log(email, "funckinggggg come");

//   const transporter = nodemailer.createTransport({
//     service: "gmail", // or your email provider
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"Uni-Bok" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Verify your email",
//     html: `
//       <h3>Email Verification</h3>
//       <p>Click below to verify your email:</p>
//       <a href="${verifyUrl}">Verify Email</a>
//     `,
//   });
// }

import nodemailer from "nodemailer";

export async function sendVerificationEmail(email, token) {
  console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  console.log(email, "funckinggggg come");

  const transporter = nodemailer.createTransport({
    service: "gmail", // or your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - Uni-Bok</title>
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
        .content {
          padding: 48px 32px;
          text-align: center;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: white;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        .title {
          font-size: 24px;
          font-weight: bold;
          color: white;
          margin: 0 0 8px 0;
        }
        .subtitle {
          color: rgba(219, 234, 254, 0.9);
          font-size: 16px;
          margin: 0 0 32px 0;
          line-height: 1.5;
        }
        .verify-button {
          display: inline-block;
          background-color: white;
          color: #2563eb;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          margin: 16px 0 32px 0;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .verify-button:hover {
          background-color: #f1f5f9;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        .footer-text {
          color: rgba(219, 234, 254, 0.8);
          font-size: 14px;
          margin-top: 24px;
        }
        .divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
          margin: 32px 0;
        }
        .security-note {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          margin-top: 24px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .security-note p {
          color: rgba(219, 234, 254, 0.9);
          font-size: 14px;
          margin: 0;
        }
        @media (max-width: 600px) {
          .container {
            margin: 20px auto;
            padding: 0 16px;
          }
          .content {
            padding: 32px 24px;
          }
          .title {
            font-size: 20px;
          }
          .subtitle {
            font-size: 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-card">
          <div class="content">
            <div class="logo">Uni-Bok</div>
            
            <h1 class="title">Verify Your Email</h1>
            <p class="subtitle">
              Welcome! We're excited to have you join our community. 
              Please verify your email address to complete your registration.
            </p>

            <a href="${verifyUrl}" class="verify-button">
              Verify Email Address
            </a>

            <div class="divider"></div>

            <div class="security-note">
              <p>
                <strong>Security tip:</strong> This verification link will expire in 24 hours. 
                If you didn't create an account, you can safely ignore this email.
              </p>
            </div>

            <p class="footer-text">
              Having trouble? Copy and paste this link into your browser:<br>
              <span style="word-break: break-all; font-size: 12px; opacity: 0.8;">
                ${verifyUrl}
              </span>
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 24px; color: #64748b; font-size: 12px;">
          © 2025 Uni-Bok. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Uni-Bok" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email - Uni-Bok",
    html: emailHTML,
  });
}
