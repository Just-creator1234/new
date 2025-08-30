// app/actions/renderEmailTemplate.js
export async function renderEmailTemplate(posts, subscriberEmail) {
  const unsubscribeToken = encodeURIComponent(subscriberEmail);
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Daily Digest - Uni-Bok</title>
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
        }
        .post {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e2e8f0;
        }
        .post:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .post-title {
          font-size: 20px;
          font-weight: bold;
          color: #1e293b;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }
        .post-subtitle {
          font-size: 16px;
          font-weight: 600;
          color: #475569;
          margin: 0 0 12px 0;
          line-height: 1.4;
        }
        .post-excerpt {
          color: #64748b;
          font-size: 15px;
          margin: 0 0 16px 0;
          line-height: 1.5;
        }
        .read-more {
          display: inline-block;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
        }
        .read-more:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
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
        .footer a:hover {
          color: rgba(219, 234, 254, 0.8);
        }
        .stats-bar {
          background: rgba(255, 255, 255, 0.1);
          padding: 16px;
          margin: 0 16px;
          border-radius: 8px;
          text-align: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .stats-text {
          color: rgba(219, 234, 254, 0.9);
          font-size: 14px;
          margin: 0;
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
          .stats-bar {
            margin: 0 8px;
          }
          .post-title {
            font-size: 18px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-card">
          <div class="header">
            <div class="logo">Uni-Bok</div>
            <h1 class="header-title">📰 Your Daily Digest</h1>
            <p class="header-subtitle">
              Stay informed with today's most important stories
            </p>
          </div>

          <div class="stats-bar">
            <p class="stats-text">
              📊 ${posts.length} stories • 🕒 ${new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )}
            </p>
          </div>

          <div class="content">
            ${posts
              .map(
                (post) => `
              <div class="post">
                <h2 class="post-title">${post.title}</h2>
                ${
                  post.subtitle
                    ? `<h3 class="post-subtitle">${post.subtitle}</h3>`
                    : ""
                }
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="${process.env.NEXTAUTH_URL}/${
                  post.slug
                }" class="read-more">
                  Read full article →
                </a>
              </div>
            `
              )
              .join("")}
          </div>

          <div class="footer">
            <p>
              <strong>You're part of our community!</strong><br>
              Thanks for staying informed with Uni-Bok updates.
            </p>
            <p style="margin-top: 16px;">
                         <a href="${
                           process.env.NEXTAUTH_URL
                         }/unsubscribe?email=${encodeURIComponent(
    subscriberEmail
  )}" class="unsubscribe-link">• 
              <a href="${
                process.env.NEXTAUTH_URL
              }/preferences">Email Preferences</a>
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 24px; color: #64748b; font-size: 12px;">
          © 2025 Uni-Bok. All rights reserved.<br>
          <span style="margin-top: 8px; display: inline-block;">
           This email was sent to ${subscriberEmail} because you subscribed to our newsletter.
            <br>
            <a href="${
              process.env.NEXTAUTH_URL
            }/unsubscribe?email=${encodeURIComponent(subscriberEmail)}" 
               style="color: #94a3b8; text-decoration: underline;">
               Unsubscribe instantly
            </a>
          </span>
        </div>
      </div>
    </body>
    </html>
  `;
}
