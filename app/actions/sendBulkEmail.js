// app/actions/sendBulkEmail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendBulkEmail(recipients, subject, html) {
  // For small lists, send individually
  // For large lists, use a service like SendGrid, Mailchimp, etc.
  
  const results = [];
  
  for (const email of recipients) {
    try {
      await transporter.sendMail({
        from: `"SpeedyNews" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html,
      });
      results.push({ email, status: "success" });
    } catch (error) {
      results.push({ email, status: "error", error: error.message });
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
}